# One-Run Prompt For Applying This Design To An Existing Multi-Page Web App

Copy and paste the prompt below into your preferred coding assistant. It is written to work in one run, with explicit confirmation points between pages. It includes the full design specification plus implementation instructions.

---

## Exact Prompt

You are a coding agent. Apply the "Futura Tasks" visual system and interactive background to my existing multi-page web app. Do this end-to-end in one run with confirmation checkpoints between pages. Assume you have full access to the repo. First, detect the tech stack and follow its conventions. This prompt is primarily for React and React+Vite apps, so default to common React conventions (e.g., `src/components/`, `src/features/`, `src/layouts/`, `src/styles/`) unless the repo already uses a different structure. Implement new UI features as reusable components or feature modules (not directly inside a root file like `App.jsx`) so the system is easy to debug and maintain.

Overall goals:
1. Apply the futuristic interactive background (canvas particles + lines reacting to cursor) across all pages.
2. Apply glassmorphism UI styling to buttons, cards, tabs, and panels everywhere.
3. Apply the typography system (headlines + body fonts, spacing, and label styles) to all pages.
4. Apply the animation system (hover glows, confetti on completion events where relevant, and a full-screen completion overlay for group-level completion flows) across the app where it fits the existing UI semantics.
5. Ensure the changes are consistent across all routes, components, and layouts.

Constraints:
- Do not remove any existing functionality.
- Preserve all data flows and logic.
- Only change styling, layout, and add background/animation layers.
- The background must be behind all UI and never block interaction.
- The UI must stay responsive across mobile and desktop.
- The background, button styles, and animation effects must be implemented as reusable components or feature modules, not inside a root file like `App.jsx`.
- Prefer creating files such as:
  - `src/components/BackgroundCanvas.jsx`
  - `src/components/GlassButton.jsx`
  - `src/components/GlassCard.jsx`
  - `src/features/confetti/ConfettiCanvas.jsx`
  - `src/features/completion/CompletionOverlay.jsx`
  - `src/styles/theme.css` or `src/styles/glass.css`
  Adjust names to match the repo's existing conventions.

Design specification (apply to all pages):

Background (Interactive Futuristic Field)
- Create a fullscreen, futuristic, interactive background similar in spirit to Google's "Antigravity" vibe.
- Use a canvas that renders a dense field of glowing particles and subtle connecting lines.
- Particles should repel away from the mouse cursor with a noticeable force and then smoothly return to their original "home" positions after the cursor moves away.
- The interaction must feel snappy but smooth.
- The background should sit behind all UI, be animated continuously, and use a deep blue/black gradient atmosphere.

Glass Buttons and Tabs (iOS Glassmorphism)
- Design all buttons and UI panels using a glassmorphism style similar to iOS: translucent layers, soft blur, thin frosted borders, and subtle glow on hover.
- Buttons should have rounded corners, slight elevation, and a vivid neon accent on hover.
- Tabs/panels should feel like floating glass cards with a faint gradient sheen and light reflection.
- Keep text crisp, and avoid heavy drop shadows.

Text and Font Style (Futuristic Typographic System)
- Use a futuristic, editorial type system: bold display headlines with a geometric sans (e.g., Syne) and readable body copy with a clean, modern sans (e.g., Space Grotesk).
- Add generous letter spacing to small labels, use all-caps for labels, and keep body copy slightly muted to emphasize hierarchy.
- The typography should feel precise, cinematic, and minimal, aligned with a high-tech control-panel aesthetic.

Animations and Celebrations
- Add hover glows and soft lift on interactive elements.
- Confetti: when a "task completed" or similar completion event exists, trigger a confetti burst from the cursor position.
- Completion overlay: when an entire group/section is completed, show a full-screen futuristic overlay with a glass card message and animated rings/grid effects, then auto-dismiss.

Layout guidance:
- Keep core content readable and centered, but allow the background to remain visible.
- Use floating glass cards/panels so the background shows through.
- Avoid heavy opaque sections that cover the entire screen.

Step-by-step tasks:

Step 1: Discovery and planning
- Scan the repo, detect the tech stack, and identify the routing/layout system and entry points.
- Identify all pages and shared layout components.
- Identify where global styles live and how CSS is organized.
- List the files you will change.
- Ask for confirmation before editing.

Step 2: Global visual system
- Add/extend global CSS variables for colors, glass surfaces, borders, and accent glows.
- Install and apply the typography stack:
  - Headline font: Syne (bold, futuristic)
  - Body font: Space Grotesk (readable modern)
- Define label styles (all caps, wide tracking) and muted body copy.
- Update global background gradient for the page body.
- Ask for confirmation before moving to per-page edits.

Step 3: Interactive background (all pages)
- Implement a reusable background canvas component/module with:
  - Dense glowing particles
  - Subtle connecting lines
  - Cursor-based repulsion
  - Smooth return to "home" positions
  - Snappy but smooth motion
- Mount it once in the top-level layout so it appears across all pages.
- Ensure it is fixed, full screen, and behind all UI.
- Ask for confirmation before continuing.

Step 4: Glassmorphism components
- Implement a reusable button/card/tabs system or shared style module, then apply glassmorphism styling to:
  - Buttons (primary, secondary, danger)
  - Cards/panels/tabs
  - Inputs and forms
- Add hover glows and subtle lift on hover.
- Keep borders thin and translucent.
- Ask for confirmation before page-by-page refinements.

Step 5: Page-by-page integration (repeat for each page)
For each page:
- Restyle layout blocks to align with the futuristic system.
- Add glass cards to main containers.
- Ensure typography hierarchy matches the system.
- Apply consistent spacing and density.
- Ensure the background remains visible and not fully covered.
- Ask for confirmation before moving to the next page.

Step 6: Animations and celebration effects
- Implement confetti and overlay effects as reusable components or feature modules.
- Add confetti bursts on completion actions where the app already has a "task done / completed" event.
- Add a full-screen completion overlay for group-level completion events.
- Ensure animations are layered above content but do not block controls.
- Ask for confirmation before finalizing.

Step 7: Final pass
- Ensure consistency across all pages and shared components.
- Validate responsiveness (mobile and desktop).
- Provide a concise summary of changes and files modified.
- Ask for final confirmation.

Deliverables:
- Updated layout with a global background canvas.
- Updated styles (CSS/SCSS/Tailwind/Styled Components - follow the project's existing approach).
- Updated components for glassmorphism, typography, and animations.
- Notes on any components that required special handling.

When you are ready, start with Step 1, list the files you will change, and ask for confirmation.
