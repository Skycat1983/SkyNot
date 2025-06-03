// ──────────────────────────────────────────────────────────────────────────
// Extension Settings Management
// ──────────────────────────────────────────────────────────────────────────

/*
Handles loading and saving extension settings using browser.storage.local.
Provides unified settings interface for content scripts.
*/

type SkyNotSettings = {
  blocking_ai: boolean;
};

const defaultSettings: SkyNotSettings = {
  blocking_ai: false,
};

/*
Loads settings from browser storage with fallback to defaults.
Invoked by: isExtensionEnabled(), popup button initialization
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
Checks if extension should be active (blocking AI content).
Invoked by: initContentScript() to determine if extension should run
*/
export const isExtensionEnabled = async (): Promise<boolean> => {
  const settings = await loadSettings();
  return settings.blocking_ai;
};

/*
Saves settings to browser storage.
Invoked by: popup button click handler
*/
export const saveSettings = async (settings: SkyNotSettings): Promise<void> => {
  try {
    await browser.storage.local.set({ skynot_settings: settings });
  } catch (error) {
    console.error("Failed to save SkyNot settings:", error);
  }
};
