import React from 'react';
import { useState } from 'react';
import { Button, Collapse, Input, Radio } from "antd";
import { WhiteImageIcon, AuxilleryChecksIcon } from "assets/svg/icon";
import { EditOutlined, HistoryOutlined } from "@ant-design/icons";
import EditFlamePathDimension from './EditFlamePathDimension';

const FlamePathDimension = ({ 
    flamePathData, 
    setFlamePathData,

    setUploadModal, 
    setUploadImageType,
    setImageMarkings,
    UploadImageMarkingKonva,
    setEditImageId,
    setSelectedImageTemp,
    delSubUploadedPhoto
}) => {
    const [number, setNumber] = useState();
    const [editStatus, setEditStatus] = useState(false);
    const [modalName, setModalName] = useState("");
    const [editKey, setEditKey] = useState("");
    const [editData, setEditData] = useState("");
    // const [flamePathDataUnit, setFlamePathDataUnit] = useState({
    //     chamber_volume:"cm",
    //     flame_path_length:"mm",
    //     maximum_permissible_gap:"mm",
    //     logically_larger_diameter:"mm",
    //     logically_smaller_diameter:"mm",
    //     gap:"mm",
    //     thread: "mm"
    // })
    const [suffixData, setSuffixData] = useState(
        {
            "Chamber Volume": 'cm',
            "Flame Path Length": 'mm',
            "Maximum permissible gap": 'mm',
            "Logically larger diameter": 'mm',
            "Logically smaller diameter": 'mm',
            "Gap": 'mm',
            "Flange surface and flatness checked and acceptable": 'cm',
            "Thread": 'mm'
        },
    );
  

    const getSuffixSplitValue = (internalData) => {
        if(suffixData[internalData?.name]) {
            if(internalData.value?.includes('-')) {
                let value = internalData.value?.split('-')
                return value[value.length-1]
            } else {
                return suffixData[internalData?.name]
            }
        } else {
            return ''
        }
    }

    const { Panel } = Collapse;
    const data = [
        {
            data1: {
                name: "Position A", data: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"],
                edit1: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"]
            }
        },
        {
            data2: {
                name: "Position B", data: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"],
                edit2: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"]
            }
        },
        {
            data3: { 
                name: "Position C", data: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"], 
                edit3: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"] }
        },
        {
            data4: { 
                name: "Position C1", data: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"], 
                edit4: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"] }
        },
        {
            data5: { 
                name: "Position D", data: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"], 
                edit5: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"] }
        },
        {
            data6: { 
                name: "Position E", data: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"], 
                edit6: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"] }
        },
        {
            data7: { 
                name: "Position E1", data: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"], 
                edit7: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"] }
        },
        {
            data8: { 
                name: "Position G", data: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"], 
                edit8: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"] }
        },
        {
            data9: { 
                name: "Position H", data: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"], 
                edit9: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"] }
        },
        {
            data10: { 
                name: "Position J", data: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"], 
                edit10: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"] }
        },
        {
            data11: { 
                name: "Position K", data: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"], 
                edit11: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"] }
        },
        {
            data12: { 
                name: "Position L", data: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"], 
                edit12: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"] }
        },
        {
            data13: { 
                name: "Position M", data: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"], 
                edit13: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"] }
        },
        {
            data14: {
                name: "Position P", data: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"],
                edit14: ["Chamber Volume", "Flame Path Length", "Maximum permissible gap", "Logically larger diameter", "Logically smaller diameter", "Gap", "Acceptable to standard"]
            }
        },
        {
            data15: { name: "Position P1", data: ["Flange surface and flatness checked and acceptable"], edit15: ["Flange surface and flatness checked and acceptable"] }
        },
        {
            data16: { name: "Position L1", data: ["Flange surface and flatness checked and acceptable"], edit16: ["Flange surface and flatness checked and acceptable"] }
        },
        {
            data17: { name: "Position M1", data: ["Flange surface and flatness checked and acceptable"], edit17: ["Flange surface and flatness checked and acceptable"] }
        },
        {
            data18: { name: "Position K1", data: ["Flange surface and flatness checked and acceptable"], edit18: ["Flange surface and flatness checked and acceptable"] }
        },
        {
            data19: { name: "Position M2", data: ["Number of threads engaged", "Thread", "Condition acceptable to standard"], edit19: ["Number of threads engaged", "Thread", "Condition acceptable to Standard"] }
        },
        {
            data20: { name: "Position R", data: ["Remarks"], edit20: ["Remarks"] }
        },
    ];

    const convertImageToBase64 = async (imageUrl, markings) => {
        try {
            const response = await fetch(imageUrl, { mode: "cors" }); // Ensure CORS is allowed
            const blob = await response.blob(); // Convert response to Blob
            const reader = new FileReader();
            
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
            let base64 = reader.result;
            if(base64) {
                UploadImageMarkingKonva(base64, markings);
            }
          };
        } catch (error) {
          console.error("Error fetching image:", error);
        }
    };

    // , "Position C1", "Position D", "Position E", "Position E1", "Position G", "Position H", "Position I", "Position J", "Position K", "Position L", "Position M", "Position P", "Position P1", "Position L1", "Position M1", "Position P2", "Position k1", "Position M2", "Position R"

    return (
        <div className="normal-header-color">
            {editStatus && <EditFlamePathDimension modalName={modalName} setEditStatus={setEditStatus} editStatus={editStatus} editData={editData} editKey={editKey} suffixData={suffixData} setSuffixData={setSuffixData} flamePathData={flamePathData} setFlamePathData={setFlamePathData} />}

            {
                flamePathData.map((item, i) => {
                    // const key = `data${i + 1}`
                    // console.log("k" + key + " " + JSON.stringify(item))
                    // console.log(item[`data${i + 1}`]?.[`edit${i + 1}`]);
                    
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
                                            <AuxilleryChecksIcon /> {item?.title}{" "}
                                            {/* {console.log(item)} */}
                                            <span style={{ color: "grey", fontSize: "14px" }} className="font-weight-300 ml-2">
                                                {" "}
                                                <HistoryOutlined /> Last updated an hour ago{" "}
                                            </span>
                                        </span>
                                        <span className="customEditButton" style={{ gap: "5px" }}>
                                            {/* <Button
                                                className="bg-primary text-white mr-1"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log("add");
                                                }}
                                            >
                                                +
                                            </Button> */}
                                            {/* ['Position P1', 'Position L1', 'Position M1', 'Position K1', 'Position M2', 'Position R'].includes(item[key]?.name) &&  */}

                                            <Button onClick={(e) => {
                                                // e.stopPropagation();
                                                setUploadModal(true);
                                                setUploadImageType(`Flame-Path ~ ${item?.title}`);
                                            }} className="bg-primary text-white mr-1">
                                                <WhiteImageIcon />
                                            </Button>

                                            <Button onClick={(e) => {
                                                e.stopPropagation();
                                                setEditStatus(true)

                                                // const editArray = item[`data${i + 1}`]?.[`edit${i + 1}`];
                                                // setModalName("P");
                                                // setEditData(item[`data${i + 1}`]?.[`edit${i + 1}`])
                                                setModalName(flamePathData[i].title);
                                                setEditKey(flamePathData[i].key);
                                                setEditData(flamePathData[i].data)
                                                setEditStatus(true);

                                            }} className="bg-primary text-white mr-1">
                                                <EditOutlined />

                                            </Button>
                                        </span>
                                    </>
                                }

                            >

                                {
                                    // item[key].data.map((internalData, k) => {
                                    item.data.map((internalData, k) => {
                                        return (
                                            <>
                                                {item?.title == 'Position R' && <h2>Notes on End-shield threaded</h2>}

                                                <div className={`${internalData.check == 1 ? 'green' : (internalData.check == 2 ? 'red' : 'grey')}-radio`} key={k}>

                                                    <div className="mb-4 mt-3 d-flex justify-content-between">
                                                        <Radio
                                                            style={{ width: "30%" }}
                                                            checked={internalData.check}
                                                        >
                                                            {internalData.name}
                                                        </Radio>
                                                        <Input
                                                            style={{ width: "70%" }}
                                                            placeholder="Type here..."
                                                            value={suffixData[internalData.name] ? internalData.value?.split('-')[0] : internalData.value}
                                                            
                                                            // suffix={internalData.value?.includes('-') ? 
                                                            //     (internalData.value?.split('-')[1] == 'cm' ? <div>cm<sup>3</sup></div> : internalData.value?.split('-')[1])
                                                            //      : suffixData[internalData.name] ? 'mm' : null}

                                                            suffix={getSuffixSplitValue(internalData) == 'cm' ? <div>cm<sup>3</sup></div> : getSuffixSplitValue(internalData)}
                                                            disabled
                                                        />
                                                    </div>

                                                </div>
                                            </>
                                        );
                                    })
                                }

                                <div className="mt-5">
                                    <h5>Uploaded Photos</h5>
                                    <div className="dashed-border p-2">
                                        {item.photos.map((image, index) => (
                                            <div className='mb-2 w-100 d-flex justify-content-start' key={index}>
                                                <div className='w-75 d-flex flex-column align-items-start'>
                                                    <img
                                                    src={image.url}
                                                    alt={`Image ${index}`}
                                                    style={{
                                                    // width: "200px",
                                                    height: "200px",
                                                    marginRight: "10px",
                                                    }}
                                                    />
                                                    <div className='diflex justify-content-start'>
                                                        <Button type='primary' className='mt-2' onClick={() => {
                                                                setEditImageId(image.id);
                                                                setUploadModal(true);
                                                                setUploadImageType(`Flame-Path ~ ${item?.title}`);
                                                                setSelectedImageTemp(image.url_unmodified);
                                                                setImageMarkings(image.image_markings);
                                                                if(image.url_unmodified.includes('http')) {
                                                                    convertImageToBase64(image.url_unmodified, image.image_markings);
                                                                } else {
                                                                    setTimeout(() => {
                                                                        UploadImageMarkingKonva(image.url_unmodified, image.image_markings);
                                                                    }, 500);
                                                                }
                                                            }}>
                                                            {" "}
                                                            Edit Photo
                                                        </Button>

                                                        <Button className='mt-2 ml-2' onClick={() => {
                                                                delSubUploadedPhoto(index, `Flame-Path ~ ${item?.title}`)
                                                            }}>
                                                            {" "}
                                                            Delete Photo
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4>Markings</h4>
                                                    {image.image_markings.length > 0 ?
                                                        image.image_markings.map((marking, index) => (
                                                            marking.text && <div>
                                                                <b>{index+1}. </b>{marking.text}
                                                            </div>
                                                        ))
                                                        : <div><i>No Markings Added</i></div>
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </Panel>
                        </Collapse>
                    )
                })
            }
        </div>
    );
};

export default FlamePathDimension;



