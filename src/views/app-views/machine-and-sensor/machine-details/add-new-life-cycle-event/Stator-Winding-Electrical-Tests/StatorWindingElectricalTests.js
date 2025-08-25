import React, { useState } from 'react'
import { Button, Collapse, Input, Radio, DatePicker } from "antd";
import {

    WhiteImageIcon,
    AuxilleryChecksIcon,
} from "assets/svg/icon";

import {
    EditOutlined,
    HistoryOutlined,
} from "@ant-design/icons";
import EditStatorWindingElectricalTests from './EditStatorWindingElectricalTests';

const StatorWindingElectricalTests = ({
    setStatorWindingData,
    statorWindingData,

    setUploadModal, 
    setUploadImageType,
    setImageMarkings,
    UploadImageMarkingKonva,
    setEditImageId,
    setSelectedImageTemp,
    delSubUploadedPhoto
}) => {
    const [editStatus, setEditStatus] = useState(false);
    const { Panel } = Collapse;

    const [modalName, setModalName] = useState("");
    const [editKey, setEditKey] = useState("");
    const [editData, setEditData] = useState("");
    const [suffixData, setSuffixData] = useState(
        {
            "U1-U2": 'mΩ',
            "U-V": 'mΩ',
            "V1-V2": 'mΩ',
            "U-W": 'mΩ',
            "W1-W2": 'mΩ',
            "V-W": 'mΩ',

            "UVW-E": 'mΩ',
            "U-E": 'mΩ',
            "V-E": 'mΩ',
            "W-E": 'mΩ',
            "U-V": 'mΩ',
            "V-W": 'mΩ',
            "U-W": 'mΩ',
            "Test Volt": 'V',

            "K-L": 'mΩ',
            "K-M": 'mΩ',
            "L-M": 'mΩ',

            "KLM-E": 'mΩ',
            "K-E": 'mΩ',
            "L-E": 'mΩ',
            "M-E": 'mΩ',

            "Ins 1 min": 'mΩ',
            "Ins 10 min": 'mΩ',
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
    
  return (
    <div className="normal-header-color">
        {editStatus && <EditStatorWindingElectricalTests modalName={modalName} editStatus={editStatus} setEditStatus={setEditStatus}
        editData={editData} editKey={editKey} suffixData={suffixData} setSuffixData={setSuffixData} 
        setStatorWindingData={setStatorWindingData} />}
        {
            statorWindingData.map((item, i) => {
                return (
                        <Collapse
                            key={i} // Added key prop to Collapse component
                            expandIconPosition={"end"}
                            // onChange={(data) => console.log(data)}
                            className="mb-3"
                        >
                            <Panel
                                key={i}
                                header={
                                    <>
                                        <span className="d-flex align-items-centr" style={{ gap: "5px" }}>
                                            <AuxilleryChecksIcon /> {item?.title}{" "}
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

                                            <Button onClick={() => {
                                                    // e.stopPropagation();
                                                    setUploadModal(true);
                                                    setUploadImageType(`Stator-Winding ~ ${item?.title}`);
                                                }} className="bg-primary text-white mr-1">
                                                    <WhiteImageIcon />
                                            </Button>

                                            <Button onClick={(e) => {
                                                e.stopPropagation();
                                                setEditStatus(true)

                                                setModalName(statorWindingData[i].title);
                                                setEditKey(statorWindingData[i].key);
                                                setEditData(statorWindingData[i].data)
                                                setEditStatus(true);

                                            }} className="bg-primary text-white mr-1">
                                                <EditOutlined />

                                            </Button>
                                        </span>
                                    </>
                                }
                            >
                                {
                                    item.data.map((internalData, k) => {
                                        return (
                                            <>
                                                <div className={`${internalData.check == 1 ? 'green' : (internalData.check == 2 ? 'red' : 'grey')}-radio`} key={k}>

                                                    <div className="mb-4 mt-3 d-flex justify-content-between">
                                                        <Radio
                                                            style={{ width: "30%" }}
                                                            checked={internalData.check}
                                                        >
                                                            {internalData.name}
                                                        </Radio>
                                                        {internalData.name == 'Date' ? 
                                                        <DatePicker
                                                            style={{ width: "70%" }}
                                                            placeholder="Select date"
                                                            value={internalData.value}
                                                            format={'DD-MM-YYYY'}
                                                            disabled
                                                        />
                                                        : 
                                                        <Input
                                                            style={{ width: "70%" }}
                                                            placeholder="Type here..."
                                                            // value={internalData.value?.includes('-') ? internalData.value?.split('-')[0] : internalData.value}
                                                            value={suffixData[internalData.name] ? 
                                                                internalData.value?.split('-')[0] : internalData.value}
                                                            suffix={getSuffixSplitValue(internalData)}
                                                            disabled
                                                        /> }
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
                                                                setUploadImageType(`Stator-Winding ~ ${item?.title}`);
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
                                                                delSubUploadedPhoto(index, `Stator-Winding ~ ${item?.title}`)
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
  )
}

export default StatorWindingElectricalTests