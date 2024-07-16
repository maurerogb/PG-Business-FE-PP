import { baseUrl } from "./baseUrl";

export const createNewUser = async (merchantRegBody: API.UserDTO) => {
  return await fetch(`${baseUrl}/api/v1/user/new-signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(merchantRegBody),
  });
};

export const activateAccount = async (otpBody: API.UserOTP) => {
  return await fetch(`${baseUrl}/api/v1/user/activate-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(otpBody),
  });
};

export const resendOTP = async (resendOTPBody: API.ResendOTP) => {
  return await fetch(`${baseUrl}/api/v1/user/resend-signup-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resendOTPBody),
  });
};

export const forgetPassword = async (
  forgetPasswordBody: API.ForgetPassword,
) => {
  return await fetch(`${baseUrl}/api/v1/user/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(forgetPasswordBody),
  });
};

export const OTP = async (OTPBody: API.OTP) => {
  return await fetch(`${baseUrl}/api/v1/user/update-forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(OTPBody),
  });
};
export const resetPassword = async (resetPasswordBody: API.resetPasword) => {
  return await fetch(`${baseUrl}/api/v1/user/set-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resetPasswordBody),
  });
};
