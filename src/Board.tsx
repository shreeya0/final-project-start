import React, { MutableRefObject, useRef, useState } from "react";
import Example from "./Example";

const renderSquare = (
    i: number,
    width: number,
    height: number,
    incFish: () => void,
    decFish: () => void,
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
                incFish={incFish}
                decFish={decFish}
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
    const numCol = Math.ceil(Math.sqrt(numSquares));
    const width = 100 / numCol;
    const height = 100 / Math.ceil(numSquares / numCol);
    const tankWidth = (width / 100) * boardWidth;
    const tankHeight = (height / 100) * boardHeight;
    const squares = [];
    //const [numFish, setNumFish] = useState(0);
    const numFish = useRef(0);
    const incFish = () => {
        //setNumFish(numFish + 1);
        numFish.current = numFish.current + 1;
    };
    const decFish = () => {
        //setNumFish(numFish - 1);
        numFish.current = numFish.current - 1;
    };
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
        delFishX.current = -1;
        delFishID.current = -1;
    };

    for (let i = 0; i < numSquares; i++) {
        squares.push(
            renderSquare(
                i,
                width,
                height,
                incFish,
                decFish,
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
