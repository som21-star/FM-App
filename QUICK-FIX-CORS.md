# 🚨 QUICK FIX: CORS Error

## The Problem

You're seeing this error:
```
Access to fetch at 'https://kzdxxwznkjwblthpeige.supabase.co/auth/v1/user' from origin 'http://localhost:8080' has been blocked by CORS policy
```

## The Solution (5 minutes)

### Step 1: Go to Supabase Dashboard
Visit: https://supabase.com/dashboard/project/kzdxxwznkjwblthpeige/auth/url-configuration

### Step 2: Update Site URL
Change **Site URL** to:
```
http://localhost:8080
```

### Step 3: Add Redirect URLs
In the **Redirect URLs** section, add these (one per line):
```
http://localhost:8080/**
http://localhost:8080/reset-password
```

### Step 4: Save Changes
Click the **Save** button at the bottom

### Step 5: Restart Dev Server
```bash
# Stop the server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

### Step 6: Clear Browser Cache
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### Step 7: Test
Try signing in or updating your profile again!

---

## Still Not Working?

### Wait a Minute
Supabase changes can take 30-60 seconds to propagate. Wait a bit and try again.

### Check Your .env File
Make sure `FM-App/.env` has the correct values:
```env
VITE_SUPABASE_URL=https://kzdxxwznkjwblthpeige.supabase.co
VITE_SUPABASE_ANON_KEY=your_key_here
```

### Verify URLs Match
Make sure the URL in Supabase matches exactly where your app is running:
- Dev server: `http://localhost:8080`
- NOT `http://localhost:5173`
- NOT `https://localhost:8080`

---

## For Production

When deploying to Vercel, add your production domain:

**Site URL**:
```
https://your-app.vercel.app
```

**Redirect URLs**:
```
https://your-app.vercel.app/**
https://your-app.vercel.app/reset-password
```

---

## Need More Help?

See the full guide: `SUPABASE-SETUP.md`
