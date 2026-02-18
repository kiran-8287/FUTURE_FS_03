# ☕ Brew & Code

A premium campus café web application designed for a seamless ordering experience. **Brew & Code** combines modern web aesthetics with functional features like real-time menu management, a sophisticated cart system, and campus-wide delivery options.


## 🚀 Key Features

-   **Interactive Menu**: Smooth categorized navigation with real-time filtering and search.
-   **Advanced Cart System**: Seamlessly customize items, apply coupons (Try `CAMPUS20`), and manage quantities.
-   **Smart Delivery Options**: Choose between "Self Pickup" or "Campus Delivery" with hostel/room detail support.
-   **Developer UI Aesthetic**: Includes a unique "About" section styled as a VS Code environment.
-   **Fully Responsive**: Optimized for both mobile and desktop experiences with a dedicated mobile navigation bar.
-   **Confetti Celebrations**: Engaging feedback on successful orders.

## 🛠️ Tech Stack

-   **Frontend**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **State Management**: Context API + `useReducer`
-   **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## 📂 Project Structure

The project follows a standard `src/` directory convention for modularity and scalability:

-   `src/components/`: Reusable UI modules (Item Cards, Navbar, etc.)
-   `src/pages/`: Main application views (Home, Menu, Cart, Confirm)
-   `src/context/`: Global state management for orders.
-   `src/data/`: Centralized menu item database.
-   `src/hooks/`: Custom React hooks for scroll and intersections.
-   `src/menu images/`: Local high-quality menu assets.

## ⚙️ How to Run Locally

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/kiran-8287/FUTURE_FS_03.git
    cd FUTURE_FS_03
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Set Environment Variables**:
    Create a `.env.local` file and add:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Start Development Server**:
    ```bash
    npm run dev
    ```

## 📜 License

Project created for education and portfolio purposes.
