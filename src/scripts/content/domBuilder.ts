// ──────────────────────────────────────────────────────────────────────────
// Quote Card DOM Builder
// ──────────────────────────────────────────────────────────────────────────

/*
Creates styled HTML elements for displaying Terminator quotes.
Uses card-two-column layout with avatar on left and quote/author on right.
Adapts styling based on light/dark theme detection.
*/

import { Quote } from "./quoteSelector";
import { detectDarkTheme } from "./themeCheck";
import { getExtensionImageURL } from "./imageHelper";

export interface LayoutConfig {
  variant: "card-two-column";
}

/*
Creates a styled card element containing quote, author, and avatar.
Invoked by: createQuoteElement() to build the visual quote representation
*/
export const createCard = (quote: Quote): HTMLDivElement => {
  const isDarkTheme = detectDarkTheme();
  const textColor = isDarkTheme ? "#ffffff" : "#222222";
  const authorColor = isDarkTheme ? "#cccccc" : "#666666";
  const cardBg = isDarkTheme ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";

  // ── 1. Card wrapper ─────────────────────────────────────────────────
  const wrapper = document.createElement("div");
  wrapper.style.padding = "20px";
  wrapper.style.fontFamily = "sans-serif";
  wrapper.style.color = textColor;
  wrapper.style.backgroundColor = cardBg;
  wrapper.style.borderRadius = "8px";
  wrapper.style.border = isDarkTheme
    ? "1px solid rgba(255,255,255,0.1)"
    : "1px solid rgba(0,0,0,0.1)";
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "row";

  wrapper.style.gap = "16px";

  // ── 2. Left column: Avatar ────────────────────────────────────────────
  const avatarContainer = document.createElement("div");
  avatarContainer.style.flexShrink = "0";

  avatarContainer.style.display = "flex";
  avatarContainer.style.alignItems = "center";

  const avatar = document.createElement("img");
  avatar.src = getExtensionImageURL(quote.avatar);
  avatar.alt = quote.author;
  avatar.style.width = "48px";
  avatar.style.height = "48px";
  avatar.style.borderRadius = "50%";
  avatar.style.objectFit = "cover";
  avatar.style.border = isDarkTheme ? "2px solid #444" : "2px solid #ddd";

  avatarContainer.appendChild(avatar);

  // ── 3. Right column: Text ─────────────────────────────────────────────
  const textContainer = document.createElement("div");
  textContainer.style.display = "flex";
  textContainer.style.flexDirection = "column";
  textContainer.style.justifyContent = "space-around";
  textContainer.style.flex = "1";

  // ── 4. Quote text ─────────────────────────────────────────────────────
  const quoteEl = document.createElement("div");
  quoteEl.style.whiteSpace = "pre-wrap";
  quoteEl.setAttribute("data-quote-text", "true");
  quoteEl.style.fontSize = "16px";
  quoteEl.style.lineHeight = "1.4";
  quoteEl.style.textAlign = "left";
  quoteEl.textContent = quote.quote;

  // ── 5. Author ─────────────────────────────────────────────────────────
  const authorEl = document.createElement("div");
  authorEl.style.fontSize = "0.7rem";
  authorEl.style.color = authorColor;
  authorEl.style.fontWeight = "500";
  authorEl.style.textAlign = "left";
  authorEl.textContent = quote.author;

  // ── 6. Assemble ────────────────────────────────────────────────────────
  textContainer.appendChild(quoteEl);
  textContainer.appendChild(authorEl);
  wrapper.appendChild(avatarContainer);
  wrapper.appendChild(textContainer);

  return wrapper;
};

/*
Main entry point for creating quote elements.
Invoked by: processAIContainer() to create styled quote replacement
*/
export const createQuoteElement = (quote: Quote): HTMLDivElement => {
  return createCard(quote);
};

/*
Extracts the quote text element for typing animation.
Invoked by: processAIContainer() to get element for typeText animation
*/
export const getQuoteTextElement = (
  wrapper: HTMLDivElement
): HTMLDivElement | null => {
  return wrapper.querySelector('[data-quote-text="true"]') as HTMLDivElement;
};
