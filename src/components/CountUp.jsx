import { useEffect, useState } from "react";

export default function CountUp({
  to = 100,
  duration = 2,
  separator = "",
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = to;
    const totalTime = duration * 1000;
    const stepTime = Math.abs(Math.floor(totalTime / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);

      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [to, duration]);

  const formatNumber = (num) => {
    if (separator === ",") {
      return num.toLocaleString();
    }
    return num;
  };

  return <span>{formatNumber(count)}</span>;
}