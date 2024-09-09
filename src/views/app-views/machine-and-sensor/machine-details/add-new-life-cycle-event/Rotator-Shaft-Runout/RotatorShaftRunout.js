import React, { useState } from 'react'
import { Button, Collapse, Input, Radio } from "antd";
import {

    WhiteImageIcon,
    AuxilleryChecksIcon,
} from "assets/svg/icon";

import {
    EditOutlined,
    HistoryOutlined,
} from "@ant-design/icons";
import EditRotatorShaftRunout from './EditRotatorShaftRunout';
const RotatorShaftRunout = (setModalName, auxilleryHeaterRadioChange, auxileryChecksHeater, setSRUploadForm, setSREditModal) => {
    const { Panel } = Collapse;
    const [editStatus, setEditStatus] = useState(false);

    return (
        <>
            {editStatus && <EditRotatorShaftRunout editStatus={editStatus} setEditStatus={setEditStatus} />}
            <div className="normal-header-color">
                <Collapse
                    expandIconPosition={"end"}
                    onChange={(data) => console.log(data)}
                    className="mb-3"
                >
                    <Panel
                        header={
                            <>
                                <span
                                    className="d-flex align-items-centr"
                                    style={{ gap: "5px" }}
                                >
                                    <AuxilleryChecksIcon /> Position 1{" "}
                                    <span
                                        style={{ color: "grey", fontSize: "14px" }}
                                        className="font-weight-300 ml-2"
                                    >
                                        {" "}
                                        <HistoryOutlined /> Last updated an hour ago{" "}
                                    </span>
                                </span>
                                <span
                                    className="customEditButton"
                                    style={{ gap: "5px" }}
                                >

                                    <Button
                                        className="bg-primary text-white mr-1"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log("add");
                                        }}
                                    >
                                        +
                                    </Button>
                                    <Button onClick={(e) => {
                                        e.stopPropagation();
                                        setSRUploadForm(true)
                                    }} className="bg-primary text-white mr-1">
                                        <WhiteImageIcon />
                                    </Button>
                                    <Button onClick={(e) => {
                                        e.stopPropagation();
                                        setEditStatus(true);
                                        // setModalName("Position1")
                                    }} className="bg-primary text-white mr-1">
                                        <EditOutlined />
                                    </Button>
                                </span>
                            </>
                        }
                        key="1"
                    >
                        <div className="green-radio">

                            <div className="mb-4 mt-3 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.insulation?.checked}
                                >
                                    Name
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.insulation?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("insulation", e)
                                    }

                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.result1?.checked}
                                >
                                    Diameter
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.result1?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("result1", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    Length
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    A
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    B
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    C
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    D
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.remarks?.checked}
                                >
                                    Remarks
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.remarks?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("remarks", e)
                                    }
                                // suffix='mΩ'
                                />
                            </div>
                        </div>
                    </Panel>
                </Collapse>



                <Collapse
                    expandIconPosition={"end"}
                    onChange={(data) => console.log(data)}
                    className="mb-3"
                >
                    <Panel
                        header={
                            <>
                                <span
                                    className="d-flex align-items-centr"
                                    style={{ gap: "5px" }}
                                >
                                    <AuxilleryChecksIcon /> Position 2{" "}
                                    <span
                                        style={{ color: "grey", fontSize: "14px" }}
                                        className="font-weight-300 ml-2"
                                    >
                                        {" "}
                                        <HistoryOutlined /> Last updated an hour ago{" "}
                                    </span>
                                </span>
                                <span
                                    className="customEditButton"
                                    style={{ gap: "5px" }}
                                >

                                    <Button
                                        className="bg-primary text-white mr-1"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log("add");
                                        }}
                                    >
                                        +
                                    </Button>
                                    <Button onClick={(e) => {
                                        e.stopPropagation();
                                        setSRUploadForm(true)
                                    }} className="bg-primary text-white mr-1">
                                        <WhiteImageIcon />
                                    </Button>
                                    <Button onClick={(e) => {
                                        e.stopPropagation();
                                        setEditStatus(true);
                                        // setModalName("Position1")
                                    }} className="bg-primary text-white mr-1">
                                        <EditOutlined />
                                    </Button>
                                </span>
                            </>
                        }
                        key="1"
                    >
                        <div className="green-radio">

                            <div className="mb-4 mt-3 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.insulation?.checked}
                                >
                                    Name
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.insulation?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("insulation", e)
                                    }

                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.result1?.checked}
                                >
                                    Diameter
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.result1?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("result1", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    Length
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    A
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    B
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    C
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    D
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.remarks?.checked}
                                >
                                    Remarks
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.remarks?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("remarks", e)
                                    }
                                // suffix='mΩ'
                                />
                            </div>
                        </div>
                    </Panel>
                </Collapse>


                <Collapse
                    expandIconPosition={"end"}
                    onChange={(data) => console.log(data)}
                    className="mb-3"
                >
                    <Panel
                        header={
                            <>
                                <span
                                    className="d-flex align-items-centr"
                                    style={{ gap: "5px" }}
                                >
                                    <AuxilleryChecksIcon /> Position 3{" "}
                                    <span
                                        style={{ color: "grey", fontSize: "14px" }}
                                        className="font-weight-300 ml-2"
                                    >
                                        {" "}
                                        <HistoryOutlined /> Last updated an hour ago{" "}
                                    </span>
                                </span>
                                <span
                                    className="customEditButton"
                                    style={{ gap: "5px" }}
                                >

                                    <Button
                                        className="bg-primary text-white mr-1"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log("add");
                                        }}
                                    >
                                        +
                                    </Button>
                                    <Button onClick={(e) => {
                                        e.stopPropagation();
                                        setSRUploadForm(true)
                                    }} className="bg-primary text-white mr-1">
                                        <WhiteImageIcon />
                                    </Button>
                                    <Button onClick={(e) => {
                                        e.stopPropagation();
                                        setEditStatus(true);
                                        // setModalName("Position3")
                                    }} className="bg-primary text-white mr-1">
                                        <EditOutlined />
                                    </Button>
                                </span>
                            </>
                        }
                        key="1"
                    >
                        <div className="green-radio">

                            <div className="mb-4 mt-3 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.insulation?.checked}
                                >
                                    Name
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.insulation?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("insulation", e)
                                    }

                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.result1?.checked}
                                >
                                    Diameter
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.result1?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("result1", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    Length
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    A
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    B
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    C
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    D
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.remarks?.checked}
                                >
                                    Remarks
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.remarks?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("remarks", e)
                                    }
                                // suffix='mΩ'
                                />
                            </div>
                        </div>
                    </Panel>
                </Collapse>


                <Collapse
                    expandIconPosition={"end"}
                    onChange={(data) => console.log(data)}
                    className="mb-3"
                >
                    <Panel
                        header={
                            <>
                                <span
                                    className="d-flex align-items-centr"
                                    style={{ gap: "5px" }}
                                >
                                    <AuxilleryChecksIcon /> Position 4{" "}
                                    <span
                                        style={{ color: "grey", fontSize: "14px" }}
                                        className="font-weight-300 ml-2"
                                    >
                                        {" "}
                                        <HistoryOutlined /> Last updated an hour ago{" "}
                                    </span>
                                </span>
                                <span
                                    className="customEditButton"
                                    style={{ gap: "5px" }}
                                >

                                    <Button
                                        className="bg-primary text-white mr-1"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log("add");
                                        }}
                                    >
                                        +
                                    </Button>
                                    <Button onClick={(e) => {
                                        e.stopPropagation();
                                        setSRUploadForm(true)
                                    }} className="bg-primary text-white mr-1">
                                        <WhiteImageIcon />
                                    </Button>
                                    <Button onClick={(e) => {
                                        e.stopPropagation();
                                        setEditStatus(true);
                                        // setModalName("Position 4")
                                    }} className="bg-primary text-white mr-1">
                                        <EditOutlined />
                                    </Button>
                                </span>
                            </>
                        }
                        key="1"
                    >
                        <div className="green-radio">

                            <div className="mb-4 mt-3 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.insulation?.checked}
                                >
                                    Name
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.insulation?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("insulation", e)
                                    }

                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.result1?.checked}
                                >
                                    Diameter
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.result1?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("result1", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    Length
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    A
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    B
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    C
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    D
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.remarks?.checked}
                                >
                                    Remarks
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.remarks?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("remarks", e)
                                    }
                                // suffix='mΩ'
                                />
                            </div>
                        </div>
                    </Panel>
                </Collapse>


                <Collapse
                    expandIconPosition={"end"}
                    onChange={(data) => console.log(data)}
                    className="mb-3"
                >
                    <Panel
                        header={
                            <>
                                <span
                                    className="d-flex align-items-centr"
                                    style={{ gap: "5px" }}
                                >
                                    <AuxilleryChecksIcon /> Position 5{" "}
                                    <span
                                        style={{ color: "grey", fontSize: "14px" }}
                                        className="font-weight-300 ml-2"
                                    >
                                        {" "}
                                        <HistoryOutlined /> Last updated an hour ago{" "}
                                    </span>
                                </span>
                                <span
                                    className="customEditButton"
                                    style={{ gap: "5px" }}
                                >

                                    <Button
                                        className="bg-primary text-white mr-1"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log("add");
                                        }}
                                    >
                                        +
                                    </Button>
                                    <Button onClick={(e) => {
                                        e.stopPropagation();
                                        setSRUploadForm(true)
                                    }} className="bg-primary text-white mr-1">
                                        <WhiteImageIcon />
                                    </Button>
                                    <Button onClick={(e) => {
                                        e.stopPropagation();
                                        setEditStatus(true);
                                        // setModalName("Position5")
                                    }} className="bg-primary text-white mr-1">
                                        <EditOutlined />
                                    </Button>
                                </span>
                            </>
                        }
                        key="1"
                    >
                        <div className="green-radio">

                            <div className="mb-4 mt-3 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.insulation?.checked}
                                >
                                    Name
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.insulation?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("insulation", e)
                                    }

                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.result1?.checked}
                                >
                                    Diameter
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.result1?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("result1", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    Length
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    A
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    B
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    C
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    D
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="mm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.remarks?.checked}
                                >
                                    Remarks
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.remarks?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("remarks", e)
                                    }
                                // suffix='mΩ'
                                />
                            </div>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </>
    )
}

export default RotatorShaftRunout