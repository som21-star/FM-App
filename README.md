# Frequency House - Your Home of Radio 📻

A modern, sleek web application for streaming live radio stations from around the world. Built with React, TypeScript, and Supabase.

![Frequency House](https://lovable.dev/opengraph-image-p98pqg.png)

## ✨ Features

- 🌍 **Global Coverage**: Stream stations from India, USA, Europe, Australia, South America & Africa
- 🎵 **HD Audio**: Premium users get 320kbps high-quality streaming
- ❤️ **Favorites**: Save your favorite stations for quick access
- 👤 **User Profiles**: Personalized profiles with listening history
- 🎨 **Beautiful UI**: Clean, monochrome design with smooth animations
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile
- 🔐 **Secure Auth**: Email/password authentication via Supabase
- 💎 **Premium Plans**: 60-day free trial, then $1/month or $12/year

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/som21-star/FM-App.git
cd FM-App

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Add your Supabase credentials to .env
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State Management**: React Context API
- **Audio**: HTML5 Audio API

## 📁 Project Structure

```
FM-App/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── AudioPlayer.tsx
│   │   ├── AuthDialog.tsx
│   │   ├── Header.tsx
│   │   └── ...
│   ├── contexts/       # React contexts
│   │   ├── AuthContext.tsx
│   │   └── PlayerContext.tsx
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities and configs
│   │   ├── supabase.ts
│   │   └── utils.ts
│   ├── pages/          # Page components
│   │   ├── Index.tsx
│   │   ├── Profile.tsx
│   │   ├── Premium.tsx
│   │   ├── Terms.tsx
│   │   ├── Privacy.tsx
│   │   └── ...
│   ├── types/          # TypeScript types
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── .env.example        # Environment variables template
├── vercel.json         # Vercel deployment config
├── DEPLOYMENT.md       # Deployment guide
└── package.json
```

## 🎨 Key Features Explained

### Authentication
- Email/password sign up and sign in
- Password reset functionality
- Password strength indicator
- Secure session management via Supabase

### User Profile
- Display name and full name
- Phone number and location
- Bio/about section
- Avatar upload
- Listening history and trends

### Audio Player
- Play/pause controls
- Volume control
- Station metadata display
- Smooth transitions between stations
- Persistent player across pages

### Premium Features
- 60-day free trial (no credit card required)
- HD audio quality (320kbps)
- Access to all global regions
- Ad-free experience
- Unlimited favorites
- Priority support

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/som21-star/FM-App)

## 🔐 Environment Variables

Required environment variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important**: Never commit `.env` files to Git!

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. If you have access and want to contribute:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 🐛 Known Issues

- Some radio stations may have intermittent connectivity
- Audio playback may not work on older browsers
- Mobile Safari may require user interaction before audio plays

## 📞 Support

For issues or questions:
- Email: support@frequencyhouse.com
- Create an issue in this repository

## 🎯 Roadmap

- [ ] Add more radio stations
- [ ] Implement offline mode (PWA)
- [ ] Add social sharing features
- [ ] Create mobile apps (iOS/Android)
- [ ] Add podcast support
- [ ] Implement sleep timer
- [ ] Add equalizer controls
- [ ] Multi-language support

## 👏 Acknowledgments

- Radio stations for providing streams
- Supabase for backend infrastructure
- shadcn/ui for beautiful components
- Lovable.dev for initial scaffolding

---

Made with ❤️ by the Frequency House team
