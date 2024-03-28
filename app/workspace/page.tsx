"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "../auth_context";

const page = () => {
  const currentUser = useAuth();
  return (
    <>
      <div className="mt-40 flex justify-center">
        {currentUser ? (
          <div className="w-[1229px] h-[400px] relative">
            <Link href="/workspace/stanby">
              <Image
                src="/images/work.jpg"
                alt="workspace"
                width="393"
                height="551"
                className="w-full h-full shadow-2xl rounded-3xl grayscale hover:grayscale-0 transition duration-300 object-cover object-bottom"
              />
              <p className="text-8xl font-bold absolute top-3 right-8 text-gray-600 p-4">
                Work
              </p>
            </Link>
          </div>
        ) : (
          <div className="w-[1229px] h-[400px] relative">
            <Link href="/workspace/stanby">
              <Image
                src="/images/work.jpg"
                alt="workspace"
                width="393"
                height="551"
                className="w-full h-full shadow-2xl rounded-3xl grayscale hover:grayscale-0 transition duration-300 object-cover object-bottom"
              />
              <div className="absolute inset-0 bg-black opacity-75 rounded-2xl" />
              <Image
                src="/images/kagi.png"
                alt="center image"
                width={100}
                height={100}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
              <p className="text-5xl font-bold absolute top-3 right-8 text-white p-4">
                ログインすると使用できます
              </p>
            </Link>
          </div>
        )}
      </div>
      <div className="flex justify-center gap-x-12 mt-5">
        <div className="w-[375px] h-[299px] relative">
          <Image
            src="/images/lock-1.jpg"
            alt="workspace"
            width="393"
            height="551"
            className="h-full shadow-2xl rounded-3xl grayscale hover:grayscale-0 transition duration-300 object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-75 rounded-2xl" />
          <Image
            src="/images/kagi.png"
            alt="center image"
            width={100}
            height={100}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="w-[375px] h-[299px] relative">
          <Image
            src="/images/lock-2.jpg"
            alt="workspace"
            width="393"
            height="551"
            className="h-full shadow-2xl rounded-3xl grayscale hover:grayscale-0 transition duration-300 object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-75 rounded-2xl" />
          <Image
            src="/images/kagi.png"
            alt="center image"
            width={100}
            height={100}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="w-[375px] h-[299px] relative">
          <Image
            src="/images/lock-3.jpg"
            alt="workspace"
            width="393"
            height="551"
            className="h-full shadow-2xl rounded-3xl grayscale hover:grayscale-0 transition duration-300 object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-75 rounded-2xl" />
          <Image
            src="/images/kagi.png"
            alt="center image"
            width={100}
            height={100}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </>
  );
};

export default page;
