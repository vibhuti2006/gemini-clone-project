import { useEffect, useState } from "react";

const Typewriter = ({ text, speed = 10 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p className="response-text">
      {displayedText}
      <span className="cursor">|</span>
    </p>
  );
};

export default Typewriter;
