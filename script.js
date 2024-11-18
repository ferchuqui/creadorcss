document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const htmlContent = e.target.result;
        generateCSS(htmlContent, file.name);
      };
      reader.readAsText(file);
    }
  });

function generateCSS(htmlContent, fileName) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  let cssContent = `/* CSS Generated */\n`;
  cssContent += `@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');\n\n`;
  cssContent += `body { font-family: 'Roboto', sans-serif; }\n\n`;

  const elements = new Set();
  const classes = new Set();
  const ids = new Set();

  doc.querySelectorAll("*").forEach((el) => {
    elements.add(el.tagName.toLowerCase());
    el.classList.forEach((cls) => classes.add(cls));
    if (el.id) ids.add(el.id);
  });

  cssContent += `/* Elements */\n`;
  elements.forEach((el) => (cssContent += `${el} { }\n`));

  cssContent += `\n/* Classes */\n`;
  classes.forEach((cls) => (cssContent += `.${cls} { }\n`));

  cssContent += `\n/* IDs */\n`;
  ids.forEach((id) => (cssContent += `#${id} { }\n`));

  cssContent += `\n/* Pseudo-classes */\n`;
  cssContent += `a:hover { }\n`;
  cssContent += `a:active { }\n`;
  cssContent += `a:focus { }\n`;

  cssContent += `\n/* Media Queries */\n`;
  cssContent += `@media (max-width: 768px) {\n}\n`;
  cssContent += `@media (max-width: 480px) {\n}\n`;

  document.getElementById("cssOutput").textContent = cssContent;

  // Habilitar el botón de descarga
  const downloadBtn = document.getElementById("downloadBtn");
  downloadBtn.disabled = false;
  downloadBtn.onclick = function () {
    downloadCSS(cssContent, fileName);
  };
}

function downloadCSS(content, originalFileName) {
  const cssFileName = originalFileName.replace(".html", ".css");
  const blob = new Blob([content], { type: "text/css" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = cssFileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
