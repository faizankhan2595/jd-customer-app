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
import EditFreeVolumeCheck from './EditFreeVolumeCheck';
const FreeVolumeCheck = ({ auxilleryHeaterRadioChange, auxileryChecksHeater, setSRUploadForm, setSREditModal }) => {
    const { Panel } = Collapse;
    const [editStatus, setEditStatus] = useState(false);
    const [modalName, setModalName] = useState("");
    return (
        <>
            {editStatus && <EditFreeVolumeCheck modalName={modalName} editStatus={editStatus} setEditStatus={setEditStatus} />}
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
                                    <AuxilleryChecksIcon /> Frame 1-Motor Body / Stator{" "}
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
                                        setEditStatus(true)
                                        setModalName("Frame1")
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
                                    Motor Frame inner dia 'a'
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.insulation?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("insulation", e)
                                    }
                                    suffix="cm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.result1?.checked}
                                >
                                    Motor Core length 'b'
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.result1?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("result1", e)
                                    }
                                    suffix="cm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    Motor Core Length 'f'
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="cm"
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
                                    <AuxilleryChecksIcon /> Frame-V2-Lead Connection Chamber{" "}
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
                                        setEditStatus(true)
                                        setModalName("Frame2")
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
                                    Width
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.insulation?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("insulation", e)
                                    }
                                    suffix="cm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.result1?.checked}
                                >
                                    Breadth
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.result1?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("result1", e)
                                    }
                                    suffix="cm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    Height
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="cm"
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
                                    <AuxilleryChecksIcon /> Terminal Box-V3-Rectangular Box{" "}
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
                                        setEditStatus(true)
                                        setModalName("TerminalBox-V3")
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
                                    T-box internal width 'w'
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
                                    T-box internal breadth 'b'
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
                                    T-box internal height 'h'
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
                                    <AuxilleryChecksIcon /> Terminal Box-V4-Circular Box{" "}
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
                                        setEditStatus(true)
                                        setModalName("TerminalBox-V4")
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
                                    T-Box internal width 'w'
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
                                    T-Box internal breadth 'h'
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
                                    <AuxilleryChecksIcon /> Auxiliary box-V5-Rectangular box{" "}
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
                                        setEditStatus(true)
                                        setModalName("AuxiliaryBox-V5")
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
                                    T-Box internal width 'w'
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.insulation?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("insulation", e)
                                    }
                                    suffix="cm"
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
                                    suffix="cm"
                                />
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Radio
                                    style={{ width: "30%" }}
                                    checked={auxileryChecksHeater?.resistance?.checked}
                                >
                                    T-box internal breadth 'b'
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.resistance?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("resistance", e)
                                    }
                                    suffix="cm"
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
                                    <AuxilleryChecksIcon /> Auxiliary box-V6-Circular Box{" "}
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
                                        setEditStatus(true)
                                        setModalName("Auxilarybox-V6")
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
                                    T-box internal width 'w'
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
                                    T-box internal breadth 'h'
                                </Radio>
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder="Type here..."
                                    value={auxileryChecksHeater?.result1?.value}
                                    onChange={(e) =>
                                        auxilleryHeaterRadioChange("result1", e)
                                    }
                                    suffix="cm"
                                />
                            </div>
                        </div>
                    </Panel>
                </Collapse>

            </div>
        </>
    )
}

export default FreeVolumeCheck