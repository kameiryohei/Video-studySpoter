import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="px-20 py-12">
      <div className="w-full h-full flex gap-10 justify-center">
        <div className="relative w-1/2 h-1/2">
          <Link href="/workspace">
            <Image
              src="/images/homeimg-1.jpg"
              alt="workspace"
              width={802}
              height={400}
              className="rounded-3xl w-full h-full grayscale hover:grayscale-0 transition duration-300 object-cover"
            />
            <p className="text-8xl font-bold absolute top-3 right-0 text-white p-4">
              Work Space
            </p>
          </Link>
        </div>
        <div className="relative w-1/4 h-1/2">
          <Link href="/rank">
            <Image
              src="/images/homeimg-2.jpg"
              alt="workspace"
              width="393"
              height="551"
              className="h-full rounded-3xl grayscale hover:grayscale-0 transition duration-300 object-cover"
            />
            <p className="text-8xl font-bold absolute top-3 right-0 text-white p-4">
              Rank
            </p>
          </Link>
        </div>
      </div>
      <div className="relative items-center h-56 px-44 mt-6">
        <Link href="/record">
          <Image
            src="/images/homeimg-3.jpg"
            alt="workspace"
            width="393"
            height="551"
            className="w-full h-full rounded-3xl grayscale hover:grayscale-0 transition duration-300 object-cover"
          />
          <p className="text-8xl font-bold absolute top-0 right-52 text-white p-4">
            Record
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
