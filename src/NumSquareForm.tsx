import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Board from "./Board";
export function NumSquareForm(): JSX.Element {
    const [numSquares, setNumSquares] = useState(9);
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const boardHeight = windowHeight * 0.8;
    const boardWidth = windowWidth * 0.7;
    return (
        <div>
            <div>
                <Form.Group
                    controlId="numSquareForm"
                    style={{
                        position: "fixed",
                        width: "130px",
                        right: "2%",
                        bottom: "3%"
                    }}
                >
                    <Form.Label>Number of Tanks:</Form.Label>
                    <Form.Control
                        type="number"
                        value={numSquares}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setNumSquares(parseInt(event.target.value))}
                    />
                </Form.Group>
            </div>
            <div
                style={{
                    position: "fixed",
                    bottom: "10%",
                    right: "2%",
                    width: boardWidth.toString() + "px",
                    height: boardHeight.toString() + "px",
                    border: "4px solid rgb(33,37,41)",
                    backgroundColor: "rgb(33,37,41)",
                    borderRadius: "10px"
                }}
            >
                <Board
                    numSquares={numSquares}
                    boardWidth={boardWidth}
                    boardHeight={boardHeight}
                />
            </div>
        </div>
    );
}

export default NumSquareForm;
