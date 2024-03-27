"use client";

import OT from "@opentok/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SlArrowLeft } from "react-icons/sl";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const SESSION_ID = process.env.NEXT_PUBLIC_SESSION_ID;
const TOKEN = process.env.NEXT_PUBLIC_TOKEN;

function handleError(error: any) {
  if (!error) return;
  alert(error.message);
}

export default function Home() {
  const [session, setSession] = useState<any>(null);
  const [publisher, setPublisher] = useState<any>(null);
  const [subscribers, setSubscribers] = useState<any[]>([]);

  useEffect(() => {
    if (!API_KEY || !SESSION_ID || !TOKEN) {
      alert("API_KEY, SESSION_ID, and TOKEN is required");
      return;
    }
    const initSession = OT.initSession(API_KEY, SESSION_ID);
    setSession(initSession);

    const initPublisher = OT.initPublisher(
      "publisher",
      {
        insertMode: "append",
        width: "100%",
        height: "100%",
      },
      handleError
    );
    setPublisher(initPublisher);

    initSession.on("streamCreated", function (event) {
      // 新しいサブスクライバーを作成
      const newSubscriber = initSession.subscribe(
        event.stream,
        `subscriber${subscribers.length + 1}`,
        {
          insertMode: "append",
          width: "100%",
          height: "100%",
        },
        handleError
      );

      setSubscribers((prevSubscribers) => [...prevSubscribers, newSubscriber]); // 新しいサブスクライバーをstateに設定
    });

    initSession.on("streamDestroyed", function (event) {
      // ストリームが破棄された場合、サブスクライバーも破棄する
      setSubscribers((prevSubscribers) =>
        prevSubscribers.filter(
          (subscriber) => subscriber.stream !== event.stream
        )
      );
    });

    initSession.connect(TOKEN, function (error) {
      if (error) {
        return handleError(error);
      }
      initSession.publish(initPublisher, handleError);
    });

    return () => {
      if (initSession) {
        initSession.disconnect();
      }
      if (initPublisher) {
        initPublisher.destroy();
      }
      // subscriberのクリーンアップも行います。
      subscribers.forEach((subscriber) => {
        subscriber.destroy();
      });
    };
  }, []);

  return (
    <>
      <Link href="/workspace/stanby">
        <SlArrowLeft
          size={40}
          className="mt-5 ml-5 ring-1 ring-blue-500 hover:ring-blue-200 transition-all duration-300 ease-in-out rounded-full p-1 cursor-pointer"
        />
      </Link>
      <div className="mt-44 flex justify-center items-center flex-col">
        <div className="flex justify-center gap-10">
          <div
            className="w-[375px] h-[299px] bg-slate-300 rounded-2xl"
            id="publisher"
          ></div>
          <div
            className="w-[375px] h-[299px] bg-slate-300 rounded-2xl"
            id="subscriber1"
          ></div>
          <div
            className="w-[375px] h-[299px] bg-slate-300 rounded-2xl"
            id="subscriber2"
          ></div>
        </div>
        <div className="flex justify-center gap-10 mt-4">
          <div
            className="w-[375px] h-[299px] bg-slate-300 rounded-2xl"
            id="subscriber3"
          ></div>
          <div
            className="w-[375px] h-[299px] bg-slate-300 rounded-2xl"
            id="subscriber4"
          ></div>
          <div
            className="w-[375px] h-[299px] bg-slate-300 rounded-2xl"
            id="subscriber5"
          ></div>
        </div>
      </div>
    </>
  );
}
