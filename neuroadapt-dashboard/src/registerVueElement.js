import { defineCustomElement } from 'vue'
import VueEEGChart from './components/VueEEGChart.ce.vue'

// Convert the Vue component to a custom element constructor
const EEGChartElement = defineCustomElement(VueEEGChart)

// Register the custom element with the browser
// After registration, it can be used in the React app as <vue-eeg-chart>
customElements.define('vue-eeg-chart', EEGChartElement)

console.log('Vue EEG Chart custom element registered')