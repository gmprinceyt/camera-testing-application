# 📷 Camera Test App

A simple frontend application that verifies browser camera access and basic media stream handling using native Web APIs.

This project was built as part of **Frontend Shortlisting Task 2 – Simple Camera Test (MERN)**.

---

## 🎯 Goal

* Verify browser camera access
* Handle media streams correctly
* Maintain clean UI state transitions

> **Design is not evaluated**
> **Functionality and correctness are the focus**

---

## 🛠 Tech Stack

* **Next.js (App Router)**
* **React**
* **Tailwind CSS**
* **TypeScript**
* **Native Browser Web APIs only**

No UI templates or third-party camera libraries were used.

---

## 🚀 Live Demo

🔗 **Live URL:** `<your-deployment-link>`
🔗 **GitHub Repo:** `https://github.com/gmprinceyt`

---

## 📂 Routes Overview

### `/` — Homepage

* Static landing page
* Title: **Camera Test App**
* Button: **Start Camera Test**
* Navigates to `/camera-test`

---

### `/camera-test` — Camera Test Page

This page handles the full camera testing flow.

---

## 📸 Camera Test Flow

### Step 1: Request Camera Access

* Triggered on button click
* Uses:

  ```ts
  navigator.mediaDevices.getUserMedia({ video: true })
  ```

#### Handled States

| State   | Behavior                        |
| ------- | ------------------------------- |
| Allowed | Shows **“Camera is working ✅”** |
| Denied  | Shows clear error message       |
| Error   | Graceful fallback message       |

---

### Step 2: Live Camera Preview

* Displays live video feed using `<video>`
* Shows text:

  ```
  Live camera preview active
  ```

❌ No photo capture
❌ No recording

---

### Step 3: Stop / Retry

* **Stop Camera** button:

  * Stops all media tracks
  * Releases camera properly
  * Shows “Camera stopped”
* **Retry** button:

  * Restarts camera test

---

## 🧠 Architecture & Code Quality

### Clean Separation of Concerns

* **Media logic** handled inside a reusable `useCamera` hook
* **UI state** managed separately in components
* **Reusable Button component** for consistent UI

### Proper Cleanup

* All media tracks are stopped:

  * When camera is stopped
  * When component unmounts
* Prevents memory leaks and background camera usage

---

## 🎛 UX Considerations

* Start button is **disabled during permission request**
* Loading spinner shown while camera starts
* Clear messaging for permission denial
* Fully responsive layout (mobile-safe)
* Uses `playsInline` and `muted` for mobile compatibility

---

## 🌍 Browser Support

* ✅ Chrome
* ✅ Edge

(Mobile browsers supported where camera APIs are available)

---

## ⭐ Bonus Features

### 🔄 Camera Switching (Front / Back)

* Detects available cameras using:

  ```ts
  navigator.mediaDevices.enumerateDevices()
  ```
* Allows switching between cameras via dropdown
* Switching works by:

  1. Stopping current stream
  2. Restarting with selected `deviceId`
* On mobile, defaults to **front camera** using:

  ```ts
  facingMode: "user"
  ```

---

### 📐 Camera Resolution Display

* Displays actual camera resolution after stream starts
* Resolution is read from:

  ```ts
  MediaStreamTrack.getSettings()
  ```
* Example:

  ```
  Resolution: 1280 × 720
  ```

---


## 🧪 Setup Instructions

```bash
git clone https://github.com/gmprinceyt/camera-testing-application.git
cd camera-test-app
pnpm install
pnpm run dev
```

Open: `http://localhost:3000`

---
## ⚠️ Limitations

* No photo capture or recording (out of scope)
* Camera labels depend on browser/device
* If permission is denied, browser popup will not reappear automatically (browser security behavior)

---
## 🏁 Summary

This project demonstrates:

* Correct usage of browser camera APIs
* Clean UI state management
* Proper media stream cleanup
* Mobile-friendly camera handling
* Bonus features implemented without external libraries

`Prince developer` 

---
