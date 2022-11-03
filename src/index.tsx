import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board";
import "./index.css";
import { observe } from "./game";
import reportWebVitals from "./reportWebVitals";

observe((picPosition: [number, number]) => {
    ReactDOM.render(
        <React.StrictMode>
            <h1
                className="text-center"
                style={{
                    fontStyle: "Bold",
                    fontFamily: "Impact",
                    fontSize: "80px"
                }}
            >
                FISHDOM
            </h1>
            <div
                style={{
                    position: "absolute",
                    top: "10%",
                    left: "25%",
                    width: "70%",
                    height: "80%",
                    border: "2px solid black",
                    backgroundColor: "gray"
                }}
            >
                <Board picPosition={picPosition} numSquares={12} />
            </div>
        </React.StrictMode>,
        document.getElementById("root")
    );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function NumSquareForm(): JSX.Element {
    return (
        <div>
            <Form.Group
                controlId="numSquareForm"
                style={{
                    position: "relative",
                    width: "130px",
                    right: 0,
                    bottom: -10
                }}
            >
                <Form.Label>Number of Tanks:</Form.Label>
                <Form.Control
                    type="number"
                    value={numSquares}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setNumSquares(parseInt(event.target.value))
                    }
                />
            </Form.Group>
        </div>
    );
}

export default NumSquareForm;

*/
