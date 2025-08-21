// Configuration file for Autocross Club of Negros
// SECURITY: Replace YOUR_GOOGLE_MAPS_API_KEY with your actual API key
// IMPORTANT: Never commit your actual API key to version control!

const CONFIG = {
    // Google Maps API Configuration
    // TODO: Replace with your actual API key from Google Cloud Console
    GOOGLE_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY_HERE',
    
    // Track Location (Negros Occidental, Philippines)
    TRACK_LOCATION: {
        lat: 10.70109, // Replace with your actual track latitude
        lng: 122.99095, // Replace with your actual track longitude
        name: 'Autocross Track - Negros Occidental',
        address: 'Bacolod Airport Access Road, Bacolod, 6115 Negros Occidental'
    },
    
    // Map Configuration
    MAP_CONFIG: {
        zoom: 16, // Increase zoom for closer view (15-18 recommended)
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
        email: 'info@autocrossnegros.com',
        phone: '+63 XXX XXX XXXX',
        facebook: 'https://facebook.com/autocrossnegros',
        instagram: 'https://instagram.com/autocrossnegros',
        youtube: 'https://youtube.com/@autocrossnegros'
    },
    
    // Event Information
    EVENTS: {
        registrationUrl: 'register.html',
        updatesUrl: '#'
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}
