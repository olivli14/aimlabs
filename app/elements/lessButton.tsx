import React from 'react';

interface LessButtonProrps{
    onClick: () => void;
}

const LessButton: React.FC<LessButtonProrps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-4 right-4 bg-[#e76e5c] text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-red-600 transition duration-300"
    >
      Remove Button
    </button>
  );
};

export default LessButton;
