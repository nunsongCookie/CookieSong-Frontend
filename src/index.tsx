import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./global.css";

const container = document.getElementById("root");
const root = createRoot(container!);
const JAVASCRIPT_KEY = import.meta.env.VITE_APP_JAVASCRIPT_KEY;

// Initialize Kakao SDK
window.Kakao.init(JAVASCRIPT_KEY);
window.Kakao.isInitialized();

// In-App Browser handling component
const InAppBrowserHandler: React.FC = () => {
  useEffect(() => {
    const copyToClipboard = (val: string) => {
      const textarea = document.createElement("textarea");
      document.body.appendChild(textarea);
      textarea.value = val;
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    };

    const inAppBrowserOut = () => {
      copyToClipboard(window.location.href);
      alert(
        "URL주소가 복사되었습니다.\n\nSafari가 열리면 주소창을 길게 터치한 뒤, \"붙여놓기 및 이동\"을 누르면 정상적으로 이용하실 수 있습니다."
      );
      window.location.href = "x-web-search://?";
    };

    const userAgent = navigator.userAgent.toLowerCase();
    const targetUrl = window.location.href;

    if (userAgent.match(/kakaotalk/i)) {
      // KakaoTalk external browser
      window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(targetUrl)}`;
    } else if (userAgent.match(/line/i)) {
      // Line external browser
      window.location.href = targetUrl.includes("?")
        ? `${targetUrl}&openExternalBrowser=1`
        : `${targetUrl}?openExternalBrowser=1`;
    } else if (
      userAgent.match(
        /inapp|naver|snapchat|instagram|everytimeapp|whatsapp|electron|iphone(.*)whale|android(.*)whale|twitter|FB_IAB|FBAN|FBIOS/i
      )
    ) {
      if (userAgent.match(/iphone|ipad|ipod/i)) {
        // iOS devices: Display Safari open instructions
        document.body.innerHTML = `
          <div style="font-family: 'Pretendard', sans-serif; text-align: center; padding: 20px;">
            <h2>인앱브라우저 호환문제로 인해<br />Safari로 접속해야합니다.</h2>
            <p>아래 버튼을 눌러 Safari를 실행해주세요.<br />Safari가 열리면, 주소창을 길게 터치한 뒤,<br />'붙여놓기 및 이동'을 누르면<br />정상적으로 이용할 수 있습니다.</p>
            <button onclick="(${inAppBrowserOut})()" style="padding: 10px 20px; background-color: #31408E; color: #fff; border: none; border-radius: 4px; font-size: 16px;">Safari로 열기</button>
          </div>
        `;
      } else {
        // Android devices: Force open in Chrome
        window.location.href = `intent://${targetUrl.replace(/https?:\/\//i, "")}#Intent;scheme=http;package=com.android.chrome;end`;
      }
    }
  }, []);

  return null;
};

root.render(
  <BrowserRouter>
    <InAppBrowserHandler />
    <App />
  </BrowserRouter>
);

reportWebVitals();
