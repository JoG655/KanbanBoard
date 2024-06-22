import { useState, useEffect } from "react";

const useCurrentTime = (updateInterval: number = 60000) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(Date.now());
    };

    updateCurrentTime();

    const intervalId = setInterval(updateCurrentTime, updateInterval);

    return () => clearInterval(intervalId);
  }, [updateInterval]);

  return currentTime;
};

export default useCurrentTime;
