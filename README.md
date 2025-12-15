# YouTube Clone

A modern, feature-rich YouTube clone built with **React** and **Vite**. This application replicates core YouTube functionality including video browsing, searching, playback, and more - all powered by the **Invidious API** for a seamless, no-configuration experience.

![YouTube Clone](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-4.3.2-yellow) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3.2-teal)

## ✨ Features

✅ **Video Feed** - Browse trending and popular videos  
✅ **Search** - Find videos by keywords and topics  
✅ **Categories** - Filter by Music, Gaming, Technology, Sports, and more  
✅ **Video Playback** - Watch videos with ReactPlayer integration  
✅ **Related Videos** - Discover similar content  
✅ **Comments** - View video comments and discussions  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Dark Mode** - Sleek, modern YouTube-style interface

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anand2026/Youtube-Clone.git
   cd Youtube-Clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:5173](http://localhost:5173)

**That's it!** 🎉 No API keys or configuration needed - the app works immediately!

## 🔧 Tech Stack

- **React** - UI library
- **Vite** - Build tool & dev server
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP requests
- **React Player** - Video playback
- **Invidious API** - Free, no-auth YouTube data

## 📁 Project Structure

```
youtube-clone/
├── src/
│   ├── Components/      # React components (Feed, VideoCard, Header, etc.)
│   ├── context/         # Context API for state management
│   ├── utils/           # API utilities and helpers
│   ├── shared/          # Shared components (Loader, VideoLength)
│   └── assets/          # Images and static assets
├── public/              # Public assets
└── package.json         # Dependencies
```

## 🌐 API Information

This app uses the **Invidious API**, an open-source, privacy-focused YouTube frontend:

- ✅ **No API key required**
- ✅ **Free to use**
- ✅ **Multiple instance fallback** for reliability
- ✅ **All YouTube features** (search, videos, comments)

The app automatically switches between multiple Invidious instances for maximum uptime.

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- YouTube for the original design inspiration
- Invidious project for the free API
- React team for the amazing library

---

**Made with ❤️ by [Anand](https://github.com/anand2026)**
