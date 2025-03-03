document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const themeCustomizer = document.getElementById("theme-customizer");
    const bgColorPicker = document.getElementById("bg-color-picker");
    const textColorPicker = document.getElementById("text-color-picker");
    const fontSelector = document.getElementById("font-selector");
    const themeNameInput = document.getElementById("theme-name");
    const saveThemeButton = document.getElementById("save-theme");
    const resetThemeButton = document.getElementById("reset-theme");
    const themeSelector = document.getElementById("theme-selector");
            
    let currentTheme = localStorage.getItem("theme") || "light";
    let customThemes = JSON.parse(localStorage.getItem("customThemes")) || {};
            
    applyTheme(currentTheme);
            
    populateThemeSelector();
            
    themeToggle.addEventListener("click", () => {
        const newTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        themeToggle.textContent = newTheme === "dark" ? "Dark" : "Light";
        });
            
    saveThemeButton.addEventListener("click", () => {
            const themeName = themeNameInput.value.trim();
                if (themeName) {
                    customThemes[themeName] = {
                        bgColor: bgColorPicker.value,
                        textColor: textColorPicker.value,
                        fontFamily: fontSelector.value
                    };
                    localStorage.setItem("customThemes", JSON.stringify(customThemes));
                    populateThemeSelector();
                }
    });
            
    resetThemeButton.addEventListener("click", () => {
            applyTheme("light");
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "Light";
            themeSelector.value = "light"; 
            });
            
    themeSelector.addEventListener("change", () => {
        const selectedTheme = themeSelector.value;
            applyTheme(selectedTheme);
    });
            
    function applyTheme(theme) {
        if (theme === "light" || theme === "dark") {
            document.documentElement.setAttribute("data-theme", theme);
            document.documentElement.style.removeProperty("--bg-color");
            document.documentElement.style.removeProperty("--text-color");
            document.documentElement.style.removeProperty("--font-family");
            } else if (customThemes[theme]) {
                const customTheme = customThemes[theme];
                document.documentElement.setAttribute("data-theme", "custom");
                document.documentElement.style.setProperty("--bg-color", customTheme.bgColor);
                document.documentElement.style.setProperty("--text-color", customTheme.textColor);
                document.documentElement.style.setProperty("--font-family", customTheme.fontFamily);
                }
            }
            
    function populateThemeSelector() {
        themeSelector.innerHTML = `
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            ${Object.keys(customThemes).map(theme => `<option value="${theme}">${theme}</option>`).join("")}
                `;
    }
});