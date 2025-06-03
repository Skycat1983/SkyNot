// Function to detect if Google is using dark theme
export const detectDarkTheme = (): boolean => {
  // Method 1: Check system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Method 2: Check Google's body background color
  const bodyStyles = window.getComputedStyle(document.body);
  const bodyBgColor = bodyStyles.backgroundColor;

  // Method 3: Check if Google has dark theme classes/attributes
  const htmlElement = document.documentElement;
  const bodyElement = document.body;

  // Google uses these indicators for dark mode
  const darkModeIndicators = [
    htmlElement.getAttribute("data-dark") === "true",
    bodyElement.classList.contains("srp-dark"),
    bodyElement.classList.contains("dark"),
    htmlElement.classList.contains("dark"),
    // Check if any parent has dark theme class
    document.querySelector('[data-dark="true"]') !== null,
    document.querySelector(".dark") !== null,
  ];

  const hasGoogleDarkClass = darkModeIndicators.some((indicator) => indicator);

  // Method 4: Check center column background color as fallback
  const centerCol = document.getElementById("center_col");
  let centerColDark = false;
  if (centerCol) {
    const centerStyles = window.getComputedStyle(centerCol);
    const centerBg = centerStyles.backgroundColor;
    console.log("Center column background:", centerBg);

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
  console.log("Final dark theme detection:", isDark);

  return isDark;
};
