import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./TankEdit.css";

interface tankEditProps {
    tankSalt: boolean;
    tankPred: boolean;
    swapEdit: () => void;
    handleChanges: (newTankSalt: boolean, newTankPred: boolean) => void;
}

export const TankEdit = ({
    tankSalt,
    tankPred,
    swapEdit,
    handleChanges
}: tankEditProps) => {
    const [newTankSalt, setNewTankSalt] = useState(tankSalt);
    const [newTankPred, setNewTankPred] = useState(tankPred);
    return (
        <div>
            <div className="edit_header">
                <Form.Group controlId="formEditQuizId">
                    <div className="freshwater_flex">
                        <Form.Check
                            className="freshwater_check"
                            type="checkbox"
                            id="is-freshwater_check"
                            label="Freshwater"
                            data-testid="Tank Freshwater"
                            checked={!newTankSalt}
                            onChange={() => {
                                setNewTankSalt(!newTankSalt);
                            }}
                            style={{ color: "white" }}
                        ></Form.Check>
                    </div>
                    <div className="predator_flex">
                        <Form.Check
                            className="predator_check"
                            type="checkbox"
                            id="is-predator_check"
                            label="Predator"
                            data-testid="Tank Freshwater"
                            checked={newTankPred}
                            onChange={() => {
                                setNewTankPred(!newTankPred);
                            }}
                            style={{
                                color: "white"
                            }}
                        ></Form.Check>
                    </div>
                </Form.Group>
            </div>
            <div>
                <div>
                    <Button
                        onClick={() => {
                            handleChanges(newTankSalt, newTankPred);
                            swapEdit();
                        }}
                        style={{
                            color: "white",
                            marginRight: "1rem",
                            marginLeft: "1rem"
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={swapEdit}
                        style={{
                            color: "white"
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};
