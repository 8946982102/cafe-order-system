# Pinecrest Hill Station Cafe & Juicery

GitHub Pages-ready Vite/React website.

## Upload to GitHub

1. Create a new GitHub repository.
2. Extract this ZIP.
3. Upload **all files and folders inside this ZIP directly into the repository root**.
   - `index.html`, `package.json`, `src/`, `.github/`, etc. must be at the root.
   - Do NOT upload the ZIP itself.
   - Do NOT create an extra `pinecrest.../` folder inside the repository.
4. Commit/push to the `main` branch.
5. Open **Settings → Pages** in the repository.
6. Under **Build and deployment → Source**, select **GitHub Actions**.
7. The included `.github/workflows/deploy.yml` will build the site and deploy it automatically.
8. After the Actions workflow finishes, open the Pages URL shown by GitHub.

## Important

This is a React/Vite project, so GitHub must build it before serving it. Do not select the old
"Deploy from a branch / root folder" option for the source files. Use **GitHub Actions** as described above.

The Vite config uses a relative base (`./`) so the built assets work correctly on a GitHub Pages project URL.

## Local run

Requires Bun:

```bash
bun install
bun run dev
```

Build:

```bash
bun run build
```
