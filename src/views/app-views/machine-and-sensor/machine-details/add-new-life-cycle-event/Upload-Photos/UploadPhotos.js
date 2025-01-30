import React, {useState} from 'react'
import { Button, Collapse, DatePicker, Form, Input, message, Modal, Radio, Select, Space } from "antd";
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import Konva from 'konva';
import ReportSerchIcon from "assets/svg/greenSearch.png";
import {
  DeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  UploadFileIcon,
  ImagesIcon,
} from "assets/svg/icon";
import marker_images from "../marker_images";

let styles = {
  files: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "13px",
    border: "1px solid lightblue",
    padding: "10px",
    borderRadius: "9px",
    background: "#0093ff0a",
  },
  uploadFile: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
  },

  ".uploadFile::-webkit-file-upload-button": {
    visibility: "hidden",
  },

  ".uploadFile::before": {
    content: "'Drag & Drop'",
    display: "inline-block",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  },

  ".uploadFile:hover::before": {
    backgroundColor: "#ccc",
  },
};

const UploadPhotos = ({
        imageMarkings,
        setImageMarkings,
        selectedImageTemp,
        setSelectedImageTemp,
        // UploadImageMarkingKonva,
        // setEditImageId,
        // editImageId,
        setEditImageId,
        stage,
        layer,


        uploadModal,
        setUploadModal,
        modalType,
        SaveUploadedImageData,
        uploadImageType,
        setLayerTemp,
        layerTemp,
  }) => {

  // canvas variables
  let width = null;
  let height = null;

  // canvas markings setup
  const UploadImageMarkingKonva = (image_url, image_markings)=> {
    if(!image_url) {
      console.log("edit return image url")
      return
    }
    if(stage) {
      console.log("edit return stage")
      return
    }

    let container = "upload_image_marking_canvas_container";
    let container_elem = document.getElementById("upload_image_marking_canvas_container");
    
    const tempImageContainer = new Image();
    tempImageContainer.id = 'canvas_temp_image';
    tempImageContainer.style.height = `200px`;
    tempImageContainer.src = image_url;
    
    document.body.appendChild(tempImageContainer);
    tempImageContainer.onload = function () {
      // console.log("image loaded")
      container_elem.style.width = document.getElementById("canvas_temp_image").clientWidth + 'px';
      container_elem.style.height = '200px';
      tempImageContainer.remove();
    }
    setTimeout(() => {
      // setContainerWidth(container_elem.clientWidth);
      // setContainerHeight(container_elem.clientHeight);
      width = container_elem.clientWidth;
      height = container_elem.clientHeight;

      stage = new Konva.Stage({
        container: container,
        width: container_elem.clientWidth,
        height: container_elem.clientHeight,
      });
      
      layer = new Konva.Layer();
      setLayerTemp(layer);
      stage.add(layer);

      generateImageMarkingPoints(image_url, image_markings);
    }, 500);
  }

  const generateImageMarkingPoints = async (uploaded_image, imageMarkings) => {
    if(layer) {
      layer.removeChildren();
    } else {
      layer = layerTemp;
      if(!layer) {
        console.log("layer cannot update!")
      } else {
        layer.removeChildren();
      }
    }
    if(!uploaded_image) {
      return
    }
    
    let container_elem = document.getElementById("upload_image_marking_canvas_container");
    let width_current = container_elem.clientWidth;
    let height_current = container_elem.clientHeight;
    
    Konva.Image.fromURL(uploaded_image, image => {
      image.setAttrs({
        width: width_current,
        height: height_current,
      })
      layer.add(image);
      layer.draw();
      
      for (let index = 0; index < imageMarkings.length; index++) {
        let image_url = marker_images[index];

        Konva.Image.fromURL(image_url, image => {
          image.setAttrs({
            x: width_current * imageMarkings[index].width_percentage,
            y: height_current * imageMarkings[index].height_percentage,
            scaleX: height_current / 275,
            scaleY: height_current / 275,
          });
          image.draggable(true);
          layer.add(image);
          layer.draw();

          image.on('mouseover', function () {
            document.body.style.cursor = 'pointer';
          });
          image.on('mouseout', function () {
            document.body.style.cursor = 'default';
          });
          image.on('dragend', (e) => {
            setImageMarkings((prevCheckInMarkings) => {
              return prevCheckInMarkings.map((item, i) => {
                if (i === index) {
                  return {
                    ...item,
                    width_percentage: e.target.attrs.x / width_current,
                    height_percentage: e.target.attrs.y / height_current,
                  }
                } else {
                  return item
                }
              })
            })
          });
        });
      }
    });
  }

  const addImageMarking = (image_url) => {
    let check_in_marks = [...imageMarkings];
    check_in_marks.push({ width_percentage: 0.5, height_percentage: 0.5, text: '' });
    setImageMarkings(check_in_marks)

    if(check_in_marks.length){
      generateImageMarkingPoints(image_url, check_in_marks);
    }
  }

  const removeImageMarking = (index) => {
    let check_in_marks = [...imageMarkings];
    check_in_marks = check_in_marks.filter((item, i) => i !== index);
    setImageMarkings(check_in_marks)

    generateImageMarkingPoints(selectedImageTemp, check_in_marks);
  }

  function handleFileSelection(event) {
      const fileList = event.target.files;
      const newSelectedFiles = [];
      for (let i = 0; i < fileList.length; i++) {
        newSelectedFiles.push(fileList[i]);
      }
  
      if(!newSelectedFiles[0]) return;
  
      const file = newSelectedFiles[0];
      const fsize = file.size;
      const file_1 = Math.round((fsize / 1024));
      if (file_1 > 1024) {
        message.error("Seleted Image Size is too big");
        return
      }
      const reader = new FileReader();
  
      reader.onload = function (e) {
        let image_src = e.target.result;
        if(image_src) {
          setSelectedImageTemp(image_src);
          UploadImageMarkingKonva(image_src, imageMarkings);
        }
      };
      reader.readAsDataURL(file);
  }

  const resetImageData = () => {
    setSelectedImageTemp(null);
    setImageMarkings([]);
    let container_elem = document.getElementById("upload_image_marking_canvas_container");
    container_elem.style.width = '10px';
    container_elem.style.height = '10px';
    setEditImageId(null);
  }
  
  return (
    <>
        <Modal
        title={
          <div className="d-flex align-items-center">
            <ImagesIcon /> <span className="d-block ml-2"> Upload Photos {modalType}</span>
          </div>
        }
        visible={uploadModal}
        onCancel={() => {
          resetImageData();
          setUploadModal(false);
        }}
        footer={false}
        width={1000}
      >
        <div className="border bg-white rounded p-3 mt-4">
          {!selectedImageTemp && <div className="d-flex flex-column justify-content-center align-items-center position-relative uploaddoc">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              fill="none"
              viewBox="0 0 64 64"
            >
              <path
                fill={"#3CA6C1"}
                d="M18.57 15.51l7.86 7a2 2 0 001.33.51H56v34.9A2.93 2.93 0 0153.26 61H5.74A2.93 2.93 0 013 57.92V18a2.85 2.85 0 012.68-3h11.56a2 2 0 011.33.51z"
              ></path>
              <path fill="#D7E6EF" d="M49 57H7V3h42v54z"></path>
              <path
                fill={"#3CA6C1"}
                d="M45 23h16v-6a2 2 0 00-2-2h-6l-8 8z"
              ></path>
              <path fill="#F7FCFF" d="M14 9h42v14H14V9z"></path>
              <path
                fill={"#3CA6C1"}
                d="M25.69 15.51l7.42 7a1.8 1.8 0 001.25.51H61v34.9A2.87 2.87 0 0158.41 61H13.59A2.87 2.87 0 0111 57.92V18a2.79 2.79 0 012.53-3h10.9c.47 0 .922.184 1.26.51z"
              ></path>
              <path
                fill="#F7FCFF"
                d="M36 55c7.18 0 13-5.82 13-13s-5.82-13-13-13-13 5.82-13 13 5.82 13 13 13z"
              ></path>
              <path
                fill="#D7E6EF"
                d="M52 13H32a1 1 0 000 2h20a1 1 0 000-2zm0 4H37a1 1 0 000 2h15a1 1 0 000-2z"
              ></path>
              <path
                fill="#44394A"
                d="M36.5 49.28l6.72-6.72a5.501 5.501 0 00-7.78-7.78l-8.84 8.84a1.002 1.002 0 000 1.42A1 1 0 0028 45l8.84-8.84a3.5 3.5 0 114.95 4.95l-6.71 6.71a1.998 1.998 0 01-3.38-.571A2 2 0 0132.26 45L39 38.32a.5.5 0 01.71 0 .48.48 0 010 .71l-6 6a1 1 0 101.42 1.41l6-6a2.503 2.503 0 00-3.54-3.54l-6.72 6.72a4 4 0 000 5.66 4.003 4.003 0 005.66 0h-.03z"
              ></path>
            </svg>
            <h5 className="mb-0 mt-2">Drag & Drop Files Here</h5>
            <h5 className="mb-0">Or</h5>
            <h5 className="mb-0" style={{ color: "#3CA6C1" }}>
              Choosen File
            </h5>
            <input
              style={styles.uploadFile}
              className="uploadFile"
              type="file"
              accept="image/*"
              multiple={false}
              onChange={handleFileSelection}
            />
          </div>}
          
          <div className="mt-0">
            <div className="d-flex justify-content-between p-2">
              <div id="upload_image_marking_canvas_container" 
              className="d-flex justify-content-start"></div>

              {selectedImageTemp && 
                <div>
                    {imageMarkings.map((tag_data, index) => (
                        <div className="d-flex justify-content-end mb-1">
                            <Input 
                              value={tag_data.text}
                              onChange={(e) => {
                                  tag_data.text = e.target.value;
                                  setImageMarkings((prevData) => {
                                    const newData = prevData.map((data, i) => {
                                      if (i === index) {
                                          return tag_data
                                        } else {
                                          return data
                                        }
                                    })
                                    return newData
                                  });
                              }}
                              placeholder="Enter text..." 
                            />
                            <Button key="remove" size="small" className="ml-2" type="danger" onClick={() => removeImageMarking(index)}><DeleteOutlined /></Button>
                        </div>
                    ))
                    }
                    <Button key="add" onClick={() => addImageMarking(selectedImageTemp)}>Add Marking</Button>
                </div>
              }
            </div>
            {selectedImageTemp && 
              <div><Button key="delete" className="mt-1 ml-2" onClick={() => {
                resetImageData();
              }}
              >Remove Photo</Button></div>
            }
          </div>
        </div>
        <div className="d-flex justify-content-end mt-5">
          <Button key="cancel" onClick={() => {
            resetImageData();
            setUploadModal(false);
          }}>
            Cancel
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={async () => {
              if(!selectedImageTemp) {
                message.error("Please select an image to save");
                return
              }
              SaveUploadedImageData(uploadImageType);
            }}
          >
            Save
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default UploadPhotos