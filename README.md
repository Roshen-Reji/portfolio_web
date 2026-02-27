"# portfolio_web" 
⌬ Modern Glassmorphism Portfolio & CMS
A high-performance, full-stack portfolio application built with React, Firebase, and Framer-style custom scroll logic. This project features a bespoke Administrative Dashboard (CMS) that allows the owner to update project lists, certificates, and skills without touching the code.

🚀 Technical Highlights
Dynamic Content Management: Fully integrated with Firebase Firestore for real-time data persistence.

Custom Scroll Engine: Proprietary useScrollAnimation hook for 3D stacked-card project navigation and parallax social links.

Glassmorphism UI: Advanced CSS architecture using backdrop filters, CSS variables, and 3D perspectives for a premium "depth" feel.

Adaptive Branding: A custom-engineered SVG loader that dynamically renders the user's name on startup.

Secure Admin Suite: Protected dashboard with session-based authentication and advanced input validation (including regex-based URL checking and duplicate prevention).

🛠️ System Architecture
Frontend
React 18: Component-based UI architecture.

React Router v6: Handles seamless navigation between the public portfolio and the /admin portal.

Custom Hooks: Intersection Observer patterns and mathematical scroll interpolation for the "Project Stack" effect.

Backend & Storage
Firebase Firestore: Used as a NoSQL document store for all portfolio content.

Image Handling: Integrated "Link Tool" to convert Google Drive sharing links into direct embeddable URLs.

Design Tokens
CSS Variables: Centralized theme control in variables.css for easy rebranding.

Typography: Custom font integration including the "BEYNO" display face.

📂 Project Structure
Plaintext
src/
├── components/
│   ├── admin/         # CMS-specific components & section editors
│   ├── common/        # Reusable UI (Navbar, Footer, Loader)
│   └── portfolio/     # Public-facing section components
├── context/           # AuthContext for session management
├── hooks/             # Custom animation logic
├── services/          # Firebase initialization & API wrappers
└── styles/            # Modular CSS (Admin vs. Global)
⚙️ Installation & Setup
Clone the repository

Bash
git clone https://github.com/your-username/portfolio-cms.git
Install Dependencies

Bash
npm install
Configure Firebase Update the firebaseConfig object in src/services/api.js with your project credentials:

JavaScript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  // ...
};
Launch Development Server

Bash
npm run dev
🔐 Administrative Access
The dashboard is accessible via the /admin route or the hidden button in the portfolio view.

Default Credentials: - Username: admin

Password: 1234

Features: - Update Hero stats (Certs/Skills/Projects).

Real-time "Link Tool" for Google Drive images.

Validation: Prevents future dates in certificates and duplicate skill entries.

👨‍💻 Engineering Insights (The "Why")
Why Custom Scroll Hooks? Instead of heavy libraries like GSAP, I used a lightweight requestAnimationFrame implementation to interpolate scroll values (0.0 to 1.0) into CSS transforms. This ensures 60FPS performance even on mobile devices.

Why Firestore? It provides a "serverless" approach to CMS, allowing the AdminDashboard to push JSON payloads that the Portfolio consumes instantly, removing the need for a dedicated Express/Node.js backend.

📄 License
© 2025 Roshen Reji. Built for high-performance personal branding.