import { useMemo } from "react";
import DOMPurify from "dompurify";

export const useFormattedHtml = (text) => {
  return useMemo(() => {
    if (!text) return "";

    const withBreaks = text.replace(/\n/g, "<br />");

    return DOMPurify.sanitize(withBreaks);
  }, [text]);
};
