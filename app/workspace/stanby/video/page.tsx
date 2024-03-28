"use client";
import OT from "@opentok/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SlArrowLeftCircle } from "react-icons/sl";
import { useRouter } from "next/navigation";

type Stream = {
  streamId: string;
  subscriberId: string;
};

const apiKey = process.env.NEXT_PUBLIC_OPENTOK_API_KEY;
const sessionId = process.env.NEXT_PUBLIC_OPENTOK_SESSION_ID;
const token = process.env.NEXT_PUBLIC_OPENTOK_TOKEN;

const page = () => {
  const [subscribers, setSubscribers] = useState<Stream[]>([]);
  const [publisher, setPublisher] = useState<OT.Publisher | null>(null); // 新しい状態を追加
  const [elapsedTime, setElapsedTime] = useState(0);
  const router = useRouter();

  // エラーはalertで通知する
  const handleError = (error: any) => {
    if (error) {
      alert(error.message);
    }
  };

  const initializeSession = () => {
    if (!apiKey || !sessionId || !token) {
      return;
    }
    const session = OT.initSession(apiKey, sessionId);

    // 新しく作られたstreamにsubscribeする
    session.on("streamCreated", function (event: any) {
      session.subscribe(
        event.stream,
        "subscriber",
        {
          insertMode: "append",
          width: "100%",
          height: "100%",
          subscribeToAudio: false,
        },
        handleError
      );
    });

    // publisherを作成
    const publisher = OT.initPublisher(
      "publisher",
      {
        insertMode: "append",
        width: "100%",
        height: "100%",
        //マイクをオフにする
        publishAudio: false,
      },
      handleError
    );
    setPublisher(publisher);

    // セッションに接続
    session.connect(token, function (error) {
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  };
  const toggleCamera = () => {
    if (publisher) {
      if (publisher.stream) publisher.publishVideo(!publisher.stream.hasVideo);
    }
  };

  useEffect(() => {
    if (!apiKey || !sessionId || !token) {
      return;
    }
    const session = OT.initSession(apiKey, sessionId);
    initializeSession();

    const timer = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      session.disconnect();
    };
  }, []);

  const handleEndButtonClick = () => {
    const params = new URLSearchParams();
    params.append("time", elapsedTime.toString());
    const href = `/workspace/stanby/video/result?${params}`;
    router.push(href);
  };

  return (
    <>
      <Link href="/workspace/stanby">
        <SlArrowLeftCircle
          size={40}
          className="mt-5 ml-5 hover:ring-4 hover:ring-blue-300 rounded-full duration-300"
        />
      </Link>
      <div className="flex justify-center mt-8 text-2xl">
        経過時間: {elapsedTime} 秒
      </div>

      <button
        onClick={handleEndButtonClick}
        className="py-2 px-4 bg-blue-300 hover:bg-blue-500 absolute right-0 top-0 mt-5 mr-5 hover:ring-4 hover:ring-blue-300 rounded-full duration-300"
      >
        終了
      </button>

      <div className="mt-36 flex justify-center items-center flex-col">
        <div className="flex justify-center gap-10 flex-wrap">
          <div className="flex flex-col items-center">
            <div
              className="w-[675px] h-[599px] bg-slate-300 rounded-2xl"
              id="publisher"
            />
            <button
              className="py-2 px-3 mt-3 text-white bg-gray-800 rounded-2xl hover:bg-gray-600 duration-300s"
              onClick={toggleCamera}
            >
              カメラをオフ
            </button>
          </div>
          <div>
            <div
              className="w-[675px] h-[599px] bg-slate-300 rounded-2xl"
              id="subscriber"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
