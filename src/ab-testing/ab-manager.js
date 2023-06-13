import './site.css';
import { saveSessionVariation, getSessionVariation } from './sessionUtils';
import { isMobileApp, isMobileWeb } from './environmentUtils';

const ABManager = (function () {
    // Private variables and functions
    let variation;

    function getVariation() {
        // Retrieve the user's assigned variation from the session
        const userVariation = getSessionVariation();

        // If the user already has a variation assigned, return it
        if (userVariation) {
            return userVariation;
        }

        // If no variation is assigned, assign a variation based on your logic
        // For example, you can use a random assignment or any other mechanism

        // Assign the default variation as 'site' (site.css)
        let assignedVariation = 'site';

        // Generate a random number between 0 and 1
        const randomNumber = Math.random();

        // Assign 'variation-a' if the random number is less than 0.5, otherwise assign 'variation-b'
        if (randomNumber < 0.5) {
            assignedVariation = 'variation-a';
        } else {
            assignedVariation = 'variation-b';
        }

        // Save the assigned variation in the session
        saveSessionVariation(assignedVariation);

        return assignedVariation;
    }

    function applyVariation() {
        // Apply variation-specific styles or behaviors
        if (isMobileApp()) {
            if (variation === 'variation-a') {
                loadCSS('/css/variants/app-variants/variation-a.css'); // Load Variation A CSS for the app
            } else if (variation === 'variation-b') {
                loadCSS('/css/variants/app-variants/variation-b.css'); // Load Variation B CSS for the app
            }
        } else if (isMobileWeb()) {
            if (variation === 'variation-a') {
                loadCSS('/css/variants/mobile-variants/variation-a.css'); // Load Variation A CSS for the mobile website
            } else if (variation === 'variation-b') {
                loadCSS('/css/variants/mobile-variants/variation-b.css'); // Load Variation B CSS for the mobile website
            }
        } else {
            if (variation === 'variation-a') {
                loadCSS('/css/variants/variation-a.css'); // Load Variation A CSS for the default site CSS
            } else if (variation === 'variation-b') {
                loadCSS('/css/variants/variation-b.css'); // Load Variation B CSS for the default site CSS
            }
        }
    }

    function loadCSS(url) {
        const link = document.createElement('link');
        link.href = url;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }

    // Public API
    return {
        init: function () {
            variation = getVariation(); // Assign the variation

            if (isMobileApp()) {
                loadCSS('/css/app.css'); // Load the default CSS file for the app
            } else if (isMobileWeb()) {
                loadCSS('/css/mobile-web.css'); // Load the default CSS file for the mobile web
            } else {
                loadCSS('/css/site.css'); // Load the default CSS file for the website
            }

            // Apply the variation-specific CSS if applicable
            applyVariation();

            // Additional initialization logic
        },
    };

})();

export default ABManager;
