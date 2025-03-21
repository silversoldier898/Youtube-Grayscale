// Default state: grayscale is enabled
let isGrayscale = true;
const applyFilter = () => {
    document.documentElement.style.filter = isGrayscale
        ? "grayscale(100%)"
        : "none";
};
applyFilter();

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command && message.command === "toggleGrayscale") {
        isGrayscale = !isGrayscale;
        applyFilter();
        sendResponse({ grayscale: isGrayscale });
    }
});

window.addEventListener("yt-navigate-finish", () => {
    isGrayscale = true;
    applyFilter();
});