// =============================================================================
// IMAGE URL HELPER
// =============================================================================

/*
Get proper extension URLs for images, similar to how CSS injection works.
This uses browser.runtime.getURL() which should be available in content scripts.
*/

// Declare browser as global (it's provided by Firefox)
declare const browser: any;

export const getExtensionImageURL = (imagePath: string): string => {
  try {
    // Use browser.runtime.getURL directly (same as CSS injection)
    if (browser?.runtime?.getURL) {
      const url = browser.runtime.getURL(imagePath);
      console.log(`🖼️ Image URL resolved: ${imagePath} → ${url}`);
      return url;
    } else {
      console.warn(
        "⚠️ browser.runtime.getURL not available, using direct path"
      );
      return imagePath;
    }
  } catch (error) {
    console.error("❌ Failed to get extension image URL:", error);
    return imagePath;
  }
};

// Test function to verify extension API is working
export const testExtensionAPI = (): void => {
  console.log("🔍 Testing extension API availability:");

  try {
    console.log("browser available:", typeof browser);
    console.log("browser.runtime available:", !!browser?.runtime);
    console.log(
      "browser.runtime.getURL available:",
      typeof browser?.runtime?.getURL
    );

    if (browser?.runtime?.getURL) {
      const testUrl = browser.runtime.getURL("test.png");
      console.log("✅ Extension API working, test URL:", testUrl);
    } else {
      console.log("❌ Extension API not available");
    }
  } catch (error) {
    console.error("❌ Error testing extension API:", error);
  }
};
