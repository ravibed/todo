


# 📋 Workspace Board - Kanban Todo App

A beautiful, responsive Kanban-style task management application built with **Nuxt 3**, **Vue 3 Composition API**, and **Tailwind CSS**. Organize your tasks across three columns (To Do, In Progress, Done) with drag-and-drop functionality, task assignments, and automatic data persistence.

![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&logoColor=white)
![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-4-2C8EBB?logo=yarn&logoColor=white)

---

## ✨ Features

- ✅ **Add Tasks** — Create new tasks with a title and assignee
- ✏️ **Edit Tasks** — Click the pencil icon to edit task text and assignee inline
- 🗑️ **Delete Tasks** — Remove individual tasks or clear all completed ones at once
- 🔄 **Drag & Drop** — Move tasks between columns by dragging
- 👤 **Assign to Team Members** — Each task can be assigned to a person with a unique colored avatar
- 🎨 **Color-Coded Columns** — White (To Do), Yellow (In Progress), Green (Done)
- 💾 **Auto-Save** — Tasks persist in localStorage and survive page reloads
- 📱 **Fully Responsive** — Works beautifully on mobile, tablet, and desktop
- ✨ **Smooth Animations** — Fade transitions when adding, moving, or deleting tasks
- 🎯 **Quick Actions** — Move buttons on each card for keyboard-only users

---

## 🛠️ Tech Stack

- **[Nuxt 3](https://nuxt.com/)** — Vue meta-framework with auto-imports and SSR
- **[Vue 3](https://vuejs.org/)** — Progressive JavaScript framework (Composition API)
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first CSS framework
- **[Yarn](https://yarnpkg.com/)** — Package manager

---

## 📋 Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js** — version 18.x or higher ([Download here](https://nodejs.org/))
- **Yarn** — version 1.22 or higher, or Yarn 4 via Corepack
- **Git** — for cloning the repository ([Download here](https://git-scm.com/))

Check your versions:

\`\`\`bash
node --version    # Should be v18.0.0 or higher
yarn --version    # Should be 1.22+ or 4.x
git --version     # Any recent version
\`\`\`

---

## 🚀 Getting Started

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/todo.git
cd todo
\`\`\`

### 2. Configure Yarn (Important for Yarn 4 users)

If you're using Yarn 4, set the node linker to avoid PnP issues:

\`\`\`bash
yarn config set nodeLinker node-modules
\`\`\`

### 3. Install Dependencies

\`\`\`bash
yarn install
\`\`\`

### 4. Start the Development Server

\`\`\`bash
yarn dev
\`\`\`

The app will be available at **[http://localhost:3000](http://localhost:3000)**

### 5. Build for Production

\`\`\`bash
yarn build
\`\`\`

### 6. Preview Production Build

\`\`\`bash
yarn preview
\`\`\`

---

## 📁 Project Structure

\`\`\`
todo/
├── app/
│   ├── components/
│   │   ├── TodoHeader.vue      # Top bar with logo and avatar
│   │   ├── TodoInput.vue       # "Create issue" card with task + assignee inputs
│   │   ├── TodoItem.vue        # Individual task card with edit/move/delete
│   │   ├── TodoList.vue        # Kanban board with 3 columns
│   │   └── TodoStats.vue       # Stats cards (To Do / In Progress / Done counters)
│   ├── pages/
│   │   └── index.vue           # Main page — all state logic lives here
│   └── app.vue                 # Root component with global styles
├── public/                     # Static assets
├── nuxt.config.ts              # Nuxt configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # You are here!
\`\`\`

---

---

## 🎯 How to Use the App

### Adding a Task

1. Type your task description in the **"What needs to be done?"** input field
2. (Optional) Enter the assignee's name in the **"Assigned to..."** field
3. Click the **+ Create** button or press Enter
4. Your task appears in the **To Do** column

### Moving Tasks Between Columns

You have two ways to move tasks:

**Option 1: Drag & Drop**
- Click and hold any task card
- Drag it into another column
- Release to drop it

**Option 2: Quick Action Buttons**
- Each card has buttons like `→ Progress`, `✓ Done`, `← To Do`
- Click any button to instantly move the task

### Editing a Task

1. Hover over any task card
2. Click the **pencil icon** (appears in the top-right of the card)
3. Edit the task text and/or assignee name
4. Click **✓ Save** or press **Ctrl+Enter** (Cmd+Enter on Mac)
5. Click **Cancel** or press **Esc** to discard changes

### Deleting a Task

- Click the **🗑 (trash)** button on any individual task card
- Or click **🗑 Clear done** at the top of the board to delete all completed tasks at once

### Data Persistence

- All tasks are automatically saved to your browser's **localStorage**
- Refresh the page — your tasks will still be there
- Data is stored locally on your device (not on any server)
- Each browser/device maintains its own separate task list

---

## 🎨 Column Color Guide

| Column | Color Theme | Purpose |
|--------|-------------|---------|
| 🔵 **To Do** | White with blue accents | Newly created tasks waiting to be started |
| 🟡 **In Progress** | Yellow/amber gradient | Tasks currently being worked on |
| 🟢 **Done** | Green/emerald gradient | Completed tasks (shown with strikethrough) |

---

## 👥 Assignee Avatars

Each person assigned to a task gets a unique, consistent gradient color generated from their name:

- Names are converted to initials (e.g., "John Doe" → "JD")
- The color is hashed from the name, so "Alice" always gets the same color
- Unassigned tasks show a gray "?" avatar

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Submit the new task form |
| `Ctrl + Enter` / `Cmd + Enter` | Save edits when editing a task |
| `Esc` | Cancel editing a task |

---

## 🐛 Troubleshooting

### "Cannot find module" errors on install

Make sure you've set the Yarn linker:
```bash
yarn config set nodeLinker node-modules
rm -rf node_modules .yarn
yarn install
```

### Dev server fails to start

Clear the Nuxt cache:
```bash
# Windows
rmdir /s /q .nuxt

# Mac/Linux
rm -rf .nuxt

yarn dev
```

### Tasks disappear after refresh

Make sure your browser allows localStorage for `localhost`. Check:
- DevTools (F12) → Application tab → Local Storage
- Look for the key `workspace-board-tasks`
- If blocked, check your browser's privacy settings

### Port 3000 already in use

Start on a different port:
```bash
yarn dev --port 3001
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start the development server at http://localhost:3000 |
| `yarn build` | Build the app for production |
| `yarn preview` | Preview the production build locally |
| `yarn generate` | Generate a static version of the app |

---

## 🏗️ Architecture Decisions

- **Composition API** — All components use `<script setup>` for a cleaner, more modern syntax
- **Auto-imports** — Nuxt auto-imports `ref`, `computed`, `watch`, `onMounted`, and components (no manual imports needed)
- **Single source of truth** — All state lives in `pages/index.vue` and flows down via props
- **Event-driven** — Child components emit events; parent handles state mutations
- **localStorage watcher** — A deep watch on the tasks array auto-saves every change
- **SSR-safe** — `import.meta.client` checks prevent localStorage errors during server rendering

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Ravikumar Bed**

- 📧 Email: [ravi.bed@outlook.com](mailto:ravi.bed@outlook.com)
- 💼 GitHub: [@ravibed](https://github.com/ravibed)

---

## 🙏 Acknowledgments

- Built with [Nuxt 3](https://nuxt.com/) and [Vue 3](https://vuejs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from inline SVG and emoji

---

**⭐ If you found this project helpful, please consider giving it a star on GitHub!**

Made with ❤️ by **Ravikumar Bed**