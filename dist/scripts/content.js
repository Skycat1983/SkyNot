(function () {
    'use strict';

    console.log("SkyNot content script loaded on Google domain:", window.location.hostname);
    // Check if we're on a Google search page
    if (window.location.pathname.includes("/search")) {
        console.log("SkyNot: Google search page detected - ready to block AI content");
    }
    else {
        console.log("SkyNot: On Google domain but not search page");
    }

})();
