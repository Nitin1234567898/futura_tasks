# Futura Tasks UI Prompts

This README contains the exact prompts used to implement each major visual, interaction, and product system in this app.

---

## Background Prompt (Interactive Futuristic Field)

Create a fullscreen, futuristic, interactive background similar in spirit to Google’s “Antigravity” vibe. Use a canvas that renders a dense field of glowing particles and subtle connecting lines. The particles should repel away from the mouse cursor with a noticeable force and then smoothly return to their original “home” positions after the cursor moves away. The interaction must feel snappy but smooth. The background should sit behind all UI, be animated continuously, and use a deep blue/black gradient atmosphere.

---

## Glass Buttons and Tabs Prompt (iOS Glassmorphism)

Design all buttons and UI panels using a glassmorphism style similar to iOS: translucent layers, soft blur, thin frosted borders, and subtle glow on hover. Buttons should have rounded corners, slight elevation, and a vivid neon accent on hover. Tabs/panels should feel like floating glass cards with a faint gradient sheen and light reflection. Keep text crisp, and avoid heavy drop shadows.

---

## Text and Font Style Prompt (Futuristic Typographic System)

Use a futuristic, editorial type system: bold display headlines with a geometric sans (e.g., Syne) and readable body copy with a clean, modern sans (e.g., Space Grotesk). Add generous letter spacing to small labels, use all-caps for labels, and keep body copy slightly muted to emphasize hierarchy. The typography should feel precise, cinematic, and minimal, aligned with a high-tech control-panel aesthetic.

---

## Task Management Structure Prompt (Baskets and Tasks)

Build a task management UI where users can create any number of baskets (groups). Each basket can contain any number of tasks. Users must be able to add baskets, add tasks within a basket, check tasks complete, and see per-basket progress. Display overall stats for total tasks, completed tasks, and number of active baskets.

---

## Task and Basket Deletion Prompt

Allow deletion of individual tasks within a basket and deletion of entire baskets. Deleting a basket should remove its tasks and any associated input state. Deletion controls should be compact and glass-styled to match the UI.

---

## Persistence Prompt (Local Storage)

Persist all baskets and tasks to localStorage. On first load, initialize from storage if available; otherwise, seed with a starter basket. On any change, update localStorage so data survives refresh.

---

## Confetti Prompt (Per-Task Completion)

When a task is checked complete, trigger a confetti burst originating from the cursor position. Use a lightweight canvas-based effect layered above the UI without blocking interaction.

---

## Group Completion Overlay Prompt

When all tasks in a basket are completed, display a full-screen futuristic celebration overlay. Include a glass card with a “You completed the task! Well done.” message and the basket name, plus animated rings/grid effects. The overlay should auto-dismiss after a short duration.

---

## Layout Prompt (Corner Docked Controls)

Move the basket creation panel into a compact corner dock alongside the stat cards, so the center of the screen remains visually open and the background is emphasized. The main basket grid should avoid overlapping the dock, and on smaller screens the dock should stack above content.
