// ──────────────────────────────────────────────────────────────────────────
// Google Theme Detection System
// ──────────────────────────────────────────────────────────────────────────

/*
Detects whether Google is using light or dark theme to adapt quote styling.
Uses multiple detection methods: CSS classes, background colors, and system preferences.
Ensures quote cards match Google's current theme 
*/

/*
Analyzes page elements to determine if Google is in dark mode.
Invoked by: createCard() to set appropriate colors for quotes
*/
export const detectDarkTheme = (): boolean => {
  // Check system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Check Google's body background color
  const bodyStyles = window.getComputedStyle(document.body);
  const bodyBgColor = bodyStyles.backgroundColor;

  // Check if Google has dark theme classes/attributes
  const htmlElement = document.documentElement;
  const bodyElement = document.body;

  // Google uses these indicators for dark mode
  const darkModeIndicators = [
    htmlElement.getAttribute("data-dark") === "true",
    bodyElement.classList.contains("srp-dark"),
    bodyElement.classList.contains("dark"),
    htmlElement.classList.contains("dark"),
    document.querySelector('[data-dark="true"]') !== null,
    document.querySelector(".dark") !== null,
  ];

  const hasGoogleDarkClass = darkModeIndicators.some((indicator) => indicator);

  // Check center column background color as fallback
  const centerCol = document.getElementById("center_col");
  let centerColDark = false;
  if (centerCol) {
    const centerStyles = window.getComputedStyle(centerCol);
    const centerBg = centerStyles.backgroundColor;

    // Parse RGB values to determine if background is dark
    const rgbMatch = centerBg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch.map(Number);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      centerColDark = brightness < 128; // Dark if brightness < 128
    }
  }

  // Combine all methods - prioritize Google's own indicators
  const isDark =
    hasGoogleDarkClass ||
    centerColDark ||
    (prefersDark && !bodyBgColor.includes("255"));

  return isDark;
};
