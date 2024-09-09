import React from 'react';
import { useState } from 'react';
import { Button, Collapse, Input, Radio } from "antd";
import { WhiteImageIcon, AuxilleryChecksIcon } from "assets/svg/icon";
import { EditOutlined, HistoryOutlined } from "@ant-design/icons";
import EditFlamePathDimension from './EditFlamePathDimension';

const FlamePathDimension = ({ auxilleryHeaterRadioChange, auxileryChecksHeater, setSRUploadForm, setSREditModal }) => {
    const [number, setNumber] = useState();
    const [editStatus, setEditStatus] = useState(false);
    const [modalName, setModalName] = useState("");
    const [editData, setEditData] = useState("");

    const { Panel } = Collapse;
    const data = [
        {
            data1: {
                name: "Position A", data: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard", "Maximum permissibe gap"],
                edit1: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard", "Maximum permissibe gap"]
            }
        },
        {
            data2: {
                name: "Position B", data: ["Chamber Volume", "Flame Path Length", "vvv"],
                edit2: ["Chamber Volume", "Flame Path Length", "vvv"]
            }
        },
        {
            data3: { name: "Position C", data: ["Chamber Volume", "Flame Path Length"], edit3: ["Chamber Volume", "Flame Path Length"] }
        },
        {
            data4: { name: "Position C1", data: ["Chamber Volume", "Flame Path Length"], edit4: ["Chamber Volume", "Flame Path Length"] }
        },
        {
            data5: { name: "Position D", data: ["Chamber Volume", "Flame Path Length"], edit5: ["Chamber Volume", "Flame Path Length"] }
        },
        {
            data6: { name: "Position E", data: ["Chamber Volume", "Flame Path Length"], edit6: ["Chamber Volume", "Flame Path Length"] }
        },
        {
            data7: { name: "Position E1", data: ["Chamber Volume", "Flame Path Length"], edit7: ["Chamber Volume", "Flame Path Length"] }
        },
        {
            data8: { name: "Position G", data: ["Chamber Volume", "Flame Path Length"], edit8: ["Chamber Volume", "Flame Path Length"] }
        },
        {
            data9: { name: "Position H", data: ["Chamber Volume", "Flame Path Length"], edit9: ["Chamber Volume", "Flame Path Length"] }
        },
        {
            data10: { name: "Position J", data: ["Chamber Volume", "Flame Path Length"], edit10: ["Chamber Volume", "Flame Path Length"] }
        },
        {
            data11: { name: "Position K", data: ["Chamber Volume", "Flame Path Length"], edit11: ["Chamber Volume", "Flame Path Length"] }
        },
        {
            data12: { name: "Position L", data: ["Chamber Volume", "Flame Path Length"], edit12: ["Chamber Volume", "Flame Path Length"] }
        },
        {
            data13: { name: "Position M", data: ["Chamber Volume", "Flame Path Length"], edit13: ["Chamber Volume", "Flame Path Length"] }
        },
        {
            data14: {
                name: "Position P", data: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard", "Maximum permissibe gap"],
                edit14: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard", "Maximum permissibe gap"]
            }
        },
        {
            data15: { name: "Position P1", data: ["Flange surface and flatness checked and acceptable"], edit15: ["Flange surface and flatness checked and acceptable"] }
        },
        {
            data16: { name: "Position L1", data: ["Chamber Volume", "Flame Path Length"], edit16: ["Chamber Volume", "Flame Path Length"] }
        },
        {
            data17: { name: "Position M1", data: ["Chamber Volume", "Flame Path Length"], edit17: ["Chamber Volume", "Flame Path Length"] }
        },
        {
            data18: { name: "Position K1", data: ["Chamber Volume", "Flame Path Length"], edit18: ["Chamber Volume", "Flame Path Length"] }
        },
        {
            data19: { name: "Position M2", data: ["Number of threads engaged", "Thread", "Condition acceptable to standard"], edit19: ["Number of threads engaged", "Thread", "Condition acceptable to Standard"] }
        },
        {
            data20: { name: "Position R", data: ["Remarks"], edit20: ["Remarks"] }
        },
    ];

    // , "Position C1", "Position D", "Position E", "Position E1", "Position G", "Position H", "Position I", "Position J", "Position K", "Position L", "Position M", "Position P", "Position P1", "Position L1", "Position M1", "Position P2", "Position k1", "Position M2", "Position R"

    return (
        <div className="normal-header-color">
            {editStatus && <EditFlamePathDimension modalName={modalName} setEditStatus={setEditStatus} editStatus={editStatus} editData={editData} />}
            {
                data.map((item, i) => {
                    const key = `data${i + 1}`
                    console.log("k" + key + " " + JSON.stringify(item))
                    console.log(item[`data${i + 1}`]?.[`edit${i + 1}`]);
                    return (

                        <Collapse
                            key={i} // Added key prop to Collapse component
                            expandIconPosition={"end"}
                            onChange={(data) => setNumber(data)}
                            className="mb-3"
                        >
                            <Panel
                                key={i}
                                header={
                                    <>
                                        <span className="d-flex align-items-centr" style={{ gap: "5px" }}>
                                            <AuxilleryChecksIcon /> {item[key]?.name}{" "}
                                            {/* {console.log("itemss" + item[key]?.name)}; */}
                                            <span style={{ color: "grey", fontSize: "14px" }} className="font-weight-300 ml-2">
                                                {" "}
                                                <HistoryOutlined /> Last updated an hour ago{" "}
                                            </span>
                                        </span>
                                        <span className="customEditButton" style={{ gap: "5px" }}>
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

                                                const editArray = item[`data${i + 1}`]?.[`edit${i + 1}`];
                                                setModalName("P");
                                                setEditData(item[`data${i + 1}`]?.[`edit${i + 1}`])
                                                setEditStatus(true);

                                            }} className="bg-primary text-white mr-1">
                                                <EditOutlined />

                                            </Button>
                                        </span>
                                    </>
                                }

                            >

                                {
                                    item[key].data.map((internalData, k) => {

                                        return (
                                            <>
                                                {number == 19 && <h2>Notes on End-shield threaded</h2>}
                                                <div className="green-radio" key={k}>

                                                    <div className="mb-4 mt-3 d-flex justify-content-between">
                                                        <Radio
                                                            style={{ width: "30%" }}
                                                            checked={auxileryChecksHeater?.insulation?.checked}
                                                        >
                                                            {item[key].data[k]}
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
                                                    {/* <div className="mb-4 d-flex justify-content-between">
                                                    <Radio
                                                        style={{ width: "30%" }}
                                                        checked={auxileryChecksHeater?.result1?.checked}
                                                    >
                                                        {internalData}
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
                                                </div> */}
                                                    {/* <div className="mb-4 d-flex justify-content-between">
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
                                                </div> */}
                                                </div>
                                            </>
                                        );
                                    })
                                }

                            </Panel>
                        </Collapse>
                    )
                })
            }
        </div>
    );
};

export default FlamePathDimension;



