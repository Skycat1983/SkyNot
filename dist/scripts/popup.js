(function () {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    // ──────────────────────────────────────────────────────────────────────────
    // Popup Settings Management
    // ──────────────────────────────────────────────────────────────────────────
    const defaultSettings = {
        blocking_ai: false,
    };
    /*
    Loads current settings from browser storage with fallback to defaults.
    Invoked by: initializeButton() to set initial button state
    */
    const loadSettings = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield browser.storage.local.get("skynot_settings");
            if (result.skynot_settings) {
                return result.skynot_settings;
            }
        }
        catch (error) {
            console.error("Failed to load SkyNot settings:", error);
        }
        return defaultSettings;
    });
    /*
    Saves updated settings to browser storage.
    Invoked by: Button click handler when user toggles extension state
    */
    const saveSettings = (settings) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield browser.storage.local.set({ skynot_settings: settings });
        }
        catch (error) {
            console.error("Failed to save SkyNot settings:", error);
        }
    });

    // ──────────────────────────────────────────────────────────────────────────
    // Terminate Button Management
    // ──────────────────────────────────────────────────────────────────────────
    /*
    Handles the main terminate button in the popup interface.
    Manages button state, text updates, and settings persistence.
    Provides visual feedback for extension enable/disable state.
    */
    /*
    Initializes the terminate button with current settings and event handlers.
    Invoked by: initialise() when popup DOM is ready
    */
    function initializeButton() {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield loadSettings();
            const terminateButton = document.getElementById("terminateButton");
            if (!terminateButton) {
                console.error("terminateButton not found");
                return;
            }
            /*
            Updates button visual state and text based on blocking status.
            Invoked by: Initial setup and click handler for immediate feedback
            */
            const updateButtonState = (isBlocking) => {
                if (isBlocking) {
                    terminateButton.classList.add("active");
                    terminateButton.textContent = "TERMINATE";
                }
                else {
                    terminateButton.classList.remove("active");
                    terminateButton.textContent = "TERMINATE";
                }
            };
            updateButtonState(settings.blocking_ai);
            terminateButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                const newBlockingState = !settings.blocking_ai;
                const newSettings = { blocking_ai: newBlockingState };
                // Update button
                updateButtonState(newBlockingState);
                // Save settings
                yield saveSettings(newSettings);
                // Update local settings reference for next click
                settings.blocking_ai = newBlockingState;
            }));
        });
    }

    // ──────────────────────────────────────────────────────────────────────────
    // Popup Entry Point
    // ──────────────────────────────────────────────────────────────────────────
    /*
    Initializes popup interface components.
    Invoked by: DOMContentLoaded event when popup opens
    */
    function initialise() {
        return __awaiter(this, void 0, void 0, function* () {
            yield initializeButton();
        });
    }
    document.addEventListener("DOMContentLoaded", initialise);

})();
