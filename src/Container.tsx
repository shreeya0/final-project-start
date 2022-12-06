import type { FC } from "react";
import { useCallback, useState } from "react";
import type { XYCoord } from "react-dnd";
import { useDrop } from "react-dnd";
import React from "react";
import { Fish } from "./Fish";
import type { DragItem } from "./interfaces";
import { ItemTypes } from "./ItemTypes";
import Overlay from "./Overlay";

export interface ContainerProps {
    hideSourceOnDrag: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    incFish: () => void;
    decFish: () => void;
    numFish: number;
    deleteThisFish: [number, number];
    setDeleteVal: (x: number, id: string) => void;
    resetDeleteVal: () => void;
}

export const Container: FC<ContainerProps> = ({
    hideSourceOnDrag,
    x,
    width,
    height,
    incFish,
    numFish,
    deleteThisFish,
    setDeleteVal,
    resetDeleteVal
}) => {
    const [fishes, setFishes] = useState(Array(0).fill(Array(0).fill(null)));

    console.log("deleteThisFish", deleteThisFish, "x", x);
    console.log("Fish", fishes);
    const newFishes = [...fishes];
    let index = -1;
    let bool_delete = false;
    for (let i = 0; i < fishes.length; i++) {
        newFishes[i] = fishes[i];
    }
    for (let i = 0; i < fishes.length; i++) {
        if (newFishes[i][0] === deleteThisFish[1]) {
            bool_delete = true;
            index = i;
        }
    }
    if (deleteThisFish[0] !== x && bool_delete) {
        console.log("inside delete this fish", deleteThisFish);
        newFishes.splice(index, 1);
        index = -1;
        bool_delete = false;
        resetDeleteVal();
        setFishes(newFishes);
    }
    const addFish = () => {
        console.log("inside add fish");
        const tankWidth = document.getElementById("tank")?.offsetWidth;
        const tankHeight = document.getElementById("tank")?.offsetHeight;
        const newFishes = [...fishes];
        for (let i = 0; i < fishes.length; i++) {
            newFishes[i] = fishes[i];
        }
        if (tankHeight !== undefined && tankWidth !== undefined) {
            const fishWidth = (height / 100) * tankWidth;
            const fishHeight = (height / 100) * tankHeight;
            const top = Math.floor(tankHeight - fishHeight);
            const left = Math.floor(tankWidth - fishWidth);
            const newFish = [numFish, left, top];
            newFishes.push(newFish);
            setFishes(newFishes);
            incFish();
        } else {
            console.log("undefined");
        }
    };

    const addFishNewTank = (id: number) => {
        const tankWidth = document.getElementById("tank")?.offsetWidth;
        const tankHeight = document.getElementById("tank")?.offsetHeight;
        const newFishes = [...fishes];
        for (let i = 0; i < fishes.length; i++) {
            newFishes[i] = fishes[i];
        }
        if (tankHeight !== undefined && tankWidth !== undefined) {
            const fishWidth = (height / 100) * tankWidth;
            const fishHeight = (height / 100) * tankHeight;
            const top = Math.floor(tankHeight - fishHeight);
            const left = Math.floor(tankWidth - fishWidth);
            const idVal = id.toString();
            const newFish = [id, left, top];
            newFishes.push(newFish);
            setFishes(newFishes);
            setDeleteVal(x, idVal);
        } else {
            console.log("undefined");
        }
    };

    const moveFish = useCallback(
        (id: number, left: number, top: number, name: number) => {
            const tankWidth = document.getElementById("tank")?.offsetWidth;
            const tankHeight = document.getElementById("tank")?.offsetHeight;
            const newFishes = [...fishes];
            for (let i = 0; i < fishes.length; i++) {
                newFishes[i] = fishes[i];
            }
            if (tankWidth !== undefined && tankHeight !== undefined) {
                const fishWidth = (height / 100) * tankWidth;
                const fishHeight = (height / 100) * tankHeight;
                if (
                    left + fishWidth < tankWidth &&
                    left > 0 &&
                    top + fishHeight < tankHeight &&
                    top > 0
                ) {
                    newFishes[id] = [name, left, top];
                    setFishes(newFishes);
                } else {
                    addFishNewTank(name);
                }
            }
        },
        [fishes, setFishes]
    );

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.FISH,
            drop(item: DragItem, monitor) {
                const delta =
                    monitor.getDifferenceFromInitialOffset() as XYCoord;
                const left = Math.round(item.left + delta.x);
                const top = Math.round(item.top + delta.y);
                const name = item.name;
                moveFish(item.id, left, top, name);
                return;
            }
        }),
        [moveFish]
    );

    const salt = x % 2 === 1;
    const pred = x % 3 === 0;

    let tankPic = "";
    if (salt) {
        tankPic = "salt.png";
    } else {
        tankPic = "fresh.png";
    }
    return (
        <div
            ref={drop}
            id={"tank"}
            style={{
                height: height.toString() + "%",
                width: width.toString() + "%",
                border: "1px solid black",
                position: "absolute"
            }}
            onClick={addFish}
        >
            <img
                src={require("./images/" + tankPic)}
                alt="tankPic"
                width="100%"
                height="100%"
            />
            {pred && <Overlay color="red" opacity={0.25} />}
            {fishes.map((thisFish: [number, number, number]) => {
                const left = thisFish[1];
                const top = thisFish[2];
                const id = thisFish[0];
                return (
                    <Fish
                        key={fishes.indexOf(thisFish)}
                        id={fishes.indexOf(thisFish)}
                        name={id}
                        left={left}
                        top={top}
                        hideSourceOnDrag={hideSourceOnDrag}
                        height={height}
                    ></Fish>
                );
            })}
        </div>
    );
};
