import { client } from '../../../utils/apis/axios';

interface postVerifyCodeType {
  phoneNumber: string;
  verificationCode: string;
}

export const postVerifyCode = async ({ phoneNumber, verificationCode }: postVerifyCodeType) => {
  try {
    const { data } = await client.post(`/api/v1/phone/verification`, {
      phoneNumber: phoneNumber,
      verificationCode: verificationCode,
    });
    console.log(data);
    return data;
  } catch (err) {
    console.error('문자인증번호 유효성 에러: ', err);
  }
};
