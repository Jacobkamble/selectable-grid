import React from "react";

interface CellProps {
  label: string;
  handleMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void;
  isSelected: boolean;
}

const Cell: React.FC<CellProps> = ({
  label,
  handleMouseDown = () => {},
  handleMouseEnter,
  isSelected,
}) => {
  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        className={`cell ${isSelected ? "active" : ""}`}
      >
        <div> {label}</div>
      </div>
    </>
  );
};

export default Cell;
