# 🔑 Quick API Key Setup Guide

## 🚨 **URGENT: Secure Your API Key Now!**

Your Google Maps API key is currently exposed. Follow these steps immediately:

## ✅ **Step 1: Revoke Current Key**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **Credentials**
3. Find your API key: `AIzaSyCN1lRG3MdwduVuz1b-1Rd46ZdO_7jJxmo`
4. Click **DELETE** or **REGENERATE**

## ✅ **Step 2: Create New Restricted Key**
1. Click **+ CREATE CREDENTIALS** > **API Key**
2. **Name**: `Autocross Maps API Key`
3. **Application restrictions**: HTTP referrers (web sites)
4. **Website restrictions**: Add your domain (e.g., `yourdomain.com/*`)
5. **API restrictions**: Restrict key to "Maps JavaScript API"

## ✅ **Step 3: Update Your Code**
1. Open `config.js`
2. Replace line 6:
   ```javascript
   // OLD (INSECURE):
   GOOGLE_MAPS_API_KEY: 'AIzaSyCN1lRG3MdwduVuz1b-1Rd46ZdO_7jJxmo',
   
   // NEW (SECURE):
   GOOGLE_MAPS_API_KEY: 'YOUR_NEW_RESTRICTED_API_KEY_HERE',
   ```

## ✅ **Step 4: Test Your Setup**
1. Open your website
2. Check browser console for warnings
3. Verify map loads correctly
4. Test all map features

## 🔒 **Security Checklist**
- [ ] Old API key revoked
- [ ] New API key created with restrictions
- [ ] API key restricted to your domain only
- [ ] API key restricted to Maps JavaScript API only
- [ ] Code updated with new key
- [ ] `.gitignore` file created
- [ ] `SECURITY.md` file reviewed

## 📞 **Need Help?**
- Check `SECURITY.md` for detailed instructions
- Contact your development team
- Refer to Google Cloud documentation

---

**⚠️ Remember: Never commit API keys to Git!** 🔒


