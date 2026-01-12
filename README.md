# Video Conference Grid

Responsive video conference layout with grid-based participant cards, overlay icons, and control bar.

## Features

- **Responsive Grid Layout**: 2 columns on mobile, 3 columns on desktop (md+)
- **Overlay Icons**: Mute icons anchored to video container corners (not screen)
- **Speaking Indicator**: Green border highlight for active speaker
- **Control Bar**: Bottom control bar with microphone, video, end call, and participants buttons
- **Participant Cards**: Each with name label, initials placeholder, and status indicators

## Project Setup

```bash
npm install
npm run dev      # Start development server
npm run build    # Build for production
```

## Project Structure

- `src/App.jsx` - Main application component with video grid
- `src/index.css` - Tailwind CSS imports
- `index.html` - Entry HTML file
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration

## Rationale

This layout focuses on:
1. **Responsive Aspect Ratios** - Cards scale properly across different screen sizes
2. **Overlay Icons** - Mute icons are positioned relative to the video container, not the screen
3. **Video Grid Simulation** - Simulates a grid of webcam feeds with proper positioning

This design ensures that UI elements like mute icons stay anchored to their respective video containers during responsive transitions.
