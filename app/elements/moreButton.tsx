import React from 'react';

interface MoreButtonProrps{
    onClick: () => void;
}

const MoreButton: React.FC<MoreButtonProrps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-4 left-4 bg-[#37bd6d] text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-green-600 transition duration-300"
    >
      Add Button
    </button>
  );
};

export default MoreButton;
