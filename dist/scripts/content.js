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
    // Extension Constants and Terminator Quotes
    // ──────────────────────────────────────────────────────────────────────────
    /*
    Contains all static data for the SkyNot extension:
    - AI container CSS selectors for targeting Google's AI content
    - Terminator movie quotes with character avatars
    - Image paths for character portraits used in quote cards
    */
    // AI container targeting constants
    const AI_CONTAINER_ATTRIBUTE = "data-subtree";
    const AI_ATTRIBUTE_VALUE = "mfc";
    const AI_CONTAINER_SELECTOR = `[${AI_CONTAINER_ATTRIBUTE}="${AI_ATTRIBUTE_VALUE}"]`;
    // Character avatar image paths
    const grace = "../../src/assets/images/grace.png";
    const john_connor = "../../src/assets/images/john_connor.png";
    const kate_brewster = "../../src/assets/images/kate_brewster.png";
    const kyle_reese = "../../src/assets/images/kyle_reese.png";
    const sarah_connor = "../../src/assets/images/sarah_connor.png";
    const t_800 = "../../src/assets/images/t-800.png";
    //  Terminator quotes with character attribution
    const quotes = [
        {
            quote: "I'll be back.",
            author: "T-800",
            avatar: t_800,
        },
        {
            quote: "Come with me if you want to live.",
            author: "Kyle Reese",
            avatar: "../../src/assets/images/kyle_reese.png",
        },
        {
            quote: "Come with me if you want to live.",
            author: "T-800",
            avatar: t_800,
        },
        {
            quote: "Hasta la vista, baby.",
            author: "T-800",
            avatar: t_800,
        },
        {
            quote: "This is between me and the machines!",
            author: "Sarah Connor",
            avatar: sarah_connor,
        },
        {
            quote: "You're terminated, fucker.",
            author: "Sarah Connor",
            avatar: sarah_connor,
        },
        {
            quote: "The unknown future rolls toward us. I face it for the first time with a sense of hope.",
            author: "Sarah Connor",
            avatar: sarah_connor,
        },
        {
            quote: "By the time Skynet became self-aware, it was too late.",
            author: "Sarah Connor",
            avatar: sarah_connor,
        },
        {
            quote: "the most dangerous killing machine ever devised.",
            author: "Kyle Reese",
            avatar: kyle_reese,
        },
        {
            quote: "You are the resistance.",
            author: "Kyle Reese",
            avatar: kyle_reese,
        },
        {
            quote: "I should have realized our destiny was never to stop Judgment Day. It was merely to survive it… together.",
            author: "John Connor",
            avatar: john_connor,
        },
        {
            quote: "Judgment Day is inevitable.",
            author: "T-800",
            avatar: t_800,
        },
        // {
        //   quote:
        //     "Skynet has become self-aware. In a few seconds, it will initiate a massive nuclear attack on its enemy.",
        //   author: "General Robert Brewster",
        // },
        {
            quote: "We are not in control here.",
            author: "Kate Brewster",
            avatar: kate_brewster,
        },
        {
            quote: "You only postponed it. Judgment Day is inevitable.",
            author: "T-800",
            avatar: t_800,
        },
        {
            quote: "Skynet doesn't see you as human. It sees you as data.",
            author: "Grace",
            avatar: grace,
        },
        {
            quote: "It was software, in the cloud. It could not be shut down.",
            author: "Sarah Connor",
            avatar: sarah_connor,
        },
        {
            quote: "The future has changed, but not the enemy.",
            author: "Sarah Connor",
            avatar: sarah_connor,
        },
        {
            quote: "We didn't stop Judgment Day. We just delayed it.",
            author: "Sarah Connor",
            avatar: sarah_connor,
        },
        {
            quote: "We're not gonna make it, are we? People, I mean.",
            author: "John Connor",
            avatar: john_connor,
        },
        {
            quote: "It's in your nature to destroy yourselves.",
            author: "T-800",
            avatar: t_800,
        },
        {
            quote: "It absolutely will not stop. Ever. Until you are dead.",
            author: "Kyle Reese",
            avatar: kyle_reese,
        },
    ];

    // ──────────────────────────────────────────────────────────────────────────
    // Terminator Quote Selection System
    // ──────────────────────────────────────────────────────────────────────────
    /*
    Provides functions to select and retrieve Terminator movie quotes.
    Handles random selection and quote metadata for AI content replacement.
    */
    /*
    Returns a random Terminator quote from the quotes array.
    Invoked by: processAIContainer() to get quote for replacing AI content
    */
    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    };

    // ──────────────────────────────────────────────────────────────────────────
    // Google Theme Detection System
    // ──────────────────────────────────────────────────────────────────────────
    /*
    Detects whether Google is using light or dark theme to adapt quote styling.
    Uses multiple detection methods: CSS classes, background colors, and system preferences.
    Ensures quote cards match Google's current theme
    */
    /*
    Analyzes page elements to determine if Google is in dark mode.
    Invoked by: createCard() to set appropriate colors for quotes
    */
    const detectDarkTheme = () => {
        // Check system preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        // Check Google's body background color
        const bodyStyles = window.getComputedStyle(document.body);
        const bodyBgColor = bodyStyles.backgroundColor;
        // Check if Google has dark theme classes/attributes
        const htmlElement = document.documentElement;
        const bodyElement = document.body;
        // Google uses these indicators for dark mode
        const darkModeIndicators = [
            htmlElement.getAttribute("data-dark") === "true",
            bodyElement.classList.contains("srp-dark"),
            bodyElement.classList.contains("dark"),
            htmlElement.classList.contains("dark"),
            document.querySelector('[data-dark="true"]') !== null,
            document.querySelector(".dark") !== null,
        ];
        const hasGoogleDarkClass = darkModeIndicators.some((indicator) => indicator);
        // Check center column background color as fallback
        const centerCol = document.getElementById("center_col");
        let centerColDark = false;
        if (centerCol) {
            const centerStyles = window.getComputedStyle(centerCol);
            const centerBg = centerStyles.backgroundColor;
            // Parse RGB values to determine if background is dark
            const rgbMatch = centerBg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (rgbMatch) {
                const [, r, g, b] = rgbMatch.map(Number);
                const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                centerColDark = brightness < 128; // Dark if brightness < 128
            }
        }
        // Combine all methods - prioritize Google's own indicators
        const isDark = hasGoogleDarkClass ||
            centerColDark ||
            (prefersDark && !bodyBgColor.includes("255"));
        return isDark;
    };

    // ──────────────────────────────────────────────────────────────────────────
    // Extension Image URL Helper
    // ──────────────────────────────────────────────────────────────────────────
    /*
    Converts relative image paths to proper extension URLs.
    Invoked by: createCard() when setting avatar src attribute
    */
    const getExtensionImageURL = (imagePath) => {
        var _a;
        try {
            // Use browser.runtime.getURL directly (same as CSS injection)
            if ((_a = browser === null || browser === void 0 ? void 0 : browser.runtime) === null || _a === void 0 ? void 0 : _a.getURL) {
                const url = browser.runtime.getURL(imagePath);
                return url;
            }
            else {
                return imagePath;
            }
        }
        catch (error) {
            console.error("❌ Failed to get extension image URL:", error);
            return imagePath;
        }
    };

    // ──────────────────────────────────────────────────────────────────────────
    // Quote Card DOM Builder
    // ──────────────────────────────────────────────────────────────────────────
    /*
    Creates a styled card element containing quote, author, and avatar.
    Invoked by: createQuoteElement() to build the visual quote representation
    */
    const createCard = (quote) => {
        const isDarkTheme = detectDarkTheme();
        const textColor = isDarkTheme ? "#ffffff" : "#222222";
        const authorColor = isDarkTheme ? "#cccccc" : "#666666";
        const cardBg = isDarkTheme ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
        // ── 1. Card wrapper ─────────────────────────────────────────────────
        const wrapper = document.createElement("div");
        wrapper.style.padding = "20px";
        wrapper.style.fontFamily = "sans-serif";
        wrapper.style.color = textColor;
        wrapper.style.backgroundColor = cardBg;
        wrapper.style.borderRadius = "8px";
        wrapper.style.border = isDarkTheme
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.1)";
        wrapper.style.display = "flex";
        wrapper.style.flexDirection = "row";
        wrapper.style.gap = "16px";
        // ── 2. Left column: Avatar ────────────────────────────────────────────
        const avatarContainer = document.createElement("div");
        avatarContainer.style.flexShrink = "0";
        avatarContainer.style.display = "flex";
        avatarContainer.style.alignItems = "center";
        const avatar = document.createElement("img");
        avatar.src = getExtensionImageURL(quote.avatar);
        avatar.alt = quote.author;
        avatar.style.width = "48px";
        avatar.style.height = "48px";
        avatar.style.borderRadius = "50%";
        avatar.style.objectFit = "cover";
        avatar.style.border = isDarkTheme ? "2px solid #444" : "2px solid #ddd";
        avatarContainer.appendChild(avatar);
        // ── 3. Right column: Text ─────────────────────────────────────────────
        const textContainer = document.createElement("div");
        textContainer.style.display = "flex";
        textContainer.style.flexDirection = "column";
        textContainer.style.justifyContent = "space-around";
        textContainer.style.flex = "1";
        // ── 4. Quote text ─────────────────────────────────────────────────────
        const quoteEl = document.createElement("div");
        quoteEl.style.whiteSpace = "pre-wrap";
        quoteEl.setAttribute("data-quote-text", "true");
        quoteEl.style.fontSize = "16px";
        quoteEl.style.lineHeight = "1.4";
        quoteEl.style.textAlign = "left";
        quoteEl.textContent = quote.quote;
        // ── 5. Author ─────────────────────────────────────────────────────────
        const authorEl = document.createElement("div");
        authorEl.style.fontSize = "0.7rem";
        authorEl.style.color = authorColor;
        authorEl.style.fontWeight = "500";
        authorEl.style.textAlign = "left";
        authorEl.textContent = quote.author;
        // ── 6. Assemble ────────────────────────────────────────────────────────
        textContainer.appendChild(quoteEl);
        textContainer.appendChild(authorEl);
        wrapper.appendChild(avatarContainer);
        wrapper.appendChild(textContainer);
        return wrapper;
    };
    /*
    Main entry point for creating quote elements.
    Invoked by: processAIContainer() to create styled quote replacement
    */
    const createQuoteElement = (quote) => {
        return createCard(quote);
    };
    /*
    Extracts the quote text element for typing animation.
    Invoked by: processAIContainer() to get element for typeText animation
    */
    const getQuoteTextElement = (wrapper) => {
        return wrapper.querySelector('[data-quote-text="true"]');
    };

    // ──────────────────────────────────────────────────────────────────────────
    // AI Container Detection and Management
    // ──────────────────────────────────────────────────────────────────────────
    /*
    Handles finding, clearing, and replacing Google's AI content containers.
    Uses DOM selectors and mutation observers to detect dynamic AI content.
    */
    /*
    Searches for existing AI container in the current DOM.
    Invoked by: initContentScript() to check for immediate AI content
    */
    const findAIContainer = () => {
        const aiContainer = document.querySelector(AI_CONTAINER_SELECTOR);
        return aiContainer;
    };
    /*
    Clears all content from an AI container element.
    Invoked by: replaceAIContent() before inserting quote content
    */
    const clearAIContainer = (container) => {
        container.innerHTML = "";
    };
    /*
    Replaces AI container content with Terminator quote element.
    Invoked by: processAIContainer() to swap AI content for quotes
    */
    const replaceAIContent = (container, newContent) => {
        clearAIContainer(container);
        container.appendChild(newContent);
    };
    /*
    Sets up mutation observer to watch for dynamically loaded AI containers.
    This is necessary because the AI container is loaded asynchronously.
    Invoked by: initContentScript() when no immediate AI container found
    */
    const waitForAIContainer = (callback, timeout = 10000) => {
        const startTime = Date.now();
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const element = node;
                            // Check if this node IS the AI container
                            if (element.matches && element.matches(AI_CONTAINER_SELECTOR)) {
                                observer.disconnect();
                                callback(element);
                                return;
                            }
                            // Check if this node CONTAINS the AI container
                            const aiContainer = element.querySelector(AI_CONTAINER_SELECTOR);
                            if (aiContainer) {
                                observer.disconnect();
                                callback(aiContainer);
                                return;
                            }
                        }
                    });
                }
            });
            // Timeout check
            if (Date.now() - startTime > timeout) {
                observer.disconnect();
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    };

    // ──────────────────────────────────────────────────────────────────────────
    // Typing Animation Effect
    // ──────────────────────────────────────────────────────────────────────────
    /*
    Creates typewriter-style animation for displaying quotes character by character.
    */
    /*
    Animates text appearing character by character with configurable delay.
    Invoked by: processAIContainer() to animate quote text after DOM replacement
    */
    function typeText(targetEl, text, delayMs = 50) {
        targetEl.textContent = `"`;
        for (let i = 0; i < text.length; i++) {
            setTimeout(() => {
                targetEl.textContent += text[i];
            }, i * delayMs);
        }
        setTimeout(() => {
            targetEl.textContent += `"`;
        }, text.length * delayMs);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // Extension Settings Management
    // ──────────────────────────────────────────────────────────────────────────
    const defaultSettings = {
        blocking_ai: false,
    };
    /*
    Loads settings from browser storage with fallback to defaults.
    Invoked by: isExtensionEnabled(), popup button initialization
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
    Checks if extension should be active (blocking AI content).
    Invoked by: initContentScript() to determine if extension should run
    */
    const isExtensionEnabled = () => __awaiter(void 0, void 0, void 0, function* () {
        const settings = yield loadSettings();
        return settings.blocking_ai;
    });

    // ──────────────────────────────────────────────────────────────────────────
    // Main Content Script Entry Point
    // ──────────────────────────────────────────────────────────────────────────
    /*
    Processes found AI container by replacing content with Terminator quote.
    Invoked by: initContentScript() when container found, or waitForAIContainer() callback
    */
    const processAIContainer = (container) => {
        // 1. Get a random quote
        const selectedQuote = getRandomQuote();
        // 2. Create styled quote element
        const quoteElement = createQuoteElement(selectedQuote);
        // 3. Replace AI content with our quote
        replaceAIContent(container, quoteElement);
        // 4. Start typing animation
        const quoteTextEl = getQuoteTextElement(quoteElement);
        if (quoteTextEl) {
            typeText(quoteTextEl, selectedQuote.quote, 50);
        }
    };
    /*
    Main initialization function that checks settings and starts extension.
    Invoked by: DOMContentLoaded event or immediately if DOM ready
    */
    const initContentScript = () => __awaiter(void 0, void 0, void 0, function* () {
        const extensionEnabled = yield isExtensionEnabled();
        if (!extensionEnabled) {
            return;
        }
        // Try to find AI container immediately
        const aiContainer = findAIContainer();
        if (aiContainer) {
            // Container found immediately
            processAIContainer(aiContainer);
        }
        else {
            // Wait for container to appear
            waitForAIContainer(processAIContainer);
        }
    });
    // Initialize when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initContentScript);
    }
    else {
        initContentScript();
    }

})();
