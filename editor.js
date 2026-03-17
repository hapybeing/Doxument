const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

let isSyncing = false;

function render() {
  const markdown = editor.value;
  preview.innerHTML = marked.parse(markdown);
  MathJax.typesetPromise();
  localStorage.setItem("lekhika-doc", markdown);
  updateStats(markdown);
}

function updateStats(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  const read = Math.ceil(words / 200);

  wordCount.innerText = words;
  charCount.innerText = chars;
  readTime.innerText = read;
}

editor.addEventListener('input', render);

editor.addEventListener('scroll', () => {
  if (isSyncing) return;
  isSyncing = true;

  const ratio = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
  preview.scrollTop = ratio * (preview.scrollHeight - preview.clientHeight);

  isSyncing = false;
});

preview.addEventListener('scroll', () => {
  if (isSyncing) return;
  isSyncing = true;

  const ratio = preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
  editor.scrollTop = ratio * (editor.scrollHeight - editor.clientHeight);

  isSyncing = false;
});

/* INIT */
editor.value = localStorage.getItem("lekhika-doc") || "# Lekhika Ready 🚀";
render();
