import React, {useState} from 'react';
import { Collapse, Radio, Input, Button, DatePicker } from 'antd';
import { HistoryOutlined, EditOutlined } from '@ant-design/icons';
import { AuxilleryChecksIcon } from 'assets/svg/icon';
import { WhiteImageIcon } from 'assets/svg/icon';
import ReportSerchIcon from "assets/svg/greenSearch.png";
import { ConnectorResistIcon } from 'assets/svg/icon';
import TextArea from "antd/lib/input/TextArea";
import { ViewDetailsIcon } from 'assets/svg/icon';
import UploadPhotos from '../Upload-Photos/UploadPhotos';
// import AuxilleryChecksIcon from "assets/svg/icon";
// import WhiteImageIcon from './WhiteImageIcon';

const VibrationTests = ({
  setInitialeditModal,
  setInitialModalFormdata,
  setInitialModalForm,
  vibrationData,
  setVibrationData,
  setInitialcondVibrationUploaModal,
  selectedImages3,
  returnClass,
  selectedImageTemp,
  setSelectedImageTemp,
  imageMarkings,
  setImageMarkings,
  UploadImageMarkingKonva,
  setEditImageId,
  delUplFile3,
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
                    // setInitialcondVibrationUploaModal(true);
                    setUploadModal(true);
                    setUploadImageType('Vibration-Test');
                }}>
                {" "}
                Upload Photos
            </Button>
            <Button
                className="bg-primary text-white ml-2"
                onClick={() => {
                setInitialeditModal(true);
                setInitialModalFormdata((prev) => {
                    return {
                    ...prev,
                    point_1: vibrationData?.point_1?.value 
                    ? [vibrationData?.point_1.value.split('-')[0], vibrationData?.point_1.value.split('-')[1]]
                    : ['', 'mm/s'],
                    point_2: vibrationData?.point_2?.value 
                    ? [vibrationData?.point_2.value.split('-')[0], vibrationData?.point_2.value.split('-')[1]]
                    : ['', 'mm/s'],
                    point_3: vibrationData?.point_3?.value 
                    ? [vibrationData?.point_3.value.split('-')[0], vibrationData?.point_3.value.split('-')[1]]
                    : ['', 'mm/s'],
                    point_4: vibrationData?.point_4?.value 
                    ? [vibrationData?.point_4.value.split('-')[0], vibrationData?.point_4.value.split('-')[1]]
                    : ['', 'mm/s'],
                    point_5: vibrationData?.point_5?.value 
                    ? [vibrationData?.point_5.value.split('-')[0], vibrationData?.point_5.value.split('-')[1]]
                    : ['', 'mm/s'],
                    point_6: vibrationData?.point_6?.value 
                    ? [vibrationData?.point_6.value.split('-')[0], vibrationData?.point_6.value.split('-')[1]]
                    : ['', 'mm/s'],
                    // point_2: vibrationData?.point_2?.value,
                    // point_3: vibrationData?.point_3?.value,
                    // point_4: vibrationData?.point_4?.value,
                    // point_5: vibrationData?.point_5?.value,
                    // point_6: vibrationData?.point_6?.value,
                    de_bearing: vibrationData?.de_bearing?.value,
                    nde_bearing: vibrationData?.nde_bearing?.value,
                    others: vibrationData?.others?.value,
                    };
                });

                setInitialModalForm((prev) => {
                    return {
                    ...prev,
                    point_1: vibrationData?.point_1?.check,
                    point_2: vibrationData?.point_2?.check,
                    point_3: vibrationData?.point_3?.check,
                    point_4: vibrationData?.point_4?.check,
                    point_5: vibrationData?.point_5?.check,
                    point_6: vibrationData?.point_6?.check,
                    de_bearing: vibrationData?.de_bearing?.check,
                    nde_bearing: vibrationData?.nde_bearing?.check,
                    others: vibrationData?.others?.check,
                    };
                });
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
                    checked={vibrationData?.point_1?.check}
                    className={returnClass(vibrationData?.point_1?.check)}
                >
                    Point 1
                </Radio>
                <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    // value={vibrationData?.point_1?.value}
                    value={vibrationData?.point_1?.value  
                        ? vibrationData?.point_1?.value.split('-')[0]
                        : vibrationData?.point_1?.value}
                    
                    suffix={vibrationData?.point_1?.value  
                        ? (vibrationData?.point_1.value.split('-')[1] == 'm/s' ? <span>m/s<sup>2</sup></span> : vibrationData?.point_1.value.split('-')[1])
                        : 'mm/s'}
                    disabled
                />
            </div>
            <div className="mb-4 d-flex justify-content-between">
                <Radio
                    style={{ width: "30%" }}
                    disabled
                    checked={vibrationData?.point_2?.check}
                    className={returnClass(vibrationData?.point_2?.check)}
                >
                    Point 2
                </Radio>
                <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    // value={vibrationData?.point_2?.value}
                    value={vibrationData?.point_2?.value  
                        ? vibrationData?.point_2?.value.split('-')[0]
                        : vibrationData?.point_2?.value}
                    
                    suffix={vibrationData?.point_2?.value  
                        ? (vibrationData?.point_2.value.split('-')[1] == 'm/s' ? <span>m/s<sup>2</sup></span> : vibrationData?.point_2.value.split('-')[1])
                        : 'mm/s'}
                    disabled
                />
            </div>
            <div className="mb-4 d-flex justify-content-between">
                <Radio
                    style={{ width: "30%" }}
                    disabled
                    checked={vibrationData?.point_3?.check}
                    className={returnClass(vibrationData?.point_3?.check)}
                >
                    Point 3
                </Radio>
                <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    // value={vibrationData?.point_3?.value}
                    value={vibrationData?.point_3?.value  
                        ? vibrationData?.point_3?.value.split('-')[0]
                        : vibrationData?.point_3?.value}
                    
                    suffix={vibrationData?.point_3?.value  
                        ? (vibrationData?.point_3.value.split('-')[1] == 'm/s' ? <span>m/s<sup>2</sup></span> : vibrationData?.point_3.value.split('-')[1])
                        : 'mm/s'}
                    disabled
                />
            </div>
            <div className="mb-4 d-flex justify-content-between">
                <Radio
                    style={{ width: "30%" }}
                    disabled
                    checked={vibrationData?.point_4?.check}
                    className={returnClass(vibrationData?.point_4?.check)}
                >
                    Point 4
                </Radio>
                <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    // value={vibrationData?.point_4?.value}
                    value={vibrationData?.point_4?.value  
                        ? vibrationData?.point_4?.value.split('-')[0]
                        : vibrationData?.point_4?.value}
                    
                    suffix={vibrationData?.point_4?.value  
                        ? (vibrationData?.point_4.value.split('-')[1] == 'm/s' ? <span>m/s<sup>2</sup></span> : vibrationData?.point_4.value.split('-')[1])
                        : 'mm/s'}
                    disabled
                />
            </div>
            <div className="mb-4 d-flex justify-content-between">
                <Radio
                    style={{ width: "30%" }}
                    disabled
                    checked={vibrationData?.point_5?.check}
                    className={returnClass(vibrationData?.point_5?.check)}
                >
                    Point 5
                </Radio>
                <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    // value={vibrationData?.point_5?.value}
                    value={vibrationData?.point_5?.value  
                        ? vibrationData?.point_5?.value.split('-')[0]
                        : vibrationData?.point_5?.value}
                    
                    suffix={vibrationData?.point_5?.value  
                        ? (vibrationData?.point_5.value.split('-')[1] == 'm/s' ? <span>m/s<sup>2</sup></span> : vibrationData?.point_5.value.split('-')[1])
                        : 'mm/s'}
                    disabled
                />
            </div>
            <div className="mb-4 d-flex justify-content-between">
                <Radio
                    style={{ width: "30%" }}
                    disabled
                    checked={vibrationData?.point_6?.check}
                    className={returnClass(vibrationData?.point_6?.check)}
                >
                    Point 6
                </Radio>
                <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    // value={vibrationData?.point_6?.value}
                    value={vibrationData?.point_6?.value  
                        ? vibrationData?.point_6?.value.split('-')[0]
                        : vibrationData?.point_6?.value}
                    
                    suffix={vibrationData?.point_6?.value  
                        ? (vibrationData?.point_6.value.split('-')[1] == 'm/s' ? <span>m/s<sup>2</sup></span> : vibrationData?.point_6.value.split('-')[1])
                        : 'mm/s'}
                    disabled
                />
            </div>
            <div className="mb-4 d-flex justify-content-between">
                <Radio
                    style={{ width: "30%" }}
                    disabled
                    checked={vibrationData?.de_bearing?.check}
                    className={returnClass(vibrationData?.de_bearing?.check)}
                >
                    DE Bearing
                </Radio>
                <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={vibrationData?.de_bearing?.value}
                    suffix={'g'}
                />
            </div>
            <div className="mb-4 d-flex justify-content-between">
                <Radio
                    style={{ width: "30%" }}
                    disabled
                    checked={vibrationData?.nde_bearing?.check}
                    className={returnClass(vibrationData?.nde_bearing?.check)}
                >
                    NDE Bearing
                </Radio>
                <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={vibrationData?.nde_bearing?.value}
                    suffix={'g'}
                />
            </div>
            <div className="mb-4 d-flex justify-content-between">
                <Radio
                    style={{ width: "30%" }}
                    disabled
                    checked={vibrationData?.others?.check}
                    className={returnClass(vibrationData?.others?.check)}
                >
                    Others
                </Radio>
                <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={vibrationData?.others?.value}
                />
            </div>
            <div className="mt-5">
                <h5>Remarks</h5>
                <TextArea
                    rows={5}
                    value={vibrationData?.remarks?.value}
                    onChange={(e) => {
                    setVibrationData((prev) => ({
                        ...prev,
                        remarks: {
                        check:null,
                        value: e.target.value,
                        },
                    }));
                    }}
                    cols={16}
                    placeholder="Type Here..."
                />
            </div>
            <div className="mt-5">
                <h5>Uploaded Photos</h5>
                <div className="dashed-border p-2">
                    {selectedImages3.map((image, index) => (
                        <div className='mb-2 w-100 d-flex justify-content-start' key={index}>
                            <div className='w-75 d-flex flex-column align-items-start'>
                                <img
                                // key={index}
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
                                            // setInitialcondVibrationUploaModal(true);
                                            setUploadModal(true);
                                            setUploadImageType('Vibration-Test');
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
                                            delUplFile3(index)
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
        </div>

        
    </>
  );
};

export default VibrationTests;
