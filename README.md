🎬 Movie Explorer

A simple Movie Explorer web application built with Next.js (App Router + TypeScript).

Users can search for movies, view detailed information, and manage a favorites list with personal ratings and notes. Movie data is fetched from the TMDB API through a secure server-side proxy.

🌐 Live Demo:

https://movie-explorer-phi-rose.vercel.app/

🚀 Features:

🔍 Search movies by title

📄 View detailed movie information (poster, overview, year, runtime)

⭐ Add / remove favorites

📝 Add a personal rating (1–5) and optional note

💾 Favorites persist using LocalStorage

🔐 Secure API integration via server-side proxy

⚠ Graceful handling of empty results and API errors

🛠 Tech Stack:

Next.js (App Router)

React

TypeScript

Next.js Route Handlers (API proxy)

LocalStorage (client-side persistence)

Vercel (deployment)

⚙ Setup & Run Locally:

1️⃣ Clone Repository
git clone https://github.com/YOUR_USERNAME/movie-explorer.git
cd movie-explorer

2️⃣ Install Dependencies
npm install

3️⃣ Add Environment Variable

Create a .env.local file in the project root:

TMDB_ACCESS_TOKEN=your_tmdb_v4_read_access_token


You can generate this token from:
https://www.themoviedb.org/settings/api

⚠ Use the v4 Read Access Token, not the v3 API key.

4️⃣ Run Development Server
npm run dev


Open:
http://localhost:3000

🧠 Technical Decisions & Tradeoffs:

1) API Proxy (Next.js Route Handlers)

The app uses server-side API routes to proxy TMDB requests instead of calling TMDB directly from the browser.

Why: Keeps the API token secure and avoids exposing credentials client-side.
Tradeoff: Adds a small backend layer but improves security and separation of concerns.

2) State Management (React Context)

Favorites are managed using React Context.

Why: Lightweight and sufficient for a small app with shared state across pages.
Tradeoff: Not ideal for very large-scale state management, but appropriate here.

3) Persistence (LocalStorage)

Favorites, ratings, and notes are stored in LocalStorage.

Why: Simple, fast, and satisfies persistence requirements without backend complexity.
Tradeoff: Data is device-specific and not shared across users.

📌 Known Limitations:

1) Search only shows the first set of results, and the app does not optimize or delay search input to reduce API calls.

2) Favorites are stored only in LocalStorage and are device-specific. 


3) There is no server-side persistence or caching layer. 

4) Styling and accessibility are kept minimal, as the focus was on functionality within the time constraint.

🚀 Improvements With More Time

If given additional time, I would:

1) Add pagination to show more search results.

2) Store favorites on a server so they work across devices.

3) Add a small delay to search to reduce extra API calls.

4) Improve accessibility for screen readers and keyboard users.

5) Cache results to make the app faster.

6) Improve the design and responsiveness.