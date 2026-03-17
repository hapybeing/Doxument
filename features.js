window.addEventListener("DOMContentLoaded", () => {

/* THEME */
const switcher = document.getElementById("themeSwitcher");
const preview = document.getElementById("preview");

switcher.addEventListener("change", () => {
  preview.className = "w-1/2 h-full p-6 overflow-auto " + switcher.value;
});

/* PDF */
window.exportPDF = function() {
  html2pdf().from(preview).save("lekhika.pdf");
};

/* DRAG DROP */
document.addEventListener("dragover", e => e.preventDefault());

document.addEventListener("drop", e => {
  e.preventDefault();

  const file = e.dataTransfer.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("editor").value = reader.result;
    window.render();
  };

  reader.readAsText(file);
});

});
