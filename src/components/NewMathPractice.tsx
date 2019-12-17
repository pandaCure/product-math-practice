import React from "react";
import getAddNum from "@/hooks/hooks";
import MathQuill from "react-mathquill";
// import EnhanceMathQuill from '@/components/EnhanceMathQuill/EnhanceMathQuill'
// addMathquillStyles()
import Latex from 'react-latex'
const NewMathPractice = () => {
  console.log(getAddNum());
  return (
    <div>
      <div>
        <Latex>$1 + 2 = \div$</Latex>
      </div>
      <div>
        <MathQuill latex='10' />
      </div>
    </div>
  );
};
export default NewMathPractice;
