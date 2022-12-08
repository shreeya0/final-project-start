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
                backgroundColor: "rgb(14,109,253)"
            }}
        >
            Filter
        </Button>
    );
}
