# 🍜 Street Food Sourcing Platform - Frontend

## 🚀 Netlify Deployment

This is the frontend-only version optimized for Netlify deployment.

### 📦 What's Included
- ✅ React frontend application
- ✅ Netlify configuration
- ✅ Production build setup
- ✅ Environment configuration

### 🌐 Deployment Steps

1. **Connect to Netlify:**
   - Link this repository to Netlify
   - Build settings are configured in `netlify.toml`

2. **Environment Variables:**
   Set these in Netlify dashboard:
   ```
   REACT_APP_API_URL=https://your-backend-server.herokuapp.com
   REACT_APP_ENVIRONMENT=production
   ```

3. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `client/build`
   - Base directory: `client`

### 🔧 Local Development

```bash
# Install dependencies
cd client && npm install

# Start development server
npm start

# Build for production
npm run build
```

### 🎯 Demo Accounts
- **Vendor:** vendor1@example.com / password123
- **Supplier:** supplier@gmail.com / 000000

### 📱 Features
- Responsive design
- Real-time updates
- Smart recommendations
- Group ordering
- Voice ordering
- AR scanner
- Micro-lending
- Sustainability tracking

---

**Note:** This is a frontend-only deployment. Backend API should be deployed separately (e.g., on Heroku).