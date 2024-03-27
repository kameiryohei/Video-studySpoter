"use client";

import { Slider } from "@/components/ui/slider";
import OT from "@opentok/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const SESSION_ID = process.env.NEXT_PUBLIC_SESSION_ID;
const TOKEN = process.env.NEXT_PUBLIC_TOKEN;

function handleError(error: any) {
  if (!error) return;
  alert(error.message);
}

const Page = () => {
  const [publisher, setPublisher] = useState<any>(null);
  const [blurAmount, setBlurAmount] = useState<number>(0);

  useEffect(() => {
    if (!API_KEY || !SESSION_ID || !TOKEN) {
      alert("API_KEY, SESSION_ID, and TOKEN is required");
      return;
    }
    const session = OT.initSession(API_KEY, SESSION_ID);

    const initPublisher = OT.initPublisher(
      "myCamera",
      {
        insertMode: "append",
        width: "100%",
        height: "100%",
      },
      handleError
    );
    setPublisher(initPublisher);

    session.connect(TOKEN, function (error) {
      if (error) {
        handleError(error);
        return;
      }
      session.publish(initPublisher, handleError);
    });

    return () => {
      if (session) {
        session.disconnect();
      }
      if (initPublisher) {
        initPublisher.destroy();
      }
    };
  }, []);

  const handleBlurChange = (value: number) => {
    setBlurAmount(value);
  };

  return (
    <div className="px-24 mt-10">
      <Link href="/">
        <p className="border-b-blue-500 text-3xl font-bold top-0 outline-2 cursor-pointer">Home</p>
      </Link>
      <div className="flex justify-center">
        <div id="myCamera" className="bg-gray-600 w-[1244px] h-[732px] rounded-2xl"></div>
      </div>
      <div className="flex justify-center mt-5">
        <div className="flex justify-end items-center w-[1244px]">
          <Link href="/workspace/stanby/video" className="bg-gray-500 w-[190px] h-[190px] rounded-full flex items-center justify-center text-white mr-4">
            JOIN
          </Link>
          <Slider defaultValue={[0]} max={1000} step={1} className="w-[466px]" onChange={(value) => handleBlurChange(value)} />
        </div>
      </div>
    </div>
  );
};

export default Page;
