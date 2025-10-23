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

### Using ES6 Modules (Recommended)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LionPlayer Demo</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.css">
</head>
<body>
    <div id="my-player"></div>
    
    <script type="module">
        import LionPlayer from 'https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.js';
        
        // Initialize the player
        const player = new LionPlayer('#my-player', {
            src: 'path/to/video.mp4',
            poster: 'path/to/poster.jpg'
        });
    </script>
</body>
</html>
```

### Using Traditional Script Tag

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LionPlayer Demo</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.css">
</head>
<body>
    <div id="my-player"></div>
    
    <script src="https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.js"></script>
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

### NPM

```bash
npm install lion-player
```

```javascript
import LionPlayer from 'lion-player';
```

## Basic Usage

### ES6 Module Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LionPlayer Demo</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.css">
</head>
<body>
    <div id="my-player"></div>
    
    <script type="module">
        import LionPlayer from 'https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.js';
        
        // Initialize the player
        const player = new LionPlayer('#my-player', {
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
            autoplay: false,
            controls: true,
            theme: 'dark',
            playbackRates: [0.5, 1, 1.25, 1.5, 2]
        });
        
        // Listen to events
        player.on('play', () => {
            console.log('Video started playing');
        });
        
        player.on('pause', () => {
            console.log('Video paused');
        });
        
        player.on('ended', () => {
            console.log('Video ended');
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
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic LionPlayer</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.css">
</head>
<body>
    <div id="basic-player"></div>
    
    <script type="module">
        import LionPlayer from 'https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.js';
        
        const player = new LionPlayer('#basic-player', {
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'
        });
    </script>
</body>
</html>
```

### Player with Custom Controls

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LionPlayer with Custom Controls</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.css">
    <style>
        .custom-controls {
            margin: 20px 0;
            display: flex;
            gap: 10px;
        }
        .custom-controls button {
            padding: 10px 20px;
            background: #ff0050;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .custom-controls button:hover {
            background: #e60045;
        }
    </style>
</head>
<body>
    <div id="player-with-custom-controls"></div>
    <div class="custom-controls">
        <button id="play-btn">Play</button>
        <button id="pause-btn">Pause</button>
        <button id="fullscreen-btn">Fullscreen</button>
    </div>
    
    <script type="module">
        import LionPlayer from 'https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.js';
        
        const player = new LionPlayer('#player-with-custom-controls', {
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
</body>
</html>
```

### Player with Playlist

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LionPlayer with Playlist</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.css">
    <style>
        .playlist {
            margin: 20px 0;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        .playlist-item {
            padding: 10px 20px;
            background: #333;
            color: white;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s;
        }
        .playlist-item:hover {
            background: #555;
        }
        .playlist-item.active {
            background: #ff0050;
        }
    </style>
</head>
<body>
    <div id="playlist-player"></div>
    <div class="playlist">
        <div class="playlist-item active" data-src="BigBuckBunny.mp4" data-poster="BigBuckBunny.jpg">Big Buck Bunny</div>
        <div class="playlist-item" data-src="ElephantDreams.mp4" data-poster="ElephantDreams.jpg">Elephant Dreams</div>
        <div class="playlist-item" data-src="ForBiggerBlazes.mp4" data-poster="ForBiggerBlazes.jpg">For Bigger Blazes</div>
    </div>
    
    <script type="module">
        import LionPlayer from 'https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.js';
        
        const player = new LionPlayer('#playlist-player', {
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'
        });
        
        // Playlist functionality
        const playlistItems = document.querySelectorAll('.playlist-item');
        const baseUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/';
        
        playlistItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoSrc = item.dataset.src;
                const posterSrc = item.dataset.poster;
                
                player.loadSource(`${baseUrl}${videoSrc}`);
                player.video.poster = `${baseUrl}images/${posterSrc}`;
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
</body>
</html>
```

### Multiple Players on One Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multiple LionPlayers</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.css">
    <style>
        .player-container {
            margin: 20px 0;
        }
        .player-title {
            font-size: 18px;
            margin-bottom: 10px;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="player-container">
        <div class="player-title">Player 1 - Dark Theme</div>
        <div id="player1"></div>
    </div>
    
    <div class="player-container">
        <div class="player-title">Player 2 - Light Theme</div>
        <div id="player2"></div>
    </div>
    
    <script type="module">
        import LionPlayer from 'https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.js';
        
        const player1 = new LionPlayer('#player1', {
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            theme: 'dark'
        });
        
        const player2 = new LionPlayer('#player2', {
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantDreams.mp4',
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
</body>
</html>
```

### Player with Event Monitoring

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LionPlayer Event Monitoring</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.css">
    <style>
        .event-log {
            margin: 20px 0;
            padding: 15px;
            background: #f5f5f5;
            border-radius: 5px;
            max-height: 200px;
            overflow-y: auto;
        }
        .event-item {
            padding: 5px 0;
            border-bottom: 1px solid #ddd;
            font-family: monospace;
            font-size: 14px;
        }
        .event-time {
            color: #666;
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <div id="event-player"></div>
    <div class="event-log" id="event-log"></div>
    
    <script type="module">
        import LionPlayer from 'https://cdn.jsdelivr.net/gh/MohamedMahfouzzzzz/lion-player/lionplayer.js';
        
        const player = new LionPlayer('#event-player', {
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        });
        
        const eventLog = document.getElementById('event-log');
        
        function logEvent(eventName, data) {
            const time = new Date().toLocaleTimeString();
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';
            eventItem.innerHTML = `<span class="event-time">[${time}]</span> ${eventName}: ${JSON.stringify(data)}`;
            eventLog.appendChild(eventItem);
            eventLog.scrollTop = eventLog.scrollHeight;
        }
        
        // Listen to various events
        player.on('loaddata', () => logEvent('loaddata'));
        player.on('canplay', () => logEvent('canplay'));
        player.on('play', () => logEvent('play'));
        player.on('pause', () => logEvent('pause'));
        player.on('ended', () => logEvent('ended'));
        player.on('seeking', (e) => logEvent('seeking', { currentTime: player.state.currentTime }));
        player.on('seeked', (e) => logEvent('seeked', { currentTime: player.state.currentTime }));
        player.on('timeupdate', () => {
            // Throttle timeupdate events
            if (!player.lastTimeUpdate || Date.now() - player.lastTimeUpdate > 1000) {
                logEvent('timeupdate', { 
                    currentTime: player.formatTime(player.state.currentTime),
                    duration: player.formatTime(player.state.duration)
                });
                player.lastTimeUpdate = Date.now();
            }
        });
        player.on('volumechange', () => logEvent('volumechange', { volume: player.state.volume }));
        player.on('buffering', () => logEvent('buffering'));
        player.on('bufferfull', () => logEvent('bufferfull'));
        player.on('error', (e) => logEvent('error', e));
    </script>
</body>
</html>
```


## Support

For support, please open an issue on the [GitHub repository](https://github.com/MohamedMahfouzzzzz/lion-player/issues).
