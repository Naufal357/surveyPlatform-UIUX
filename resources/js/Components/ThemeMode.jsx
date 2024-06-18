import React, { useState } from "react";

export default function ThemeMode() {
    const [themes, setThemes] = useState(["warm", "light", "dark"]);
    const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

    const toggleTheme = () => {
        const nextIndex = (currentThemeIndex + 1) % themes.length;
        setCurrentThemeIndex(nextIndex);
        document.body.className = themes[nextIndex];
    };

    return (
        <div>
            <button onClick={toggleTheme} className="btn transparent">
                <img
                    src={`/assets/images/${themes[currentThemeIndex]}.png`}
                    alt={`${themes[currentThemeIndex]} Theme`}
                    style={{ height: "30px" }}
                />
            </button>
        </div>
    );
}
