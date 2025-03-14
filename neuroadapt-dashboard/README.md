# NeuroAdapt Dashboard

A frontend dashboard for neurological disorder diagnosis and mental health/stress detection using EEG data.

## Features

- Real-time EEG data visualization
- Patient information management
- Stress level monitoring
- Mental health assessment
- Vue custom element integration for EEG chart visualization

## Technology Stack

- React (UI framework)
- Vite (Build tool)
- Vue 3 (Custom elements for EEG chart)

## Project Structure

```
neuroadapt-dashboard/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── VueEEGChart.ce.vue     // Vue component as custom element
│   ├── App.jsx
│   ├── main.jsx
│   └── registerVueElement.js      // Registers the Vue custom element
├── .gitignore
├── eslint.config.js
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or later)
- npm (v7.0.0 or later)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/neuroadapt-dashboard.git
cd neuroadapt-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Vue Custom Element Integration

This project demonstrates the integration of Vue 3 components as custom elements within a React application. The EEG chart visualization is built as a Vue component and compiled as a web component using Vue's custom element support.

## License

MIT