(function () {
    'use strict';

    const defaultSettings = {
        disabled_ai: false,
    };
    const loadSettings = () => {
        const settings = localStorage.getItem("skynot_settings");
        if (settings) {
            return JSON.parse(settings);
        }
        return defaultSettings;
    };
    const saveSettings = (settings) => {
        localStorage.setItem("skynot_settings", JSON.stringify(settings));
    };

    function initialise() {
        const settings = loadSettings();
        console.log(settings);
        const terminateButton = document.getElementById("terminateButton");
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

})();
