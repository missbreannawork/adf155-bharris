# 💫 🚀 ShipIt

A fully-functional single-page application (SPA) built with **vanilla HTML, CSS, and JavaScript**—no frameworks required. This is a static port of the ShipIt React demo, designed to showcase how modern web applications work at the fundamental level.

## 🎯 Overview

ShipIt is a social platform demo for sharing and discovering tech posts. This version demonstrates core web development concepts including:

- **Hash-based routing** for client-side page navigation
- **State management** with vanilla JavaScript objects
- **DOM manipulation** with template literals and `innerHTML`
- **Event delegation** for interactive features
- **Responsive design** with CSS Flexbox
- **Voting system** with real-time UI updates

## ✨ Features

- **Tab-based filtering**: Popular, New, Top, and Watching posts with emoji icons
- **Interactive voting**: Upvote/downvote posts with live counter updates (floor at 0)
- **User authentication**: Login/logout with session state management
- **User profiles**: View user details, submitted posts, and tags
- **Tag filtering**: Discover posts by technology tags
- **Search functionality**: Filter posts by keywords and tags
- **Responsive layout**: Works on desktop and mobile devices
- **Dark theme**: Modern dark UI styling with smooth interactions

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or server required for local development

### Installation

1. Clone or download this entire project folder
2. Open `index.html` directly in your browser, or
3. Install the **Live Server** extension for VS Code:
   - Search for "Live Server" in the VS Code Extensions marketplace
   - Right-click `index.html` → "Open with Live Server"
   - Your browser will open automatically to `http://localhost:5500`
   - Learn more: [Live Server Documentation](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

## 📂 Project Structure

```
reactjs-static/
├── index.html          # Main HTML scaffold
├── app.js              # Complete application logic (1000+ lines)
├── styles.css          # All styling and responsive design
├── netlify.toml        # Netlify deployment configuration
├── img/
│   ├── logo-s.png      # ShipIt logo
│   ├── stardust.png    # Background texture
│   ├── endlessStars.svg # SVG graphic
│   └── avatars/        # User profile pictures (6 local JPGs)
└── README.md           # This file
```

## 🏗️ Architecture

### Single-File Application

All logic lives in `app.js` (1007 lines):

- **Mock Data**: Static user and post arrays with RandomUser schema
- **State Management**: Global `state` object tracking:
  - Login status and current user ID
  - Current page/route
  - Search filters and watched tags
  - Post vote counts
- **Routing**: Hash-based navigation (`#/`, `#/posts/123`, etc.)
- **Rendering Functions**: Separate render functions for each page
- **Event Listeners**: Setup functions attach handlers after rendering

### Key Functions

| Function               | Purpose                                      |
| ---------------------- | -------------------------------------------- |
| `renderApp()`          | Main render loop; routes to appropriate page |
| `renderHome()`         | Posts with tab filtering                     |
| `renderPost()`         | Single post detail view                      |
| `renderProfile()`      | User profile with their posts                |
| `setupVoteListeners()` | Attaches click handlers to vote buttons      |

## 👥 Data Model

### User Object

```javascript
{
  id: "u1",
  username: "CSS101",
  avatar: "img/avatars/user1.jpg",
  city: "NYC",
  state: "New York",
  tags: [{ id: "t4", name: "React" }]
}
```

### Post Object

```javascript
{
  id: "p1",
  userId: "u1",
  title: "Understanding CSS Grid",
  content: "A practical guide to CSS Grid...",
  totalVotes: 42,
  commentCount: 8,
  tags: [{ id: "t6", name: "CSS" }],
  timestamp: "2024-02-15"
}
```

## 💻 Technologies Used

- **HTML5**: Semantic markup with aria labels for accessibility
- **CSS3**: Flexbox layout, CSS variables for theming, responsive design
- **Vanilla JavaScript (ES6+)**:
  - Template literals for HTML generation
  - Arrow functions and destructuring
  - Object/array methods (map, filter, find)
  - Event handling and DOM manipulation

- **Dependencies**:
  - Font Awesome 6.0 (icons via CDN)
  - No other external libraries

## 🎓 Educational Value

This project demonstrates:

1. **How SPAs work** without frameworks—state, routing, and rendering
2. **DOM API fundamentals**—`querySelector`, `addEventListener`, `innerHTML`
3. **JavaScript patterns**—closures, event delegation, template rendering
4. **CSS layout techniques**—Flexbox, positioning, responsive design
5. **Component thinking**—Organizing complex UIs into render functions

## 🔒 Data & Privacy

- **All data is local** — No API calls or external server requests
- **No storage** — Data resets on page refresh (session-only)
- **Offline-ready** — Works completely offline after first load
- **User avatars** — Local static images (RandomUser schema for learning)

## 🚢 Deployment

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy (navigate to project root)
cd <your-project-directory>
netlify deploy --dir=. --prod
```

### GitHub Pages

1. Push to GitHub repository
2. Enable Pages in repository settings
3. Set source to `main` branch (or your branch)

### Traditional Hosting

Upload all files to any web server. No build process required.

## 📸 Features in Action

### Voting System

- Click ⬆️ to upvote (increments counter)
- Click ⬇️ to downvote (decrements counter, minimum 0)
- Vote counts persist during session

### Navigation

- **Home** - Browse posts by Popular, New, Top, Watching
- **Profile** - View user details and their posts
- **New Post** - Create a post (logged-in only)
- **Search** - Filter posts by keywords or tags
- **User Menu** - Account options and logout

### Authentication Flow

1. Click "Join Now" or "Login"
2. Select a user to continue as
3. Access "New Post" and profile features
4. Click profile avatar → "Logout" to sign out

## 🐛 Known Limitations

- **No persistence** — Votes and changes don't survive page refresh
- **Mock data only** — No real backend or database
- **No comments** — Comment counts are static
- **Limited tags** — Predefined set of technology tags

## 🔮 Future Enhancements

- LocalStorage for persistent voting
- Comment submission and threading
- More dynamic search/filtering
- User profile editing
- Post creation UI
- Infinite scroll pagination

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Contributing

Contributions are welcome! This is an educational project, so improvements that maintain simplicity while teaching concepts are encouraged.

## 📧 Support

For questions about this demo or suggestions for improvement, open an issue or contact the maintainers.

---

**Static sites in Action.** No framework, no build tools, just HTML, CSS, and JavaScript.

# ShipIt – Custom UI

## Overview
This project is a redesigned version of the ShipIt interface with a custom brand identity.

## Enhancements
- Custom color system (pink tech theme)
- Typography system using Google Fonts
- Improved layout and spacing
- Reusable CSS classes
- Structured stylesheet organization

## Future Plans
- Add more UI components
- Improve responsiveness
- Expand functionality in next course