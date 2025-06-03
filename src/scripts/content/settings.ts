type SkyNotSettings = {
  blocking_ai: boolean;
};

const defaultSettings: SkyNotSettings = {
  blocking_ai: false,
};

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

export const isExtensionEnabled = async (): Promise<boolean> => {
  const settings = await loadSettings();
  return settings.blocking_ai;
};

export const saveSettings = async (settings: SkyNotSettings): Promise<void> => {
  try {
    await browser.storage.local.set({ skynot_settings: settings });
  } catch (error) {
    console.error("Failed to save SkyNot settings:", error);
  }
};
