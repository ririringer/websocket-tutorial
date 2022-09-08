import * as faceapi from 'face-api.js';
import { useRef, useState } from 'react';
import Webcam from "react-webcam";
import { drawEmoji } from './utils/drawEmoji';
	
faceapi.loadMtcnnModel('/models')

export const Page2 = () => {
  const webcamRef = useRef<Webcam>(null);
  const [nowExpression, setNowExpression] = useState<string>("未検証")
  const loadModels = async () => {
    const MODEL_URL = "/models";
    await Promise.all([
      faceapi.nets.tinyFaceDetector.load(MODEL_URL),
      faceapi.nets.faceExpressionNet.load(MODEL_URL),
    ]);
  };

  const faceDetectHandler = async () => {
    await loadModels();
    if (webcamRef.current) {
      const webcam = webcamRef.current.video as HTMLVideoElement;
      webcam.width = webcam.videoWidth;
      webcam.height = webcam.videoHeight;
      const video = webcamRef.current.video;
      const detectionsWithExpressions = await faceapi
        .detectAllFaces(video!, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();
      await drawEmoji(detectionsWithExpressions).then((v) => setNowExpression(v))
      console.log(detectionsWithExpressions);
    }
  };

  return (
    <div>
      <main>
        <Webcam audio={false} ref={webcamRef} />
        <button onClick={faceDetectHandler}>顔認識</button>
        {nowExpression}
      </main>
    </div>
  );
  };