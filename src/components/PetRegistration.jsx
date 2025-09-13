import React, { useState, useRef, useEffect } from 'react';

const PetRegistration = ({ onPetRegistered, currentPet }) => {
  const [petData, setPetData] = useState({
    name: '',
    species: 'cat',
    breed: '',
    age: '',
    personality: '',
    photo: null,
    voiceProfile: []
  });
  
  const [showForm, setShowForm] = useState(!currentPet);
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  
  useEffect(() => {
    if (currentPet) {
      setPetData(currentPet);
      setRecordings(currentPet.voiceProfile || []);
    }
  }, [currentPet]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPetData(prev => ({
          ...prev,
          photo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 },
        audio: false 
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    const photoData = canvas.toDataURL('image/jpeg');
    setPetData(prev => ({
      ...prev,
      photo: photoData
    }));
    
    // Stop camera
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    video.srcObject = null;
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const newRecording = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          url: audioUrl,
          blob: audioBlob,
          duration: Date.now() - recordingStartTime
        };
        
        setRecordings(prev => [...prev, newRecording]);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      const recordingStartTime = Date.now();
      mediaRecorder.start();
      setIsRecording(true);
      
      // Auto-stop after 10 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          stopVoiceRecording();
        }
      }, 10000);
      
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const deleteRecording = (id) => {
    setRecordings(prev => prev.filter(rec => rec.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalPetData = {
      ...petData,
      voiceProfile: recordings,
      registeredAt: new Date().toISOString()
    };
    
    onPetRegistered(finalPetData);
    setShowForm(false);
  };

  if (!showForm && currentPet) {
    return (
      <div className="pet-profile">
        <div className="pet-profile-header">
          <div className="pet-photo">
            {currentPet.photo ? (
              <img src={currentPet.photo} alt={currentPet.name} />
            ) : (
              <div className="no-photo">📸</div>
            )}
          </div>
          <div className="pet-info">
            <h3>{currentPet.name}</h3>
            <p>{currentPet.breed} {currentPet.species}</p>
            <p>{currentPet.age} years old</p>
            <p className="personality">{currentPet.personality}</p>
          </div>
          <button 
            className="edit-pet-btn"
            onClick={() => setShowForm(true)}
          >
            Edit Profile
          </button>
        </div>
        
        <div className="voice-profile-summary">
          <h4>Voice Profile</h4>
          <p>{recordings.length} recordings captured</p>
          {recordings.length > 0 && (
            <div className="recent-recordings">
              {recordings.slice(0, 3).map(rec => (
                <div key={rec.id} className="recording-item">
                  <audio controls src={rec.url}></audio>
                  <span>{new Date(rec.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="pet-registration">
      <h3>🌍 Register Your Animal Companion</h3>
      <p className="registration-subtitle">
        Help Anima learn your pet's unique communication style - works with cats, dogs, birds, rabbits, and many more species!
      </p>
      
      <form onSubmit={handleSubmit} className="pet-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Pet Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={petData.name}
              onChange={handleInputChange}
              required
              placeholder="What's your pet's name?"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="species">Species *</label>
            <select
              id="species"
              name="species"
              value={petData.species}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Species</option>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
              <option value="bird">Bird (Parrot, Canary, Finch, etc.)</option>
              <option value="rabbit">Rabbit</option>
              <option value="guinea-pig">Guinea Pig</option>
              <option value="hamster">Hamster</option>
              <option value="ferret">Ferret</option>
              <option value="reptile">Reptile (Snake, Lizard, Turtle, etc.)</option>
              <option value="fish">Fish</option>
              <option value="chinchilla">Chinchilla</option>
              <option value="rat">Rat</option>
              <option value="mouse">Mouse</option>
              <option value="hedgehog">Hedgehog</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="breed">Breed</label>
            <input
              type="text"
              id="breed"
              name="breed"
              value={petData.breed}
              onChange={handleInputChange}
              placeholder="e.g., Persian, Golden Retriever, Cockatiel, Holland Lop, etc."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="age">Age (years)</label>
            <input
              type="number"
              id="age"
              name="age"
              value={petData.age}
              onChange={handleInputChange}
              min="0"
              max="30"
              step="0.5"
              placeholder="Age in years"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="personality">Personality & Habits</label>
          <textarea
            id="personality"
            name="personality"
            value={petData.personality}
            onChange={handleInputChange}
            placeholder="Describe your pet's personality, daily routine, favorite activities, etc."
            rows="3"
          />
        </div>

        <div className="photo-section">
          <h4>📸 Pet Photo</h4>
          <div className="photo-options">
            <div className="upload-option">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="photo-btn"
              >
                Upload Photo
              </button>
            </div>
            
            <div className="camera-option">
              <button
                type="button"
                onClick={startCamera}
                className="photo-btn"
              >
                Take Photo
              </button>
            </div>
          </div>
          
          <div className="camera-container">
            <video ref={videoRef} style={{ display: 'none' }}></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            {videoRef.current && videoRef.current.srcObject && (
              <div className="camera-view">
                <video ref={videoRef} autoPlay></video>
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="capture-btn"
                >
                  📸 Capture
                </button>
              </div>
            )}
          </div>
          
          {petData.photo && (
            <div className="photo-preview">
              <img src={petData.photo} alt="Pet preview" />
            </div>
          )}
        </div>

        <div className="voice-section">
          <h4>🎤 Voice Profile (Optional)</h4>
          <p>Record your pet's vocalizations to help Anima learn their unique communication style</p>
          
          <div className="recording-controls">
            <button
              type="button"
              onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
              className={`record-btn ${isRecording ? 'recording' : ''}`}
              disabled={isRecording && false}
            >
              {isRecording ? '🔴 Stop Recording' : '🎤 Start Recording'}
            </button>
            {isRecording && (
              <div className="recording-indicator">
                <span>Recording... (max 10 seconds)</span>
                <div className="recording-animation"></div>
              </div>
            )}
          </div>
          
          {recordings.length > 0 && (
            <div className="recordings-list">
              <h5>Captured Recordings ({recordings.length})</h5>
              {recordings.map(recording => (
                <div key={recording.id} className="recording-item">
                  <audio controls src={recording.url}></audio>
                  <span className="recording-time">
                    {new Date(recording.timestamp).toLocaleTimeString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteRecording(recording.id)}
                    className="delete-recording"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {currentPet ? 'Update Profile' : 'Register Pet'}
          </button>
          {currentPet && (
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PetRegistration;
