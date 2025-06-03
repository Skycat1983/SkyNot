// ──────────────────────────────────────────────────────────────────────────
// Main Content Script Entry Point
// ──────────────────────────────────────────────────────────────────────────

/*
Main entry point for the SkyNot content script that runs on Google pages.
Initializes the extension, checks settings, and replaces AI content with quotes.
*/

import { getRandomQuote } from "./quoteSelector";
import { createQuoteElement, getQuoteTextElement } from "./domBuilder";
import {
  findAIContainer,
  replaceAIContent,
  waitForAIContainer,
} from "./aiContainerManager";
import { typeText } from "./typeText";
import { isExtensionEnabled } from "./settings";

/*
Processes found AI container by replacing content with Terminator quote.
Invoked by: initContentScript() when container found, or waitForAIContainer() callback
*/
const processAIContainer = (container: HTMLElement): void => {
  // 1. Get a random quote
  const selectedQuote = getRandomQuote();

  // 2. Create styled quote element
  const quoteElement = createQuoteElement(selectedQuote);

  // 3. Replace AI content with our quote
  replaceAIContent(container, quoteElement);

  // 4. Start typing animation
  const quoteTextEl = getQuoteTextElement(quoteElement);
  if (quoteTextEl) {
    typeText(quoteTextEl, selectedQuote.quote, 50);
  }
};

/*
Main initialization function that checks settings and starts extension.
Invoked by: DOMContentLoaded event or immediately if DOM ready
*/
const initContentScript = async (): Promise<void> => {
  const extensionEnabled = await isExtensionEnabled();
  if (!extensionEnabled) {
    return;
  }

  // Try to find AI container immediately
  const aiContainer = findAIContainer();

  if (aiContainer) {
    // Container found immediately
    processAIContainer(aiContainer);
  } else {
    // Wait for container to appear
    waitForAIContainer(processAIContainer);
  }
};

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContentScript);
} else {
  initContentScript();
}
