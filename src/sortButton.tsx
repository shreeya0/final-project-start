import { Button } from "react-bootstrap";
import React from "react";

type sortButtonProps = {
    handleShowModal: () => void;
};

export function SortButton({ handleShowModal }: sortButtonProps) {
    return (
        <Button
            variant="success"
            onClick={handleShowModal}
            data-testid="chooseOption"
            style={{
                backgroundColor: "rgb(0,105,188)"
            }}
        >
            Sort
        </Button>
    );
}
