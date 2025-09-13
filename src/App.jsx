import { useState } from 'react'
import './App.css'
import VocalizationTranslator from './components/VocalizationTranslator'
import VocalizationTrainer from './components/VocalizationTrainer'
import ScientificReferences from './components/ScientificReferences'
import PetRegistration from './components/PetRegistration'

function App() {
  const [emotionData, setEmotionData] = useState({
    vocalization: {},
    interpretation: ''
  })

  const [isActive, setIsActive] = useState(false)
  const [vocalizationHistory, setVocalizationHistory] = useState([])
  const [currentPet, setCurrentPet] = useState(() => {
    const savedPet = localStorage.getItem('animaPet')
    return savedPet ? JSON.parse(savedPet) : null
  })

  const handleDataUpdate = (type, data) => {
    setEmotionData(prev => ({
      ...prev,
      [type]: data
    }))

    // Track vocalization history for training
    if (type === 'vocalization' && data.message) {
      setVocalizationHistory(prev => [data, ...prev.slice(0, 49)]) // Keep last 50
    }
  }

  const handleTrainingUpdate = (trainingData) => {
    console.log('Training update received:', trainingData)
    // Here you could send training data to a backend service
  }

  const handlePetRegistration = (petData) => {
    setCurrentPet(petData)
    localStorage.setItem('animaPet', JSON.stringify(petData))
  }

  return (
    <div className="anima-app">
      <header className="app-header">
        <h1>🌟 Anima</h1>
        <p>Bridging Communication Across All Beings</p>
        <button 
          className={`activation-btn ${isActive ? 'active' : ''}`}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? 'Deactivate' : 'Activate'} Communication Bridge
        </button>
      </header>


      <main className="main-content">
        <div className="pet-section">
          <PetRegistration 
            onPetRegistered={handlePetRegistration}
            currentPet={currentPet}
          />
        </div>

        <div className="vocalization-section">
          <VocalizationTranslator 
            isActive={isActive}
            onDataUpdate={handleDataUpdate}
            currentPet={currentPet}
          />
        </div>

        <div className="advanced-translation-section" style={{background: '#fff', border: '2px solid #2196F3', borderRadius: '20px', padding: '2rem', margin: '1rem 0', boxShadow: '0 8px 32px rgba(33,150,243,0.12)'}}>
          <h2 style={{color: '#2196F3', marginBottom: '0.5rem'}}>🚀 Advanced Translation Service</h2>
          <p style={{color: '#333', fontSize: '1.1rem', marginBottom: '1rem'}}>
            Want even higher accuracy? Submit your pet's audio or video file for <strong>advanced binary analysis</strong>.<br/>
            Our premium system analyzes vocalizations byte-by-byte for maximum precision.<br/>
            <strong>How it works:</strong>
          </p>
          <ul style={{color: '#333', marginBottom: '1rem', fontSize: '1rem'}}>
            <li>Send your audio/video file to <a href="mailto:ultraseekerlooney@gmail.com" style={{color:'#2196F3', textDecoration:'underline'}}>ultraseekerlooney@gmail.com</a></li>
            <li>Include your pet's name, species, and any context or questions</li>
            <li>You will receive a personal, expert translation and analysis reply</li>
            <li>All files are processed with a proprietary binary program for maximum accuracy</li>
          </ul>
          <p style={{color:'#757575', fontStyle:'italic'}}>This is a premium service offered alongside the free Anima translator. Your privacy is respected—files are used only for analysis and response.</p>
        </div>

        <div className="training-section">
          <VocalizationTrainer 
            recentTranslations={vocalizationHistory}
            onTrainingUpdate={handleTrainingUpdate}
            currentPet={currentPet}
          />
        </div>

        <div className="references-section">
          <ScientificReferences />
        </div>
      </main>

      <footer className="app-footer">
        <p>✨ Giving voice to the voiceless, crossing dimensional bridges ✨</p>
      </footer>
    </div>
  )
}

export default App
