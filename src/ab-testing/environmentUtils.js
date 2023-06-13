// Detect if the environment is a .NET MAUI mobile app
function isMobileApp() {
    // Check if the userAgent contains '.NET MAUI'
    return navigator.userAgent.includes('.NET MAUI');
}

// Detect if the environment is a mobile web environment
function isMobileWeb() {
    // Check if the userAgent indicates a mobile device
    return /Mobi/.test(navigator.userAgent);
}

export { isMobileApp, isMobileWeb };
