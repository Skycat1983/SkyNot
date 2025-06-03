// ──────────────────────────────────────────────────────────────────────────
// Extension Image URL Helper
// ──────────────────────────────────────────────────────────────────────────

/*
Provides proper image URL resolution for extension assets.
Solves problem of images not loading in the extension due to the relative path.
Uses browser.runtime.getURL() to convert relative paths to extension URLs.
Handles fallbacks for environments where browser API isn't available.
*/

declare const browser: any;

/*
Converts relative image paths to proper extension URLs.
Invoked by: createCard() when setting avatar src attribute
*/
export const getExtensionImageURL = (imagePath: string): string => {
  try {
    // Use browser.runtime.getURL directly (same as CSS injection)
    if (browser?.runtime?.getURL) {
      const url = browser.runtime.getURL(imagePath);
      return url;
    } else {
      return imagePath;
    }
  } catch (error) {
    console.error("❌ Failed to get extension image URL:", error);
    return imagePath;
  }
};
