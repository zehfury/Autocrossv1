# Google Maps Integration Setup Guide

This guide will help you set up Google Maps API integration for the Autocross Club of Negros website.

## Prerequisites

1. A Google Cloud Platform account
2. A billing account set up (Google Maps API requires billing to be enabled)

## Step 1: Get Google Maps API Key

### 1.1 Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter a project name (e.g., "Autocross Club of Negros")
4. Click "Create"

### 1.2 Enable Google Maps JavaScript API
1. In your project, go to "APIs & Services" → "Library"
2. Search for "Maps JavaScript API"
3. Click on it and press "Enable"

### 1.3 Enable Places API (Optional but Recommended)
1. In the same library, search for "Places API"
2. Click on it and press "Enable"

### 1.4 Create API Key
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the generated API key

### 1.5 Restrict API Key (Recommended for Security)
1. Click on the created API key
2. Under "Application restrictions", select "HTTP referrers (web sites)"
3. Add your domain(s):
   - `localhost/*` (for development)
   - `yourdomain.com/*` (for production)
4. Under "API restrictions", select "Restrict key"
5. Select "Maps JavaScript API" and "Places API"
6. Click "Save"

## Step 2: Configure the Website

### 2.1 Update API Key
1. Open `config.js`
2. Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key:

```javascript
const CONFIG = {
    GOOGLE_MAPS_API_KEY: 'AIzaSyYourActualAPIKeyHere',
    // ... rest of config
};
```

### 2.2 Update Track Location (Optional)
1. In `config.js`, update the track coordinates to your actual location:

```javascript
TRACK_LOCATION: {
    lat: 10.6760, // Replace with your actual latitude
    lng: 122.9513, // Replace with your actual longitude
    name: 'Autocross Track - Negros Occidental',
    address: 'Your Actual Address'
}
```

### 2.3 Update HTML API Key Reference
1. Open `index.html`
2. Find the Google Maps API script tag
3. Replace the placeholder with your actual API key:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyYourActualAPIKeyHere&libraries=places"></script>
```

## Step 3: Test the Integration

### 3.1 Local Testing
1. Open `index.html` in a web browser
2. Scroll down to the "Track Location" section
3. Verify that the map loads correctly
4. Test the map controls:
   - Satellite view toggle
   - Street view toggle
   - Fullscreen mode
   - Get directions button

### 3.2 Production Deployment
1. Upload all files to your web server
2. Ensure your domain is added to the API key restrictions
3. Test the map functionality on the live site

## Features Included

### 🗺️ Interactive Map
- Custom styled map with dark theme
- Custom marker with ACN branding
- Clickable marker with info window
- Double-click marker for directions

### 🎛️ Map Controls
- **Satellite View**: Toggle between road and satellite view
- **Street View**: Enable/disable street view overlay
- **Fullscreen**: Expand map to full screen
- **Get Directions**: Open Google Maps directions

### 📱 Responsive Design
- Mobile-optimized layout
- Touch-friendly controls
- Adaptive sizing for different screen sizes

### 🎨 Custom Styling
- Dark theme matching your website design
- Custom marker with ACN colors
- Smooth animations and transitions
- Professional info window design

## Troubleshooting

### Map Not Loading
1. Check if API key is correct
2. Verify API key restrictions allow your domain
3. Check browser console for errors
4. Ensure billing is enabled on Google Cloud

### API Key Errors
- **"This API project is not authorized"**: Enable the Maps JavaScript API
- **"RefererNotAllowedMapError"**: Add your domain to API key restrictions
- **"BillingNotEnabledMapError"**: Enable billing in Google Cloud Console

### Performance Issues
1. Consider implementing lazy loading for the map
2. Optimize map styles for better performance
3. Use appropriate zoom levels for your use case

## Security Best Practices

1. **Restrict API Key**: Always restrict your API key to specific domains
2. **Monitor Usage**: Set up billing alerts in Google Cloud Console
3. **Regular Updates**: Keep your API key secure and rotate if needed
4. **HTTPS Only**: Use HTTPS in production to ensure secure API calls

## Cost Considerations

- Google Maps JavaScript API has a generous free tier
- Typical usage for a small website is well within free limits
- Monitor usage in Google Cloud Console
- Set up billing alerts to avoid unexpected charges

## Support

If you encounter issues:
1. Check the [Google Maps JavaScript API documentation](https://developers.google.com/maps/documentation/javascript)
2. Review the browser console for error messages
3. Verify your API key configuration
4. Test with a simple map implementation first

## Files Modified

- `index.html` - Added Google Maps API script and track location section
- `styles.css` - Added CSS for track location section and map styling
- `script.js` - Added Google Maps integration JavaScript
- `config.js` - Created configuration file for API key and settings
- `GOOGLE_MAPS_SETUP.md` - This setup guide

## Next Steps

1. Replace the API key with your actual key
2. Update the track coordinates to your actual location
3. Test the integration locally
4. Deploy to production
5. Monitor usage and performance

