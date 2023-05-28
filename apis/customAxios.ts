import axios from "axios";
import { store } from "@/store/store";
import { removeAuthentication } from "@/store/authSlice";
import { handleAuth } from "@/utils/auth";
import { handleRefreshAccessToken } from "./UserAPI";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
const customAxios = axios.create({
  baseURL,
  withCredentials: true,
});

customAxios.interceptors.request.use(
  (config) => {
    const accessToken = handleAuth.getToken();
    console.log(accessToken);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config } = error;
    console.log("error", error);
    //액세스토큰 재발급 갱신
    if (error.response?.data.code === "AT_001") {
      try {
        await handleRefreshAccessToken();
        const newAccessToken = handleAuth.getToken();
        config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return customAxios.request(config);
      } catch (error: any) {
        //리프레쉬토큰 만료
        if (error.response.data.code === "RT_001") {
          store.dispatch(removeAuthentication());
          window.alert("로그인 유지기간이 만료되었습니다.");
          window.location.replace("/");
        }
        console.log(error);
      }
    }
    return Promise.reject(error);
  },
);
export default customAxios;
