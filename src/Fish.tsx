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
    name: number;
    hideSourceOnDrag?: boolean;
    children?: ReactNode;
    height: number;
    width: number;
    s: string;
    size: number;
}

export const Fish: FC<FishProps> = ({
    id,
    left,
    top,
    name,
    hideSourceOnDrag,
    children,
    height,
    width,
    s,
    size
}) => {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.FISH,
            item: { id, left, top, name, s, size },
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            })
        }),
        [id, left, top, name, s, size]
    );

    const smallerSize = height > width ? width : height;

    if (isDragging && hideSourceOnDrag) {
        return <div ref={drag} />;
    }
    console.log("realFishWidth: ", smallerSize * (size / 6));
    return (
        <div
            className={"fish" + id.toString()}
            ref={drag}
            style={{
                ...style,
                left,
                top,
                height: (smallerSize * (size / 6)).toString() + "px",
                width: (smallerSize * (size / 6)).toString() + "px",
                border: "2px dotted white"
            }}
            data-testid={"fish" + id.toString()}
        >
            {children}
            <img
                src={require(s + "")}
                alt="tankPic"
                style={{
                    position: "relative",
                    height: "100%",
                    width: "100%"
                }}
            />
        </div>
    );
};
