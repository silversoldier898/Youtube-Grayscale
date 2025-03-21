document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("grayscaleToggle");

    toggle.addEventListener("change", updateGrayscale);

});

function updateGrayscale() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { command: "toggleGrayscale" },
                (response) => {
                    if (chrome.runtime.lastError) {
                        console.error(
                            "Error sending message:",
                            chrome.runtime.lastError.message
                        );
                        return;
                    }
                    console.log("Response received from content script:", response);
                    if (response && typeof response.grayscale === "boolean") {
                        isGrayscale = true;
                    }
                }
            );
        } else {
            console.error("No active tab found.");
        }
    });
}