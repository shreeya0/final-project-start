/* eslint-disable no-extra-parens */
import { FC, MutableRefObject } from "react";
import { useCallback, useState } from "react";
import type { XYCoord } from "react-dnd";
import { useDrop } from "react-dnd";
import React from "react";
import { Fish } from "./Fish";
import type { DragItem } from "./interfaces";
import { ItemTypes } from "./ItemTypes";
import Overlay from "./Overlay";
import { Popup } from "./Popup";
import { TankEdit } from "./TankEdit";

export interface ContainerProps {
    hideSourceOnDrag: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    incFish: () => void;
    decFish: () => void;
    numFish: MutableRefObject<number>;
    deleteThisFish: [number, number];
    setDeleteVal: (x: number, id: string) => void;
    resetDeleteVal: () => void;
    deleteVal: number;
    delFishX: MutableRefObject<number>;
    delFishID: MutableRefObject<number>;
    renderDeleteVal: (r: number) => void;
    numSquares: number;
    tankWidth: number;
    tankHeight: number;
}

export const Container: FC<ContainerProps> = ({
    hideSourceOnDrag,
    x,
    width,
    height,
    renderDeleteVal,
    deleteVal,
    numFish,
    setDeleteVal,
    delFishX,
    delFishID,
    tankWidth,
    tankHeight
}) => {
    const [tankSalt, setTankSalt] = useState(x % 2 === 1);
    const [tankPred, setTankPred] = useState(x % 3 === 0);
    const [edit, setEdit] = useState(false);
    const swapEdit = () => {
        setEdit(!edit);
    };
    const [fishes, setFishes] = useState(Array(0).fill(Array(0).fill(null)));
    const handleChanges = (newTankSalt: boolean, newTankPred: boolean) => {
        if (newTankSalt !== tankSalt || newTankPred !== tankPred) {
            setFishes(Array(0).fill(Array(0).fill(null)));
            setTankSalt(newTankSalt);
            setTankPred(newTankPred);
        }
    };
    const smallerSize = tankHeight >= tankWidth ? tankWidth : tankHeight;
    let incRender = deleteVal;
    /*
    for (let i = 0; i < fishes.length; i++) {
        updateFishes[i] = fishes[i];
        const name = updateFishes[i][0];
        let left = updateFishes[i][1];
        let top = updateFishes[i][2];
        const s = updateFishes[i][3];
        const size = updateFishes[i][4];
        if (tankHeight !== undefined && tankWidth !== undefined) {
            const smallerSize =
                tankHeight >= tankWidth ? tankWidth : tankHeight;
            const fishWidth = smallerSize * (size / 6);
            const fishHeight = smallerSize * (size / 6);
            const maxLeft = tankWidth - fishWidth;
            const maxTop = tankHeight - fishHeight;
            if (left >= maxLeft) {
                left = maxLeft - 1;
                update = true;
            }
            if (top >= maxTop) {
                top = maxTop - 1;
                update = true;
            }
            updateFishes[i] = [name, left, top, s, size];
        }
    }
    */
    const updateFishes = Array(0).fill(Array(0).fill(null));
    fishes.map(
        (
            thisFish: [number, number, number, string, number, boolean, boolean]
        ) => (updateFishes[fishes.indexOf(thisFish)] = [...thisFish])
    );
    let update = false;
    updateFishes.map(
        (
            thisFish: [number, number, number, string, number, boolean, boolean]
        ) => {
            const fishWidth = smallerSize * (thisFish[4] / 6);
            const fishHeight = smallerSize * (thisFish[4] / 6);
            const maxLeft = tankWidth - fishWidth;
            const maxTop = tankHeight - fishHeight;
            if (thisFish[1] >= maxLeft) {
                thisFish[1] = maxLeft - 1;
                update = true;
            }
            if (thisFish[2] >= maxTop) {
                thisFish[2] = maxTop - 1;
                update = true;
            }
        }
    );
    if (update) {
        setFishes(updateFishes);
    }
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const handleClose = () => setShow(false);
    let index = -1;
    const newFishes = Array(0).fill(Array(0).fill(null));
    fishes.map(
        (
            thisFish: [number, number, number, string, number, boolean, boolean]
        ) => (newFishes[fishes.indexOf(thisFish)] = [...thisFish])
    );
    /*
    for (let i = 0; i < fishes.length; i++) {
        if (newFishes[i][0] === delFishID.current) {
            bool_delete = true;
            index = i;
        }
    }*/
    index = newFishes.reduce(
        (
            it: number,
            thisFish: [number, number, number, string, number, boolean, boolean]
        ) =>
            (it =
                thisFish[0] === delFishID.current
                    ? newFishes.indexOf(thisFish)
                    : it),
        -1
    );
    console.log(
        "Rerendered: { delFishX: " +
            delFishX.current +
            " delFishID: " +
            delFishID.current +
            " index: " +
            index
    );
    if (delFishX.current !== x && index !== -1) {
        newFishes.splice(index, 1);
        setFishes(newFishes);
        index = -1;
        //delFishX.current = -1;
        //delFishID.current = -1;
    }

    const addFishNewTank = (
        id: number,
        left: number,
        top: number,
        s: string,
        size: number,
        pred: boolean,
        salt: boolean
    ) => {
        console.log("inside add fish new tank");
        let leftAdjusted = 0;
        let topAdjusted = 0;
        if (left < 0) {
            leftAdjusted = tankWidth + (left % tankWidth);
        } else if (left > 0) {
            leftAdjusted = left % tankWidth;
        }
        if (top < 0) {
            topAdjusted = tankHeight + (top % tankHeight);
        } else if (top > 0) {
            topAdjusted = top % tankHeight;
        }
        const newFishes = [...fishes];
        for (let i = 0; i < fishes.length; i++) {
            newFishes[i] = fishes[i];
        }
        const idVal = id.toString();
        const newFish = [id, leftAdjusted, topAdjusted, s, size, pred, salt];
        newFishes.push(newFish);
        setDeleteVal(x, idVal);
        renderDeleteVal(incRender++);
        setFishes(newFishes);
        renderDeleteVal(incRender++);
        console.log("deleteX after set", delFishX.current);
        console.log("deleteID after set", delFishID.current);
    };

    const addFishFromMenu = (
        s: string,
        size: number,
        pred: boolean,
        salt: boolean
    ) => {
        console.log("inside from menu");
        const newFishes = [...fishes];
        for (let i = 0; i < fishes.length; i++) {
            newFishes[i] = fishes[i];
        }
        const newFish = [numFish.current, 10, 10, s, size, pred, salt];
        //incFish();
        numFish.current++;
        //renderDeleteVal(incRender++);
        newFishes.push(newFish);
        setFishes(newFishes);
    };

    const moveFish = useCallback(
        (
            id: number,
            left: number,
            top: number,
            name: number,
            s: string,
            size: number,
            pred: boolean,
            salt: boolean
        ) => {
            console.log("inside move fish");
            console.log(
                "fish{ id: " +
                    id +
                    " left: " +
                    left +
                    " top: " +
                    top +
                    " name: " +
                    name +
                    " size: " +
                    size +
                    " pred: " +
                    pred +
                    " salt: " +
                    salt +
                    " }"
            );
            const tankWidth = document.getElementById("tank")?.offsetWidth;
            const tankHeight = document.getElementById("tank")?.offsetHeight;
            console.log("tankWidth", tankWidth);
            const newFishes = [...fishes];
            for (let i = 0; i < fishes.length; i++) {
                newFishes[i] = fishes[i];
            }
            if (tankWidth !== undefined && tankHeight !== undefined) {
                /*console.log(
                    "tankWidth: " + tankWidth + " tankHeight: " + tankHeight
                );*/
                const smallerSize =
                    tankHeight >= tankWidth ? tankWidth : tankHeight;
                //console.log("smallerSize: " + smallerSize);
                const fishWidth = smallerSize * (size / 6);
                //console.log("fishWidth: " + fishWidth);
                const fishHeight = smallerSize * (size / 6);
                if (name === -3) {
                    addFishFromMenu(s, size, pred, salt);
                } else if (
                    left + fishWidth <= tankWidth &&
                    left >= 0 &&
                    top + fishHeight <= tankHeight &&
                    top >= 0
                ) {
                    newFishes[id] = [name, left, top, s, size, pred, salt];
                    setFishes(newFishes);
                } else if (
                    ((left < 0 && Math.abs(left)) > fishWidth ||
                        left > tankWidth ||
                        (top < 0 && Math.abs(top)) > fishHeight ||
                        top > tankHeight) &&
                    ((left < 0 && Math.abs(left) % tankWidth > fishWidth) ||
                        (left % tankWidth > 0 &&
                            left % tankWidth < tankWidth - fishWidth)) &&
                    ((top < 0 && Math.abs(top) % tankHeight > fishHeight) ||
                        (top % tankHeight > 0 &&
                            top % tankHeight < tankHeight - fishHeight))
                ) {
                    addFishNewTank(name, left, top, s, size, pred, salt);
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
                if (item.pred === tankPred && item.salt === tankSalt) {
                    moveFish(
                        item.id,
                        left,
                        top,
                        name,
                        item.s,
                        item.size,
                        item.pred,
                        item.salt
                    );
                } else {
                    console.log("inside popup if");
                    setMessage(
                        "You can't put a " +
                            (item.salt ? "saltwater " : "freshwater ") +
                            (item.pred ? "predator " : "prey ") +
                            "into a " +
                            (tankSalt ? "saltwater " : "freshwater ") +
                            (tankPred ? "predator " : "prey ") +
                            "tank."
                    );
                    setShow(true);
                }
                return;
            }
        }),
        [moveFish]
    );
    let tankPic = "";
    if (tankSalt && tankPred) {
        tankPic = "predSalt.png";
    } else if (tankSalt && !tankPred) {
        tankPic = "preySalt.png";
    } else if (!tankSalt && tankPred) {
        tankPic = "predFresh.png";
    } else {
        tankPic = "preyFresh.png";
    }
    console.log("fishes tank " + x + ": " + fishes);
    return (
        <div>
            <div>
                {edit && (
                    <TankEdit
                        tankSalt={tankSalt}
                        tankPred={tankPred}
                        swapEdit={swapEdit}
                        handleChanges={handleChanges}
                    ></TankEdit>
                )}
            </div>
            {!edit && (
                <div>
                    <Popup
                        handleClose={handleClose}
                        message={message}
                        show={show}
                    ></Popup>
                    <div
                        ref={drop}
                        id={"tank"}
                        onClick={swapEdit}
                        data-testid={"tank"}
                        style={{
                            height: height.toString() + "%",
                            width: width.toString() + "%",
                            border: "2px solid rgb(33,37,41)",
                            position: "absolute",
                            borderRadius: "5px"
                        }}
                    >
                        <img
                            src={require("./images/" + tankPic)}
                            alt="tankPic"
                            width="100%"
                            height="100%"
                            style={{ borderRadius: "5px", opacity: "0.9" }}
                        />
                        {tankPred && <Overlay color="red" opacity={0.15} />}
                        {tankSalt && <Overlay color="blue" opacity={0.05} />}
                        {fishes.map(
                            (
                                thisFish: [
                                    number,
                                    number,
                                    number,
                                    string,
                                    number,
                                    boolean,
                                    boolean
                                ]
                            ) => {
                                const left = thisFish[1];
                                const top = thisFish[2];
                                const id = thisFish[0];
                                const s = thisFish[3];
                                const size = thisFish[4];
                                const pred = thisFish[5];
                                const salt = thisFish[6];
                                return (
                                    <Fish
                                        key={fishes.indexOf(thisFish)}
                                        id={fishes.indexOf(thisFish)}
                                        name={id}
                                        left={left}
                                        top={top}
                                        hideSourceOnDrag={hideSourceOnDrag}
                                        height={
                                            tankHeight !== undefined
                                                ? tankHeight
                                                : height
                                        }
                                        width={
                                            tankWidth !== undefined
                                                ? tankWidth
                                                : height
                                        }
                                        s={s}
                                        size={size}
                                        pred={pred}
                                        salt={salt}
                                    ></Fish>
                                );
                            }
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
