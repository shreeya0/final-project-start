import type { FC, MutableRefObject } from "react";
import React from "react";
import { Container } from "./Container";

export interface ExampleProps {
    x: number;
    y: number;
    width: number;
    height: number;
    numFish: MutableRefObject<number>;
    deleteThisFish: [number, number];
    delFishX: MutableRefObject<number>;
    delFishID: MutableRefObject<number>;
    setDeleteVal: (x: number, id: string) => void;
    resetDeleteVal: () => void;
    renderDeleteVal: (r: number) => void;
    deleteVal: number;
    numSquares: number;
    tankWidth: number;
    tankHeight: number;
}

export const Example: FC<ExampleProps> = ({
    x,
    y,
    width,
    height,
    numFish,
    deleteThisFish,
    delFishX,
    delFishID,
    setDeleteVal,
    resetDeleteVal,
    renderDeleteVal,
    deleteVal,
    numSquares,
    tankWidth,
    tankHeight
}) => {
    return (
        <div>
            <Container
                hideSourceOnDrag={true}
                x={x}
                y={y}
                width={width}
                height={height}
                numFish={numFish}
                deleteThisFish={deleteThisFish}
                delFishX={delFishX}
                delFishID={delFishID}
                setDeleteVal={setDeleteVal}
                resetDeleteVal={resetDeleteVal}
                renderDeleteVal={renderDeleteVal}
                deleteVal={deleteVal}
                numSquares={numSquares}
                tankWidth={tankWidth}
                tankHeight={tankHeight}
            />
        </div>
    );
};

export default Example;
