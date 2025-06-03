import { AI_CONTAINER_SELECTOR } from "./constants";

export const findAIContainer = (): HTMLElement | null => {
  const aiContainer = document.querySelector<HTMLElement>(
    AI_CONTAINER_SELECTOR
  );
  console.log("AI container search result:", aiContainer);
  return aiContainer;
};

export const clearAIContainer = (container: HTMLElement): void => {
  console.log("Clearing AI container content");
  container.innerHTML = "";
};

export const replaceAIContent = (
  container: HTMLElement,
  newContent: HTMLElement
): void => {
  clearAIContainer(container);
  container.appendChild(newContent);
  console.log("AI content replaced with custom content");
};

export const waitForAIContainer = (
  callback: (container: HTMLElement) => void,
  timeout: number = 10000
): void => {
  console.log("WAITING FOR AI CONTAINER TO APPEAR...");
  console.log("WAITING FOR AI CONTAINER TO APPEAR...");
  console.log("WAITING FOR AI CONTAINER TO APPEAR...");

  const startTime = Date.now();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;

            // Check if this node IS the AI container
            if (element.matches && element.matches(AI_CONTAINER_SELECTOR)) {
              console.log("🎯 AI container appeared (direct match)", element);
              observer.disconnect();
              callback(element as HTMLElement);
              return;
            }

            // Check if this node CONTAINS the AI container
            const aiContainer = element.querySelector(
              AI_CONTAINER_SELECTOR
            ) as HTMLElement;
            if (aiContainer) {
              console.log("🎯 AI container appeared (nested)");
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
      console.log("AI container wait timeout reached");
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};
