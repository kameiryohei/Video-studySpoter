"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const page = () => {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState<string>(params.get("time"));

  return (
    <div className="mx-auto max-w-3xl lg:max-w-2xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
      <p className="text-center text-3xl font-bold text-blue-400">
        お疲れ様でした！
      </p>
      <p className="mt-10">
        {search ? (
          <span className="text-3xl">経過時間: {search} 秒</span>
        ) : (
          <span className="text-3xl">経過時間が見つかりませんでした</span>
        )}
      </p>
      <button
        onClick={() => router.push("/")}
        className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Home
      </button>
    </div>
  );
};

export default page;
