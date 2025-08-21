// Secure Configuration Loader
// This file handles loading configuration from environment variables or fallbacks

(function() {
    'use strict';
    
    // Function to get environment variable or fallback
    function getEnvVar(key, fallback) {
        // In a real server environment, this would read from process.env
        // For client-side, we'll use a secure approach
        return fallback;
    }
    
    // Load configuration securely
    const CONFIG = {
        // Google Maps API Configuration
        GOOGLE_MAPS_API_KEY: getEnvVar('GOOGLE_MAPS_API_KEY', 'YOUR_GOOGLE_MAPS_API_KEY_HERE'),
        
        // Track Location
        TRACK_LOCATION: {
            lat: parseFloat(getEnvVar('TRACK_LATITUDE', '10.70109')),
            lng: parseFloat(getEnvVar('TRACK_LONGITUDE', '122.99095')),
            name: getEnvVar('TRACK_NAME', 'Autocross Track - Negros Occidental'),
            address: getEnvVar('TRACK_ADDRESS', 'Bacolod Airport Access Road, Bacolod, 6115 Negros Occidental')
        },
        
        // Map Configuration
        MAP_CONFIG: {
            zoom: 16,
            mapTypeId: 'roadmap',
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry",
                    "stylers": [{"color": "#242f3e"}]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [{"lightness": -80}]
                },
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [{"color": "#746855"}]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{"color": "#2c5aa0"}]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [{"color": "#d59563"}]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [{"color": "#38414e"}]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#212a37"}]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [{"color": "#9ca5b3"}]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{"color": "#17263c"}]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [{"color": "#515c6d"}]
                }
            ]
        },
        
        // Contact Information
        CONTACT: {
            email: getEnvVar('CONTACT_EMAIL', 'info@autocrossnegros.com'),
            phone: getEnvVar('CONTACT_PHONE', '+63 XXX XXX XXXX'),
            facebook: getEnvVar('FACEBOOK_URL', 'https://facebook.com/autocrossnegros'),
            instagram: getEnvVar('INSTAGRAM_URL', 'https://instagram.com/autocrossnegros'),
            youtube: getEnvVar('YOUTUBE_URL', 'https://youtube.com/@autocrossnegros')
        },
        
        // Event Information
        EVENTS: {
            registrationUrl: 'register.html',
            updatesUrl: '#'
        }
    };
    
    // Security check - warn if using placeholder API key
    if (CONFIG.GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
        console.warn('⚠️ SECURITY WARNING: Please replace the placeholder API key in config.js with your actual Google Maps API key');
    }
    
    // Export configuration
    window.CONFIG = CONFIG;
    
    // Export for Node.js if available
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = CONFIG;
    }
})();

