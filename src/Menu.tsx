/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Button, ButtonGroup, Col, Form, Modal, Table } from "react-bootstrap";
import { FilterButton } from "./filterButton";
import { Fish } from "./interfaces/Fish";
import { allList } from "./interfaces/fishpics";
import { MenuFish } from "./MenuFish";
import { SortButton } from "./sortButton";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;
export function Menu() {
    const viewList = ["All", "Saltwater", "Freshwater", "Predator", "Prey"];
    const viewListSort = ["None", "Size"];
    const [view, setView] = useState(viewList[0]);
    const [option, setOption] = useState(allList[0]);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    function changeOption() {
        if (view === "All" || view === "None") {
            setOption(allList[0]);
        } else if (view === "Saltwater") {
            setOption(allList[1]);
        } else if (view === "Freshwater") {
            setOption(allList[2]);
        } else if (view === "Predator") {
            setOption(allList[3]);
        } else if (view === "Prey") {
            setOption(allList[4]);
        } else {
            setOption(allList[5]);
        }
        handleCloseModal();
        handleCloseModalSort();
    }
    const [showModalSort, setShowModalSort] = useState(false);
    const handleCloseModalSort = () => setShowModalSort(false);
    const handleShowModalSort = () => setShowModalSort(true);

    const changeView = (event: ChangeEvent) => {
        setView(event.target.value);
    };
    /*
    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.FISH,
            drop(item: DragItem, monitor) {
                return;
            }
        }),
        []
    );
    */
    return (
        <div
            className="bg-grey border m-2 p-2"
            style={{
                position: "fixed",
                bottom: "9.1%",
                left: "0.25%",
                height: "80%",
                width: "26%",
                backgroundColor: "rgb(33,37,41)",
                borderRadius: "10px"
            }}
        >
            <p></p>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title> Choose Fish Type </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col>
                        <Form.Select
                            data-testid="list"
                            value={view}
                            onChange={changeView}
                        >
                            {viewList.map((s: string) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={changeOption}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalSort} onHide={handleCloseModalSort}>
                <Modal.Header>
                    <Modal.Title> Choose Sort Method </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col>
                        <Form.Select
                            data-testid="list"
                            value={view}
                            onChange={changeView}
                        >
                            {viewListSort.map((s: string) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={changeOption}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <p></p>
            <div
                style={{
                    scrollbarWidth: "none",
                    overflow: "hidden",
                    borderRadius: "10px",
                    height: "100%",
                    width: "100%",
                    left: "0",
                    top: "-3.1%"
                }}
            >
                <div
                    //className="table-wrapper-scroll-y my-custom-scrollbar"
                    style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: "0%",
                        top: "0%",
                        borderRadius: "10px",
                        scrollbarWidth: "none",
                        overflow: "auto"
                    }}
                >
                    <Table className="table-responsive" variant="dark">
                        <tbody>
                            {option.map((s: Fish) => (
                                <tr key={s.image}>
                                    <td>
                                        <div style={{ alignContent: "center" }}>
                                            <MenuFish
                                                s={s.image}
                                                size={s.size}
                                                key={s.image}
                                                id={s.image}
                                                name={-3}
                                                left={0}
                                                top={0}
                                                hideSourceOnDrag={true}
                                                pred={s.predator}
                                                salt={!s.freshwater}
                                            ></MenuFish>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            <ButtonGroup
                style={{
                    position: "absolute",
                    bottom: "-5.5%"
                }}
            >
                <div style={{ position: "relative", left: "-9%" }}>
                    <FilterButton
                        handleShowModal={handleShowModal}
                    ></FilterButton>
                </div>
                <div style={{ position: "relative", left: "10%" }}>
                    <SortButton
                        handleShowModal={handleShowModalSort}
                    ></SortButton>
                </div>
            </ButtonGroup>
        </div>
    );
}
