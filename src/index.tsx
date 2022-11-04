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
                style={{
                    position: "relative",
                    top: "20px",
                    left: "650px",
                    fontStyle: "Bold",
                    fontFamily: "Impact"
                }}
            >
                FISHDOM
            </h1>
            <h2>Shreeya, Daniel, </h2>
            <div
                style={{
                    position: "relative",
                    top: "100px",
                    left: "415px",
                    width: "1000px",
                    height: "600px",
                    border: "4px solid black"
                }}
            >
                <Board
                    picPosition={picPosition}
                    width={25}
                    height={25}
                    numSquares={12}
                />
            </div>
        </React.StrictMode>,
        document.getElementById("root")
    );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
