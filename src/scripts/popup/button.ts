import { loadSettings, saveSettings } from "./settings";

export async function initializeTerminateButton(): Promise<void> {
  const settings = await loadSettings();
  console.log("Loaded settings:", settings);

  const terminateButton = document.getElementById(
    "terminateButton"
  ) as HTMLButtonElement;

  if (!terminateButton) {
    console.error("terminateButton not found");
    return;
  }

  // Function to update button state and text
  const updateButtonState = (isBlocking: boolean) => {
    if (isBlocking) {
      terminateButton.classList.add("active");
      terminateButton.textContent = "TERMINATED";
    } else {
      terminateButton.classList.remove("active");
      terminateButton.textContent = "TERMINATE";
    }
  };

  // Set initial state (blocking_ai = true means extension is actively blocking)
  updateButtonState(settings.blocking_ai);

  terminateButton.addEventListener("click", async () => {
    console.log("terminateButton clicked");

    const newBlockingState = !settings.blocking_ai;
    const newSettings = { blocking_ai: newBlockingState };

    // Update button immediately
    updateButtonState(newBlockingState);

    // Save settings
    await saveSettings(newSettings);
    console.log("Settings saved:", newSettings);

    // Update local settings reference for next click
    settings.blocking_ai = newBlockingState;
  });
}
