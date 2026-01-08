// import { useEffect, useRef } from "react";
// import styled from "styled-components";
// import { usePostsStore } from "@/store/postsStore";

// const PostItem = ({ post, emojiToInsert }) => {
//     const { updatePost } = usePostsStore();

//     const textRef = useRef(null);
//     const caretRange = useRef(null);
//     const lastPostText = useRef(post.text || "");

//     // Обновляем текст из store, но сохраняем caret
//     useEffect(() => {
//         const el = textRef.current;
//         if (!el) return;

//         const sel = document.getSelection();
//         const rangeBefore = sel?.rangeCount ? sel.getRangeAt(0).cloneRange() : null;

//         el.innerHTML = post.text || "";
//         lastPostText.current = post.text || "";

//         // Восстанавливаем caret
//         if (rangeBefore) {
//             sel.removeAllRanges();
//             sel.addRange(rangeBefore);
//         }
//     }, [post.postId, post.text]);

//     const handleInput = (e) => {
//         const el = e.currentTarget;
//         const html = el.innerHTML;
//         lastPostText.current = html;

//         const sel = document.getSelection();
//         if (sel?.rangeCount) caretRange.current = sel.getRangeAt(0).cloneRange();

//         updatePost(post.postId, { text: html, summary: html });
//     };

//     const handleClick = () => {
//         const sel = document.getSelection();
//         if (sel?.rangeCount) caretRange.current = sel.getRangeAt(0).cloneRange();
//     };

//     const handleKeyUp = () => {
//         const sel = document.getSelection();
//         if (sel?.rangeCount) caretRange.current = sel.getRangeAt(0).cloneRange();
//     };

//     const insertEmoji = (emoji) => {
//         const el = textRef.current;
//         if (!el) return;

//         el.focus();
//         let sel = document.getSelection();
//         let range = caretRange.current || (sel?.rangeCount ? sel.getRangeAt(0) : null);

//         if (!range || !el.contains(range.startContainer)) {
//             const endRange = document.createRange();
//             endRange.selectNodeContents(el);
//             endRange.collapse(false);
//             range = endRange;
//         }

//         range.deleteContents();
//         const node = document.createTextNode(emoji);
//         range.insertNode(node);
//         range.setStartAfter(node);
//         range.collapse(true);

//         sel.removeAllRanges();
//         sel.addRange(range);
//         caretRange.current = range.cloneRange();

//         const html = el.innerHTML;
//         lastPostText.current = html;
//         updatePost(post.postId, { text: html, summary: html });
//     };

//     // Если пришёл emojiToInsert — вставляем
//     useEffect(() => {
//         if (emojiToInsert) {
//             insertEmoji(emojiToInsert);
//         }
//     }, [emojiToInsert]);

//     return (
//         <EditableText
//             contentEditable
//             suppressContentEditableWarning
//             ref={textRef}
//             onInput={handleInput}
//             onClick={handleClick}
//             onKeyUp={handleKeyUp}
//         />
//     );
// };

// const EditableText = styled.div`
//   font-size: 16px;
//   font-weight: 400;
//   color: #6A7080;
//   background: transparent;
//   width: 100%;
//   border: none;
//   outline: none;
//   min-height: 80px;
//   max-height: 300px;
//   overflow-y: auto;
//   white-space: pre-wrap;
//   word-break: break-word;
//   min-width: 70%;

//   &[contenteditable="true"]:empty:before {
//     content: "Текст публикации...";
//     color: #6A7080;
//     opacity: 0.6;
//   }

//   @media (max-width: 1400px) {
//     min-height: 120px;
//   }
// `;

// export default PostItem;
