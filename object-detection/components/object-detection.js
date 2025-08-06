/*"use client";
import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import renderPredictions from '@/utils/render-prediction'; // ✅ default import

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
    }, 300); // ✅ safer detection interval
  };


  const runObjectDetection = async (net) => {
    const video = WebcamRef.current?.video;
    if (canvasRef.current && video && video.readyState === 4) {
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;

      const detectedObject = await net.detect(video);
      console.log("Predictions:", detectedObject); // ✅ should show results
      const ctx = canvasRef.current.getContext("2d");
      renderPredictions(detectedObject, ctx);
    }
  };

  useEffect(() => {
    return () => clearInterval(detectInterval); // cleanup on unmount
  }, []);

  return (
    <div className='mt-10'>
      {isloading ? (
        <div className='gradient-text'>Loading AI Model...</div>
      ) : (
        <div className="relative flex justify-center items-center gradient p-1.5 rounded-md">
          <Webcam
            ref={WebcamRef}
            className='rounded-md w-full lg:h-[720px]'
            onUserMedia={runcoco} // ✅ only start detection when webcam is ready
            muted
          />
          <canvas
            ref={canvasRef}
            className='absolute top-0 left-0 z-50 w-full lg:h-[720px]'
          />
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;
*/


"use client";
import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs"; // Ensure only imported once globally
import renderPredictions from '@/utils/render-prediction'; // ✅ default import

const ObjectDetection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  // Object detection loop using requestAnimationFrame
  const detectFrame = async () => {
    const video = webcamRef.current?.video;

    if (
      canvasRef.current &&
      video &&
      video.readyState === 4
    ) {
      const ctx = canvasRef.current.getContext("2d");
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;

      const predictions = await modelRef.current.detect(video);
      renderPredictions(predictions, ctx);
    }

    animationFrameIdRef.current = requestAnimationFrame(detectFrame);
  };

  // Load the model once and begin detection
  const runCoco = async () => {
    if (modelRef.current) return; // prevent reloading
    setIsLoading(true);
    try {
      const net = await cocoSSDLoad();
      modelRef.current = net;
      setIsLoading(false);
      detectFrame();
    } catch (err) {
      console.error("Model loading failed ❌", err);
      alert("Failed to load model. Please try again.");
      setIsLoading(false);
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <div className='mt-10'>
      {isLoading ? (
        <div className='gradient-text text-center text-lg'>
          Loading AI Model...
        </div>
      ) : (
        <div className="relative flex justify-center items-center gradient p-1.5 rounded-md">
          <Webcam
            ref={webcamRef}
            className='rounded-md w-full lg:h-[720px]'
            muted
            onUserMedia={runCoco}
            onUserMediaError={() =>
              alert("Please allow camera access for object detection.")
            }
            videoConstraints={{
              facingMode: "user", // or "environment" for rear camera
            }}
          />
          <canvas
            ref={canvasRef}
            className='absolute top-0 left-0 z-50 w-full lg:h-[720px]'
          />
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;
