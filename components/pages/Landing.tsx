import Image from "next/image";
import { Navbar } from "../layout/Navbar";
import { Button } from "../ui/button";
import Link from "next/link";

export function Landing() {
  // temp application popularity 
  const usage = 327;
  return (
    <div className="w-full h-full  overflow-hidden lg:h-screen lg:px-16 px-4.5 sm:px-8 bg-linear-to-b from-[#fff3c8] to-[#ffe14e] dark:from-[#312b0b] dark:to-[#000000]">
      <Navbar />
      <div className="flex relative lg:flex-row flex-col gap-20  lg:gap-5 mt-14 h-[calc(100vh-116px)]   lg:h-[calc(100vh-136px)] z-9">
        {/* Title, Description & Button */}
        <div className="space-y-6">
          <h1 className="font-extrabold text-shadow-md text-[55px] leading-15 lg:text-[72px] lg:leading-20 max-w-159.75">
            Test Your <span className="text-[#f5cf13]">Camera</span> in One Click
          </h1>
          <p className="text-[20px] max-w-147.75 font-mono">
            Check if your camera is working properly in seconds. No downloads.
            No sign-up. 100% free and easy to use.
          </p>

          <Link href={"/camera-test"}> 
          <Button className="rounded-[40px] px-10 py-6 hover:scale-105">
            Start Camera Test
          </Button>
          </Link>
        </div>

        {/* Fake Popularity  */}
        <div className="relative">
          <Image
            alt="Background-image"
            className="animate-bounce animation-duration-[4s]"
            src={"/hero.png"}
            height={500}
            width={500}
          />
          <div className=" text-shadow-md absolute top-0 right-7 flex flex-col items-center rotate-12 -space-y-1 font-mono">
            <h4 className="text-[20px] ">{usage}+</h4>
            <p>Total Pepole are tested</p>
          </div>
        </div>
      </div>
      
      {/* Background Image */}
      <Image
        alt="Background-image"
        className="absolute left-0 top-1"
        src={"/Circlebg.svg"}
        height={218}
        width={218}
      />
      <Image
        alt="Background-image"
        className="absolute right-0 bottom-1 rotate-180"
        src={"/Circlebg.svg"}
        height={218}
        width={218}
      />
    </div>
  );
}
