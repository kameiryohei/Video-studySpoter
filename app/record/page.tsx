"use client";

import OT from "@opentok/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const SESSION_ID = process.env.NEXT_PUBLIC_SESSION_ID;
const TOKEN = process.env.NEXT_PUBLIC_TOKEN;

// Handling all of our errors here by alerting them
function handleError(error: any) {
  if (!error) return;
  alert(error.message);
}

export default function Home() {
  const [session, setSession] = useState<any>(null);
  const [publisher, setPublisher] = useState<any>(null);
  const [subscriber, setSubscriber] = useState<any | null>(null);

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
      // 既存のサブスクライバーがあれば破棄する
      if (subscriber) {
        subscriber.destroy();
      }

      // 新しいサブスクライバーを作成
      const newSubscriber = initSession.subscribe(
        event.stream,
        "subscriber",
        {
          insertMode: "append",
          width: "100%",
          height: "100%",
        },
        handleError
      );

      setSubscriber(newSubscriber); // 新しいサブスクライバーをstateに設定
    });

    initSession.on("streamDestroyed", function (event) {
      // ストリームが破棄された場合、サブスクライバーも破棄する
      if (subscriber) {
        subscriber.destroy();
        setSubscriber(null);
      }
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
      if (subscriber) {
        subscriber.destroy();
      }
    };
  }, []);

  return (
    <>
      <div className="px-10 py-2">
        <Link href="/">
          <p className="border-b-blue-500 text-3xl font-bold top-0 outline-2">
            Home
          </p>
        </Link>
        <div className="flex justify-center items-center gap-10">
          <div className="">
            <div id="publisher" className="w-[690px] h-[690px] bg-slate-600" />
            <p className="text-red-500 text-3xl text-center p-1">
              あなたの画面
            </p>
          </div>
          <div className="">
            <div id="subscriber" className="w-[690px] h-[690px] bg-slate-600" />
            <p className="text-red-500 text-3xl text-center p-1">
              他の人の画面
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
