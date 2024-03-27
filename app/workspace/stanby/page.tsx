import { Slider } from "@/components/ui/slider";
import Link from "next/link";

const page = () => {
  return (
    <div className="px-24 mt-10">
      <div className="flex justify-center">
        <div className="bg-gray-600 w-[1244px] h-[732px] rounded-2xl">aa</div>
      </div>
      <div className="flex mt-5 justify-center">
        <Link href="/workspace/stanby/video">
          <div className="bg-gray-500 w-[190px] h-[190px] rounded-full" />
        </Link>
        <Slider defaultValue={[33]} max={100} step={1} className="w-[466px]" />
      </div>
    </div>
  );
};

export default page;
