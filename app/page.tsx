import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="px-20 py-12">
      <div className="w-full h-full flex gap-x-20 justify-center items-end">
        <div className="relative w-[802px] h-[551px]">
          <Link href="/workspace">
            <Image
              src="/images/homeimg-1.jpg"
              alt="workspace"
              width={802}
              height={400}
              className="rounded-3xl shadow-2xl w-full h-full grayscale hover:grayscale-0 transition duration-300 object-cover"
            />
            <p className="text-8xl font-bold absolute top-3 right-0 text-white p-4">
              Work Space
            </p>
          </Link>
        </div>
        <div className="relative w-[393px] h-[551px]">
          <Link href="/rank">
            <Image
              src="/images/homeimg-2.jpg"
              alt="workspace"
              width="393"
              height="551"
              className="h-full shadow-2xl rounded-3xl grayscale hover:grayscale-0 transition duration-300 object-cover"
            />
            <p className="text-8xl font-bold absolute top-3 right-0 text-white p-4">
              Rank
            </p>
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative items-center mt-6 w-[1279px] h-[265px]">
          <Link href="/record">
            <Image
              src="/images/homeimg-3.jpg"
              alt="workspace"
              width="393"
              height="551"
              className="w-full h-full shadow-2xl rounded-3xl grayscale hover:grayscale-0 transition duration-300 object-cover"
            />
            <p className="text-8xl font-bold absolute top-0 right-0 text-white p-4">
              Record
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
