import { useEffect, useRef } from "react";

import styled from "styled-components";

const CountdownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #1976d2;
  border-radius: 5px;
  margin: auto;
  width: 100px;
  height: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0.4, 0.4);
`;

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

  return <CountdownContainer>{formatTime(countdown)}</CountdownContainer>;
};
