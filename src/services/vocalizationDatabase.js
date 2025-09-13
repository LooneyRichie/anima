// Comprehensive Animal Vocalization Database
// Based on scientific research and behavioral studies

export const VOCALIZATION_DATABASE = {
  cats: {
    species: 'Felis catus',
    vocalTypes: {
      meow: {
        frequencyRange: [100, 2000],
        patterns: {
          short_meow: {
            duration: [0.3, 0.8],
            meaning: 'Standard greeting or acknowledgment',
            context: ['greeting', 'attention_seeking'],
            urgency: 0.3,
            confidence: 0.8
          },
          long_meow: {
            duration: [1.0, 3.0],
            meaning: 'More urgent request or complaint',
            context: ['food_request', 'urgent_need'],
            urgency: 0.6,
            confidence: 0.7
          },
          repeated_meows: {
            pattern: 'repetitive',
            meaning: 'Insistent demand or excitement',
            context: ['feeding_time', 'play_request'],
            urgency: 0.8,
            confidence: 0.9
          },
          rising_meow: {
            pitch: 'ascending',
            meaning: 'Question or request',
            context: ['asking_permission', 'uncertain'],
            urgency: 0.4,
            confidence: 0.6
          },
          demanding_meow: {
            intensity: 'high',
            meaning: 'Urgent demand or frustration',
            context: ['hungry', 'locked_out', 'emergency'],
            urgency: 0.9,
            confidence: 0.8
          }
        }
      },
      purr: {
        frequencyRange: [20, 200],
        patterns: {
          content_purr: {
            frequency: [20, 50],
            meaning: 'Deep contentment and relaxation',
            context: ['petting', 'comfortable', 'happy'],
            urgency: 0.1,
            confidence: 0.95
          },
          solicitation_purr: {
            frequency: [50, 120],
            mixed_with: 'meow_components',
            meaning: 'Requesting attention or food',
            context: ['food_request', 'attention_seeking'],
            urgency: 0.5,
            confidence: 0.8
          },
          healing_purr: {
            frequency: [25, 50],
            meaning: 'Self-soothing when injured or stressed',
            context: ['pain', 'stress', 'healing'],
            urgency: 0.3,
            confidence: 0.7
          }
        }
      },
      chirp_trill: {
        frequencyRange: [200, 1500],
        patterns: {
          greeting_trill: {
            pattern: 'rapid_ascending',
            meaning: 'Friendly greeting, especially to familiar humans',
            context: ['greeting', 'excited_recognition'],
            urgency: 0.3,
            confidence: 0.8
          },
          mother_call: {
            pattern: 'rolling_trill',
            meaning: 'Maternal call to kittens or invitation to follow',
            context: ['maternal', 'leading', 'come_here'],
            urgency: 0.4,
            confidence: 0.9
          },
          hunting_chirp: {
            pattern: 'staccato_chirps',
            meaning: 'Excitement about prey, hunting instinct activated',
            context: ['hunting', 'prey_spotted', 'excitement'],
            urgency: 0.6,
            confidence: 0.7
          }
        }
      },
      yowl_cry: {
        frequencyRange: [300, 3000],
        patterns: {
          distress_yowl: {
            duration: [1.0, 4.0],
            intensity: 'very_high',
            meaning: 'Serious distress, pain, or emergency',
            context: ['pain', 'trapped', 'emergency', 'severe_distress'],
            urgency: 0.95,
            confidence: 0.9
          },
          mating_yowl: {
            pattern: 'prolonged_wailing',
            meaning: 'Mating call or territorial dispute',
            context: ['mating', 'territorial', 'hormonal'],
            urgency: 0.7,
            confidence: 0.8
          },
          elderly_yowl: {
            pattern: 'confused_calling',
            meaning: 'Cognitive confusion or disorientation',
            context: ['elderly', 'confused', 'seeking_comfort'],
            urgency: 0.6,
            confidence: 0.6
          }
        }
      },
      chatter: {
        frequencyRange: [500, 2500],
        patterns: {
          prey_chatter: {
            pattern: 'rapid_teeth_chattering',
            meaning: 'Frustration at unreachable prey',
            context: ['hunting', 'frustration', 'prey_watching'],
            urgency: 0.4,
            confidence: 0.8
          },
          excitement_chatter: {
            pattern: 'rapid_vocalizations',
            meaning: 'High excitement or anticipation',
            context: ['feeding_time', 'play', 'high_excitement'],
            urgency: 0.5,
            confidence: 0.7
          }
        }
      },
      hiss_growl: {
        frequencyRange: [50, 1000],
        patterns: {
          warning_hiss: {
            pattern: 'sharp_exhale',
            meaning: 'Warning - back off or I will defend myself',
            context: ['threatened', 'defensive', 'warning'],
            urgency: 0.8,
            confidence: 0.95
          },
          defensive_growl: {
            pattern: 'low_rumbling',
            meaning: 'Serious threat display - prepared to fight',
            context: ['very_threatened', 'aggressive', 'territorial'],
            urgency: 0.9,
            confidence: 0.9
          }
        }
      }
    },
    contextualFactors: {
      timeOfDay: {
        morning: ['food_request', 'greeting'],
        evening: ['food_request', 'attention_seeking'],
        night: ['hunting_play', 'territorial'],
        late_night: ['elderly_confusion', 'distress']
      },
      location: {
        food_area: ['hunger', 'food_request'],
        litter_box: ['needs_cleaning', 'health_issue'],
        door: ['wants_out', 'wants_in'],
        window: ['prey_watching', 'territory_monitoring'],
        sleeping_area: ['comfort_seeking', 'illness']
      },
      socialContext: {
        alone: ['loneliness', 'attention_seeking'],
        with_humans: ['social_interaction', 'requests'],
        with_other_cats: ['territorial', 'social_hierarchy'],
        strangers_present: ['anxiety', 'territorial']
      }
    },
    individualVariations: {
      age: {
        kitten: ['higher_pitch', 'more_frequent', 'distress_calls'],
        adult: ['established_vocabulary', 'context_specific'],
        senior: ['confusion_calls', 'health_related', 'louder']
      },
      personality: {
        vocal: ['frequent_communication', 'varied_sounds'],
        quiet: ['only_urgent_communication', 'minimal_vocalizations'],
        social: ['conversation_like', 'responsive_to_humans'],
        independent: ['specific_requests_only', 'clear_demands']
      },
      health: {
        healthy: ['normal_range', 'varied_expressions'],
        illness: ['changed_patterns', 'distress_indicators'],
        pain: ['increased_urgency', 'specific_pain_calls'],
        cognitive_decline: ['confusion_calls', 'nighttime_yowling']
      }
    }
  },
  
  // Expandable for other animals
  dogs: {
    species: 'Canis familiaris',
    // Future implementation
  },
  
  birds: {
    species: 'Various Avian',
    // Future implementation
  }
}

