import { loadSettings, saveSettings } from "./settings";

export async function initializeButton(): Promise<void> {
  const settings = await loadSettings();
  console.log("Loaded settings:", settings);

  const terminateButton = document.getElementById(
    "terminateButton"
  ) as HTMLButtonElement;

  if (!terminateButton) {
    console.error("terminateButton not found");
    return;
  }

  const updateButtonState = (isBlocking: boolean) => {
    if (isBlocking) {
      terminateButton.classList.add("active");
      terminateButton.textContent = "TERMINATE";
    } else {
      terminateButton.classList.remove("active");
      terminateButton.textContent = "TERMINATE";
    }
  };

  updateButtonState(settings.blocking_ai);

  terminateButton.addEventListener("click", async () => {
    console.log("terminateButton clicked");

    const newBlockingState = !settings.blocking_ai;
    const newSettings = { blocking_ai: newBlockingState };

    // Update button
    updateButtonState(newBlockingState);

    // Save settings
    await saveSettings(newSettings);
    console.log("Settings saved:", newSettings);

    // Update local settings reference for next click
    settings.blocking_ai = newBlockingState;
  });
}
