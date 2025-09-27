# Deployment Guide for E-commerce Platform

This full-stack application requires both frontend and backend hosting. GitHub Pages only supports static sites, so we need different deployment strategies.

## 🚀 Recommended Deployment Options

### Option 1: Vercel + Railway (Free Tier Available)

#### Frontend (Vercel):
1. **Connect Repository to Vercel:**
   ```bash
   cd client
   vercel --prod
   ```

2. **Environment Variables in Vercel:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
   ```

#### Backend (Railway):
1. **Create Railway Project:**
   - Go to https://railway.app
   - Connect your GitHub repository
   - Choose the server folder as root

2. **Environment Variables in Railway:**
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce
   JWT_SECRET=your_production_jwt_secret
   STRIPE_SECRET_KEY=sk_live_your_key
   CLIENT_URL=https://your-vercel-app.vercel.app
   PORT=8080
   NODE_ENV=production
   ```

### Option 2: Netlify + Heroku

#### Frontend (Netlify):
- Connect GitHub repo
- Build command: `cd client && npm run build`
- Publish directory: `client/.next`

#### Backend (Heroku):
- Create Heroku app
- Connect GitHub repo
- Set environment variables
- Deploy server folder

### Option 3: All-in-One Solutions

#### Render (Free Tier):
- Deploy both frontend and backend
- Automatic builds from GitHub
- Built-in database options

#### DigitalOcean App Platform:
- Full-stack deployment
- Automatic scaling
- Integrated database

## 🗄️ Database Options

### Free Options:
- **MongoDB Atlas** (Free 512MB cluster)
- **Railway PostgreSQL** (Free tier)
- **Supabase** (Free tier with PostgreSQL)

### Production Options:
- **MongoDB Atlas** (Paid plans)
- **AWS DocumentDB**
- **Google Cloud Firestore**

## 🔧 Quick Deploy Commands

### Deploy Frontend to Vercel:
```bash
cd client
npx vercel --prod
```

### Deploy Backend to Railway:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

## 📝 Pre-deployment Checklist

- [ ] Update API URLs in client environment
- [ ] Set up production database
- [ ] Configure Stripe webhooks for production
- [ ] Set up proper CORS origins
- [ ] Enable production logging
- [ ] Set up monitoring and error tracking

## 🔒 Security for Production

- [ ] Use HTTPS everywhere
- [ ] Set secure JWT secrets
- [ ] Configure proper CORS
- [ ] Enable rate limiting
- [ ] Set up proper error handling
- [ ] Use environment variables for secrets

## 📊 Monitoring & Analytics

- **Frontend:** Vercel Analytics, Google Analytics
- **Backend:** Railway metrics, Sentry for error tracking
- **Database:** MongoDB Atlas monitoring

Choose the option that best fits your needs and budget!