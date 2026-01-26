import styled from "styled-components";
import { useMemo } from "react";

const escapeRegExp = (str) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const HighlightText = ({ text, query }) => {
  const content = useMemo(() => {
    if (!query?.trim()) return text;

    const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <Highlight key={index}>{part}</Highlight>
      ) : (
        part
      )
    );
  }, [text, query]);

  return content;
};

const Highlight = styled.span`
  background-color: #336CFF33;
  color: #336CFF;
  padding: 2px 4px;
  border-radius: 4px;
`;

export default HighlightText;