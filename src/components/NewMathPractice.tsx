import React from "react";
import getAddNum from "@/hooks/hooks";
import MathQuill, { addStyles as addMathquillStyles } from "react-mathquill";
import EnhanceMathQuill from '@/components/EnhanceMathQuill/EnhanceMathQuill'
addMathquillStyles()
const NewMathPractice = () => {
  console.log(getAddNum());
  return (
    <div>
      <MathQuill latex='a \+ b = 10' />
      <EnhanceMathQuill />
    </div>
  );
};
export default NewMathPractice;
