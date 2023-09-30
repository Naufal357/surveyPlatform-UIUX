import React, { useEffect } from 'react';
import { Fullscreen } from 'react-bootstrap-icons';

function EmbedFigma({ surveys }) {
  useEffect(() => {
    // Dapatkan referensi ke elemen kontainer design
    const designContainer = document.getElementById('embed-design-container');
    // Dapatkan referensi ke elemen kontainer prototype
    const prototypeContainer = document.getElementById('embed-prototype-container');
    
    // Periksa jika surveys.embed_design mengandung <iframe>
    if (surveys.embed_design.includes('<iframe')) {
        designContainer.innerHTML = surveys.embed_design;
    } else {
        const figmaEmbed = document.createElement("iframe");
        figmaEmbed.setAttribute("width", "90%");
        figmaEmbed.setAttribute("height", "500");
        figmaEmbed.setAttribute("frameborder", "0");
        figmaEmbed.setAttribute("allowfullscreen", true);
        figmaEmbed.setAttribute(
            "src",
            surveys.embed_design
        );

        // Menambahkan iframe ke kontainer design
        designContainer.appendChild(figmaEmbed);
    }
    
    // Periksa jika surveys.embed_prototype mengandung <iframe>
    if (surveys.embed_prototype.includes("<iframe")) {
        prototypeContainer.innerHTML = surveys.embed_prototype;
    } else {
        const figmaEmbed = document.createElement("iframe");
        figmaEmbed.setAttribute("width", "90%");
        figmaEmbed.setAttribute("height", "720");
        figmaEmbed.setAttribute("frameborder", "0");
        figmaEmbed.setAttribute("allowfullscreen", true);
        figmaEmbed.setAttribute("src", surveys.embed_prototype);

        // Menambahkan iframe ke kontainer design
        designContainer.appendChild(figmaEmbed);
    }

  }, [surveys]);

  return (
    <div className="content-center align-items-center">
      <div>
        <div id="embed-design-container"></div>
        <div id="embed-prototype-container"></div>
      </div>
    </div>
  );
}

export default EmbedFigma;