"use client";

import { Layout } from "@/components/layout/layout";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useCamera } from "@/hooks/useCamera";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function CameraTest() {
  const { videoRef, error, status, resolution, cameras, currentCameraId, startCamera, stopCamera , switchCamera, } =
    useCamera();
  const { theme } = useTheme();

  // Notifications
  useEffect(() => {
    if (error && error !== null) {
      toast.error(error, { style: { fontFamily: "Geist Mono" } });
    }
  }, [error]);
  useEffect(() => {
    if (status === "success") {
      toast.success("Camera is Working fine. ", {
        style: { fontFamily: "Geist Mono" },
      });
    }
  }, [status]);

  // Canditional Render For Helper Button
  const renderControls = () => {
    switch (status) {
      case "loading":
        return <Button disabled>Starting...</Button>;
      case "success":
        return (
          <Button variant="destructive" onClick={stopCamera}>
            Stop Camera
          </Button>
        );
      case "error":
      case "stopped":
        return <Button onClick={()=>startCamera()}>Restart Camera</Button>;
      default:
        return <Button onClick={()=>startCamera()}>Start Camera</Button>;
    }
  };
  // Canditional Render For Camera Status
  const renderCameraStatus = () => {
    switch (status) {
      case "loading":
        return <Spinner className="size-7" />;
      case "idle":
        return (
          <h2 className="text-green-400 font-mono ">
            Start Camera Test, Click on{" "}
            <span className="dark:text-white text-black italic ">
              "Start Camera"
            </span>{" "}
            button.
          </h2>
        );
      case "stopped":
        return (
          <h2 className="text-yellow-400 font-mono text-[18px]">
            Camera Stopped!
          </h2>
        );
      case "success":
        return (
          <div className="text-green-400 font-mono text-[12px]">
            <h2>Live camera preview: active</h2>
            <h2 className="">
              Camera resolution: <span>{resolution}</span>
            </h2>
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <Layout>
      <div className="  lg:px-16 px-4.5 h-screen bg-linear-to-b from-[#fff3c8] to-[#ffe14e] dark:from-[#312b0b] dark:to-[#000000] ">
        <Navbar />

        <div className="flex justify-center relative z-9">
          <Card className="max-w-130 w-full  mt-8 aspect-square max-h-114.5 px-4 items-center justify-center ">
            <div className="w-full h-full relative ">
              {/* Render Video MediaStream  */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover bg-yellow-100 dark:bg-black   rounded-lg border"
              />

              {/* Render Camera Status ,Texts */}
              <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                {renderCameraStatus()}
              </div>
            </div>

            {/* Render Media Controls */}
            <div className="flex gap-4">
              {renderControls()}

              <div className="">
                {cameras.length > 1 && status === "success" && (
                  <select
                    value={currentCameraId ?? ""}
                    onChange={(e) => switchCamera(e.target.value)}
                    className="border p-2 rounded w-full max-w-xs cursor-pointer"
                  >
                    {cameras.map((cam) => (
                      <option className="dark:bg-black" key={cam.deviceId} value={cam.deviceId}>
                        {cam.label} 
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* ToastContainer */}
        <ToastContainer position="top-right" theme={theme} limit={2} />
      </div>

      {/* Background Images */}
      <Image
        alt="Background-image"
        className="absolute left-0 top-1 animate-bounce animation-duration-[10s]"
        src={"/Circlebg.svg"}
        height={218}
        width={218}
      />
      <Image
        alt="Background-image"
        className="absolute right-0 bottom-1 rotate-180 animate-bounce animation-duration-[10s]"
        src={"/Circlebg.svg"}
        height={218}
        width={218}
      />
    </Layout>
  );
}
