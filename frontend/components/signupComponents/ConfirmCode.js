import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

const ConfirmCode = ({
  email,
  confirmCode,
  setConfirmCode,
  confirmCodeStyle,
  handleConfirmCode,
  id,
  page,
}) => {
  const [resendCount, setResendCount] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [timer, setTimer] = useState({});

  useEffect(() => {
    if (page === id) {
      setResendCount(1);
      setCountdown(60);
    }
  }, [page]);

  useEffect(() => {
    let interval = null;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1);
        setTimer(getTimeDiff(countdown));
      }, 1000);
    } else if (countdown === 0) {
      clearInterval(interval);
      setTimer({
        minutes: "00",
        seconds: "00",
      });
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const handleResendCode = async () => {
    if (countdown > 0) return;
    try {
      const response = await axios.get("/resend-verification-email", {
        params: {
          email,
        },
      });
      console.log(response.data);
      setResendCount(resendCount + 1);
      setCountdown(60 * resendCount);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View className='flex-1 h-full w-full space-y-6 items-center py-5'>
      <View className='text-[23px] w-[90%] space-y-1 font-[700] text-left mb-2 mt-3'>
        <Text className='text-[23px] w-[80%] font-[700] text-left'>
          Confirm your email
        </Text>
        <Text className='text-[14px] w-[80%] pl-2 text-[#8E8E8F]  text-left'>
          We have sent a 6-digit code to {email}. Please enter it below to
          verify your email.{" "}
        </Text>
      </View>
      <View className='text-[23px] w-[85%] space-y-1 font-[700] text-left mb-2 mt-3'>
        <OtpInput
          autoFocus={true}
          numberOfDigits={6}
          onTextChange={setConfirmCode}
          onFilled={handleConfirmCode}
          theme={{
            filledPinCodeContainerStyle: confirmCodeStyle,
          }}
        />
      </View>
      <Text className='text-[12px] w-[90%] text-center text-[#8E8E8F] my-1'>
        If you did not receive the code, please check your spam folder or click
        on the button below to resend the code.
      </Text>
      {resendCount > 3 && (
        <Text className='text-[12px] pt-5 text-red-600'>
          Ensure that the email address you provided is correct.
        </Text>
      )}
      <View className='pt-[20%]'>
        <Text
          className={
            countdown > 1
              ? "text-[15px] text-center text-[#8E8E8F]"
              : "text-[15px] text-center"
          }
          onPress={handleResendCode}
        >
          Request new code
        </Text>
        <Text className='text-[13px] pt-5 text-[#8E8E8F]'>
          You can request a new code in {timer.minutes}:{timer.seconds}
        </Text>
      </View>
    </View>
  );
};

const MIN_IN_MS = 60;

const formatNumber = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
};

const getTimeDiff = (diffInSec) => {
  let diff = diffInSec;
  const minutes = Math.floor(diff / MIN_IN_MS); // Give remaining minutes
  diff -= minutes * MIN_IN_MS; // Subtract minutes
  const seconds = Math.floor(diff); // Give remaining seconds
  return {
    minutes: formatNumber(minutes),
    seconds: formatNumber(seconds),
  };
};

export default ConfirmCode;
