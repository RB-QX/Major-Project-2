<template>
    <div class="eeg-chart-container">
      <svg 
        :width="width" 
        :height="height" 
        :viewBox="`0 0 ${width} ${height}`"
        class="eeg-chart"
      >
        <!-- Grid lines -->
        <g class="grid-lines">
          <line 
            v-for="i in 5" 
            :key="`h-line-${i}`"
            x1="0" 
            :y1="height / 5 * i" 
            :x2="width" 
            :y2="height / 5 * i"
            class="grid-line"
          />
          <line 
            v-for="i in 10" 
            :key="`v-line-${i}`"
            :x1="width / 10 * i" 
            y1="0" 
            :x2="width / 10 * i" 
            :y2="height"
            class="grid-line"
          />
        </g>
        
        <!-- EEG waveform -->
        <path 
          :d="pathData" 
          fill="none" 
          stroke="#00ff00" 
          stroke-width="2"
        />
        
        <!-- Markers for important points -->
        <g v-if="active">
          <circle 
            v-for="(point, index) in dataPoints.slice(-5)" 
            :key="`point-${index}`"
            :cx="width - (5 - index) * (width / 100)" 
            :cy="point" 
            r="3" 
            fill="#ff0000"
          />
        </g>
      </svg>
      
      <div class="chart-controls">
        <div class="status-indicator" :class="{ active }">
          {{ active ? 'RECORDING' : 'INACTIVE' }}
        </div>
        <div class="time-display">{{ timeDisplay }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      active: {
        type: Boolean,
        default: false
      },
      data: {
        type: String,
        default: ''
      }
    },
    
    data() {
      return {
        width: 600,
        height: 200,
        dataPoints: [],
        maxPoints: 100,
        animationInterval: null,
        elapsedTime: 0
      }
    },
    
    computed: {
      pathData() {
        if (this.dataPoints.length === 0) return ''
        
        let path = `M0,${this.height / 2}`
        
        this.dataPoints.forEach((point, index) => {
          const x = (index * this.width) / (this.maxPoints - 1)
          path += ` L${x},${point}`
        })
        
        return path
      },
      
      parsedData() {
        if (!this.data) return null
        try {
          return JSON.parse(this.data)
        } catch (e) {
          console.error('Invalid data format', e)
          return null
        }
      },
      
      timeDisplay() {
        const minutes = Math.floor(this.elapsedTime / 60)
        const seconds = this.elapsedTime % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      }
    },
    
    watch: {
      active(newValue) {
        if (newValue) {
          this.startSimulation()
        } else {
          this.stopSimulation()
        }
      },
      
      parsedData(newData) {
        if (newData && this.active) {
          // Use the alpha and beta channels to generate a complex waveform
          const alphaValue = newData.channels.alpha || 0
          const betaValue = newData.channels.beta || 0
          
          // Calculate a y-position (higher values = lower position)
          const midPoint = this.height / 2
          const yPos = midPoint - ((alphaValue * 5) - (betaValue * 3))
          
          // Add to dataPoints array
          this.addDataPoint(yPos)
        }
      }
    },
    
    mounted() {
      // Initialize with flat line
      for (let i = 0; i < this.maxPoints; i++) {
        this.dataPoints.push(this.height / 2)
      }
      
      if (this.active) {
        this.startSimulation()
      }
    },
    
    beforeUnmount() {
      this.stopSimulation()
    },
    
    methods: {
      startSimulation() {
        this.elapsedTime = 0
        
        // Timer for elapsed time
        this.animationInterval = setInterval(() => {
          this.elapsedTime++
          
          // If no data is provided, generate dummy data
          if (!this.parsedData) {
            const time = Date.now() / 1000
            const yPos = (Math.sin(time * 5) * 30) + 
                        (Math.sin(time * 10) * 10) + 
                        (Math.sin(time * 15) * 5) + 
                        (this.height / 2)
            this.addDataPoint(yPos)
          }
        }, 1000)
      },
      
      stopSimulation() {
        if (this.animationInterval) {
          clearInterval(this.animationInterval)
          this.animationInterval = null
        }
        
        // Reset to flat line
        const flatLine = Array(this.maxPoints).fill(this.height / 2)
        this.dataPoints = flatLine
      },
      
      addDataPoint(yPos) {
        // Add new point and remove oldest if exceeding maxPoints
        this.dataPoints.push(yPos)
        if (this.dataPoints.length > this.maxPoints) {
          this.dataPoints.shift()
        }
      }
    }
  }
  </script>
  
  <style>
  .eeg-chart-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    background-color: #000;
    border-radius: 5px;
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;
  }
  
  .eeg-chart {
    background-color: #111;
    border: 1px solid #333;
  }
  
  .grid-line {
    stroke: #333;
    stroke-width: 1;
    stroke-dasharray: 2 2;
  }
  
  .chart-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    padding: 5px;
    background-color: #222;
    border-radius: 3px;
  }
  
  .status-indicator {
    padding: 5px 10px;
    border-radius: 3px;
    font-weight: bold;
    color: #fff;
    background-color: #444;
  }
  
  .status-indicator.active {
    background-color: #f00;
    animation: pulse 1s infinite;
  }
  
  .time-display {
    font-family: monospace;
    font-size: 1.2em;
    color: #0f0;
    background-color: #111;
    padding: 3px 8px;
    border-radius: 3px;
  }
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
  </style>