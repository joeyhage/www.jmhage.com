import Prism from "prismjs";
import { useEffect } from "react";
import CodeBlockStyles from "./CodeBlock.module.css";

export default function CodeBlock({ code, language }) {
  useEffect(Prism.highlightAll, []);

  return (
    <pre className={`${CodeBlockStyles.codeBlock} language-${language}`}>
      <code className={CodeBlockStyles.codeBlock__inner}>{code}</code>
    </pre>
  );
}
