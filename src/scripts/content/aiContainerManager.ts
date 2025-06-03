// ──────────────────────────────────────────────────────────────────────────
// AI Container Detection and Management
// ──────────────────────────────────────────────────────────────────────────

/*
Handles finding, clearing, and replacing Google's AI content containers.
Uses DOM selectors and mutation observers to detect dynamic AI content.
*/

import { AI_CONTAINER_SELECTOR } from "./constants";

/*
Searches for existing AI container in the current DOM.
Invoked by: initContentScript() to check for immediate AI content
*/
export const findAIContainer = (): HTMLElement | null => {
  const aiContainer = document.querySelector<HTMLElement>(
    AI_CONTAINER_SELECTOR
  );
  return aiContainer;
};

/*
Clears all content from an AI container element.
Invoked by: replaceAIContent() before inserting quote content
*/
export const clearAIContainer = (container: HTMLElement): void => {
  container.innerHTML = "";
};

/*
Replaces AI container content with Terminator quote element.
Invoked by: processAIContainer() to swap AI content for quotes
*/
export const replaceAIContent = (
  container: HTMLElement,
  newContent: HTMLElement
): void => {
  clearAIContainer(container);
  container.appendChild(newContent);
};

/*
Sets up mutation observer to watch for dynamically loaded AI containers.
This is necessary because the AI container is loaded asynchronously.
Invoked by: initContentScript() when no immediate AI container found
*/
export const waitForAIContainer = (
  callback: (container: HTMLElement) => void,
  timeout: number = 10000
): void => {
  const startTime = Date.now();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;

            // Check if this node IS the AI container
            if (element.matches && element.matches(AI_CONTAINER_SELECTOR)) {
              observer.disconnect();
              callback(element as HTMLElement);
              return;
            }

            // Check if this node CONTAINS the AI container
            const aiContainer = element.querySelector(
              AI_CONTAINER_SELECTOR
            ) as HTMLElement;
            if (aiContainer) {
              observer.disconnect();
              callback(aiContainer);
              return;
            }
          }
        });
      }
    });

    // Timeout check
    if (Date.now() - startTime > timeout) {
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};
