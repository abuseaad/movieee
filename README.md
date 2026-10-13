# 🎬 Movie App

A movie browsing app built with React and the TMDB API. Browse popular movies, search by title, save favorites, and watch trailers right inside the movie card.

🌐 **Live demo:** [your-live-url]

## ✨ Features

- Popular movies loaded from TMDB on the home page
- Search movies by title
- Favorites page, saved in the browser (`localStorage`) so they stay after refresh
- **Play Trailer** button on every card; the trailer plays inside the card and a **Stop** button returns to the poster
- Loading and error messages
- Responsive grid layout

## 🛠️ Tech Stack

React 19 · Vite 8 · React Router 7 · TMDB API · Context API · CSS

## 🚀 Getting Started

**Requirements:** Node.js 20+ and a free [TMDB API key](https://www.themoviedb.org/settings/api).

```bash
git clone https://github.com/sadikjemal/MyFavoriteMedicalVideos.git
cd MyFavoriteMedicalVideos/frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

Start the app:

```bash
npm run dev
```

Open <http://localhost:5173>.

> Never commit your `.env` file. It is already in `.gitignore`.

## 📜 Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```text
frontend/src/
├── components/
│   ├── contexts/MovieContext.jsx   # Favorites state (localStorage)
│   ├── MovieCard.jsx               # Card with favorite + trailer
│   └── NavBar.jsx
├── pages/
│   ├── Home.jsx                    # Popular movies + search
│   └── Favorites.jsx
├── Services/api.js                 # TMDB requests
├── css/                            # Stylesheets
├── App.jsx                         # Routes
└── main.jsx
```

## 👤 Author

**Sadik Jemal** · [@sadikjemal](https://github.com/sadikjemal)

<sub>This product uses the TMDB API but is not endorsed or certified by TMDB.</sub>