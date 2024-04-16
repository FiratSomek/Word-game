import { useEffect, useRef } from "react";

interface CountdownProps {
  countdown: number;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
}

export const CountDown: React.FC<CountdownProps> = ({
  countdown,
  setCountdown,
}) => {
  const timerId = useRef<number | undefined>();

  useEffect(() => {
    timerId.current = window.setInterval(() => {
      setCountdown((prev: number) => {
        if (prev === 1) {
          clearInterval(timerId.current);
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return <div>{formatTime(countdown)}</div>;
};
