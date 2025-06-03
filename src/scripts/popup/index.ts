import { initializeButton } from "./button";

async function initialise() {
  await initializeButton();
}

document.addEventListener("DOMContentLoaded", initialise);
