window.addEventListener("DOMContentLoaded", () => {

const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const readTime = document.getElementById("readTime");

/* RENDER */
window.render = function() {
  const markdown = editor.value;
  preview.innerHTML = marked.parse(markdown);

  if (window.MathJax) {
    MathJax.typesetPromise();
  }

  localStorage.setItem("lekhika-doc", markdown);
  updateStats(markdown);
};

/* STATS */
function updateStats(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  const read = Math.ceil(words / 200);

  wordCount.innerText = words;
  charCount.innerText = chars;
  readTime.innerText = read;
}

/* INPUT */
editor.addEventListener('input', render);

/* TOOLBAR */
window.wrap = function(symbol) {
  const start = editor.selectionStart;
  const end = editor.selectionEnd;

  const selected = editor.value.substring(start, end);
  editor.setRangeText(symbol + selected + symbol, start, end, 'end');

  render();
};

window.insertMath = function() {
  editor.setRangeText("\n$$\n\n$$\n", editor.selectionStart, editor.selectionEnd);
  render();
};

/* INIT */
editor.value = localStorage.getItem("lekhika-doc") || "# Lekhika Ready 🚀";
render();

});
