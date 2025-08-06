"use client";
import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";

let detectInterval;

const ObjectDetection = () => {
  const [isloading, setIsLoading] = useState(true);

  const WebcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runcoco = async () => {
    setIsLoading(true);
    const net = await cocoSSDLoad(); 
    setIsLoading(false);

    detectInterval = setInterval(() => {
      runObjectDetection(net);
    }, 10);
  };

 async function runObjectDetection(net) {
  if (
    canvasRef.current &&
    WebcamRef.current !== null &&
    WebcamRef.current.video?.readyState === 4
  ) {
    canvasRef.current.width = WebcamRef.current.video.videoWidth;
    canvasRef.current.height = WebcamRef.current.video.videoHeight;

    const detectedObject = await net.detect(WebcamRef.current.video, undefined, 0.6);
   // console.log(detectedObject);
   const context = canvasRef.current.getContext("2d");
   renderPredictions(detectedObject,context);

  }
}


  const showmyvideo = () => {
    if (WebcamRef.current !== null && WebcamRef.current.video?.readyState === 4) { 
      const myvideoWidth = WebcamRef.current.video.videoWidth;
      const myvideoHeight = WebcamRef.current.video.videoHeight;

      
      WebcamRef.current.video.videoWidth = myvideoWidth;
      WebcamRef.current.video.videoHeight = myvideoHeight;
    }
  };

  useEffect(() => {
    runcoco();
    showmyvideo();
  }, []);

  return (
    <div className='mt-10'>
      {isloading ? (
        <div className='gradient-text '>Loading AI Model</div>
      ) : (
        <div className="relative flex justify-center items-center gradient p-1.5 rounded-md">
          <Webcam
            ref={WebcamRef}
            className='rounded-md w-full lg:h-[720px]'
            muted
          />
          <canvas
            ref={canvasRef}
            className='absolute top-0 left-0 z-99999 w-full lg:h-[720px]'
          />
        </div>
      )}
    </div> 
  );
};

export default ObjectDetection;
