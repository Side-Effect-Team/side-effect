import { useAppDispatch } from "@/store/hooks";
import { handleModalView } from "@/store/loginViewTransitionSlice";
import { addEmail, addProviderType } from "@/store/userInfoStoreSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { OAuthLogin, OAuthLoginWrapper, ButtonTitle } from "./styled";
import { createAuthentication } from "@/store/authSlice";
import { closeModal } from "@/store/modalSlice";
import axios from "axios";
import Image from "next/image";
import GoogleImg from "../../../../public/images/Google.png";
import useToast from "@/hooks/common/useToast";
import { handleAuth } from "@/utils/auth";
export default function GoogleLoginButton() {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const login = useGoogleLogin({
    onSuccess: async (res) => {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/social/login`, null, {
          headers: { token: res.access_token, ProviderType: "google" },
        })
        .then((res) => {
          localStorage.setItem("id", res.data.userId);
          handleAuth.setToken(res.headers.authorization);
          dispatch(createAuthentication());
          dispatch(closeModal());
        })
        .catch((error) => {
          if (error.response.status === 400) {
            dispatch(addProviderType("GOOGLE"));
            dispatch(addEmail(error.response.data.email));
            dispatch(handleModalView({ modalView: "registerNickname" }));
          } else {
            addToast({
              type: "error",
              title: "로그인 실패",
              content:
                "서버가 원활하지 않습니다. 고객센터로 문의 부탁드립니다.",
            });
          }
        });
    },
  });
  return (
    <OAuthLoginWrapper>
      <OAuthLogin onClick={() => login()}>
        <Image
          src={GoogleImg}
          alt="Google Logo Image"
          width={100}
          height={100}
        />
      </OAuthLogin>
      <ButtonTitle>구글 로그인</ButtonTitle>
    </OAuthLoginWrapper>
  );
}
