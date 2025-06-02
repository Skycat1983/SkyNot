import { loadSettings, saveSettings } from "./settings";

function initialise() {
  const settings = loadSettings();
  console.log(settings);

  const terminateButton = document.getElementById(
    "terminateButton"
  ) as HTMLButtonElement;

  console.log("terminateButton", terminateButton);

  if (!terminateButton) {
    console.error("terminateButton not found");
    return;
  }

  if (settings.disabled_ai) {
    terminateButton.classList.add("active");
  }

  terminateButton.addEventListener("click", () => {
    console.log("terminateButton clicked");
    terminateButton.classList.toggle("active");
    saveSettings({ disabled_ai: !settings.disabled_ai });
  });
}

document.addEventListener("DOMContentLoaded", initialise);
