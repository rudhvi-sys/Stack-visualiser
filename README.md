# Stack Visualizer - Interactive LIFO Data Structure Laboratory

An interactive, web-based Data Structure Laboratory built with React, TypeScript, Vite, Motion, and Tailwind CSS. This application allows students, engineers, and computer science enthusiasts to visualize, learn, and test LIFO (Last-In, First-Out) Stack operations, algorithms, real-world dual-stack applications, and interactive challenges.

---

## 🌟 Key Features

### 1. Interactive Stack Simulator
- **Core Operations**: `Push`, `Pop`, `Peek` (Top element highlight), and `Clear Stack`.
- **Dynamic Capacity Control**: Set custom maximum stack sizes (3 to 15 items) with immediate overflow/underflow warnings.
- **Audio Feedback**: Built-in Web Audio API sound synthesis for Push (ascending chord pitch), Pop (descending pop tone), Overflow (warning chime), and Underflow (buzz alert) with mute toggle.
- **Execution Log Trace**: Step-by-step history log detailing timestamped operations, pointers, and memory state changes.
- **Speed & Playback**: Adjustable step animation speed with auto-step walkthrough.

### 2. Theoretical Concepts & Code Reference
- **Comprehensive Theory**: LIFO mechanics, Top pointer behavior, and memory alignment explanation.
- **Complexity Analysis**: Time ($O(1)$) and Space ($O(N)$) complexity tables for standard stack operations.
- **Multi-Language Snippets**: Ready-to-copy standard stack implementations in **C++**, **Python**, and **JavaScript**.
- **Pros & Cons Breakdown**: Analysis of static array-based vs dynamic linked-list stack implementations.

### 3. Real-World Dual-Stack Demonstrations
- **Browser History**: Interactive back and forward navigation powered by two separate stacks.
- **Text Editor Undo & Redo**: Real-time snapshot history stack allowing step-by-step state restoration.
- **Parentheses Syntax Checker**: Compiler bracket matching validation (`()`, `[]`, `{}`) with real-time stack tracking.
- **Function Call Stack**: Recursive `factorial(n)` execution visualization showing stack frames pushed and unwound.

### 4. Quiz & Challenge Modes
- **Knowledge Quiz**: Multi-choice questions with instant scoring, difficulty tags, and detailed explanations.
- **Interactive Challenges**: Puzzle levels requiring users to reconstruct specific stack configurations within move limits.

---

## 🛠️ Tech Stack

- **Frontend**: React 18+, TypeScript, Vite
- **Styling**: Tailwind CSS, Glassmorphism UI components, Dark & Light Mode themes
- **Animations**: `motion` (Framer Motion)
- **Icons**: Lucide React (`lucide-react`)
- **Audio**: Custom Web Audio API Synthesizer (`/src/utils/audio.ts`)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0 or higher)
- npm or yarn

### Installation

1. Clone or download the repository.
2. Install project dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

---

## 📁 Project Structure

```
.
├── .github/workflows/      # Automated GitHub Pages CI/CD workflow
│   └── deploy.yml
├── index.html              # Main HTML entry point
├── package.json            # Project dependencies and scripts
├── GITHUB_PAGES_GUIDE.md   # Detailed GitHub Pages Publishing Guide
├── src/
│   ├── main.tsx            # Application React entry point
│   ├── App.tsx             # Main App layout and tab routing
│   ├── index.css           # Global Tailwind CSS styles and glass effects
│   ├── types.ts            # Global TypeScript interfaces
│   ├── components/
│   │   ├── Navbar.tsx      # Header navigation and theme toggle
│   │   ├── Visualizer.tsx  # Interactive stack canvas & controls
│   │   ├── TheorySection.tsx    # Complexity tables & code snippets
│   │   ├── ApplicationsSection.tsx # Real-world stack demos
│   │   ├── QuizSection.tsx      # Interactive CS quiz lab
│   │   ├── ChallengeSection.tsx # Puzzle challenge modes
│   │   └── Footer.tsx      # Application footer
│   ├── data/
│   │   └── stackData.ts    # Theory, quiz questions, challenges data
│   └── utils/
│       └── audio.ts        # Web Audio API sound synthesizer
└── standalone/             # Standalone vanilla HTML/CSS/JS export
    ├── index.html
    ├── style.css
    └── script.js
```

---

## 🚀 GitHub Pages Publishing

This project is pre-configured for automated single-click deployment to **GitHub Pages**.

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to Repository **Settings** → **Pages**.
   - Under **Source**, select **GitHub Actions**.

The included `.github/workflows/deploy.yml` workflow will automatically build and publish the live site whenever you push to `main`.

For complete instructions (including `gh-pages` CLI and Standalone modes), refer to the [GitHub Pages Publishing Guide](GITHUB_PAGES_GUIDE.md).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
