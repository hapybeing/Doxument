/* =========================
   THEME ENGINE (PERSISTENT)
========================= */

const switcher = document.getElementById("themeSwitcher");

const savedTheme = localStorage.getItem("lekhika-theme") || "theme-vedic";
preview.classList.add(savedTheme);
switcher.value = savedTheme;

switcher.addEventListener("change", () => {
  preview.className = preview.className.replace(/theme-\w+/, '');
  preview.classList.add(switcher.value);

  localStorage.setItem("lekhika-theme", switcher.value);
});

/* =========================
   PDF EXPORT
========================= */

function exportPDF() {
  html2pdf().from(preview).save("lekhika.pdf");
}

/* =========================
   DRAG & DROP
========================= */

document.addEventListener("dragover", e => e.preventDefault());

document.addEventListener("drop", e => {
  e.preventDefault();

  const file = e.dataTransfer.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    editor.value = reader.result;
    render();
  };
  reader.readAsText(file);
});

/* =========================
   AI HOOK (future SaaS $$$)
========================= */

async function aiRewrite() {
  const text = editor.value;

  const response = await fetch("/api/ai", {
    method: "POST",
    body: JSON.stringify({ text })
  });

  const data = await response.json();
  editor.value = data.result;
  render();
}
