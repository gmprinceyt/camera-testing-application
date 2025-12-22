"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type status = "idle" | "loading" | "success" | "error" | "stopped";

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [resolution, setResolution] = useState<string>("");
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [currentCameraId, setCurrentCameraId] = useState<string | null>(null);

  const startCamera = async (deviceId?: string) => {
    try {
      setError(null);
      setStatus("loading");

      // Check a permission status
      const permission = await navigator.permissions.query({
        name: "camera" as PermissionName,
      });

      if (permission.state === "denied") {
        setStatus("error");
        setError(
          "Please allow camera access from browser settings or View site infomation."
        );
        return;
      }

      const constraints: MediaStreamConstraints = {
        video: deviceId
          ? { deviceId: { exact: deviceId } }
          : { facingMode: "user" }, // mobile-friendly default
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Set Video Resolution
      const videoTrack = streamRef.current.getVideoTracks()[0];
      const settings = videoTrack.getSettings();
      setResolution(`${settings.width} x ${settings.height}`);
      console.log(settings);

      // load available Video Devices AFTER permission
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setCameras(videoDevices);

      // Add current CameraId
      if (!currentCameraId) {
        setCurrentCameraId(videoTrack.getSettings().deviceId ?? null);
      }
      setStatus("success");
    } catch (err: any) {
      if (err.name === "NotAllowedError") {
        setError(
          "Camera permission denied. Please allow camera access from browser settings."
        );
      } else {
        setError("Camera not available.");
      }
      setStatus("error");
    }
  };

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setStatus("stopped");
  }, [streamRef]);

  const switchCamera  = useCallback(
    async (deviceId: string) => {
      if (deviceId === currentCameraId) return;

      stopCamera();
      setCurrentCameraId(deviceId);
      await startCamera(deviceId);
    },
    [streamRef, currentCameraId]
  );

  useEffect(() => {
    return () => stopCamera(); // cleanup on unmount
  }, []);

  return { videoRef,resolution, status, error, startCamera, stopCamera,switchCamera, currentCameraId, cameras };
}
