const defaultValue = `**_made with markdown.dev_**

# H1
## H2
### H3
#### H4
##### H5
###### H6

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the 
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | renders | **nicely**
1 | 2 | 3

Oh yeah, you can also use [links](#).
 
`;
window.addEventListener("load", () => {
  const editor = document.querySelector("#editor");
  const storage = localStorage.getItem("Markdown Editor");
  if (storage) {
    editor.value = storage;
  } else if (storage === null) {
    editor.value = defaultValue;
  }

  updateEditor();
  editor.focus();
});
window.addEventListener("beforeunload", () => {
  const currentText = getTextToCopy();
  saveToStorage(currentText);
});
function copyToClipboard(text) {
  window.navigator.clipboard
    .writeText(text)
    .then(() => console.log("Copied to clipboard!"))
    .catch(() => null);
}
function saveToStorage(text) {
  localStorage.setItem("Markdown Editor", text);
}
function getTextToCopy() {
  const textToCopy = document.querySelector("#editor");
  return textToCopy.value;
}
function updateEditor() {
  if (!window.marked) {
    return;
  }
  const currentText = getTextToCopy();
  document.querySelector(".markdown-body").innerHTML =
    window.marked(currentText);
}
document.addEventListener(
  "keydown",
  function (e) {
    if (
      e.key === "s" &&
      (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault();
      const currentText = getTextToCopy();
      saveToStorage(currentText);
      copyToClipboard(currentText);
    }
  },
  false
);

document.addEventListener("keyup", updateEditor, false);
