declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL: string;
    ONESIGNAL_APP_ID: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
