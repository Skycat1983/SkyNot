type SkyNotSettings = {
  disabled_ai: boolean;
};

const defaultSettings: SkyNotSettings = {
  disabled_ai: false,
};

export const loadSettings = () => {
  const settings = localStorage.getItem("skynot_settings");
  if (settings) {
    return JSON.parse(settings);
  }
  return defaultSettings;
};

export const saveSettings = (settings: SkyNotSettings) => {
  localStorage.setItem("skynot_settings", JSON.stringify(settings));
};
