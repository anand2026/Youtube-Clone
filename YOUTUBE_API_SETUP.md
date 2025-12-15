# YouTube API Setup Guide

## Quick Start - Get Your Free YouTube API Key

The YouTube clone now uses the official **YouTube Data API v3** which is:
- ✅ Free to use
- ✅ Generous quota (10,000 units/day)
- ✅ No credit card required
- ✅ Easy to set up (5 minutes)

## Step-by-Step Instructions

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Create a New Project
- Click "Select a project" at the top
- Click "NEW PROJECT"
- Enter project name: "YouTube Clone"
- Click "CREATE"

### 3. Enable YouTube Data API v3
- In the search bar, type "YouTube Data API v3"
- Click on "YouTube Data API v3"
- Click "ENABLE"

### 4. Create API Credentials
- Go to "Credentials" in the left sidebar
- Click "CREATE CREDENTIALS"
- Select "API key"
- Copy your new API key

### 5. Add API Key to Your Project

Create a `.env` file in the project root:

```bash
VITE_YOUTUBE_API_KEY=YOUR_API_KEY_HERE
```

Replace `YOUR_API_KEY_HERE` with the key you just copied.

### 6. Restart the Development Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### 7. Done! 🎉

Visit http://localhost:5173/ and your YouTube clone should now be fully functional!

## Troubleshooting

**Still seeing errors?**
- Make sure you enabled YouTube Data API v3 (not just created the key)
- Check that your `.env` file is in the project root
- Restart the dev server after creating `.env`
- Make sure the variable name is exactly `VITE_YOUTUBE_API_KEY`

**Rate limit issues?**
The free tier allows 10,000 quota units per day, which is approximately:
- 100 searches
- 150-200 video views

This is plenty for development and testing!

## What Changed?

The app now uses YouTube Data API v3 instead of RapidAPI:
- ✅ No more authentication errors
- ✅ Better reliability
- ✅ More features available
- ✅ Free and well-documented