// Research-based translation algorithms
export const TRANSLATION_ALGORITHMS = {
  
  frequencyAnalysis: {
    analyzePrimaryFrequency: (frequency, species = 'cats') => {
      const speciesData = VOCALIZATION_DATABASE[species]
      if (!speciesData) return null
      
      for (const [vocalType, data] of Object.entries(speciesData.vocalTypes)) {
        const [minFreq, maxFreq] = data.frequencyRange
        if (frequency >= minFreq && frequency <= maxFreq) {
          return {
            type: vocalType,
            confidence: 0.7,
            ...data
          }
        }
      }
      return null
    },
    
    analyzeHarmonicContent: (harmonics, fundamentalFreq) => {
      const harmonicRatios = harmonics.map(h => h.frequency / fundamentalFreq)
      
      // Strong harmonic content suggests emotional/urgent vocalizations
      if (harmonics.length >= 3) {
        return {
          emotionalIntensity: 0.8,
          urgency: 0.6,
          confidence: 0.7
        }
      } else if (harmonics.length >= 1) {
        return {
          emotionalIntensity: 0.5,
          urgency: 0.4,
          confidence: 0.6
        }
      }
      
      return {
        emotionalIntensity: 0.2,
        urgency: 0.2,
        confidence: 0.4
      }
    }
  },
  
  contextualAnalysis: {
    enhanceWithTimeContext: (baseTranslation, timeOfDay) => {
      const hour = new Date().getHours()
      let timeContext = ''
      
      if (hour >= 5 && hour <= 9) timeContext = 'morning'
      else if (hour >= 17 && hour <= 21) timeContext = 'evening'
      else if (hour >= 22 || hour <= 4) timeContext = 'night'
      else timeContext = 'day'
      
      const contextualMeanings = VOCALIZATION_DATABASE.cats.contextualFactors.timeOfDay[timeContext]
      
      if (contextualMeanings && contextualMeanings.includes('food_request') && 
          (timeContext === 'morning' || timeContext === 'evening')) {
        return {
          ...baseTranslation,
          enhancedMeaning: baseTranslation.meaning + ' (Likely food-related due to feeding time)',
          confidence: Math.min(1.0, baseTranslation.confidence + 0.2)
        }
      }
      
      return baseTranslation
    },
    
    enhanceWithEnvironmentalContext: (baseTranslation, environmentalData) => {
      if (!environmentalData) return baseTranslation
      
      let contextEnhancement = ''
      let confidenceBoost = 0
      
      // Proximity detection enhancement
      if (environmentalData.proximityDetection?.length > 0) {
        contextEnhancement += ' (Other beings detected nearby - may be territorial or social)'
        confidenceBoost += 0.1
      }
      
      // Sound level enhancement
      if (environmentalData.soundLevel > 60) {
        contextEnhancement += ' (Noisy environment - may be trying to communicate over noise)'
        confidenceBoost += 0.1
      }
      
      // Social context enhancement
      if (environmentalData.socialContext === 'Solitary') {
        contextEnhancement += ' (Alone - likely seeking attention or expressing need)'
        confidenceBoost += 0.15
      }
      
      return {
        ...baseTranslation,
        enhancedMeaning: baseTranslation.meaning + contextEnhancement,
        confidence: Math.min(1.0, baseTranslation.confidence + confidenceBoost)
      }
    }
  },
  
  patternRecognition: {
    detectRepetition: (recentVocalizations, timeWindow = 30000) => {
      const now = Date.now()
      const recent = recentVocalizations.filter(v => (now - v.timestamp) < timeWindow)
      
      if (recent.length >= 3) {
        const patterns = recent.map(v => v.pattern)
        const mostCommon = patterns.reduce((a, b, i, arr) => 
          arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
        )
        
        return {
          isRepeating: true,
          pattern: mostCommon,
          count: recent.length,
          urgencyMultiplier: Math.min(2.0, 1.0 + (recent.length * 0.2))
        }
      }
      
      return { isRepeating: false }
    },
    
    analyzeVocalizationSequence: (vocalizations) => {
      if (vocalizations.length < 2) return null
      
      // Look for escalating patterns
      const urgencyLevels = vocalizations.map(v => v.urgency)
      const isEscalating = urgencyLevels.every((level, i) => 
        i === 0 || level >= urgencyLevels[i - 1]
      )
      
      if (isEscalating && urgencyLevels[urgencyLevels.length - 1] > 0.7) {
        return {
          pattern: 'escalating_urgency',
          meaning: 'Increasingly urgent communication - immediate attention needed',
          confidence: 0.8
        }
      }
      
      return null
    }
  }
}

