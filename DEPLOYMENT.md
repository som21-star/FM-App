# Frequency House - Production Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Supabase project set up

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Production ready deployment"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

```
VITE_SUPABASE_URL=https://kzdxxwznkjwblthpeige.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Important**: Add these for all environments (Production, Preview, Development)

### Step 4: Deploy

Click "Deploy" and wait for the build to complete (usually 1-2 minutes)

---

## 🔧 Supabase Configuration

### Required Settings

1. **Authentication Settings**
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add your Vercel domain to "Site URL"
   - Add redirect URLs:
     - `https://your-domain.vercel.app/**`
     - `https://your-domain.vercel.app/reset-password`

2. **Email Templates** (Optional but recommended)
   - Customize confirmation email
   - Customize password reset email
   - Add your branding

3. **Security**
   - Enable RLS (Row Level Security) on tables if you create any
   - Review API settings

---

## 📊 Post-Deployment Checklist

### Immediate Actions
- [ ] Test sign up flow
- [ ] Test sign in flow
- [ ] Test password reset
- [ ] Test profile updates
- [ ] Test audio player on different devices
- [ ] Test all navigation links
- [ ] Verify Terms and Privacy pages load
- [ ] Check mobile responsiveness

### Optional Enhancements
- [ ] Set up custom domain in Vercel
- [ ] Add Google Analytics
- [ ] Set up error monitoring (Sentry)
- [ ] Configure CDN for assets
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] Set up monitoring/uptime checks

---

## 🔐 Security Best Practices

### Environment Variables
- ✅ Never commit `.env` files to Git
- ✅ Use different keys for development and production
- ✅ Rotate keys periodically
- ✅ Keep `.env.example` updated for team members

### Supabase
- ✅ Enable RLS on all tables
- ✅ Use service role key only on backend (never expose)
- ✅ Review and limit API permissions
- ✅ Enable email verification
- ✅ Set up rate limiting

---

## 🐛 Troubleshooting

### Build Fails
**Problem**: Build fails with "Missing environment variables"
**Solution**: Ensure all `VITE_*` variables are set in Vercel

**Problem**: TypeScript errors during build
**Solution**: Run `npm run build` locally first to catch errors

### Authentication Issues
**Problem**: Users can't sign up/sign in
**Solution**: 
1. Check Supabase URL configuration
2. Verify redirect URLs are correct
3. Check browser console for errors

**Problem**: Email confirmation not working
**Solution**: 
1. Check Supabase email settings
2. Verify SMTP configuration
3. Check spam folder

### Audio Player Issues
**Problem**: Stations won't play
**Solution**:
1. Check browser console for CORS errors
2. Verify station URLs are still valid
3. Test on different browsers

---

## 📈 Performance Optimization

### Already Implemented
- ✅ Vite for fast builds
- ✅ Code splitting with React Router
- ✅ Lazy loading components
- ✅ Optimized images
- ✅ Preconnect to external domains

### Future Improvements
- [ ] Add service worker for offline support
- [ ] Implement image lazy loading
- [ ] Add skeleton loaders
- [ ] Optimize bundle size
- [ ] Add caching strategies

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

### Workflow
```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main

# Vercel automatically builds and deploys
# Check deployment status in Vercel dashboard
```

---

## 📱 Mobile App (Future)

Consider building native apps using:
- React Native
- Capacitor (wrap existing web app)
- PWA (Progressive Web App)

---

## 💰 Pricing & Scaling

### Current Setup (Free Tier)
- Vercel: Free (100GB bandwidth/month)
- Supabase: Free (500MB database, 2GB bandwidth)

### When to Upgrade
- **Vercel Pro** ($20/month): More bandwidth, better analytics
- **Supabase Pro** ($25/month): More storage, better performance

---

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Review Vercel logs
3. Check Supabase logs
4. Search GitHub issues
5. Contact support

---

## 🎉 You're Live!

Your app is now deployed and accessible worldwide. Share the link and start getting users!

**Next Steps:**
1. Share on social media
2. Get feedback from users
3. Monitor analytics
4. Iterate and improve

Good luck! 🚀
