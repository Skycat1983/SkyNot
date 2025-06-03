// ──────────────────────────────────────────────────────────────────────────
// Popup Entry Point
// ──────────────────────────────────────────────────────────────────────────

/*
Main entry point for the SkyNot extension popup interface.
Initializes the terminate button when popup DOM is ready.
*/

import { initializeButton } from "./button";

/*
Initializes popup interface components.
Invoked by: DOMContentLoaded event when popup opens
*/
async function initialise() {
  await initializeButton();
}

document.addEventListener("DOMContentLoaded", initialise);
