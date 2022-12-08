import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Board from "./Board";
export function NumSquareForm(): JSX.Element {
    const [numSquares, setNumSquares] = useState(12);
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
                    width: "70%",
                    height: "80%",
                    border: "2px solid black",
                    backgroundColor: "gray"
                }}
            >
                <Board numSquares={numSquares} />
            </div>
        </div>
    );
}

export default NumSquareForm;
