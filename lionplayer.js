/**
 * LionPlayer - Next-Generation Video Player
 * Simplified with Speed-Only Settings
 */

'use strict';

// Default configuration
const DEFAULT_CONFIG = {
    src: '',
    poster: '',
    autoplay: false,
    loop: false,
    muted: false,
    preload: 'metadata',
    controls: true,
    responsive: true,
    fluid: true,
    playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
    plugins: {},
    language: 'en',
    languages: {},
    techOrder: ['html5'],
    width: '100%',
    height: 'auto',
    premiumFeatures: true,
    bufferSegments: 50,
    bufferHealthCheckInterval: 1000,
    theme: 'dark',
    accessibility: {
        enabled: true,
        audioDescriptions: false,
        signLanguage: false,
        highContrast: false,
        reducedMotion: false,
        screenReader: true
    },
    piP: {
        enabled: true,
        controls: true,
        position: 'bottom-right',
        size: { width: 400, height: 225 }
    },
    gestures: {
        enabled: true,
        swipeThreshold: 50,
        doubleTapDelay: 300
    }
};

// Event types
const EVENTS = {
    LOADDATA: 'loaddata',
    CANPLAY: 'canplay',
    CANPLAYTHROUGH: 'canplaythrough',
    PLAY: 'play',
    PAUSE: 'pause',
    ENDED: 'ended',
    SEEKING: 'seeking',
    SEEKED: 'seeked',
    TIMEUPDATE: 'timeupdate',
    PROGRESS: 'progress',
    VOLUMECHANGE: 'volumechange',
    RESIZE: 'resize',
    ERROR: 'error',
    FULLSCREENCHANGE: 'fullscreenchange',
    RATECHANGE: 'ratechange',
    BUFFERING: 'buffering',
    BUFFERFULL: 'bufferfull',
    NETWORKCHANGE: 'networkchange',
    THEMECHANGE: 'themechange',
    GESTURE: 'gesture',
    RESUME: 'resume'
};

/**
 * LionPlayer Class with Premium Features
 */
class LionPlayer {
    constructor(element, options = {}) {
        // Handle element parameter
        if (typeof element === 'string') {
            this.el = document.querySelector(element);
            if (!this.el) {
                throw new Error(`LionPlayer: Element with selector "${element}" not found`);
            }
        } else if (element instanceof HTMLElement) {
            this.el = element;
        } else {
            throw new Error('LionPlayer: Invalid element parameter');
        }

        // Merge options with defaults
        this.config = Object.assign({}, DEFAULT_CONFIG, options);
        
        // Initialize state
        this.state = {
            isReady: false,
            isPlaying: false,
            isPaused: true,
            isEnded: false,
            isSeeking: false,
            isFullscreen: false,
            currentTime: 0,
            duration: 0,
            volume: this.config.muted ? 0 : 1,
            buffered: 0,
            playbackRate: 1,
            networkState: 0,
            readyState: 0,
            quality: 'auto',
            speed: 1,
            controlsVisible: true,
            isUserActive: true,
            userActivityTimeout: null,
            isBuffering: false,
            bufferHealth: 'good',
            networkStatus: 'idle',
            bufferSegments: [],
            lastBufferTime: 0,
            bufferCheckInterval: null,
            theme: this.config.theme,
            currentLanguage: this.config.language,
            resumePosition: 0,
            gestures: {
                lastTap: 0,
                touchStartX: 0,
                touchStartY: 0,
                touchStartTime: 0,
                pinchDistance: 0
            }
        };

        // Event listeners storage
        this.eventListeners = {};
        
        // Performance monitoring
        this.performance = {
            frames: 0,
            lastFrameTime: performance.now(),
            fps: 0,
            bufferEvents: 0,
            seekEvents: 0
        };
        
        // Initialize player
        this.init();
    }

    /**
     * Initialize the player with premium features
     */
    init() {
        // Create player structure
        this.createPlayerStructure();
        
        // Create video element
        this.createVideoElement();
        
        // Create controls
        if (this.config.controls) {
            this.createControls();
        }
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Setup premium features
        if (this.config.premiumFeatures) {
            this.setupPremiumFeatures();
        }
        
        // Setup buffer monitoring
        this.setupBufferMonitoring();
        
        // Setup theme system
        this.setupThemeSystem();
        
        // Setup accessibility features
        this.setupAccessibilityFeatures();
        
        // Setup multi-language support
        this.setupMultiLanguageSupport();
        
        // Setup PiP enhancements
        this.setupPiPEnhancements();
        
        // Setup gesture controls
        this.setupGestureControls();
        
        // Setup smart resume
        this.setupSmartResume();
        
        // Load video source
        if (this.config.src) {
            this.loadSource(this.config.src);
        }
        
        // Set dimensions
        this.setDimensions();
        
        // Start performance monitoring
        this.startPerformanceMonitoring();
        
        // Mark as ready
        this.state.isReady = true;
        this.trigger(EVENTS.CANPLAY);
    }

    /**
     * Setup theme system
     */
    setupThemeSystem() {
        // Apply initial theme
        this.applyTheme(this.state.theme);
        
        // Create theme switcher
        this.createThemeSwitcher();
    }

    /**
     * Apply theme to player
     */
    applyTheme(themeName) {
        const themes = {
            dark: {
                primary: '#ff0050',
                secondary: '#00d4ff',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
                surface: 'rgba(255, 255, 255, 0.05)',
                surfaceHover: 'rgba(255, 255, 255, 0.1)',
                text: '#ffffff',
                textSecondary: 'rgba(255, 255, 255, 0.7)',
                controls: 'rgba(10, 10, 10, 0.95)',
                shadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
            },
            light: {
                primary: '#ff0050',
                secondary: '#00d4ff',
                background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                surface: 'rgba(0, 0, 0, 0.05)',
                surfaceHover: 'rgba(0, 0, 0, 0.1)',
                text: '#000000',
                textSecondary: 'rgba(0, 0, 0, 0.7)',
                controls: 'rgba(255, 255, 255, 0.95)',
                shadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            },
            cinema: {
                primary: '#ff0050',
                secondary: '#00d4ff',
                background: '#000000',
                surface: 'rgba(255, 255, 255, 0.03)',
                surfaceHover: 'rgba(255, 255, 255, 0.08)',
                text: '#ffffff',
                textSecondary: 'rgba(255, 255, 255, 0.6)',
                controls: 'rgba(0, 0, 0, 0.8)',
                shadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
            },
            'high-contrast': {
                primary: '#ff0050',
                secondary: '#00d4ff',
                background: '#000000',
                surface: 'rgba(255, 255, 255, 0.1)',
                surfaceHover: 'rgba(255, 255, 255, 0.2)',
                text: '#ffffff',
                textSecondary: '#ffffff',
                controls: 'rgba(0, 0, 0, 0.9)',
                shadow: '0 8px 32px rgba(255, 255, 255, 0.2)'
            }
        };
        
        const theme = themes[themeName] || themes.dark;
        
        // Apply theme variables
        this.el.style.setProperty('--lion-primary', theme.primary);
        this.el.style.setProperty('--lion-secondary', theme.secondary);
        this.el.style.setProperty('--lion-background', theme.background);
        this.el.style.setProperty('--lion-surface', theme.surface);
        this.el.style.setProperty('--lion-surface-hover', theme.surfaceHover);
        this.el.style.setProperty('--lion-text', theme.text);
        this.el.style.setProperty('--lion-text-secondary', theme.textSecondary);
        this.el.style.setProperty('--lion-controls', theme.controls);
        this.el.style.setProperty('--lion-shadow', theme.shadow);
        
        // Update theme state
        this.state.theme = themeName;
        
        // Update theme switcher
        if (this.themeSwitcher) {
            this.themeSwitcher.value = themeName;
        }
        
        // Trigger theme change event
        this.trigger(EVENTS.THEMECHANGE, { theme: themeName });
    }

