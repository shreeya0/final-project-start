import React from "react";
import ReactDOM from "react-dom";
import { observe } from "./game";
import reportWebVitals from "./reportWebVitals";
import NumSquareForm from "./NumSquareForm";
import { Menu } from "./Menu";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

observe(() => {
    ReactDOM.render(
        <div>
            <DndProvider backend={HTML5Backend}>
                <React.StrictMode>
                    <h1
                        className="text-center"
                        style={{
                            fontStyle: "Bold",
                            fontFamily: "Impact",
                            fontSize: "80px",
                            color: "rgb(33,37,41)"
                        }}
                    >
                        FISH HOOKS
                    </h1>
                    <span
                        style={{
                            fontFamily: "Impact",
                            fontSize: "30px",
                            position: "fixed",
                            top: "90.5%",
                            left: "28%",
                            color: "rgb(33,37,41)"
                        }}
                    >
                        Authors: Daniel, Shreeya, Jason
                    </span>
                    <div>
                        <Menu></Menu>
                    </div>
                    <div>
                        <NumSquareForm></NumSquareForm>
                    </div>
                </React.StrictMode>
            </DndProvider>
        </div>,
        document.getElementById("root")
    );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
