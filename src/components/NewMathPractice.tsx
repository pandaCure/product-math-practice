import React from "react";
import ReactDOM from "react-dom";
import getAddNum from "@/hooks/hooks";
import MathQuill from "react-mathquill";
import EnhanceMathQuill from "@/components/EnhanceMathQuill/EnhanceMathQuillNoEdit";
// addMathquillStyles()
import Latex from "react-latex";
import katex from "katex";
import KatexMath from "@/components/KatexMath/KatexMath";
import KatexMathAST from "@/components/KatexMath/KatexMathAST";
import KatexMathDiv from "@/components/KatexMath/KatexMathDiv";
import "./style.scss";
const NewMathPractice = () => {
  console.log(getAddNum());
  // console.log(katex.__renderToHTMLTree("1 + 2 ="));
  // console.log(katex.renderToString("1 + 2 ="));
  const expression = "\\cfrac{2}{1+\\cfrac{2}{1+\\cfrac{2}{1}}} = ";
  const handleKatexError = (err: string) => console.log(err);
  return (
    <div className="practice-block">
      {/* <div className="latex">
        <Latex>$ 1 + 2 = $</Latex>
      </div>
      <div className="math-quill">
        <MathQuill latex="10" />
      </div> */}
      {/* <KatexMath
        mathExpression={expression}
        handleKatexError={handleKatexError}
        output="html"
      /> */}
      {/* <div className="question">
        <KatexMath
          mathExpression="1+2="
          handleKatexError={handleKatexError}
          output="html"
        />
        <div className="answer">3</div>
      </div> */}
      <KatexMathAST />
      <KatexMathDiv />
      {/* <KatexMath
        mathExpression="1+2="
        handleKatexError={handleKatexError}
        output="html"
      />
      <KatexMath
        mathExpression="1+2="
        handleKatexError={handleKatexError}
        output="html"
      />
      <KatexMath
        mathExpression="1+2="
        handleKatexError={handleKatexError}
        output="html"
      /> */}
      {/* <EnhanceMathQuill /> */}
    </div>
  );
};
export default NewMathPractice;
