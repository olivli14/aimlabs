import React, { useState } from "react";

interface RandomButtonProps {
  id: number; // Button ID for unique identification
  onIncrement: ()=> void;
}

const RandomButton: React.FC<RandomButtonProps> = ({ id, onIncrement}) => {
  const [clickCount, setClickCount] = useState<number>(0);
  const [position, setPosition] = useState({ top: Math.floor(Math.random() * 90) + "%", left: Math.floor(Math.random() * 90) + "%" });
  //initial random position


  const getRandomPosition = () => {
    const randomTop = Math.floor(Math.random() * 90) + "%"; // Random top (0% to 90%)
    const randomLeft = Math.floor(Math.random() * 90) + "%"; // Random left (0% to 90%)
    return { top: randomTop, left: randomLeft };
  };

  const handleMoreClick = () => {
    setClickCount(clickCount + 1);
    setPosition(getRandomPosition());
    onIncrement();
  };

  
  return (
    <button
      className="bg-blue-500 text-white font-bold rounded-full w-20 h-20 flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 absolute"
      style={{ top: position.top, left: position.left }}
      onClick={handleMoreClick}
    >
      {clickCount}
    </button>
  );
};

export default RandomButton;