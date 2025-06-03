// ──────────────────────────────────────────────────────────────────────────
// Popup Settings Management
// ──────────────────────────────────────────────────────────────────────────

/*
Handles loading and saving extension settings from popup interface.
Uses browser.storage.local to share settings with content scripts.
*/

type SkyNotSettings = {
  blocking_ai: boolean;
};

const defaultSettings: SkyNotSettings = {
  blocking_ai: false,
};

/*
Loads current settings from browser storage with fallback to defaults.
Invoked by: initializeButton() to set initial button state
*/
export const loadSettings = async (): Promise<SkyNotSettings> => {
  try {
    const result = await browser.storage.local.get("skynot_settings");
    if (result.skynot_settings) {
      return result.skynot_settings as SkyNotSettings;
    }
  } catch (error) {
    console.error("Failed to load SkyNot settings:", error);
  }
  return defaultSettings;
};

/*
Saves updated settings to browser storage.
Invoked by: Button click handler when user toggles extension state
*/
export const saveSettings = async (settings: SkyNotSettings): Promise<void> => {
  try {
    await browser.storage.local.set({ skynot_settings: settings });
  } catch (error) {
    console.error("Failed to save SkyNot settings:", error);
  }
};
