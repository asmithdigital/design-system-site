# Design System Documentation Site

A documentation site for the design system, built with Vite and React. It reads component, token, and foundation data from JSON files and renders a fully navigable documentation experience — including component pages, design token references, usage guidelines, and live search.

## How to run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173/design-system-site/](http://localhost:5173/design-system-site/) in your browser.

## How to update the data

All content lives in the `/data` folder. The three JSON files are the single source of truth for everything the site displays:

- `data/components.json` — all component documentation (variants, properties, tokens used, usage guidelines, code snippets)
- `data/tokens.json` — colour, typography, and spacing tokens
- `data/foundations.json` — foundation pages (Design Principles, Grid & Layout, Accessibility)

Edit any of these files and push to `main` — the site will automatically rebuild and deploy via GitHub Actions.

## How to add a new component

1. Open `data/components.json`
2. Copy an existing component object (e.g. the `primary-button` entry)
3. Change the `id` to a unique kebab-case string (e.g. `"tooltip"`)
4. Update all fields: `name`, `category`, `subcategory`, `description`, `status`, `lastUpdated`, `variants`, `properties`, `tokens`, `usage`, `figmaNodeId`, and `codeSnippet`
5. Add a link to the new component in `src/components/Sidebar.jsx` under the appropriate subcategory
6. Save and push to `main` — the site will rebuild automatically

## How to deploy

GitHub Pages deployment is already configured. Every push to the `main` branch triggers a build via GitHub Actions and publishes the output to the `gh-pages` branch.

The site is live at: **[https://asmithdigital.github.io/design-system-site/](https://asmithdigital.github.io/design-system-site/)**

To set this up on a fresh fork:
1. Go to **Settings → Pages** in the GitHub repo
2. Under **Source**, select **Deploy from a branch**
3. Set branch to `gh-pages`, folder to `/ (root)`
4. Click **Save**

## Tech stack

- **[Vite](https://vitejs.dev/)** — build tool and dev server
- **[React](https://react.dev/)** — UI framework
- **[React Router](https://reactrouter.com/)** — client-side routing
- **[GitHub Pages](https://pages.github.com/)** — static hosting, deployed automatically on push to `main`
