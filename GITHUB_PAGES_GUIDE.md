# 🚀 GitHub Pages Publishing Guide

This guide provides step-by-step instructions for publishing the **Stack Visualizer Laboratory** application to **GitHub Pages**.

---

## 📋 Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Method 1: Deploy with GitHub Actions (Recommended)](#method-1-deploy-with-github-actions-recommended)
3. [Method 2: Deploy with `gh-pages` Package](#method-2-deploy-with-gh-pages-package)
4. [Method 3: Deploy Standalone Vanilla JS Version](#method-3-deploy-standalone-vanilla-js-version)
5. [Vite Configuration Notes](#vite-configuration-notes)
6. [Troubleshooting & FAQs](#troubleshooting--faqs)

---

## 1. Prerequisites

- A [GitHub](https://github.com) account.
- Git installed on your machine.
- Your project code pushed to a GitHub repository (e.g., `https://github.com/your-username/stack-visualizer`).

---

## Method 1: Deploy with GitHub Actions (Recommended)

This project includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`. Every time you push code to `main` or `master`, GitHub will automatically build and publish your site!

### Step 1: Push Project to GitHub

Initialize git and push your repository to GitHub:

```bash
git init
git add .
git commit -m "Initial commit - Stack Visualizer"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 2: Enable GitHub Pages in Repository Settings

1. Open your repository on **GitHub.com**.
2. Go to **Settings** → **Pages** (under Code and automation in the left sidebar).
3. Under **Build and deployment** → **Source**, select **GitHub Actions** from the dropdown menu.
4. Save the setting.

### Step 3: Trigger Deployment

1. Go to the **Actions** tab in your GitHub repository.
2. Select the **Deploy to GitHub Pages** workflow.
3. Click **Run workflow** (or simply push a new commit to `main`).
4. Once completed, your site URL will appear under **Settings** → **Pages** (typically `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`).

---

## Method 2: Deploy with `gh-pages` Package

If you prefer deploying manually from your local command line, you can use the `gh-pages` npm utility.

### Step 1: Install `gh-pages`

Run the following command in your terminal:

```bash
npm install --save-dev gh-pages
```

### Step 2: Add Scripts to `package.json`

Add `predeploy` and `deploy` scripts to your `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### Step 3: Configure Pages Source on GitHub

1. Go to your GitHub repository **Settings** → **Pages**.
2. Under **Source**, select **Deploy from a branch**.
3. Set the branch to `gh-pages` / `/(root)`.
4. Click **Save**.

### Step 4: Run Deploy Command

In your terminal, execute:

```bash
npm run deploy
```

This script will automatically compile your project and publish the `dist` folder to a `gh-pages` branch on GitHub.

---

## Method 3: Deploy Standalone Vanilla JS Version

This repository includes a zero-dependency standalone version in the `/standalone` folder (`index.html`, `style.css`, `script.js`).

If you want to host **only** the standalone version without a Node/React build step:

1. Go to GitHub repository **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
3. Select branch `main` (or `master`) and specify folder `/standalone` (or move the contents of `/standalone` to the root directory).
4. Click **Save**.

---

## Vite Configuration Notes

This project has been configured with relative asset loading in `vite.config.ts`:

```typescript
export default defineConfig(() => {
  return {
    base: './', // Ensures relative asset paths work seamlessly on GitHub Pages subpaths
    plugins: [react(), tailwindcss()],
  };
});
```

Using `base: './'` ensures that bundled JavaScript, CSS, and asset files correctly resolve regardless of whether your site is hosted at `username.github.io` or `username.github.io/repository-name/`.

---

## Troubleshooting & FAQs

### Q: Why do I see a blank page or 404 errors for JS/CSS files?
- **Fix**: Ensure `base: './'` is set in `vite.config.ts`. If using absolute paths, update `base: '/YOUR-REPO-NAME/'`.

### Q: GitHub Actions fails with "Permission denied"?
- **Fix**: Go to **Settings** → **Actions** → **General** → **Workflow permissions** and ensure **Read and write permissions** is selected.

### Q: How long does deployment take?
- GitHub Actions deployments typically complete within 1-2 minutes. Check the **Actions** tab on GitHub for real-time progress logs.

---

**Happy Publishing! 🚀**
