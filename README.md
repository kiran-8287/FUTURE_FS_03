# ☕ Brew & Code

A premium campus café web application designed for a seamless ordering experience. **Brew & Code** combines modern web aesthetics with functional features like real-time menu management, a sophisticated cart system, and campus-wide delivery options.

🎨 Features
- **Modern UI/UX**: Built with React & Tailwind CSS for a sleek, responsive design.
- **Glassmorphism**: Elegant frosted glass effects across the interface (Navbar, Item Cards).
- **Interactive Elements**:
    - **Developer-Themed About Section**: A unique VS Code styled interface.
    - **Animated Item Detail Sheets**: Smooth slide-ups for item customizations.
    - **Bento-style Landing Page**: Organized layouts for Hero, Gallery, and Menu previews.
    - **Confetti Celebrations**: Engaging feedback on order confirmation.
- **Cart System**: Advanced state management with `useReducer` for unique item IDs and customizations.
- **Campus-Ready**: Integrated delivery/pickup toggles with specific hostel/room support.
- **Performance**: Optimized with Vite for lightning-fast HMR and build times.

📂 Project Structure
```text
src/
├── components/      # Reusable UI modules (ItemDetailSheet, Navbar, Hero, etc.)
├── pages/           # Main application views (Home, Menu, Cart, OrderConfirm)
├── context/         # Cart state management (CartContext)
├── data/            # Menu database (menuData.js)
├── hooks/           # Custom React hooks (IntersectionObserver, ScrollPosition)
└── menu images/     # Local high-quality menu assets
```

⚡ Getting Started

Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/kiran-8287/FUTURE_FS_03
   cd FUTURE_FS_03
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

🚀 Deployment
Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel login`
3. Run `vercel` inside the project folder
4. Follow the prompts!

📜 License
Project created for education and portfolio purposes.
