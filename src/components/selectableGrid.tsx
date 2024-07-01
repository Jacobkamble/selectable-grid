import React, { useCallback, useState } from "react";
import Cell from "./Cell";

interface SelectableGridProps {
  rows: number;
  columns: number;
}

const SelectableGrid: React.FC<SelectableGridProps> = ({
  rows = 10,
  columns = 10,
}) => {
  const [gridData, _] = useState<number[]>(
    Array.from({ length: rows * columns }, (_, i) => i)
  );

  const [selectedBoxs, setSelectedBoxs] = useState<number[]>([]);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const handleMouseDown = (boxNumber: number) => {
    setIsMouseDown(true);
    setSelectedBoxs([boxNumber]);
  };

  const handleMouseEnter = useCallback(
    (cellIndex: number) => {
      if (isMouseDown) {
        const startBox = selectedBoxs[0];

        const endBox = cellIndex;

        const selected = [];
        const startRow = Math.floor(startBox / columns);
        const endRow = Math.floor(endBox / columns);
        const startCol = startBox % columns;
        const endCol = endBox % columns;

        const minRow = Math.min(startRow, endRow);
        const maxRow = Math.max(startRow, endRow);

        const minCol = Math.min(startCol, endCol);
        const maxCol = Math.max(startCol, endCol);

        for (let row = minRow; row <= maxRow; row++) {
          for (let col = minCol; col <= maxCol; col++) {
            selected.push(row * columns + col);
          }
        }

        setSelectedBoxs(selected);
      }
    },
    [isMouseDown]
  );

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <>
      <div className="container">
        <div
          onMouseUp={handleMouseUp}
          className="wrapper"
          style={
            {
              "--cols": columns,
              "--rows": rows,
            } as React.CSSProperties
          }
        >
          {gridData?.map((i) => {
            return (
              <Cell
                key={i}
                label={`${i + 1}`}
                handleMouseDown={() => handleMouseDown(i)}
                handleMouseEnter={() => handleMouseEnter(i)}
                isSelected={selectedBoxs.includes(i)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SelectableGrid;
