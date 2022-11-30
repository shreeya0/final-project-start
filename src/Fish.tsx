/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CSSProperties, FC, ReactNode } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import React from "react";

const style: CSSProperties = {
    position: "absolute",
    backgroundColor: "none",
    padding: "0.5rem 1rem",
    cursor: "move",
    zIndex: "2"
};

export interface FishProps {
    id: any;
    left: number;
    top: number;
    hideSourceOnDrag?: boolean;
    children?: ReactNode;
    height: number;
}

export const Fish: FC<FishProps> = ({
    id,
    left,
    top,
    hideSourceOnDrag,
    children,
    height
}) => {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.FISH,
            item: { id, left, top },
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            })
        }),
        [id, left, top]
    );

    if (isDragging && hideSourceOnDrag) {
        return <div ref={drag} />;
    }

    return (
        <div
            className="fish"
            ref={drag}
            style={{
                ...style,
                left,
                top,
                width: height.toString() + "%",
                height: height.toString() + "%"
            }}
            data-testid="fish"
        >
            {children}
            <img
                src={require("./images/pixelFish.png")}
                alt="tankPic"
                width="100%"
                height="100%"
            />
        </div>
    );
};