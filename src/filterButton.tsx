import { Button } from "react-bootstrap";
import React from "react";

type filterButtonProps = {
    handleShowModal: () => void;
};

export function FilterButton({ handleShowModal }: filterButtonProps) {
    return (
        <Button
            variant="success"
            onClick={handleShowModal}
            data-testid="chooseOption"
            style={{
                backgroundColor: "rgb(0,105,188)"
            }}
        >
            Filter
        </Button>
    );
}
