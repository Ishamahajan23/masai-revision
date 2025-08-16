import { useRef } from "react";
import "./App.css";

function App({ initialValue = "", onChange }) {
  const inputRef = useRef(null);
  const rawRef = useRef((initialValue || "").replace(/\D/g, ""));
  const composingRef = useRef(false);

  function format(str) {
    return str
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  if (inputRef.current && inputRef.current.value === "") {
    inputRef.current.value = format(rawRef.current);
  }

  function handleInput() {
    if (composingRef.current) return;
    const input = inputRef.current;
    const oldRaw = rawRef.current;
    const oldFmt = format(oldRaw);
    let sel = input.selectionStart;
    let digitsBefore = 0;
    for (let i = 0; i < sel; i++) if (/\d/.test(oldFmt[i])) digitsBefore++;
    let newRaw = input.value.replace(/\D/g, "");
    let newFmt = format(newRaw);
    let caret = 0,
      seen = 0;
    while (caret < newFmt.length && seen < digitsBefore) {
      if (/\d/.test(newFmt[caret])) seen++;
      caret++;
    }
    input.value = newFmt;
    input.setSelectionRange(caret, caret);
    if (oldRaw !== newRaw) {
      rawRef.current = newRaw;
      if (onChange) onChange(newRaw);
    }
  }

  function handleKeyDown(e) {
    if (composingRef.current) return;
    const allowed = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
      "Tab",
    ];
    if (e.ctrlKey || e.metaKey) return;
    if (e.isComposing) return;
    if (allowed.includes(e.key)) return;
    if (!/\d/.test(e.key)) e.preventDefault();
  }

  function handlePaste(e) {
    if (composingRef.current) return;
    e.preventDefault();
    const input = inputRef.current;
    const paste = (e.clipboardData.getData("text") || "").replace(/\D/g, "");
    if (!paste) return;
    const oldRaw = rawRef.current;
    const oldFmt = format(oldRaw);
    let sel = input.selectionStart,
      end = input.selectionEnd;
    let before = 0,
      after = 0;
    for (let i = 0; i < sel; i++) if (/\d/.test(oldFmt[i])) before++;
    for (let i = end; i < oldFmt.length; i++) if (/\d/.test(oldFmt[i])) after++;
    let newRaw =
      oldRaw.slice(0, before) + paste + oldRaw.slice(oldRaw.length - after);
    let newFmt = format(newRaw);
    let caret = 0,
      seen = 0;
    while (caret < newFmt.length && seen < before + paste.length) {
      if (/\d/.test(newFmt[caret])) seen++;
      caret++;
    }
    input.value = newFmt;
    input.setSelectionRange(caret, caret);
    if (oldRaw !== newRaw) {
      rawRef.current = newRaw;
      if (onChange) onChange(newRaw);
    }
  }

  function handleCompositionStart() {
    composingRef.current = true;
  }
  function handleCompositionEnd() {
    composingRef.current = false;
    handleInput();
  }

  return (
    <input
      ref={inputRef}
      defaultValue={format(initialValue)}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      spellCheck={false}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      style={{ fontSize: "1.2rem", width: "100%", padding: "0.5em" }}
      aria-label="Digit input"
    />
  );
}

export default App;
