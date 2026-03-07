# 🔧 Supabase Configuration Guide

## ⚠️ IMPORTANT: Fix CORS Error

If you're seeing this error:
```
Access to fetch at 'https://kzdxxwznkjwblthpeige.supabase.co/auth/v1/user' from origin 'http://localhost:8080' has been blocked by CORS policy
```

You need to configure Supabase to allow your domain.

---

## 📋 Step-by-Step Setup

### 1. Go to Supabase Dashboard

Visit: https://supabase.com/dashboard/project/kzdxxwznkjwblthpeige

### 2. Configure Authentication URLs

1. Click on **Authentication** in the left sidebar
2. Click on **URL Configuration**
3. Update the following settings:

#### Site URL
```
http://localhost:8080
```
(For production, change to your actual domain like `https://frequencyhouse.com`)

#### Redirect URLs
Add these URLs (one per line):
```
http://localhost:8080/**
http://localhost:8080/reset-password
http://localhost:5173/**
```

For production, also add:
```
https://your-domain.vercel.app/**
https://your-domain.vercel.app/reset-password
https://your-custom-domain.com/**
https://your-custom-domain.com/reset-password
```

### 3. Configure CORS (if needed)

1. Go to **Settings** → **API**
2. Scroll to **CORS Settings**
3. Make sure these origins are allowed:
   - `http://localhost:8080`
   - `http://localhost:5173`
   - Your production domain

### 4. Email Settings (Optional but Recommended)

1. Go to **Authentication** → **Email Templates**
2. Customize the email templates:
   - Confirmation email
   - Password reset email
   - Magic link email

3. Go to **Authentication** → **Providers**
4. Configure Email provider:
   - Enable email confirmation (recommended)
   - Set rate limits
   - Configure SMTP (optional, for custom emails)

---

## 🔐 Security Settings

### Row Level Security (RLS)

If you create any tables, enable RLS:

```sql
-- Example: Enable RLS on a profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = user_id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = user_id);
```

### API Keys

- **Anon Key**: Safe to use in frontend (already in `.env`)
- **Service Role Key**: NEVER expose in frontend! Only use in backend/server

---

## 🧪 Testing the Configuration

After configuring Supabase:

1. **Restart your dev server**:
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

2. **Clear browser cache**:
   - Open DevTools (F12)
   - Right-click refresh button
   - Select "Empty Cache and Hard Reload"

3. **Test authentication**:
   - Try signing up with a new email
   - Check if confirmation email arrives
   - Try signing in
   - Try password reset

---

## 🐛 Troubleshooting

### Still Getting CORS Error?

1. **Double-check URLs**: Make sure there are no typos in Supabase dashboard
2. **Wait a minute**: Changes can take 30-60 seconds to propagate
3. **Clear cache**: Browser cache can cause issues
4. **Check console**: Look for other error messages
5. **Verify .env**: Make sure your `.env` file has correct values

### Email Not Sending?

1. **Check spam folder**: Confirmation emails often go to spam
2. **Verify email settings**: In Supabase → Authentication → Email Templates
3. **Check rate limits**: You might have hit the rate limit
4. **Use custom SMTP**: For production, configure custom SMTP

### Can't Sign In?

1. **Email not confirmed**: Check if email confirmation is required
2. **Wrong credentials**: Verify email and password
3. **Account locked**: Check Supabase dashboard for locked accounts
4. **Session expired**: Try signing out and back in

---

## 📊 Monitoring

### Check Auth Logs

1. Go to **Authentication** → **Users**
2. Click on a user to see their activity
3. Check **Logs** tab for errors

### Check API Usage

1. Go to **Settings** → **API**
2. View usage statistics
3. Monitor rate limits

---

## 🚀 Production Checklist

Before deploying to production:

- [ ] Update Site URL to production domain
- [ ] Add production redirect URLs
- [ ] Enable email confirmation
- [ ] Configure custom SMTP (recommended)
- [ ] Set up RLS policies on all tables
- [ ] Review and test all auth flows
- [ ] Set up monitoring/alerts
- [ ] Configure rate limiting
- [ ] Review security settings
- [ ] Test password reset flow
- [ ] Test email confirmation flow

---

## 📞 Need Help?

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Discord**: https://discord.supabase.com
- **Support**: https://supabase.com/support

---

## ✅ Quick Fix Summary

**To fix the CORS error right now:**

1. Go to https://supabase.com/dashboard/project/kzdxxwznkjwblthpeige/auth/url-configuration
2. Set Site URL to: `http://localhost:8080`
3. Add Redirect URL: `http://localhost:8080/**`
4. Click Save
5. Wait 1 minute
6. Restart your dev server
7. Clear browser cache
8. Try again!

That's it! 🎉
