import { useState, useEffect } from 'react'
import { VocalizationLearningSystem } from '../services/vocalizationDatabase'

const VocalizationTrainer = ({ recentTranslations, onTrainingUpdate }) => {
  const [learningSystem] = useState(() => new VocalizationLearningSystem())
  const [feedbackMode, setFeedbackMode] = useState(false)
  const [selectedTranslation, setSelectedTranslation] = useState(null)
  const [userCorrection, setUserCorrection] = useState('')
  const [contextNotes, setContextNotes] = useState('')
  const [trainingHistory, setTrainingHistory] = useState([])
  const [showAdvanced, setShowAdvanced] = useState(false)

  useEffect(() => {
    // Load training history from localStorage
    const saved = localStorage.getItem('anima_training_history')
    if (saved) {
      setTrainingHistory(JSON.parse(saved))
    }
  }, [])

  const startFeedback = (translation) => {
    setSelectedTranslation(translation)
    setUserCorrection('')
    setContextNotes('')
    setFeedbackMode(true)
  }

  const submitFeedback = () => {
    if (!selectedTranslation || !userCorrection.trim()) return

    const feedbackEntry = {
      id: Date.now(),
      originalTranslation: selectedTranslation,
      userCorrection: userCorrection.trim(),
      contextNotes: contextNotes.trim(),
      timestamp: Date.now(),
      improvement: calculateImprovement(selectedTranslation, userCorrection)
    }

    // Record in learning system
    learningSystem.recordUserFeedback(
      selectedTranslation,
      userCorrection.trim(),
      {
        notes: contextNotes.trim(),
        timestamp: Date.now()
      }
    )

    // Update training history
    const newHistory = [feedbackEntry, ...trainingHistory.slice(0, 49)] // Keep last 50
    setTrainingHistory(newHistory)
    localStorage.setItem('anima_training_history', JSON.stringify(newHistory))

    // Notify parent component
    onTrainingUpdate?.(feedbackEntry)

    // Reset form
    setFeedbackMode(false)
    setSelectedTranslation(null)
    setUserCorrection('')
    setContextNotes('')
  }

  const calculateImprovement = (original, correction) => {
    // Simple scoring system for improvement tracking
    const factors = {
      specificity: correction.length > original.message.length ? 0.2 : 0,
      contextualRelevance: contextNotes.length > 0 ? 0.3 : 0,
      clarity: correction.includes('I') || correction.includes('need') ? 0.2 : 0,
      urgency: correction.includes('urgent') || correction.includes('immediately') ? 0.3 : 0
    }

    return Object.values(factors).reduce((sum, val) => sum + val, 0)
  }

  const getTrainingStats = () => {
    const totalFeedback = trainingHistory.length
    const avgImprovement = totalFeedback > 0 
      ? trainingHistory.reduce((sum, item) => sum + item.improvement, 0) / totalFeedback 
      : 0
    
    const categoryStats = trainingHistory.reduce((stats, item) => {
      const pattern = item.originalTranslation.pattern || 'unknown'
      stats[pattern] = (stats[pattern] || 0) + 1
      return stats
    }, {})

    return {
      totalFeedback,
      avgImprovement,
      categoryStats,
      learningAccuracy: Math.min(100, (avgImprovement * 100) + (totalFeedback * 2))
    }
  }

  const generateTrainingInsights = () => {
    const stats = getTrainingStats()
    const insights = []

    if (stats.totalFeedback >= 10) {
      insights.push(`🎯 Training Progress: ${stats.totalFeedback} corrections provided`)
      insights.push(`📈 Learning Accuracy: ${stats.learningAccuracy.toFixed(1)}%`)
    }

    if (stats.avgImprovement > 0.6) {
      insights.push('🌟 High-quality corrections detected - great training!')
    } else if (stats.avgImprovement > 0.3) {
      insights.push('📚 Good training progress - consider adding more context')
    }

    const mostCorrected = Object.entries(stats.categoryStats)
      .sort(([,a], [,b]) => b - a)[0]
    
    if (mostCorrected) {
      insights.push(`🔍 Most corrected pattern: ${mostCorrected[0]} (${mostCorrected[1]} times)`)
    }

    return insights
  }

  const exportTrainingData = () => {
    const exportData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      trainingHistory: trainingHistory,
      stats: getTrainingStats(),
      adaptations: learningSystem.adaptations
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `anima_training_data_${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getPatternColor = (pattern) => {
    const colors = {
      'purr': '#4CAF50',
      'standard_meow': '#2196F3',
      'demanding_meow': '#FF5722',
      'chirp_trill': '#9C27B0',
      'yowl_cry': '#F44336',
      'unknown': '#9E9E9E'
    }
    return colors[pattern] || '#9E9E9E'
  }

  return (
    <div className="vocalization-trainer">
      <h3>🎓 AI Training Assistant</h3>
      <p className="trainer-subtitle">Help Anima learn your pet's unique communication style</p>

      <div className="training-stats">
        <h4>📊 Training Progress</h4>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">{getTrainingStats().totalFeedback}</span>
            <span className="stat-label">Corrections Provided</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{getTrainingStats().learningAccuracy.toFixed(0)}%</span>
            <span className="stat-label">Learning Accuracy</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{Object.keys(learningSystem.adaptations).length}</span>
            <span className="stat-label">Learned Patterns</span>
          </div>
        </div>
      </div>

      <div className="recent-translations">
        <h4>🎯 Recent Translations to Review</h4>
        {recentTranslations && recentTranslations.length > 0 ? (
          <div className="translations-list">
            {recentTranslations.slice(0, 5).map((translation, index) => (
              <div key={translation.id || index} className="translation-item">
                <div className="translation-header">
                  <span 
                    className="pattern-indicator"
                    style={{ backgroundColor: getPatternColor(translation.pattern) }}
                  >
                    {translation.pattern?.replace('_', ' ') || 'Unknown'}
                  </span>
                  <span className="frequency-info">
                    {translation.frequency}Hz
                  </span>
                  <span className="confidence-info">
                    {(translation.confidence * 100).toFixed(0)}% confident
                  </span>
                </div>
                <div className="translation-message">
                  "{translation.message}"
                </div>
                <button 
                  className="feedback-btn"
                  onClick={() => startFeedback(translation)}
                >
                  ✏️ Correct This Translation
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-translations">No recent translations to review</p>
        )}
      </div>

      {feedbackMode && selectedTranslation && (
        <div className="feedback-modal">
          <div className="modal-content">
            <h4>🔧 Correct Translation</h4>
            
            <div className="original-translation">
              <h5>Original Translation:</h5>
              <p>"{selectedTranslation.message}"</p>
              <div className="technical-details">
                Pattern: {selectedTranslation.pattern} | 
                Frequency: {selectedTranslation.frequency}Hz | 
                Confidence: {(selectedTranslation.confidence * 100).toFixed(0)}%
              </div>
            </div>

            <div className="correction-form">
              <label htmlFor="user-correction">What did your pet actually mean?</label>
              <textarea
                id="user-correction"
                value={userCorrection}
                onChange={(e) => setUserCorrection(e.target.value)}
                placeholder="e.g., 'I want to go outside' or 'I'm hungry for treats, not regular food'"
                rows={3}
              />

              <label htmlFor="context-notes">Additional Context (Optional)</label>
              <textarea
                id="context-notes"
                value={contextNotes}
                onChange={(e) => setContextNotes(e.target.value)}
                placeholder="e.g., 'This happened right after I opened the treat cabinet' or 'My cat was looking at the door'"
                rows={2}
              />

              <div className="modal-actions">
                <button 
                  className="submit-btn"
                  onClick={submitFeedback}
                  disabled={!userCorrection.trim()}
                >
                  ✅ Submit Correction
                </button>
                <button 
                  className="cancel-btn"
                  onClick={() => setFeedbackMode(false)}
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="training-insights">
        <h4>💡 Training Insights</h4>
        <div className="insights-list">
          {generateTrainingInsights().map((insight, index) => (
            <div key={index} className="insight-item">
              {insight}
            </div>
          ))}
          {generateTrainingInsights().length === 0 && (
            <p className="no-insights">Start correcting translations to see insights!</p>
          )}
        </div>
      </div>

      <div className="advanced-section">
        <button 
          className="toggle-advanced"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          🔬 {showAdvanced ? 'Hide' : 'Show'} Advanced Training Features
        </button>

        {showAdvanced && (
          <div className="advanced-features">
            <div className="pattern-analysis">
              <h5>📈 Pattern Analysis</h5>
              <div className="pattern-stats">
                {Object.entries(getTrainingStats().categoryStats).map(([pattern, count]) => (
                  <div key={pattern} className="pattern-stat">
                    <span 
                      className="pattern-color"
                      style={{ backgroundColor: getPatternColor(pattern) }}
                    ></span>
                    <span className="pattern-name">{pattern.replace('_', ' ')}</span>
                    <span className="pattern-count">{count} corrections</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="learning-adaptations">
              <h5>🧠 AI Adaptations</h5>
              <p>The AI has learned {Object.keys(learningSystem.adaptations).length} unique patterns from your corrections.</p>
              <div className="adaptations-list">
                {Object.entries(learningSystem.adaptations).slice(0, 3).map(([key, adaptation]) => (
                  <div key={key} className="adaptation-item">
                    <span className="adaptation-pattern">Pattern: {key}</span>
                    <span className="adaptation-confidence">
                      Confidence: {(adaptation.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="export-section">
              <h5>💾 Export Training Data</h5>
              <p>Export your training data for backup or sharing with researchers.</p>
              <button className="export-btn" onClick={exportTrainingData}>
                📁 Export Training Data
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="training-history">
        <h4>📜 Training History</h4>
        <div className="history-container">
          {trainingHistory.length > 0 ? (
            trainingHistory.slice(0, 10).map((entry) => (
              <div key={entry.id} className="history-entry">
                <div className="entry-header">
                  <span className="entry-date">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                  <span className="improvement-score">
                    Improvement: {(entry.improvement * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="entry-content">
                  <div className="original">Original: "{entry.originalTranslation.message}"</div>
                  <div className="correction">Corrected: "{entry.userCorrection}"</div>
                  {entry.contextNotes && (
                    <div className="context">Context: {entry.contextNotes}</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="no-history">No training history yet</p>
          )}
        </div>
      </div>

      <div className="training-tips">
        <h4>💡 Training Tips</h4>
        <ul className="tips-list">
          <li>🎯 Be specific about what your pet wants (e.g., "wants treats" vs "wants food")</li>
          <li>🕐 Include timing context (e.g., "after dinner" or "when I got home")</li>
          <li>🏠 Mention location context (e.g., "at the door" or "near food bowl")</li>
          <li>😺 Note your pet's body language alongside vocalizations</li>
          <li>🔄 Correct multiple similar situations to improve pattern recognition</li>
          <li>📊 Regular training helps the AI learn your pet's unique "vocabulary"</li>
        </ul>
      </div>
    </div>
  )
}

export default VocalizationTrainer
