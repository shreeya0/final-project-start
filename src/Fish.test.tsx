import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { Menu } from "./Menu";
import NumSquareForm from "./NumSquareForm";
import ReactDOM from "react-dom";
import { observe } from "./game";
import "./Container";
import { Fish } from "./Fish";

const TANKS = screen.getAllByTestId("tank");

describe("Testing if Fishdom is rendering", () => {
    const getFishdom = observe((picPosition: [number, number]) => {
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
                    FISHDOM: Shreeya, Daniel, Jason
                </h1>
                <div>
                    <Menu></Menu>
                </div>
                <div>
                    <NumSquareForm picPosition={picPosition}></NumSquareForm>
                </div>
                <div className="App"></div>
            </React.StrictMode>,
            document.getElementById("root")
        );
    });
    expect(getFishdom).toBeInTheDocument();
});

test("Testing if fish is in tank", () => {
    const tank = screen.getByTestId("tank");
    tank.click();
    expect(Fish).toBeInTheDocument();
});

test("Testing filter button", () => {
    const button = screen.getByText("Filter through Options");
    button.click();
    expect(screen.getByLabelText("Choose Fish Type")).toBeInTheDocument();
});

//test("Testing if button changed fish to place down", () => {});

//test("Testing if fish moved successfully to another tank", () => {});
