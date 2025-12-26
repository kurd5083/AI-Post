import { useState, useEffect, useRef } from "react";

export function useClampText(text, lines = 3) {
  const [clampedText, setClampedText] = useState(text);
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const container = textRef.current;
    container.innerText = text;

    const style = window.getComputedStyle(container);
    const lineHeight = parseFloat(style.lineHeight);

    let words = text.split(" ");
    let truncated = "";
    container.innerText = "";

    for (let i = 0; i < words.length; i++) {
      container.innerText += (i === 0 ? "" : " ") + words[i];
      const currentHeight = container.scrollHeight;

      if (currentHeight > lines * lineHeight) {
        container.innerText = truncated + "...";
        setClampedText(container.innerText);
        return;
      }

      truncated = container.innerText;
    }

    setClampedText(truncated);
  }, [text, lines]);

  return { clampedText, textRef };
}
