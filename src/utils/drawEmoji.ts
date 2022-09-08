import {
    WithFaceExpressions,
    FaceDetection,
    FaceExpressions,
  } from "face-api.js";
  
  export const drawEmoji = async (
    detectionsWithExpressions: WithFaceExpressions<{
      detection: FaceDetection;
      expressions: FaceExpressions;
    }>[],
  ) => {
    let expression = ""
    detectionsWithExpressions.map((detectionsWithExpression) => {
      const Array = Object.entries(detectionsWithExpression.expressions);
      const scoresArray = Array.map((i) => i[1]);
      const expressionsArray = Array.map((i) => i[0]);
      const max = Math.max.apply(null, scoresArray);
      const index = scoresArray.findIndex((score) => score === max);
      expression = expressionsArray[index];
    });
    return expression
  };