// Continuous learning system for improving translations
export class VocalizationLearningSystem {
  constructor() {
    this.userFeedback = []
    this.adaptations = {}
    this.individualProfiles = new Map()
  }
  
  recordUserFeedback(vocalization, userCorrection, context) {
    this.userFeedback.push({
      originalTranslation: vocalization,
      userCorrection,
      context,
      timestamp: Date.now()
    })
    
    this.updateAdaptations(vocalization, userCorrection)
  }
  
  updateAdaptations(original, correction) {
    const key = `${original.frequency}_${original.pattern}`
    
    if (!this.adaptations[key]) {
      this.adaptations[key] = {
        corrections: [],
        confidence: 0.5
      }
    }
    
    this.adaptations[key].corrections.push(correction)
    this.adaptations[key].confidence = Math.min(1.0, 
      this.adaptations[key].confidence + 0.1
    )
  }
  
  getAdaptedTranslation(vocalization) {
    const key = `${vocalization.frequency}_${vocalization.pattern}`
    const adaptation = this.adaptations[key]
    
    if (adaptation && adaptation.confidence > 0.7) {
      const mostCommonCorrection = this.getMostCommonCorrection(adaptation.corrections)
      return {
        ...vocalization,
        meaning: mostCommonCorrection,
        confidence: adaptation.confidence,
        source: 'learned_adaptation'
      }
    }
    
    return null
  }
  
  getMostCommonCorrection(corrections) {
    return corrections.reduce((a, b, i, arr) =>
      arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
    )
  }
}
