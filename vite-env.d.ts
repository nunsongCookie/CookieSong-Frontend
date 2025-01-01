interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_APP_JAVASCRIPT_KEY: string;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface Window {
    Kakao: any;
  }