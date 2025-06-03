import { getRandomQuote } from "./quoteSelector";
import { createQuoteElement, getQuoteTextElement } from "./domBuilder";
import {
  findAIContainer,
  replaceAIContent,
  waitForAIContainer,
} from "./aiContainerManager";
import { typeText } from "./typeText";
import { testExtensionAPI } from "./imageHelper";
import { isExtensionEnabled } from "./settings";

const processAIContainer = (container: HTMLElement): void => {
  console.log("Processing AI container:", container);

  // 1. Get a random quote
  const selectedQuote = getRandomQuote();
  console.log("Selected quote:", selectedQuote.quote.substring(0, 50) + "...");

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

const init = async (): Promise<void> => {
  console.log("SkyNot initializing...");

  // Check if extension is enabled - single check at entry point
  const extensionEnabled = await isExtensionEnabled();
  if (!extensionEnabled) {
    console.log("SkyNot is disabled - extension will not modify the page");
    return;
  }

  console.log("SkyNot is enabled - proceeding with initialization");

  // Test extension API availability
  testExtensionAPI();

  // Try to find AI container immediately
  const aiContainer = findAIContainer();
  console.log("AI container in init:", aiContainer);

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
  console.log("DOM still loading - waiting for DOMContentLoaded");
  document.addEventListener("DOMContentLoaded", init);
} else {
  console.log("DOM already loaded - running init immediately");
  init();
}