    /**
     * Create theme switcher
     */
    createThemeSwitcher() {
        // Add theme switcher to settings menu

    }

    /**
     * Setup accessibility features
     */
    setupAccessibilityFeatures() {
        if (!this.config.accessibility.enabled) return;
        
        // Add accessibility options to settings

        
        // Apply initial accessibility settings
        this.applyAccessibilitySettings();
    }

    /**
     * Apply accessibility settings
     */
    applyAccessibilitySettings() {
        const { accessibility } = this.config;
        
        if (accessibility.highContrast) {
            this.applyTheme('high-contrast');
        }
        
        if (accessibility.reducedMotion) {
            this.el.style.setProperty('--lion-transition', 'none');
            this.el.style.setProperty('--lion-transition-fast', 'none');
        }
        
        // Add ARIA labels
        this.addARIALabels();
    }

    /**
     * Add ARIA labels for screen readers
     */
    addARIALabels() {
        if (!this.config.accessibility.screenReader) return;
        
        this.video.setAttribute('role', 'application');
        this.video.setAttribute('aria-label', 'Video player');
        
        // Add live region for status updates
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'lion-player-live-region';
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-9999px';
        this.container.appendChild(liveRegion);
        
        this.liveRegion = liveRegion;
    }

    /**
     * Announce to screen reader
     */
    announce(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
        }
    }

    /**
     * Setup multi-language support
     */
    setupMultiLanguageSupport() {
        // Add language switcher to settings

        
        // Apply initial language
        this.applyLanguage(this.state.currentLanguage);
    }

    /**
     * Apply language to UI
     */
    applyLanguage(lang) {
        const translations = {
            en: {
                play: 'Play',
                pause: 'Pause',
                mute: 'Mute',
                unmute: 'Unmute',
                fullscreen: 'Fullscreen',
                exitFullscreen: 'Exit Fullscreen',
                settings: 'Settings',
                pip: 'Picture in Picture',
                speed: 'Speed',
                resume: 'Resume'
            },
            es: {
                play: 'Reproducir',
                pause: 'Pausar',
                mute: 'Silenciar',
                unmute: 'Activar sonido',
                fullscreen: 'Pantalla completa',
                exitFullscreen: 'Salir de pantalla completa',
                settings: 'Configuración',
                pip: 'Imagen en imagen',
                speed: 'Velocidad',
                resume: 'Reanudar'
            },
            fr: {
                play: 'Lire',
                pause: 'Pause',
                mute: 'Couper le son',
                unmute: 'Activer le son',
                fullscreen: 'Plein écran',
                exitFullscreen: 'Quitter le plein écran',
                settings: 'Paramètres',
                pip: 'Image dans image',
                speed: 'Vitesse',
                resume: 'Reprendre'
            },
            de: {
                play: 'Abspielen',
                pause: 'Pause',
                mute: 'Stumm',
                unmute: 'Ton ein',
                fullscreen: 'Vollbild',
                exitFullscreen: 'Vollbild beenden',
                settings: 'Einstellungen',
                pip: 'Bild-in-Bild',
                speed: 'Geschwindigkeit',
                resume: 'Fortsetzen'
            },
            ja: {
                play: '再生',
                pause: '一時停止',
                mute: 'ミュート',
                unmute: 'ミュート解除',
                fullscreen: 'フルスクリーン',
                exitFullscreen: 'フルスクリーン終了',
                settings: '設定',
                pip: 'ピクチャーインピクチャー',
                speed: '速度',
                resume: '再開'
            },
            zh: {
                play: '播放',
                pause: '暂停',
                mute: '静音',
                unmute: '取消静音',
                fullscreen: '全屏',
                exitFullscreen: '退出全屏',
                settings: '设置',
                pip: '画中画',
                speed: '速度',
                resume: '恢复'
            }
        };
        
        const texts = translations[lang] || translations.en;
        
        // Update UI text
        this.updateUIText(texts);
        
        // Update language state
        this.state.currentLanguage = lang;
    }

    /**
     * Update UI text with translations
     */
    updateUIText(texts) {
        // Update button labels
        if (this.playButton) {
            this.playButton.setAttribute('aria-label', texts.play);
        }
        
        if (this.volumeButton) {
            this.volumeButton.setAttribute('aria-label', texts.mute);
        }
        
        if (this.fullscreenButton) {
            this.fullscreenButton.setAttribute('aria-label', texts.fullscreen);
        }
        
        if (this.settingsButton) {
            this.settingsButton.setAttribute('aria-label', texts.settings);
        }
        
        // Update other UI elements as needed
    }

    /**
     * Setup PiP enhancements
     */
    setupPiPEnhancements() {
        if (!this.config.piP.enabled) return;
        
        // Create custom PiP controls
        this.createPiPControls();
        
        // Listen for PiP events
        this.video.addEventListener('enterpictureinpicture', () => {
            this.onPiPEnter();
        });
        
        this.video.addEventListener('leavepictureinpicture', () => {
            this.onPiPLeave();
        });
    }

    /**
     * Create custom PiP controls
     */
    createPiPControls() {
        // Create PiP container
        this.pipContainer = document.createElement('div');
        this.pipContainer.className = 'lion-player-pip-container';
        this.pipContainer.style.position = 'fixed';
        this.pipContainer.style.bottom = '20px';
        this.pipContainer.style.right = '20px';
        this.pipContainer.style.width = `${this.config.piP.size.width}px`;
        this.pipContainer.style.height = `${this.config.piP.size.height}px`;
        this.pipContainer.style.background = '#000';
        this.pipContainer.style.borderRadius = '8px';
        this.pipContainer.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        this.pipContainer.style.zIndex = '9999';
        this.pipContainer.style.display = 'none';
        this.pipContainer.style.overflow = 'hidden';
        
        // Create PiP video
        this.pipVideo = document.createElement('video');
        this.pipVideo.style.width = '100%';
        this.pipVideo.style.height = '100%';
        this.pipVideo.style.objectFit = 'contain';
        this.pipVideo.muted = true;
        this.pipContainer.appendChild(this.pipVideo);
        
        // Create PiP controls
        if (this.config.piP.controls) {
            this.createPiPControlBar();
        }
        
        // Add to document
        document.body.appendChild(this.pipContainer);
    }

    /**
     * Create PiP control bar
     */
    createPiPControlBar() {
        const controlBar = document.createElement('div');
        controlBar.className = 'lion-player-pip-controls';
        controlBar.style.position = 'absolute';
        controlBar.style.bottom = '0';
        controlBar.style.left = '0';
        controlBar.style.right = '0';
        controlBar.style.height = '40px';
        controlBar.style.background = 'rgba(0, 0, 0, 0.7)';
        controlBar.style.display = 'flex';
        controlBar.style.alignItems = 'center';
        controlBar.style.justifyContent = 'space-between';
        controlBar.style.padding = '0 10px';
        
        // Play/pause button
        const playBtn = document.createElement('button');
        playBtn.innerHTML = '▶';
        playBtn.style.color = '#fff';
        playBtn.style.background = 'none';
        playBtn.style.border = 'none';
        playBtn.style.fontSize = '16px';
        playBtn.style.cursor = 'pointer';
        playBtn.addEventListener('click', () => this.togglePlay());
        controlBar.appendChild(playBtn);
        
        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.color = '#fff';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.fontSize = '16px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.addEventListener('click', () => this.exitPiP());
        controlBar.appendChild(closeBtn);
        
        this.pipContainer.appendChild(controlBar);
    }

    /**
     * Enter PiP mode
     */
    enterPiP() {
        if (!this.config.piP.enabled) return;
        
        // Show PiP container
        this.pipContainer.style.display = 'block';
        
        // Sync video sources
        this.pipVideo.src = this.video.src;
        this.pipVideo.currentTime = this.video.currentTime;
        
        // Play PiP video if main video is playing
        if (this.state.isPlaying) {
            this.pipVideo.play();
        }
        
        // Hide main video controls
        this.controls.style.opacity = '0';
    }

    /**
     * Exit PiP mode
     */
    exitPiP() {
        if (!this.config.piP.enabled) return;
        
        // Hide PiP container
        this.pipContainer.style.display = 'none';
        
        // Pause PiP video
        this.pipVideo.pause();
        
        // Show main video controls
        this.controls.style.opacity = '1';
    }

    /**
     * Handle PiP enter
     */
    onPiPEnter() {
        this.el.classList.add('pip-mode');
        this.announce('Picture in Picture mode activated');
    }

    /**
     * Handle PiP leave
     */
    onPiPLeave() {
        this.el.classList.remove('pip-mode');
        this.announce('Picture in Picture mode deactivated');
    }

    /**
     * Setup gesture controls
     */
    setupGestureControls() {
        if (!this.config.gestures.enabled) return;
        
        // Touch events for mobile
        this.video.addEventListener('touchstart', (e) => this.onTouchStart(e));
        this.video.addEventListener('touchmove', (e) => this.onTouchMove(e));
        this.video.addEventListener('touchend', (e) => this.onTouchEnd(e));
        
        // Mouse events for desktop
        this.video.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.video.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.video.addEventListener('mouseup', (e) => this.onMouseUp(e));
    }

    /**
     * Handle touch start
     */
    onTouchStart(e) {
        const touch = e.touches[0];
        this.state.gestures.touchStartX = touch.clientX;
        this.state.gestures.touchStartY = touch.clientY;
        this.state.gestures.touchStartTime = Date.now();
    }

    /**
     * Handle touch move
     */
    onTouchMove(e) {
        e.preventDefault();
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - this.state.gestures.touchStartX;
        const deltaY = touch.clientY - this.state.gestures.touchStartY;
        
        // Handle pan when zoomed
        if (this.state.zoom > 1) {
            this.setPan(this.state.panX + deltaX, this.state.panY + deltaY);
            this.state.gestures.touchStartX = touch.clientX;
            this.state.gestures.touchStartY = touch.clientY;
        }
    }

    /**
     * Handle touch end
     */
    onTouchEnd(e) {
        const touchEndTime = Date.now();
        const deltaTime = touchEndTime - this.state.gestures.touchStartTime;
        
        // Handle double tap
        if (deltaTime < this.config.gestures.doubleTapDelay) {
            if (this.state.gestures.lastTap && (touchEndTime - this.state.gestures.lastTap) < this.config.gestures.doubleTapDelay) {
                this.togglePlay();
                this.state.gestures.lastTap = 0;
            } else {
                this.state.gestures.lastTap = touchEndTime;
            }
        }
        
        // Handle swipe
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - this.state.gestures.touchStartX;
        const deltaY = touch.clientY - this.state.gestures.touchStartY;
        
        if (Math.abs(deltaX) > this.config.gestures.swipeThreshold && Math.abs(deltaY) < 50) {
            if (deltaX > 0) {
                this.skip(10);
                this.trigger(EVENTS.GESTURE, { type: 'swipeRight', value: 10 });
            } else {
                this.skip(-10);
                this.trigger(EVENTS.GESTURE, { type: 'swipeLeft', value: -10 });
            }
        }
    }

    /**
     * Handle mouse down
     */
    onMouseDown(e) {
        if (this.state.zoom > 1) {
            this.state.isDragging = true;
            this.state.dragStartX = e.clientX - this.state.panX;
            this.state.dragStartY = e.clientY - this.state.panY;
            this.video.style.cursor = 'grabbing';
        }
    }

    /**
     * Handle mouse move
     */
    onMouseMove(e) {
        if (this.state.isDragging && this.state.zoom > 1) {
            this.setPan(e.clientX - this.state.dragStartX, e.clientY - this.state.dragStartY);
        }
    }

    /**
     * Handle mouse up
     */
    onMouseUp(e) {
        this.state.isDragging = false;
        this.video.style.cursor = this.state.zoom > 1 ? 'grab' : 'default';
    }

    /**
     * Setup smart resume
     */
    setupSmartResume() {
        // Add resume button to controls
        this.resumeButton = this.createButton('resume', 'Resume', () => this.resumePlayback());
        this.controlsLeft.appendChild(this.resumeButton);
        
        // Initially hide resume button
        this.resumeButton.style.display = 'none';
        
        // Check for saved position on load
        this.checkSavedPosition();
    }

    /**
     * Check for saved position
     */
    checkSavedPosition() {
        // In a real implementation, you would fetch this from a server or local storage
        // For demo purposes, we'll use a simple approach
        const videoId = this.getVideoId();
        const savedPosition = localStorage.getItem(`lion-player-resume-${videoId}`);
        
        if (savedPosition) {
            this.state.resumePosition = parseFloat(savedPosition);
            
            // Show resume button if there's a saved position
            if (this.state.resumePosition > 10) { // Only show if more than 10 seconds
                this.resumeButton.style.display = 'flex';
            }
        }
    }

    /**
     * Get video ID for resume functionality
     */
    getVideoId() {
        // Create a simple ID from the video source
        return btoa(this.video.src).replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);
    }

    /**
     * Resume playback from saved position
     */
    resumePlayback() {
        if (this.state.resumePosition > 0) {
            this.video.currentTime = this.state.resumePosition;
            this.play();
            this.resumeButton.style.display = 'none';
            this.announce(`Resuming from ${this.formatTime(this.state.resumePosition)}`);
            this.trigger(EVENTS.RESUME, { position: this.state.resumePosition });
        }
    }

    /**
     * Save current position
     */
    savePosition() {
        if (this.video.currentTime > 10) { // Only save if more than 10 seconds
            const videoId = this.getVideoId();
            localStorage.setItem(`lion-player-resume-${videoId}`, this.video.currentTime.toString());
        }
    }

    /**
     * Create player structure with premium elements
     */
    createPlayerStructure() {
        // Clear existing content
        this.el.innerHTML = '';
        
        // Add player class
        this.el.classList.add('lion-player');
        
        // Create container
        this.container = document.createElement('div');
        this.container.className = 'lion-player-container';
        this.el.appendChild(this.container);
        
        // Create video wrapper
        this.videoWrapper = document.createElement('div');
        this.videoWrapper.className = 'lion-player-video-wrapper';
        this.container.appendChild(this.videoWrapper);
        
        // Create premium loading spinner
        this.loadingSpinner = document.createElement('div');
        this.loadingSpinner.className = 'lion-player-loading';
        this.loadingSpinner.innerHTML = `
            <div class="lion-player-spinner">
                <div class="lion-player-spinner-inner"></div>
            </div>
            <div class="lion-player-loading-text">
                <span class="loading-percentage">0%</span>
                <span class="loading-status">Loading...</span>
            </div>
        `;
        this.videoWrapper.appendChild(this.loadingSpinner);
        
        // Create buffer health indicator
        this.bufferHealthIndicator = document.createElement('div');
        this.bufferHealthIndicator.className = 'lion-player-buffer-health';
        this.bufferHealthIndicator.innerHTML = `
            <div class="status-dot"></div>
            Buffer: Good
        `;
        this.videoWrapper.appendChild(this.bufferHealthIndicator);
        
        // Create premium big play button
        this.bigPlayButton = document.createElement('div');
        this.bigPlayButton.className = 'lion-player-big-play-button';
        this.bigPlayButton.innerHTML = '<div class="lion-player-big-play-icon"></div>';
        this.videoWrapper.appendChild(this.bigPlayButton);
        
        // Create error display
        this.errorDisplay = document.createElement('div');
        this.errorDisplay.className = 'lion-player-error-display';
        this.errorDisplay.style.display = 'none';
        this.videoWrapper.appendChild(this.errorDisplay);
    }

    /**
     * Create video element
     */
    createVideoElement() {
        this.video = document.createElement('video');
        this.video.className = 'lion-player-video';
        
        // Set video attributes
        this.video.setAttribute('preload', this.config.preload);
        this.video.setAttribute('playsinline', '');
        this.video.setAttribute('webkit-playsinline', '');
        this.video.setAttribute('x-webkit-airplay', 'allow');
        
        if (this.config.poster) {
            this.video.setAttribute('poster', this.config.poster);
        }
        
        if (this.config.muted) {
            this.video.muted = true;
        }
        
        if (this.config.loop) {
            this.video.loop = true;
        }
        
        // Add to DOM
        this.videoWrapper.appendChild(this.video);
    }

    /**
     * Create controls with premium design
     */
    createControls() {
        // Create controls container
        this.controls = document.createElement('div');
        this.controls.className = 'lion-player-controls';
        this.container.appendChild(this.controls);
        
        // Create progress bar
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'lion-player-progress-bar';
        this.controls.appendChild(this.progressBar);
        
        this.progressFilled = document.createElement('div');
        this.progressFilled.className = 'lion-player-progress-filled';
        this.progressBar.appendChild(this.progressFilled);
        
        this.progressBuffered = document.createElement('div');
        this.progressBuffered.className = 'lion-player-progress-buffered';
        this.progressBar.appendChild(this.progressBuffered);
        
        // Create time tooltip
        this.timeTooltip = document.createElement('div');
        this.timeTooltip.className = 'lion-player-time-tooltip';
        this.progressBar.appendChild(this.timeTooltip);
        
        // Create controls bar
        this.controlsBar = document.createElement('div');
        this.controlsBar.className = 'lion-player-controls-bar';
        this.controls.appendChild(this.controlsBar);
        
        // Create left controls container
        this.controlsLeft = document.createElement('div');
        this.controlsLeft.className = 'lion-player-controls-left';
        this.controlsBar.appendChild(this.controlsLeft);
        
        // Create right controls container
        this.controlsRight = document.createElement('div');
        this.controlsRight.className = 'lion-player-controls-right';
        this.controlsBar.appendChild(this.controlsRight);
        
        // Create premium play/pause button
        this.playButton = this.createButton('play', 'Play', () => this.togglePlay(), true);
        this.controlsLeft.appendChild(this.playButton);
        
        // Create volume control
        this.volumeControl = document.createElement('div');
        this.volumeControl.className = 'lion-player-volume-control';
        this.controlsLeft.appendChild(this.volumeControl);
        
        this.volumeButton = this.createButton('volume-up', 'Mute', () => this.toggleMute());
        this.volumeControl.appendChild(this.volumeButton);
        
        this.volumeSlider = document.createElement('input');
        this.volumeSlider.className = 'lion-player-volume-slider';
        this.volumeSlider.setAttribute('type', 'range');
        this.volumeSlider.setAttribute('min', '0');
        this.volumeSlider.setAttribute('max', '1');
        this.volumeSlider.setAttribute('step', '0.05');
        this.volumeSlider.setAttribute('value', '1');
        this.volumeControl.appendChild(this.volumeSlider);
        
        // Create time display
        this.timeDisplay = document.createElement('div');
        this.timeDisplay.className = 'lion-player-time-display';
        this.timeDisplay.innerHTML = '00:00 / 00:00';
        this.controlsLeft.appendChild(this.timeDisplay);
        
        // Create settings button
        this.settingsButton = this.createButton('settings', 'Settings', () => this.toggleSettings());
        this.controlsRight.appendChild(this.settingsButton);
        
        // Create mini player button
        this.miniPlayerButton = this.createButton('pip', 'Mini Player', () => this.toggleMiniPlayer());
        this.controlsRight.appendChild(this.miniPlayerButton);
        
        // Create fullscreen button
        this.fullscreenButton = this.createButton('fullscreen', 'Fullscreen', () => this.toggleFullscreen());
        this.controlsRight.appendChild(this.fullscreenButton);
        
        // Create settings menu
        this.createSettingsMenu();
    }

    /**
     * Create premium button with SVG icon
     */
    createButton(icon, label, onClick, isPlayButton = false) {
        const button = document.createElement('button');
        button.className = `lion-player-button ${isPlayButton ? 'lion-player-play-button' : ''}`;
        button.setAttribute('type', 'button');
        button.setAttribute('aria-label', label);
        
        // Create SVG icon
        const svg = this.createSVGIcon(icon);
        button.appendChild(svg);
        
        // Add click handler
        button.addEventListener('click', onClick);
        
        return button;
    }

    /**
     * Create SVG icon
     */
    createSVGIcon(type) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'lion-player-icon');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'currentColor');
        
        const paths = {
            play: 'M8 5v14l11-7z',
            pause: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z',
            'volume-up': 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z',
            'volume-down': 'M7 9v6h4l5 5V4l-5 5H7z',
            'volume-mute': 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z',
            settings: 'M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z',
            pip: 'M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z',
            fullscreen: 'M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z',
            resume: 'M8 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6z'
        };
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', paths[type] || paths.play);
        svg.appendChild(path);
        
        return svg;
    }

    /**
     * Create settings menu
     */
    createSettingsMenu() {
        this.settingsMenu = document.createElement('div');
        this.settingsMenu.className = 'lion-player-settings-menu';
        
        // Playback speed options
        this.addSettingsItem('Speed', 'speed', [
            { label: '0.25x', value: '0.25' },
            { label: '0.5x', value: '0.5' },
            { label: '0.75x', value: '0.75' },
            { label: 'Normal', value: '1' },
            { label: '1.25x', value: '1.25' },
            { label: '1.5x', value: '1.5' },
            { label: '1.75x', value: '1.75' },
            { label: '2x', value: '2' }
        ]);
        
        this.container.appendChild(this.settingsMenu);
    }

    /**
     * Add settings item with animation
     */
    addSettingsItem(title, type, options) {
        const itemTitle = document.createElement('div');
        itemTitle.className = 'lion-player-settings-item';
        itemTitle.textContent = title;
        this.settingsMenu.appendChild(itemTitle);
        
        options.forEach((option, index) => {
            const item = document.createElement('div');
            item.className = 'lion-player-settings-item';
            item.textContent = option.label;
            item.dataset[type] = option.value;
            item.style.animationDelay = `${index * 50}ms`;
            
            if (option.value === this.state[type]) {
                item.classList.add('active');
            }
            
            item.addEventListener('click', () => {
                this.handleSettingsChange(type, option.value);
            });
            
            this.settingsMenu.appendChild(item);
        });
    }

    /**
     * Handle settings change with animation
     */
    handleSettingsChange(type, value) {
        // Update state
        this.state[type] = value;
        
        // Update active class with animation
        const items = this.settingsMenu.querySelectorAll(`[data-${type}]`);
        items.forEach(item => {
            item.classList.remove('active');
            if (item.dataset[type] === value) {
                setTimeout(() => item.classList.add('active'), 50);
            }
        });
        
        // Apply changes
        switch (type) {
            case 'theme':
                this.applyTheme(value);
                break;
            case 'language':
                this.applyLanguage(value);
                break;
            case 'speed':
                this.setPlaybackRate(parseFloat(value));
                break;
            case 'accessibility':
                this.toggleAccessibilityFeature(value);
                break;
        }
    }

    /**
     * Toggle accessibility feature
     */
    toggleAccessibilityFeature(feature) {
        switch (feature) {
            case 'highContrast':
                this.applyTheme('high-contrast');
                break;
            case 'reducedMotion':
                this.el.style.setProperty('--lion-transition', 'none');
                this.el.style.setProperty('--lion-transition-fast', 'none');
                break;
            // Handle other accessibility features
        }
    }

    /**
     * Setup event listeners with premium features
     */
    setupEventListeners() {
        // Video events
        this.video.addEventListener('loadstart', () => this.onLoadStart());
        this.video.addEventListener('loadeddata', () => this.onLoadedData());
        this.video.addEventListener('canplay', () => this.onCanPlay());
        this.video.addEventListener('canplaythrough', () => this.onCanPlayThrough());
        this.video.addEventListener('play', () => this.onPlay());
        this.video.addEventListener('pause', () => this.onPause());
        this.video.addEventListener('ended', () => this.onEnded());
        this.video.addEventListener('seeking', () => this.onSeeking());
        this.video.addEventListener('seeked', () => this.onSeeked());
        this.video.addEventListener('timeupdate', () => this.onTimeUpdate());
        this.video.addEventListener('progress', () => this.onProgress());
        this.video.addEventListener('volumechange', () => this.onVolumeChange());
        this.video.addEventListener('ratechange', () => this.onRateChange());
        this.video.addEventListener('waiting', () => this.onWaiting());
        this.video.addEventListener('stalled', () => this.onStalled());
        this.video.addEventListener('suspend', () => this.onSuspend());
        this.video.addEventListener('error', (e) => this.onError(e));
        
        // Control events
        if (this.config.controls) {
            this.bigPlayButton.addEventListener('click', () => this.togglePlay());
            this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
            
            // Progress bar events with enhanced feedback
            this.progressBar.addEventListener('click', (e) => this.seek(e));
            this.progressBar.addEventListener('mousemove', (e) => this.showTimeTooltip(e));
            this.progressBar.addEventListener('mouseleave', () => this.hideTimeTooltip());
            
            // Progress bar drag support
            this.setupProgressBarDrag();
        }
        
        // Fullscreen events
        document.addEventListener('fullscreenchange', () => this.onFullscreenChange());
        document.addEventListener('webkitfullscreenchange', () => this.onFullscreenChange());
        document.addEventListener('mozfullscreenchange', () => this.onFullscreenChange());
        document.addEventListener('MSFullscreenChange', () => this.onFullscreenChange());
        
        // Click outside to close settings
        document.addEventListener('click', (e) => {
            if (this.settingsMenu && 
                !this.settingsMenu.contains(e.target) && 
                !this.settingsButton.contains(e.target)) {
                this.settingsMenu.classList.remove('active');
            }
        });
        
        // Save position periodically
        setInterval(() => {
            if (this.state.isPlaying) {
                this.savePosition();
            }
        }, 5000);
    }

    /**
     * Setup progress bar drag functionality
     */
    setupProgressBarDrag() {
        let isDragging = false;
        
        const startDrag = (e) => {
            isDragging = true;
            this.seek(e);
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDrag);
        };
        
        const onDrag = (e) => {
            if (isDragging) {
                this.seek(e);
            }
        };
        
        const stopDrag = () => {
            isDragging = false;
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', stopDrag);
        };
        
        this.progressBar.addEventListener('mousedown', startDrag);
    }

    /**
     * Setup buffer monitoring system
     */
    setupBufferMonitoring() {
        // Initialize buffer segments
        this.initializeBufferSegments();
        
        // Start buffer health checking
        this.startBufferHealthCheck();
        
        // Monitor network state
        this.monitorNetworkState();
    }

    /**
     * Initialize buffer segments for visualization
     */
    initializeBufferSegments() {
        const segmentsContainer = document.createElement('div');
        segmentsContainer.className = 'lion-player-progress-segments';
        this.progressBar.appendChild(segmentsContainer);
        
        this.state.bufferSegments = [];
        const segmentWidth = 100 / this.config.bufferSegments;
        
        for (let i = 0; i < this.config.bufferSegments; i++) {
            const segment = document.createElement('div');
            segment.className = 'lion-player-buffer-segment';
            segment.style.width = `${segmentWidth}%`;
            segment.style.left = `${i * segmentWidth}%`;
            segment.dataset.index = i;
            segmentsContainer.appendChild(segment);
            
            this.state.bufferSegments.push({
                element: segment,
                loaded: false,
                loading: false
            });
        }
    }

    /**
     * Start buffer health monitoring
     */
    startBufferHealthCheck() {
        this.state.bufferCheckInterval = setInterval(() => {
            this.checkBufferHealth();
        }, this.config.bufferHealthCheckInterval);
    }

    /**
     * Check buffer health and update UI
     */
    checkBufferHealth() {
        if (!this.video || !this.video.buffered.length) return;
        
        const currentTime = this.video.currentTime;
        const bufferedEnd = this.video.buffered.end(this.video.buffered.length - 1);
        const bufferAhead = bufferedEnd - currentTime;
        
        // Determine buffer health
        let health = 'good';
        if (bufferAhead < 2) {
            health = 'poor';
        } else if (bufferAhead < 5) {
            health = 'medium';
        }
        
        this.state.bufferHealth = health;
        this.updateBufferHealthIndicator(health);
        
        // Check if we need to buffer
        if (bufferAhead < 1 && this.state.isPlaying && !this.state.isBuffering) {
            this.startBuffering();
        } else if (bufferAhead > 3 && this.state.isBuffering) {
            this.stopBuffering();
        }
        
        // Update buffer segments
        this.updateBufferSegments();
    }

    /**
     * Update buffer segments visualization
     */
    updateBufferSegments() {
        if (!this.video || !this.video.buffered.length) return;
        
        const duration = this.video.duration;
        const currentTime = this.video.currentTime;
        
        // Clear all segments first
        this.state.bufferSegments.forEach(segment => {
            segment.loaded = false;
            segment.loading = false;
            segment.element.classList.remove('loaded', 'loading');
        });
        
        // Mark buffered segments
        for (let i = 0; i < this.video.buffered.length; i++) {
            const start = this.video.buffered.start(i);
            const end = this.video.buffered.end(i);
            
            const startIndex = Math.floor((start / duration) * this.config.bufferSegments);
            const endIndex = Math.ceil((end / duration) * this.config.bufferSegments);
            
            for (let j = startIndex; j <= endIndex && j < this.config.bufferSegments; j++) {
                const segment = this.state.bufferSegments[j];
                if (segment) {
                    segment.loaded = true;
                    segment.element.classList.add('loaded');
                    
                    // Check if current playback is in this segment
                    const segmentTime = (j / this.config.bufferSegments) * duration;
                    if (Math.abs(currentTime - segmentTime) < duration / this.config.bufferSegments) {
                        segment.loading = true;
                        segment.element.classList.add('loading');
                    }
                }
            }
        }
    }

    /**
     * Update buffer health indicator
     */
    updateBufferHealthIndicator(health) {
        if (!this.bufferHealthIndicator) return;
        
        this.bufferHealthIndicator.className = `lion-player-buffer-health visible ${health}`;
        
        const statusText = {
            good: 'Buffer: Good',
            medium: 'Buffer: Medium',
            poor: 'Buffer: Low'
        };
        
        this.bufferHealthIndicator.innerHTML = `
            <div class="status-dot"></div>
            ${statusText[health]}
        `;
    }

    /**
     * Start buffering
     */
    startBuffering() {
        if (this.state.isBuffering) return;
        
        this.state.isBuffering = true;
        this.showLoading('buffering');
        this.trigger(EVENTS.BUFFERING);
        
        // Update loading text
        this.updateLoadingText('Buffering...');
    }

    /**
     * Stop buffering
     */
    stopBuffering() {
        if (!this.state.isBuffering) return;
        
        this.state.isBuffering = false;
        this.hideLoading();
        this.trigger(EVENTS.BUFFERFULL);
    }

    /**
     * Monitor network state
     */
    monitorNetworkState() {
        // Create network status indicator
        this.networkStatusIndicator = document.createElement('div');
        this.networkStatusIndicator.className = 'lion-player-network-status';
        this.networkStatusIndicator.innerHTML = `
            <div class="status-dot"></div>
            <span class="status-text">Ready</span>
        `;
        this.container.appendChild(this.networkStatusIndicator);
        
        // Monitor video network state
        this.video.addEventListener('networkstatechange', () => {
            this.updateNetworkStatus();
        });
        
        // Monitor connection
        if ('connection' in navigator) {
            navigator.connection.addEventListener('change', () => {
                this.updateNetworkStatus();
            });
        }
    }

    /**
     * Update network status indicator
     */
    updateNetworkStatus() {
        if (!this.networkStatusIndicator) return;
        
        let status = 'idle';
        let statusText = 'Ready';
        
        switch (this.video.networkState) {
            case 1: // NETWORK_LOADING
                status = 'loading';
                statusText = 'Loading...';
                break;
            case 2: // NETWORK_LOADED
                status = 'ready';
                statusText = 'Ready';
                break;
            case 3: // NETWORK_NO_SOURCE
                status = 'error';
                statusText = 'Error';
                break;
        }
        
        this.state.networkStatus = status;
        this.networkStatusIndicator.className = `lion-player-network-status visible ${status}`;
        this.networkStatusIndicator.querySelector('.status-text').textContent = statusText;
        
        this.trigger(EVENTS.NETWORKCHANGE, { status, statusText });
    }

    /**
     * Setup premium features
     */
    setupPremiumFeatures() {
        // Auto-hide controls
        this.setupAutoHideControls();
        
        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
    }

    /**
     * Setup auto-hide controls
     */
    setupAutoHideControls() {
        const resetUserActivity = () => {
            this.state.isUserActive = true;
            this.el.classList.add('controls-visible');
            
            clearTimeout(this.state.userActivityTimeout);
            
            if (this.state.isPlaying) {
                this.state.userActivityTimeout = setTimeout(() => {
                    this.state.isUserActive = false;
                    this.el.classList.remove('controls-visible');
                }, 3000);
            }
        };

        // Mouse events
        this.el.addEventListener('mousemove', resetUserActivity);
        this.el.addEventListener('mouseenter', resetUserActivity);
        this.el.addEventListener('mouseleave', () => {
            if (this.state.isPlaying) {
                this.state.isUserActive = false;
                this.el.classList.remove('controls-visible');
            }
        });

        // Touch events
        this.el.addEventListener('touchstart', resetUserActivity);
        this.el.addEventListener('touchmove', resetUserActivity);

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'f', 'm'].includes(e.key)) {
                resetUserActivity();
            }
        });
    }

    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (!this.state.isUserActive) return;
            
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    this.togglePlay();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.skip(-5);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.skip(5);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.adjustVolume(0.1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.adjustVolume(-0.1);
                    break;
                case 'f':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
                case 'm':
                    e.preventDefault();
                    this.toggleMute();
                    break;
                case 'r':
                    e.preventDefault();
                    this.resumePlayback();
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    e.preventDefault();
                    this.seekToPercent(parseInt(e.key) * 10);
                    break;
            }
        });
    }

    /**
     * Start performance monitoring
     */
    startPerformanceMonitoring() {
        const monitor = () => {
            const now = performance.now();
            const delta = now - this.performance.lastFrameTime;
            
            this.performance.frames++;
            
            if (delta >= 1000) {
                this.performance.fps = Math.round((this.performance.frames * 1000) / delta);
                this.performance.frames = 0;
                this.performance.lastFrameTime = now;
                
                // Log performance issues
                if (this.performance.fps < 30 && this.state.isPlaying) {
                    console.warn(`Low FPS detected: ${this.performance.fps}`);
                }
            }
            
            requestAnimationFrame(monitor);
        };
        
        requestAnimationFrame(monitor);
    }

    /**
     * Set player dimensions
     */
    setDimensions() {
        if (this.config.fluid) {
            this.el.style.width = '100%';
            this.el.style.height = '0';
            this.el.style.paddingTop = '56.25%';
            this.container.style.position = 'absolute';
            this.container.style.top = '0';
            this.container.style.left = '0';
            this.container.style.width = '100%';
            this.container.style.height = '100%';
        } else {
            this.el.style.width = this.config.width;
            this.el.style.height = this.config.height;
            this.el.style.paddingTop = '0';
            this.container.style.position = 'relative';
        }
    }

    /**
     * Load video source
     */
    loadSource(src) {
        if (!src) return;
        
        this.config.src = src;
        this.video.src = src;
        this.video.load();
        
        // Reset buffer state
        this.state.isBuffering = false;
        this.state.bufferHealth = 'good';
        this.updateBufferHealthIndicator('good');
        
        // Check for saved position
        this.checkSavedPosition();
    }

    /**
     * Play video with promise handling
     */
    play() {
        if (this.video) {
            return this.video.play().catch(error => {
                console.error('Play failed:', error);
                this.showError('Playback failed. Please try again.');
            });
        }
        return Promise.reject(new Error('Video element not available'));
    }

    /**
     * Pause video
     */
    pause() {
        if (this.video) {
            this.video.pause();
        }
    }

    /**
     * Toggle play/pause
     */
    togglePlay() {
        if (this.state.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    /**
     * Skip by specified seconds
     */
    skip(seconds) {
        if (this.video) {
            this.video.currentTime = Math.max(0, Math.min(this.video.duration, this.video.currentTime + seconds));
        }
    }

    /**
     * Seek to specific time
     */
    seek(e) {
        if (!this.video || !this.video.duration) return;
        
        const rect = this.progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const time = pos * this.video.duration;
        
        this.video.currentTime = time;
        this.performance.seekEvents++;
    }

    /**
     * Seek to specific time in seconds
     */
    setCurrentTime(time) {
        if (this.video) {
            this.video.currentTime = time;
        }
    }

    /**
     * Seek to percentage
     */
    seekToPercent(percent) {
        if (this.video && this.video.duration) {
            this.video.currentTime = (percent / 100) * this.video.duration;
        }
    }

    /**
     * Set volume
     */
    setVolume(value) {
        if (this.video) {
            this.video.volume = parseFloat(value);
            this.volumeSlider.value = value;
        }
    }

    /**
     * Adjust volume by delta
     */
    adjustVolume(delta) {
        if (this.video) {
            const newVolume = Math.max(0, Math.min(1, this.video.volume + delta));
            this.setVolume(newVolume);
        }
    }

    /**
     * Toggle mute
     */
    toggleMute() {
        if (this.video) {
            this.video.muted = !this.video.muted;
        }
    }

    /**
     * Toggle settings menu
     */
    toggleSettings() {
        this.settingsMenu.classList.toggle('active');
    }

    /**
     * Toggle mini player
     */
    toggleMiniPlayer() {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        } else if (this.video && 'pictureInPictureEnabled' in document) {
            this.video.requestPictureInPicture().catch(error => {
                console.error('Error entering Picture-in-Picture mode:', error);
                this.showError('Picture-in-Picture is not supported');
            });
        } else {
            this.showError('Picture-in-Picture is not supported in this browser');
        }
    }

    /**
     * Set playback rate
     */
    setPlaybackRate(rate) {
        if (this.video) {
            this.video.playbackRate = rate;
            this.state.speed = rate;
        }
    }

    /**
     * Toggle fullscreen
     */
    toggleFullscreen() {
        if (this.state.isFullscreen) {
            this.exitFullscreen();
        } else {
            this.requestFullscreen();
        }
    }

    /**
     * Request fullscreen
     */
    requestFullscreen() {
        const element = this.el;
        
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    /**
     * Exit fullscreen
     */
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    /**
     * Show time tooltip
     */
    showTimeTooltip(e) {
        if (!this.video || !this.video.duration) return;
        
        const rect = this.progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const time = pos * this.video.duration;
        
        // Update tooltip content and position
        this.timeTooltip.innerHTML = this.formatTime(time);
        this.timeTooltip.style.left = `${pos * 100}%`;
    }

    /**
     * Hide time tooltip
     */
    hideTimeTooltip() {
        // Tooltip will hide automatically with CSS
    }

    /**
     * Format time
     */
    formatTime(seconds) {
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = date.getUTCSeconds().toString().padStart(2, '0');
        
        if (hh) {
            return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
        } else {
            return `${mm}:${ss}`;
        }
    }

    /**
     * Update time display
     */
    updateTimeDisplay() {
        if (this.timeDisplay) {
            this.timeDisplay.innerHTML = `${this.formatTime(this.state.currentTime)} / ${this.formatTime(this.state.duration)}`;
        }
    }

    /**
     * Update progress bar
     */
    updateProgressBar() {
        if (this.progressFilled && this.video && this.video.duration) {
            const percent = (this.video.currentTime / this.video.duration) * 100;
            this.progressFilled.style.width = `${percent}%`;
            
            // Update progress handle position
            this.progressBar.style.setProperty('--progress-position', `${percent}%`);
        }
    }

    /**
     * Update buffered bar
     */
    updateBufferedBar() {
        if (this.progressBuffered && this.video && this.video.buffered.length > 0) {
            const bufferedEnd = this.video.buffered.end(this.video.buffered.length - 1);
            const duration = this.video.duration;
            if (duration > 0) {
                const percent = (bufferedEnd / duration) * 100;
                this.progressBuffered.style.width = `${percent}%`;
            }
        }
    }

    /**
     * Update volume icon
     */
    updateVolumeIcon() {
        if (!this.volumeButton) return;
        
        let iconType = 'volume-up';
        
        if (this.video.muted || this.video.volume === 0) {
            iconType = 'volume-mute';
        } else if (this.video.volume < 0.5) {
            iconType = 'volume-down';
        }
        
        // Update SVG icon
        const svg = this.createSVGIcon(iconType);
        this.volumeButton.innerHTML = '';
        this.volumeButton.appendChild(svg);
    }

    /**
     * Update fullscreen icon
     */
    updateFullscreenIcon() {
        if (!this.fullscreenButton) return;
        
        const iconType = this.state.isFullscreen ? 'fullscreen-exit' : 'fullscreen';
        
        // Update SVG icon
        const svg = this.createSVGIcon(iconType);
        this.fullscreenButton.innerHTML = '';
        this.fullscreenButton.appendChild(svg);
    }

    /**
     * Update play button icon
     */
    updatePlayButton() {
        if (!this.playButton) return;
        
        const iconType = this.state.isPlaying ? 'pause' : 'play';
        
        // Update SVG icon
        const svg = this.createSVGIcon(iconType);
        this.playButton.innerHTML = '';
        this.playButton.appendChild(svg);
    }

    /**
     * Show loading with different states
     */
    showLoading(state = 'loading') {
        if (this.loadingSpinner) {
            this.loadingSpinner.className = `lion-player-loading ${state}`;
            this.loadingSpinner.style.display = 'flex';
            
            if (state === 'seeking') {
                this.updateLoadingText('Seeking...');
            } else if (state === 'buffering') {
                this.updateLoadingText('Buffering...');
            } else {
                this.updateLoadingText('Loading...');
            }
        }
    }

    /**
     * Hide loading
     */
    hideLoading() {
        if (this.loadingSpinner) {
            this.loadingSpinner.style.display = 'none';
        }
    }

    /**
     * Update loading text and percentage
     */
    updateLoadingText(status) {
        const loadingText = this.loadingSpinner.querySelector('.lion-player-loading-text');
        const percentageElement = loadingText.querySelector('.loading-percentage');
        const statusElement = loadingText.querySelector('.loading-status');
        
        if (this.video && this.video.duration) {
            const percent = Math.round((this.video.buffered.end(this.video.buffered.length - 1) / this.video.duration) * 100);
            percentageElement.textContent = `${percent}%`;
        } else {
            percentageElement.textContent = '0%';
        }
        
        statusElement.textContent = status;
    }

    /**
     * Show error with animation
     */
    showError(message) {
        if (this.errorDisplay) {
            this.errorDisplay.innerHTML = `<div class="lion-player-error-message">${message}</div>`;
            this.errorDisplay.style.display = 'flex';
            this.errorDisplay.style.animation = 'fadeIn 0.3s forwards';
        }
        
        if (this.loadingSpinner) {
            this.loadingSpinner.style.display = 'none';
        }
    }

    /**
     * Hide error
     */
    hideError() {
        if (this.errorDisplay) {
            this.errorDisplay.style.display = 'none';
        }
    }

    /**
     * Show big play button
     */
    showBigPlayButton() {
        if (this.bigPlayButton) {
            this.bigPlayButton.style.display = 'flex';
            this.el.classList.remove('lion-player-playing');
        }
    }

    /**
     * Hide big play button
     */
    hideBigPlayButton() {
        if (this.bigPlayButton) {
            this.bigPlayButton.style.display = 'none';
            this.el.classList.add('lion-player-playing');
        }
    }

    /**
     * Update player state
     */
    updateState() {
        this.state.currentTime = this.video ? this.video.currentTime : 0;
        this.state.duration = this.video ? this.video.duration : 0;
        this.state.volume = this.video ? this.video.volume : 1;
        this.state.playbackRate = this.video ? this.video.playbackRate : 1;
        this.state.buffered = 0;
        
        if (this.video && this.video.buffered.length > 0) {
            this.state.buffered = this.video.buffered.end(this.video.buffered.length - 1);
        }
        
        this.state.networkState = this.video ? this.video.networkState : 0;
        this.state.readyState = this.video ? this.video.readyState : 0;
    }

    /**
     * Trigger event
     */
    trigger(event, data) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach(callback => {
                callback.call(this, data);
            });
        }
    }

    /**
     * Add event listener
     */
    on(event, callback) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(callback);
        return this;
    }

    /**
     * Remove event listener
     */
    off(event, callback) {
        if (this.eventListeners[event]) {
            const index = this.eventListeners[event].indexOf(callback);
            if (index > -1) {
                this.eventListeners[event].splice(index, 1);
            }
        }
        return this;
    }

    /**
     * One-time event listener
     */
    one(event, callback) {
        const self = this;
        const onceWrapper = function(data) {
            callback.call(self, data);
            self.off(event, onceWrapper);
        };
        return this.on(event, onceWrapper);
    }

    /**
     * Destroy player
     */
    destroy() {
        // Pause video
        if (this.video) {
            this.video.pause();
        }
        
        // Clear intervals
        if (this.state.userActivityTimeout) {
            clearTimeout(this.state.userActivityTimeout);
        }
        
        if (this.state.bufferCheckInterval) {
            clearInterval(this.state.bufferCheckInterval);
        }
        
        // Remove event listeners
        this.eventListeners = {};
        
        // Clear DOM
        this.el.innerHTML = '';
        this.el.classList.remove('lion-player', 'controls-visible', 'lion-player-playing');
        
        // Remove references
        this.video = null;
        this.controls = null;
        this.progressBar = null;
        this.playButton = null;
        this.volumeButton = null;
        this.fullscreenButton = null;
    }

    // Event handlers
    onLoadStart() {
        this.showLoading('loading');
        this.updateLoadingText('Loading...');
        this.updateState();
        this.trigger(EVENTS.LOADDATA);
    }

    onLoadedData() {
        this.updateLoadingText('Processing...');
        this.updateState();
        this.trigger(EVENTS.LOADDATA);
    }

    onCanPlay() {
        this.hideLoading();
        this.updateState();
        this.trigger(EVENTS.CANPLAY);
    }

    onCanPlayThrough() {
        this.hideLoading();
        this.updateState();
        this.trigger(EVENTS.CANPLAYTHROUGH);
    }

    onPlay() {
        this.state.isPlaying = true;
        this.state.isPaused = false;
        this.state.isEnded = false;
        this.hideBigPlayButton();
        this.updatePlayButton();
        this.updateState();
        this.trigger(EVENTS.PLAY);
    }

    onPause() {
        this.state.isPlaying = false;
        this.state.isPaused = true;
        this.showBigPlayButton();
        this.updatePlayButton();
        this.updateState();
        this.trigger(EVENTS.PAUSE);
    }

    onEnded() {
        this.state.isPlaying = false;
        this.state.isPaused = true;
        this.state.isEnded = true;
        this.showBigPlayButton();
        this.updatePlayButton();
        this.updateState();
        this.trigger(EVENTS.ENDED);
    }

    onSeeking() {
        this.state.isSeeking = true;
        this.showLoading('seeking');
        this.updateState();
        this.trigger(EVENTS.SEEKING);
    }

    onSeeked() {
        this.state.isSeeking = false;
        this.hideLoading();
        this.updateState();
        this.trigger(EVENTS.SEEKED);
    }

    onTimeUpdate() {
        this.updateState();
        this.updateProgressBar();
        this.updateTimeDisplay();
        this.trigger(EVENTS.TIMEUPDATE);
    }

    onProgress() {
        this.updateBufferedBar();
        this.updateBufferSegments();
        this.updateLoadingText('Buffering...');
        this.updateState();
        this.trigger(EVENTS.PROGRESS);
    }

    onWaiting() {
        this.startBuffering();
    }

    onStalled() {
        this.startBuffering();
    }

    onSuspend() {
        this.stopBuffering();
    }

    onVolumeChange() {
        this.updateVolumeIcon();
        this.updateState();
        this.trigger(EVENTS.VOLUMECHANGE);
    }

    onRateChange() {
        this.updateState();
        this.trigger(EVENTS.RATECHANGE);
    }

    onError(e) {
        const message = this.video.error ? 
            `Error ${this.video.error.code}: ${this.video.error.message}` : 
            'Unknown error occurred';
        
        this.showError(message);
        this.updateState();
        this.trigger(EVENTS.ERROR, e);
    }

    onFullscreenChange() {
        this.state.isFullscreen = !!(
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        );
        
        this.updateFullscreenIcon();
        this.trigger(EVENTS.FULLSCREENCHANGE);
    }
}

// Export for ES6 modules
export { LionPlayer };

// Also export for other environments
if (typeof window !== 'undefined') {
    window.LionPlayer = LionPlayer;
}

// For CommonJS/Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LionPlayer;
}