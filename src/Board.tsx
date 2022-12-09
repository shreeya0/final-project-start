import React, { MutableRefObject, useRef, useState } from "react";
import Example from "./Example";

const cent = 100;
const reset = -1;

const renderSquare = (
    i: number,
    width: number,
    height: number,
    numFish: MutableRefObject<number>,
    delFishX: MutableRefObject<number>,
    delFishID: MutableRefObject<number>,
    setDeleteVal: (x: number, id: string) => void,
    resetDeleteVal: () => void,
    renderDeleteVal: (r: number) => void,
    deleteVal: number,
    numSquares: number,
    tankWidth: number,
    tankHeight: number
) => {
    const x = i;
    const y = 0;
    return (
        <div
            key={i}
            style={{
                width: width.toString() + "%",
                height: height.toString() + "%"
            }}
        >
            <Example
                x={x}
                y={y}
                width={width}
                height={height}
                numFish={numFish}
                deleteThisFish={[delFishX.current, delFishID.current]}
                delFishX={delFishX}
                delFishID={delFishID}
                setDeleteVal={setDeleteVal}
                resetDeleteVal={resetDeleteVal}
                renderDeleteVal={renderDeleteVal}
                deleteVal={deleteVal}
                numSquares={numSquares}
                tankWidth={tankWidth}
                tankHeight={tankHeight}
            ></Example>
        </div>
    );
};

type BoardProps = {
    numSquares: number;
    boardWidth: number;
    boardHeight: number;
};

export function Board({ numSquares, boardWidth, boardHeight }: BoardProps) {
    const numFish = useRef(0);
    const numCol = Math.ceil(Math.sqrt(numSquares));
    const width = cent / numCol;
    const height = cent / Math.ceil(numSquares / numCol);
    const tankWidth = (width / cent) * boardWidth;
    const tankHeight = (height / cent) * boardHeight;
    const squares = [];
    const delFishX = useRef(-1);
    const delFishID = useRef(-1);
    const [renderDelete, setRenderDelete] = useState(0);
    function renderDeleteVal(r: number) {
        console.log("render delete before", renderDelete);
        setRenderDelete(r);
        console.log("render delete after", renderDelete);
    }

    const setDeleteVal = (x: number, id: string) => {
        delFishX.current = x;
        delFishID.current = parseInt(id);
        console.log("delFishX", delFishX.current);
        console.log("delFishID", delFishID.current);
    };

    const resetDeleteVal = () => {
        delFishX.current = reset;
        delFishID.current = reset;
    };

    for (let i = 0; i < numSquares; i++) {
        squares.push(
            renderSquare(
                i,
                width,
                height,
                numFish,
                delFishX,
                delFishID,
                setDeleteVal,
                resetDeleteVal,
                renderDeleteVal,
                renderDelete,
                numSquares,
                tankWidth,
                tankHeight
            )
        );
    }
    console.log("deleteX board", delFishX);
    console.log("deleteID board", delFishID);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexWrap: "wrap"
            }}
        >
            {squares}
        </div>
    );
}

export default Board;
