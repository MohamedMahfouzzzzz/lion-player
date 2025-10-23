# LionPlayer - Next-Generation Video Player

LionPlayer is a modern, feature-rich video player built with vanilla JavaScript and CSS. It offers a premium viewing experience with advanced controls, customizable themes, accessibility features, and performance optimizations.

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Configuration Options](#configuration-options)
- [API Methods](#api-methods)
- [Events](#events)
- [Themes](#themes)
- [Accessibility Features](#accessibility-features)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Mobile Gestures](#mobile-gestures)
- [Advanced Features](#advanced-features)
- [Browser Compatibility](#browser-compatibility)
- [Examples](#examples)

## Installation

### CDN
```html
<script src="https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.js"></script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.min.css">
```

### Direct Download
Download the latest release from the [GitHub repository](https://github.com/MohamedMahfouzzzzz/lion-player).

## Basic Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LionPlayer Demo</title>
    <link rel="stylesheet" href="path/to/lion-player.css">
</head>
<body>
    <div id="my-player"></div>
    
    <script src="path/to/lion-player.js"></script>
    <script>
        // Initialize the player
        const player = new LionPlayer('#my-player', {
            src: 'path/to/video.mp4',
            poster: 'path/to/poster.jpg'
        });
    </script>
</body>
</html>
```

## Configuration Options

LionPlayer accepts a wide range of configuration options to customize its behavior and appearance:

```javascript
const player = new LionPlayer('#my-player', {
    // Video source
    src: 'path/to/video.mp4',
    poster: 'path/to/poster.jpg',
    
    // Playback options
    autoplay: false,
    loop: false,
    muted: false,
    preload: 'metadata',
    
    // UI options
    controls: true,
    responsive: true,
    fluid: true,
    width: '100%',
    height: 'auto',
    
    // Playback rates
    playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
    
    // Language
    language: 'en',
    languages: {},
    
    // Premium features
    premiumFeatures: true,
    
    // Buffer settings
    bufferSegments: 50,
    bufferHealthCheckInterval: 1000,
    
    // Theme
    theme: 'dark',
    
    // Accessibility
    accessibility: {
        enabled: true,
        audioDescriptions: false,
        signLanguage: false,
        highContrast: false,
        reducedMotion: false,
        screenReader: true
    },
    
    // Picture-in-Picture
    piP: {
        enabled: true,
        controls: true,
        position: 'bottom-right',
        size: { width: 400, height: 225 }
    },
    
    // Gesture controls
    gestures: {
        enabled: true,
        swipeThreshold: 50,
        doubleTapDelay: 300
    }
});
```

### Option Details

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `src` | string | '' | URL of the video source |
| `poster` | string | '' | URL of the poster image |
| `autoplay` | boolean | false | Whether to autoplay the video |
| `loop` | boolean | false | Whether to loop the video |
| `muted` | boolean | false | Whether to start the video muted |
| `preload` | string | 'metadata' | Preload behavior ('none', 'metadata', 'auto') |
| `controls` | boolean | true | Whether to show controls |
| `responsive` | boolean | true | Whether the player should be responsive |
| `fluid` | boolean | true | Whether the player should maintain aspect ratio |
| `width` | string | '100%' | Width of the player |
| `height` | string | 'auto' | Height of the player |
| `playbackRates` | array | [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] | Available playback rates |
| `language` | string | 'en' | Default language |
| `premiumFeatures` | boolean | true | Whether to enable premium features |
| `bufferSegments` | number | 50 | Number of buffer segments to display |
| `bufferHealthCheckInterval` | number | 1000 | Buffer health check interval in ms |
| `theme` | string | 'dark' | Default theme ('dark', 'light', 'cinema', 'high-contrast') |
| `piP.enabled` | boolean | true | Whether to enable Picture-in-Picture |
| `gestures.enabled` | boolean | true | Whether to enable gesture controls |

## API Methods

LionPlayer provides a comprehensive API for controlling the player programmatically:

### Playback Control

```javascript
// Play the video
player.play();

// Pause the video
player.pause();

// Toggle play/pause
player.togglePlay();

// Skip forward/backward by specified seconds
player.skip(10);  // Skip forward 10 seconds
player.skip(-5);  // Skip backward 5 seconds

// Seek to a specific time (in seconds)
player.setCurrentTime(30);

// Seek to a percentage of the video
player.seekToPercent(50);  // Seek to the middle of the video
```

### Volume Control

```javascript
// Set volume (0.0 to 1.0)
player.setVolume(0.5);

// Adjust volume by delta
player.adjustVolume(0.1);  // Increase volume by 10%
player.adjustVolume(-0.1); // Decrease volume by 10%

// Toggle mute
player.toggleMute();
```

### Playback Rate

```javascript
// Set playback rate
player.setPlaybackRate(1.5);  // Play at 1.5x speed
```

### Fullscreen

```javascript
// Toggle fullscreen
player.toggleFullscreen();

// Request fullscreen
player.requestFullscreen();

// Exit fullscreen
player.exitFullscreen();
```

### Picture-in-Picture

```javascript
// Toggle Picture-in-Picture
player.toggleMiniPlayer();

// Enter PiP mode
player.enterPiP();

// Exit PiP mode
player.exitPiP();
```

### Source Management

```javascript
// Load a new video source
player.loadSource('path/to/new-video.mp4');
```

### Theme and Language

```javascript
// Apply a theme
player.applyTheme('light');

// Apply a language
player.applyLanguage('es');
```

### Utility Methods

```javascript
// Format time in MM:SS or HH:MM:SS format
const formattedTime = player.formatTime(125); // Returns "02:05"

// Destroy the player
player.destroy();
```

## Events

LionPlayer emits various events that you can listen to:

```javascript
// Listen to an event
player.on('play', () => {
    console.log('Video started playing');
});

// Listen to multiple events
player.on(['play', 'pause'], () => {
    console.log('Playback state changed');
});

// One-time event listener
player.one('ended', () => {
    console.log('Video ended');
});

// Remove event listener
const handler = () => console.log('Playing');
player.on('play', handler);
player.off('play', handler);
```

### Available Events

| Event | Description |
|-------|-------------|
| `loaddata` | Fired when the video starts loading data |
| `canplay` | Fired when the video can be played |
| `canplaythrough` | Fired when the video can be played through without stopping |
| `play` | Fired when the video starts playing |
| `pause` | Fired when the video is paused |
| `ended` | Fired when the video ends |
| `seeking` | Fired when seeking to a new position |
| `seeked` | Fired when seeking is complete |
| `timeupdate` | Fired periodically during playback |
| `progress` | Fired when the video is downloading |
| `volumechange` | Fired when the volume changes |
| `resize` | Fired when the player is resized |
| `error` | Fired when an error occurs |
| `fullscreenchange` | Fired when entering/exiting fullscreen |
| `ratechange` | Fired when the playback rate changes |
| `buffering` | Fired when the video starts buffering |
| `bufferfull` | Fired when buffering is complete |
| `networkchange` | Fired when the network state changes |
| `themechange` | Fired when the theme changes |
| `gesture` | Fired when a gesture is detected |
| `resume` | Fired when playback is resumed from a saved position |

## Themes

LionPlayer comes with several built-in themes:

```javascript
// Apply a theme
player.applyTheme('dark');      // Dark theme (default)
player.applyTheme('light');     // Light theme
player.applyTheme('cinema');    // Cinema theme
player.applyTheme('high-contrast'); // High contrast theme
```

### Custom Themes

You can also create custom themes by modifying CSS variables:

```css
.lion-player.my-theme {
    --lion-primary: #your-primary-color;
    --lion-secondary: #your-secondary-color;
    --lion-background: #your-background;
    --lion-surface: #your-surface-color;
    --lion-surface-hover: #your-surface-hover-color;
    --lion-text: #your-text-color;
    --lion-text-secondary: #your-text-secondary-color;
    --lion-controls: #your-controls-color;
    --lion-shadow: #your-shadow;
}
```

## Accessibility Features

LionPlayer includes several accessibility features to ensure an inclusive experience:

```javascript
// Enable accessibility features
const player = new LionPlayer('#my-player', {
    accessibility: {
        enabled: true,
        audioDescriptions: false,
        signLanguage: false,
        highContrast: false,
        reducedMotion: false,
        screenReader: true
    }
});

// Toggle high contrast mode
player.toggleAccessibilityFeature('highContrast');

// Toggle reduced motion
player.toggleAccessibilityFeature('reducedMotion');
```

### ARIA Labels

LionPlayer automatically adds ARIA labels to controls for screen reader compatibility. You can also announce messages to screen readers:

```javascript
// Announce a message to screen readers
player.announce('Video is now playing');
```

## Keyboard Shortcuts

LionPlayer supports several keyboard shortcuts for enhanced usability:

| Key | Action |
|-----|--------|
| Space | Toggle play/pause |
| Arrow Left | Skip backward 5 seconds |
| Arrow Right | Skip forward 5 seconds |
| Arrow Up | Increase volume |
| Arrow Down | Decrease volume |
| F | Toggle fullscreen |
| M | Toggle mute |
| R | Resume from saved position |
| 0-9 | Seek to percentage (0% to 90%) |

## Mobile Gestures

On mobile devices, LionPlayer supports touch gestures:

| Gesture | Action |
|---------|--------|
| Single Tap | Toggle play/pause |
| Double Tap | Toggle play/pause |
| Swipe Left | Skip backward 10 seconds |
| Swipe Right | Skip forward 10 seconds |
| Pinch | Zoom in/out (if enabled) |

## Advanced Features

### Buffer Monitoring

LionPlayer includes advanced buffer monitoring with visual indicators:

```javascript
// Check buffer health
const bufferHealth = player.state.bufferHealth; // 'good', 'medium', 'poor'

// Listen to buffer events
player.on('buffering', () => {
    console.log('Video is buffering');
});

player.on('bufferfull', () => {
    console.log('Buffering complete');
});
```

### Smart Resume

LionPlayer can remember the last watched position and offer to resume:

```javascript
// Check for saved position
player.checkSavedPosition();

// Resume from saved position
player.resumePlayback();

// Save current position
player.savePosition();
```

### Performance Monitoring

LionPlayer includes performance monitoring to track FPS and other metrics:

```javascript
// Get current FPS
const fps = player.performance.fps;

// Listen to performance issues
setInterval(() => {
    if (player.performance.fps < 30) {
        console.warn('Low FPS detected:', player.performance.fps);
    }
}, 1000);
```

## Browser Compatibility

LionPlayer is compatible with all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

Some features may not be available in older browsers:
- Picture-in-Picture: Chrome 70+, Safari 13.1+
- Fullscreen API: All modern browsers
- Video playback: All modern browsers

## Examples

### Basic Player

```html
<div id="basic-player"></div>

<script>
    const player = new LionPlayer('#basic-player', {
        src: 'https://example.com/video.mp4',
        poster: 'https://example.com/poster.jpg'
    });
</script>
```

### Custom Player with Events

```html
<div id="custom-player"></div>
<div id="player-status"></div>

<script>
    const player = new LionPlayer('#custom-player', {
        src: 'https://example.com/video.mp4',
        theme: 'light',
        playbackRates: [0.5, 1, 1.5, 2]
    });
    
    // Update status display
    const statusElement = document.getElementById('player-status');
    
    player.on('play', () => {
        statusElement.textContent = 'Playing';
    });
    
    player.on('pause', () => {
        statusElement.textContent = 'Paused';
    });
    
    player.on('timeupdate', () => {
        const currentTime = player.formatTime(player.state.currentTime);
        const duration = player.formatTime(player.state.duration);
        statusElement.textContent = `${currentTime} / ${duration}`;
    });
</script>
```

### Player with Custom Controls

```html
<div id="player-with-custom-controls"></div>
<div class="custom-controls">
    <button id="play-btn">Play</button>
    <button id="pause-btn">Pause</button>
    <button id="fullscreen-btn">Fullscreen</button>
</div>

<script>
    const player = new LionPlayer('#player-with-custom-controls', {
        src: 'https://example.com/video.mp4',
        controls: false // Hide default controls
    });
    
    // Custom control buttons
    document.getElementById('play-btn').addEventListener('click', () => {
        player.play();
    });
    
    document.getElementById('pause-btn').addEventListener('click', () => {
        player.pause();
    });
    
    document.getElementById('fullscreen-btn').addEventListener('click', () => {
        player.toggleFullscreen();
    });
</script>
```

### Multiple Players on One Page

```html
<div id="player1"></div>
<div id="player2"></div>

<script>
    const player1 = new LionPlayer('#player1', {
        src: 'https://example.com/video1.mp4',
        theme: 'dark'
    });
    
    const player2 = new LionPlayer('#player2', {
        src: 'https://example.com/video2.mp4',
        theme: 'light'
    });
    
    // Pause other players when one starts playing
    player1.on('play', () => {
        player2.pause();
    });
    
    player2.on('play', () => {
        player1.pause();
    });
</script>
```

### Player with Playlist

```html
<div id="playlist-player"></div>
<div class="playlist">
    <div class="playlist-item" data-src="video1.mp4">Video 1</div>
    <div class="playlist-item" data-src="video2.mp4">Video 2</div>
    <div class="playlist-item" data-src="video3.mp4">Video 3</div>
</div>

<script>
    const player = new LionPlayer('#playlist-player', {
        src: 'https://example.com/video1.mp4'
    });
    
    // Playlist functionality
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    playlistItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoSrc = item.dataset.src;
            player.loadSource(`https://example.com/${videoSrc}`);
            player.play();
            
            // Update active item
            playlistItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Auto-play next video when current ends
    player.on('ended', () => {
        const activeItem = document.querySelector('.playlist-item.active');
        if (activeItem) {
            const nextItem = activeItem.nextElementSibling;
            if (nextItem) {
                nextItem.click();
            }
        }
    });
</script>
```


## Support

For support, please open an issue on the [GitHub repository](https://github.com/MohamedMahfouzzzzz/lion-player/issues).
