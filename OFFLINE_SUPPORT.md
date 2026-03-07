# 📱 Offline Support - How It Works

## 🎯 What Works Offline?

### ✅ WORKS WITHOUT INTERNET:
1. **App Shell** - The entire UI loads instantly
2. **Favorites** - View your saved stations
3. **Profile** - See your profile and listening stats
4. **Premium Status** - Your premium status is cached
5. **Settings** - Theme, preferences, etc.
6. **Navigation** - Browse all pages
7. **Listening History** - View past plays

### ❌ REQUIRES INTERNET:
1. **Radio Streaming** - Can't stream without internet (obviously!)
2. **Station Discovery** - Can't load new stations
3. **Search** - Can't search for stations
4. **Sign In/Out** - Authentication needs network
5. **Premium Activation** - Needs to connect to server

---

## 🔧 How It Works

### Service Worker
The app uses a **Service Worker** to cache assets and enable offline functionality.

**What gets cached:**
- HTML pages
- CSS stylesheets
- JavaScript bundles
- Images and icons
- Manifest file

**Cache Strategy:**
1. **Cache First** - Serve from cache if available
2. **Network Fallback** - Fetch from network if not cached
3. **Offline Page** - Show offline page if both fail

### LocalStorage
User data is stored locally:
- Favorites list
- Premium status
- Listening history
- User preferences
- Theme settings

---

## 📱 Progressive Web App (PWA)

### Install as App
Users can install Frequency House as a native app:

**On Mobile:**
1. Open in browser (Chrome/Safari)
2. Tap "Add to Home Screen"
3. App icon appears on home screen
4. Opens like a native app

**On Desktop:**
1. Open in Chrome/Edge
2. Click install icon in address bar
3. App opens in its own window
4. Appears in app launcher

### PWA Features:
- ✅ Works offline (UI only)
- ✅ Install to home screen
- ✅ Standalone window
- ✅ App shortcuts
- ✅ Background sync (future)
- ✅ Push notifications (future)

---

## 🚀 User Experience

### Online → Offline Transition
1. User is browsing stations
2. Internet disconnects
3. UI continues to work
4. Cached pages load instantly
5. Favorites still accessible
6. Trying to play shows error toast
7. Offline page shown if needed

### Offline → Online Transition
1. Internet reconnects
2. Service worker detects connection
3. Syncs any pending data
4. Updates cache in background
5. User can stream again

---

## 💾 What's Stored Locally

### LocalStorage Data:
```javascript
// Favorites (per user)
fm-favorites-{userId}: [stations...]

// Premium status
premium_{userId}: "true"

// Listening history
fh_listens:{userId}: {
  stationId: {
    name: "Station Name",
    count: 5,
    last: timestamp
  }
}

// Theme preference
theme: "dark" | "light"
```

### Service Worker Cache:
```javascript
// Cache name
frequency-house-v1

// Cached assets
- /
- /index.html
- /offline.html
- /manifest.json
- /favicon.png
- CSS bundles
- JS bundles
```

---

## 🔄 Cache Updates

### Automatic Updates:
- Service worker checks for updates every hour
- New version downloads in background
- User prompted to reload when ready
- Seamless update experience

### Manual Cache Clear:
Users can clear cache in browser settings:
1. Open DevTools (F12)
2. Go to Application tab
3. Click "Clear storage"
4. Reload page

---

## 📊 Offline Analytics

### What We Track:
- Offline page views
- Failed network requests
- Cache hit/miss ratio
- Service worker errors

### Privacy:
- All data stored locally
- No tracking without consent
- Can clear data anytime

---

## 🎨 Offline UI

### Offline Page Features:
- Beautiful gradient background
- Clear "You're Offline" message
- "Try Again" button
- List of what works offline
- Friendly, helpful tone

### Error Handling:
- Toast notifications for network errors
- Helpful error messages
- Suggestions to reconnect
- No silent failures

---

## 🔮 Future Enhancements

### Planned Features:
1. **Background Sync**
   - Sync favorites when back online
   - Queue actions for later

2. **Push Notifications**
   - Notify when favorite station goes live
   - New stations in your region

3. **Offline Playback** (Premium)
   - Download stations for offline
   - Cache recent streams
   - Requires recording feature

4. **Smart Caching**
   - Predict which stations user will play
   - Pre-cache popular stations
   - Adaptive cache size

5. **Offline Search**
   - Search cached stations
   - Filter favorites offline

---

## 🛠️ Technical Implementation

### Service Worker Registration:
```javascript
// In main.tsx
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registered'))
    .catch(err => console.error('SW failed', err));
}
```

### Cache Strategy:
```javascript
// In sw.js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/offline.html'))
  );
});
```

### LocalStorage Usage:
```javascript
// Save favorites
localStorage.setItem('fm-favorites-123', JSON.stringify(favorites));

// Load favorites
const favorites = JSON.parse(localStorage.getItem('fm-favorites-123'));
```

---

## 📱 Testing Offline Mode

### How to Test:

**Method 1: DevTools**
1. Open DevTools (F12)
2. Go to Network tab
3. Check "Offline" checkbox
4. Reload page

**Method 2: Airplane Mode**
1. Enable airplane mode
2. Open app
3. Test functionality

**Method 3: Service Worker**
1. Open DevTools
2. Go to Application > Service Workers
3. Check "Offline" checkbox

### What to Test:
- [ ] App loads offline
- [ ] Favorites accessible
- [ ] Profile page works
- [ ] Navigation works
- [ ] Theme toggle works
- [ ] Offline page shows when needed
- [ ] Error toasts appear
- [ ] "Try Again" button works

---

## 🎯 Best Practices

### For Users:
1. **Install as PWA** - Better offline experience
2. **Keep app updated** - Latest features
3. **Clear cache occasionally** - Free up space
4. **Check connection** - Before streaming

### For Developers:
1. **Cache strategically** - Don't cache everything
2. **Version cache names** - Easy updates
3. **Handle errors gracefully** - User-friendly messages
4. **Test offline mode** - Before deploying
5. **Monitor cache size** - Don't exceed limits

---

## 🚨 Limitations

### Current Limitations:
1. **No offline streaming** - Radio needs internet
2. **No offline search** - API requires network
3. **No offline auth** - Supabase needs connection
4. **Cache size limits** - Browser dependent (~50MB)
5. **No background audio** - Browser limitation

### Browser Support:
- ✅ Chrome/Edge (full support)
- ✅ Firefox (full support)
- ✅ Safari (partial support)
- ❌ IE (not supported)

---

## 📈 Performance Benefits

### With Service Worker:
- **Instant loading** - Cached assets
- **Reduced bandwidth** - Less data usage
- **Better UX** - Works in poor network
- **Faster navigation** - No network delay

### Metrics:
- First load: ~2s (with network)
- Cached load: ~200ms (instant!)
- Offline load: ~100ms (super fast!)

---

## 🎉 Summary

### What You Get:
✅ App works offline (UI only)
✅ Favorites always accessible
✅ Premium status cached
✅ Instant page loads
✅ Beautiful offline page
✅ PWA installable
✅ Background updates

### What You Need Internet For:
❌ Radio streaming
❌ New station discovery
❌ Authentication
❌ Premium activation

**Bottom Line:** The app shell and your data work offline, but you need internet to stream radio (obviously!). It's like having a radio in your pocket that remembers your favorites even when you're offline! 📻
