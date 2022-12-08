import React, { FC } from "react";
import { Button, Modal } from "react-bootstrap";

type PopupProps = {
    handleClose: () => void;
    message: string;
    show: boolean;
};

export const Popup: FC<PopupProps> = ({ handleClose, message, show }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Fish out of water!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={handleClose}
                    style={{
                        backgroundColor: "rgb(5,98,153)"
                    }}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
