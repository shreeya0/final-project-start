/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ReactNode } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

export interface MenuFishProps {
    s: string;
    id: any;
    left: number;
    top: number;
    name: number;
    hideSourceOnDrag?: boolean;
    children?: ReactNode;
    size: number;
    pred: boolean;
    salt: boolean;
}

export const MenuFish: FC<MenuFishProps> = ({
    s,
    id,
    left,
    top,
    name,
    hideSourceOnDrag,
    children,
    size,
    pred,
    salt
}) => {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.FISH,
            item: { id, left, top, name, s, size, pred, salt },
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            })
        }),
        [id, left, top, name, s, size, pred, salt]
    );

    if (isDragging && hideSourceOnDrag) {
        return <div ref={drag} />;
    }
    return (
        <div
            ref={drag}
            style={{
                position: "relative",
                width: "100%",
                alignContent: "center",
                backgroundColor: "rgb(33,37,41)",
                borderColor: "rgb(33,37,41)",
                zIndex: 2
            }}
        >
            {children}
            <img src={require(s + "")} width="25%" height="25%" />
        </div>
    );
};
