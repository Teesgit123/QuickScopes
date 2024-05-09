# Project Structure

This is an outline of the directory and file structure for our Project

## Root Directory/Folder

- `/src`: Source files for the application, ie where our React components live.
  - `/components`: UI components.
    - `/Buttons`: Button components.
      - `Button.tsx`
      - `Button.css`
    - `/Navbar`: Navbar components.
      - `Navbar.tsx`
      - `Navbar.css`
  - `/pages`: Components representing pages.
    - `Home.tsx`
    - `About.tsx`
  - `/types`: Type definitions.
  - `/hooks`: Custom React hooks.
  - `/utils`: Utility functions.
  - `/services`: Services for external API interactions. Example: Stripe, Google Maps,
  - `App.tsx`: Main React component.
  - `index.tsx`: Entry point that renders React components.
  - `routes.tsx`: Routing definitions.
- `/public`: Static assets like HTML files and logos.
- `/node_modules`: Client dependencies.
- `tsconfig.json`: Client TypeScript configuration.
- `package.json`: Client metadata and dependencies
