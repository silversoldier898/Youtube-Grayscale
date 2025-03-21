// Default state: grayscale is enabled
let isGrayscale = true;
document.documentElement.style.filter = "grayscale(100%)";
console.log("Content script loaded: Grayscale enabled by default.");

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command && message.command === "toggleGrayscale") {
        console.log("Received toggleGrayscale command in content script.");
        isGrayscale = !isGrayscale;
        document.documentElement.style.filter = isGrayscale
            ? "grayscale(100%)"
            : "none";
        console.log("Toggled grayscale. New state:", isGrayscale);
        sendResponse({ grayscale: isGrayscale });
    }
});
