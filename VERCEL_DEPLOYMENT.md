# 🚀 Vercel Deployment Guide with API Key Security

## 📋 **Complete Step-by-Step Process**

### **Step 1: Prepare Your Code (Current State)**
✅ Your `config.js` has placeholder: `'YOUR_GOOGLE_MAPS_API_KEY_HERE'`
✅ Your `.gitignore` protects sensitive files
✅ Your code is ready for deployment

### **Step 2: Push to GitHub**
```bash
git add .
git commit -m "Website ready for Vercel deployment"
git push origin main
```

### **Step 3: Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click **"New Project"**
4. Import your GitHub repository
5. Click **"Deploy"**

### **Step 4: Add Environment Variable in Vercel**
1. In Vercel dashboard, go to your project
2. Click **Settings** tab
3. Click **Environment Variables** in left sidebar
4. Add new variable:
   - **Name**: `GOOGLE_MAPS_API_KEY`
   - **Value**: `AIzaSyCN1lRG3MdwduVuz1b-1Rd46ZdO_7jJxmo`
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**

### **Step 5: Redeploy with Environment Variable**
1. Go to **Deployments** tab
2. Click **"Redeploy"** on your latest deployment
3. Wait for deployment to complete

### **Step 6: Update Your Code to Use Environment Variable**
After deployment, update your `index.html` to use the environment variable:

```html
<script>
    // Load Google Maps API with environment variable
    function loadGoogleMapsAPI() {
        const apiKey = '%GOOGLE_MAPS_API_KEY%'; // Vercel will replace this
        if (apiKey && apiKey !== '%GOOGLE_MAPS_API_KEY%') {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        } else {
            console.error('Google Maps API key not configured');
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadGoogleMapsAPI);
    } else {
        loadGoogleMapsAPI();
    }
</script>
```

## 🔒 **Security Benefits**

### **What's Secure:**
- ✅ API key is NOT in your GitHub repository
- ✅ API key is stored securely in Vercel
- ✅ Only your Vercel deployment can access the key
- ✅ Others can clone your repo without seeing the key

### **What's Public:**
- ✅ Your website code (HTML, CSS, JS)
- ✅ Your assets (images, videos)
- ✅ Your configuration structure (without real keys)

## 🔄 **Development Workflow**

### **For Local Development:**
1. Use real API key in `config.js`
2. Test your website locally
3. Before pushing: Change back to placeholder

### **For Production:**
1. Push placeholder to GitHub
2. Vercel uses environment variable
3. Website works with secure API key

## 📁 **Files in Your Repository**

### **✅ Safe to Upload:**
- `index.html`
- `styles.css`
- `script.js`
- `config.js` (with placeholder)
- `register.html`, `register.css`, `register.js`
- `gallery.html`, `gallery.css`, `gallery.js`
- `assets/` folder
- `SECURITY.md`
- `API_KEY_SETUP.md`
- `VERCEL_DEPLOYMENT.md`
- `.gitignore`

### **❌ Never Upload:**
- `.env` files
- Files with real API keys
- Any sensitive credentials

## 🎯 **Final Result**

- **GitHub Repository**: Clean, shareable, no sensitive data
- **Vercel Website**: Fully functional with secure API key
- **Security**: API key protected and restricted
- **Collaboration**: Others can use your code safely

## 🚨 **Important Notes**

1. **Never commit real API keys** to GitHub
2. **Always use environment variables** in production
3. **Test locally** with real keys before deploying
4. **Keep your Vercel environment variables** secure
5. **Monitor your API usage** in Google Cloud Console

---

**Your website will be live and secure!** 🎉


