import { useRef } from "react";

export const useCursor = () => {
  const caretRanges = useRef({});
  const textRefs = useRef({});

  const insertEmoji = (emoji, postId, updatePost) => {
    const el = textRefs.current[postId];
    if (!el) return;

    el.focus();
    const sel = document.getSelection();
    let range = caretRanges.current[postId] || (sel?.rangeCount ? sel.getRangeAt(0) : null);

    if (!range || !el.contains(range.startContainer)) {
      range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
    }

    const node = document.createTextNode(emoji);
    range.insertNode(node);
    range.setStartAfter(node);
    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);
    caretRanges.current[postId] = range.cloneRange();

    updatePost(postId, { summary: el.innerHTML });
  };

  return { caretRanges, textRefs, insertEmoji };
};
