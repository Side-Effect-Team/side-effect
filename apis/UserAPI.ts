import axios from "axios";

export const getMypageData = async () => {
  const token = localStorage.getItem("accessToken");
  const id = localStorage.getItem("id");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`/user/mypage/${id}`, config);
  return response;
};

// export const getUserMypageData = async (id: string) => {
//   const response = await axios.get(`/user/mypage/${id}`);
//   return response;
// };

export const getProfileData = async () => {
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`/user/editpage`, config);
  return response.data;
};

export interface MypageEditProps {
  imgUrl?: string;
  nickname?: string;
  introduction?: string;
  tags?: string[];
  position?: string;
  career?: string;
  githubUrl?: string;
  blogUrl?: string;
  portfolioUrl?: string;
}
export const editProfile = async (changes: MypageEditProps) => {
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.patch(`/user/${id}`, changes, config);
  return response;
};