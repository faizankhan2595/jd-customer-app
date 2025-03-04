import React from 'react';
import { Collapse, Radio, Input, Button, DatePicker } from 'antd';
import { HistoryOutlined, EditOutlined } from '@ant-design/icons';
// import AuxilleryChecksIcon from "assets/svg/icon";
import { AuxilleryChecksIcon } from 'assets/svg/icon';
// import WhiteImageIcon from './WhiteImageIcon';
import { WhiteImageIcon } from 'assets/svg/icon';
import ReportSerchIcon from "assets/svg/greenSearch.png";
import { ConnectorResistIcon } from 'assets/svg/icon';
import TextArea from "antd/lib/input/TextArea";
import { ViewDetailsIcon } from 'assets/svg/icon';


const { Panel } = Collapse;

const FreeLoadTest = ({
    setInitialeditModal, 
    initialModalFormdata, 
    setInitialModalFormdata, 
    initialModalForm, 
    setInitialModalForm, 
    freeLoadData, 
    setFreeLoadData, 
    setInitialcondUploaModal, 
    selectedImages2, 
    returnClass,
    setSelectedImageTemp,
    setImageMarkings,
    UploadImageMarkingKonva,
    setEditImageId,
    delUplFile2,
    setUploadModal,
    setUploadImageType
    }) => {
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
        <>

            <Collapse className="mb-3">
                <Panel
                    header={
                        <>
                            <img src={ReportSerchIcon} alt="..." />
                            Free Load Test
                        </>
                    }
                    key="3"
                >
                    <div className="d-flex justify-content-between">
                        <h4 className="d-flex align-items-center">
                            {" "}
                            <ViewDetailsIcon /> View Details{" "}
                            <span
                                style={{ color: "grey", fontSize: "14px" }}
                                className="font-weight-300 ml-2"
                            >
                                {" "}
                                <HistoryOutlined /> Last updated an hour ago{" "}
                            </span>{" "}
                        </h4>
                        <div>
                            <Button onClick={() => {
                                    // setInitialcondUploaModal(true);
                                    setUploadModal(true);
                                    setUploadImageType('Free-Load');
                                }}>
                                {" "}
                                Upload Photos
                            </Button>
                            <Button
                                className="bg-primary text-white ml-2"
                                onClick={() => {
                                    setInitialeditModal(true);
                                    setInitialModalFormdata((prev)=>{
                                        return{
                                            ...prev,
                                            stator_volt:freeLoadData?.stator_volt?.value,
                                            frequency:freeLoadData?.frequency?.value,
                                            current_l1:freeLoadData?.current_l1?.value,
                                            current_l2:freeLoadData?.current_l2?.value,
                                            current_l3:freeLoadData?.current_l3?.value,
                                            connection:freeLoadData?.connection?.value,
                                            speed:freeLoadData?.speed?.value,
                                            rotation:freeLoadData?.rotation?.value,
                                            de_temp:freeLoadData?.de_temp?.value,
                                            nde_temp:freeLoadData?.nde_temp?.value,
                                            position:freeLoadData?.position?.value,
                                            time:freeLoadData?.time?.value,
                                        }
                                    })

                                    setInitialModalForm((prev)=>{
                                        return{
                                            ...prev,
                                            stator_volt:freeLoadData?.stator_volt?.check,
                                            frequency:freeLoadData?.frequency?.check,
                                            current_l1:freeLoadData?.current_l1?.check,
                                            current_l2:freeLoadData?.current_l2?.check,
                                            current_l3:freeLoadData?.current_l3?.check,
                                            connection:freeLoadData?.connection?.check,
                                            speed:freeLoadData?.speed?.check,
                                            rotation:freeLoadData?.rotation?.check,
                                            de_temp:freeLoadData?.de_temp?.check,
                                            nde_temp:freeLoadData?.nde_temp?.check,
                                            position:freeLoadData?.position?.check,
                                            time:freeLoadData?.time?.check,
                                        }
                                    })

                                    // setModalName("FreeLoadTest");
                                }}


                            >
                                {" "}
                                <EditOutlined /> Edit
                            </Button>
                        </div>
                    </div>
                    <div className="green-radio mt-4 mb-5">
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                disabled
                                checked={freeLoadData?.stator_volt?.check}
                                className={returnClass(freeLoadData?.stator_volt?.check)}
                            >
                                Stator Volt
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                value={freeLoadData?.stator_volt?.value}
                                disabled
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                disabled
                                checked={freeLoadData?.frequency?.check}
                                className={returnClass(freeLoadData?.frequency?.check)}
                            >
                                Frequency
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                disabled
                                value={freeLoadData?.frequency?.value}
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                disabled
                                checked={freeLoadData?.current_l1?.check}
                                className={returnClass(freeLoadData?.current_l1?.check)}
                            >
                                Current L1
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                disabled
                                value={freeLoadData?.current_l1?.value}
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                disabled
                                checked={freeLoadData?.current_l2?.check}
                                className={returnClass(freeLoadData?.current_l2?.check)}
                            >
                                Current L2
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                value={freeLoadData?.current_l2?.value}
                                disabled
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                disabled
                                checked={freeLoadData?.current_l3?.check}
                                className={returnClass(freeLoadData?.current_l3?.check)}
                            >
                                Current L3
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                value={freeLoadData?.current_l3?.value}
                                disabled
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                disabled
                                checked={freeLoadData?.connection?.check}
                                className={returnClass(freeLoadData?.connection?.check)}
                            >
                                Connection
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                value={freeLoadData?.connection?.value}
                                disabled
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                disabled
                                checked={freeLoadData?.speed?.check}
                                className={returnClass(freeLoadData?.speed?.check)}
                            >
                                Speed
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                disabled
                                value={freeLoadData?.speed?.value}
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                disabled
                                checked={freeLoadData?.rotation?.check}
                                className={returnClass(freeLoadData?.rotation?.check)}
                            >
                                Rotation
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                disabled
                                value={freeLoadData?.rotation?.value}
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                disabled
                                checked={freeLoadData?.de_temp?.check}
                                className={returnClass(freeLoadData?.de_temp?.check)}
                            >
                                DE Temp
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                disabled
                                value={freeLoadData?.de_temp?.value}

                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                disabled
                                checked={freeLoadData?.nde_temp?.check}
                                className={returnClass(freeLoadData?.nde_temp?.check)}
                            >
                                NDE Temp
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                disabled
                                value={freeLoadData?.nde_temp?.value}
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                disabled
                                checked={freeLoadData?.position?.check}
                            >
                                Position
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                disabled
                                value={freeLoadData?.position?.value}
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                disabled
                                checked={freeLoadData?.time?.check}
                            >
                                Time
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                disabled
                                value={freeLoadData?.time?.value}
                            />
                        </div>
                        <div className="mt-5">
                            <h5>Remarks</h5>
                            <TextArea rows={5}
                                value={freeLoadData?.remarks?.value}
                                onChange={(e) => {
                                    setFreeLoadData((prev) => ({
                                        ...prev,
                                        remarks: {
                                        check:null,
                                        value: e.target.value,
                                        },
                                    }));
                                
                                }}
                                cols={16} placeholder="Type Here..." />
                        </div>
                        <div className="mt-5">
                            <h5>Upload Photos</h5>
                            <div className="dashed-border p-2">
                                {false && selectedImages2.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Image ${index}`}
                                    style={{
                                    width: "200px",
                                    height: "200px",
                                    marginRight: "10px",
                                        
                                    }}
                                />
                                ))}
                                {selectedImages2.map((image, index) => (
                                    <div className='mb-2 w-100 d-flex justify-content-start' key={index}>
                                        <div className='w-75 d-flex flex-column align-items-start'>
                                            <img
                                                src={image.url}
                                                alt={`Image ${index}`}
                                                style={{
                                                    height: "200px",
                                                    marginRight: "10px",
                                                }}
                                            />
                                            <div className='diflex justify-content-start'>
                                                <Button type='primary' className='mt-2' onClick={() => {
                                                        setEditImageId(image.id);
                                                        // setInitialcondUploaModal(true);
                                                        setUploadModal(true);
                                                        setUploadImageType('Free-Load');
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
                                                        delUplFile2(index)
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
                                                    marking.text && <div key={index}>
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
                    </div>
                </Panel>
            </Collapse>
        </>
    );
};





export default FreeLoadTest;
