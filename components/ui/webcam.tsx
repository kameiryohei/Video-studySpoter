import { useEffect, useRef } from "react";

const Webcam = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (!videoRef.current) return;
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Failed to access camera:', error);
      });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div className="bg-gray-600 w-[1244px] h-[732px] rounded-2xl">
        <video ref={videoRef} className="w-full h-full" autoPlay playsInline />
      </div>
    </div>
  );
};

export default Webcam;

export const useClient = true; // クライアントコンポーネントとしてマーク
