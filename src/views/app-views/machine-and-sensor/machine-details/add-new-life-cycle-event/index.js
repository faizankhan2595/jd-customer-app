import React, { useState } from "react";
import { Button, Collapse, DatePicker, Input, Modal, Radio, Space } from "antd";
import ReportSerchIcon from "assets/svg/greenSearch.png";
import {
  DeleteOutlined,
  EditOutlined,
  HistoryOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  EditColorIcon,
  RemarkIcon,
  ViewDetailsIcon,
  UploadFileIcon,
  ImagesIcon,
  ConnectorResistIcon,
  WhiteImageIcon,
  AuxilleryChecksIcon,
} from "assets/svg/icon";
import { Table } from "antd";
import TextArea from "antd/lib/input/TextArea";
import EditModal from "./Stator Resistance/EditModal";
import EditThermistor from "./Stator Resistance/AuxiliaryCheckEdits/EditThermistor";
import EditSIModal from './Stator-Insulation/EditSIModal'
import SRUpload from "./Stator Resistance/SRUpload";
import SIUpload from "./Stator-Insulation/SIUpload";
import RRUpload from "./Rotor-Resistance/RRUpload";
import EditRRModal from "./Rotor-Resistance/EditRRModal";
import EditRIModal from "./Rotor-Insulation/EditRIModal";
import EditPolarizationIndexModal from "./Polarization-Index/EditPolarizationIndexModal";
import EditSCModal from "./Surge-Compression/EditSCModal";
import EditPT_100 from "./Stator Resistance/AuxiliaryCheckEdits/EditPT_100";
import EditBrake from "./Stator Resistance/AuxiliaryCheckEdits/EditBrake";
import EditOthers from "./Stator Resistance/AuxiliaryCheckEdits/EditOthers";
import EditStatorResistance from "./Stator-Insulation/Stator_winding_electrical_tests/EditStatorResistance";
import EditStatorInsulation from "./Stator-Insulation/Stator_winding_electrical_tests/EditStatorInsulation";
import FreeLoadTest from "./Free-Load-Test/FreeLoadTest";
import EditFreeLoadTest from "./Free-Load-Test/EditFreeLoadTest";
import MechanicalInspection from "./Mechanical_Inspection/MechanicalInspection";
import RotatorShaftRunout from "./Rotator-Shaft-Runout/RotatorShaftRunout";
import FreeVolumeCheck from "./Free-Volume-Check/FreeVolumeCheck";
import FlamePathDimension from "./Flame-Path-Dimension/FlamePathDimension";
import MiscelleneousReport from "./MiscellenousReport/MiscelleneousReport";



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

  // Add the new styles here:

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
const data3 = [
  {
    key: "1",
    srNo: 1,
    dateReceived: "2024-03-18",
    receivedBy: "John",
    dateRequested: "2024-03-15",
    dateDelivery: "2024-03-20",
    deliveredBy: "Jane",
  },
  {
    key: "2",
    srNo: 2,
    dateReceived: "2024-03-19",
    receivedBy: "Alice",
    dateRequested: "2024-03-16",
    dateDelivery: "2024-03-21",
    deliveredBy: "Bob",
  },
  // Add more data as needed
];
const data2 = [
  {
    key: "1",
    srNo: "1",
    item: "Keyboard",
    spec: "Mechanical",
    qty: "20",
    remarks: "Good",
    action: "Edit",
  },
  {
    key: "2",
    srNo: "2",
    item: "Mouse",
    spec: "Wireless",
    qty: "15",
    remarks: "Functional",
    action: "Delete",
  },
  {
    key: "3",
    srNo: "3",
    item: "Monitor",
    spec: '24" LED',
    qty: "10",
    remarks: "Brand New",
    action: "View",
  },
  {
    key: "4",
    srNo: "4",
    item: "Laptop",
    spec: '15.6" Core i7',
    qty: "5",
    remarks: "Refurbished",
    action: "Edit",
  },
  {
    key: "5",
    srNo: "5",
    item: "Headphones",
    spec: "Noise Cancelling",
    qty: "12",
    remarks: "Like New",
    action: "Delete",
  },
];

const columns = [
  {
    title: "Sr No",
    dataIndex: "srNo",
    key: "srNo",
  },
  {
    title: "Item",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "Spec",
    dataIndex: "spec",
    key: "spec",
  },
  {
    title: "Qty",
    dataIndex: "qty",
    key: "qty",
  },
  {
    title: "Remarks",
    dataIndex: "remarks",
    key: "remarks",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (action) => {
      return (
        <>
          <Button className="bg-danger text-white">
            <DeleteOutlined />
          </Button>
        </>
      );
    },
  },
];
const data1 = [
  {
    key: "1",
    srNo: "1",
    quoteJobRef: "QJ001",
    poRef: "PO001",
    customer: "Customer A",
    sales: "John Doe",
    action: "Edit",
  },
  {
    key: "2",
    srNo: "2",
    quoteJobRef: "QJ002",
    poRef: "PO002",
    customer: "Customer B",
    sales: "Jane Smith",
    action: "Delete",
  },
  {
    key: "3",
    srNo: "3",
    quoteJobRef: "QJ003",
    poRef: "PO003",
    customer: "Customer C",
    sales: "Michael Johnson",
    action: "View",
  },
  // Add more data as needed
];
const columns3 = [
  {
    title: "Sr No",
    dataIndex: "srNo",
    key: "srNo",
  },
  {
    title: "Date Received",
    dataIndex: "dateReceived",
    key: "dateReceived",
  },
  {
    title: "Received By",
    dataIndex: "receivedBy",
    key: "receivedBy",
  },
  {
    title: "Date Requested",
    dataIndex: "dateRequested",
    key: "dateRequested",
  },
  {
    title: "Date Delivery",
    dataIndex: "dateDelivery",
    key: "dateDelivery",
  },
  {
    title: "Delivered By",
    dataIndex: "deliveredBy",
    key: "deliveredBy",
  },
];
const columns4 = [
  {
    title: "Sr No",
    dataIndex: "srNo",
    key: "srNo",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Data",
    dataIndex: "data",
    key: "data",
  },
];
const data4 = [
  {
    key: "1",
    srNo: 1,
    title: "Equipment",
    data: "Machine A",
  },
  {
    key: "2",
    srNo: 2,
    title: "Tag No",
    data: "12345",
  },
  {
    key: "3",
    srNo: 3,
    title: "Manufacturer",
    data: "Manufacturer X",
  },
  {
    key: "4",
    srNo: 4,
    title: "Serial No",
    data: "SN001",
  },
  {
    key: "5",
    srNo: 5,
    title: "Model",
    data: "Model ABC",
  },
  {
    key: "6",
    srNo: 6,
    title: "Frame Size",
    data: "Size 1",
  },
  {
    key: "7",
    srNo: 7,
    title: "Power",
    data: "1000W",
  },
  {
    key: "8",
    srNo: 8,
    title: "Voltage",
    data: "220V",
  },
  {
    key: "9",
    srNo: 9,
    title: "Current",
    data: "10A",
  },
  {
    key: "10",
    srNo: 10,
    title: "Sec Voltage",
    data: "110V",
  },
  {
    key: "11",
    srNo: 11,
    title: "Sec Current",
    data: "5A",
  },
  {
    key: "12",
    srNo: 12,
    title: "Phase",
    data: "Single",
  },
  {
    key: "13",
    srNo: 13,
    title: "Frequency",
    data: "60Hz",
  },
  {
    key: "14",
    srNo: 14,
    title: "Pole",
    data: "4",
  },
  {
    key: "15",
    srNo: 15,
    title: "Speed",
    data: "1500rpm",
  },
  {
    key: "16",
    srNo: 16,
    title: "Power Factor",
    data: "0.9",
  },
  {
    key: "17",
    srNo: 17,
    title: "Insulation Class",
    data: "Class B",
  },
  {
    key: "18",
    srNo: 18,
    title: "IP",
    data: "IP65",
  },
  {
    key: "19",
    srNo: 19,
    title: "Ex-Proof Type",
    data: "Type X",
  },
  {
    key: "20",
    srNo: 20,
    title: "Ex-Proof Cert",
    data: "Cert Y",
  },
  {
    key: "21",
    srNo: 21,
    title: "DE Bearing",
    data: "Bearing 1",
  },
  {
    key: "22",
    srNo: 22,
    title: "NDE Bearing",
    data: "Bearing 2",
  },
  {
    key: "23",
    srNo: 23,
    title: "Colour",
    data: "Red",
  },
];
const columns1 = [
  {
    title: "Sr No",
    dataIndex: "srNo",
    key: "srNo",
  },
  {
    title: "Quote/Job Ref",
    dataIndex: "quoteJobRef",
    key: "quoteJobRef",
  },
  {
    title: "PO Ref",
    dataIndex: "poRef",
    key: "poRef",
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Sales",
    dataIndex: "sales",
    key: "sales",
  },
];
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const AddNewLifeCycleEvent = () => {
  const [jobRefModal, setJobRefModal] = useState(false);
  const [SCEditModal, setSCEditModal] = useState(false)
  const [SIEditModal, setSIEditModal] = useState(false);
  const [SREditModal, setSREditModal] = useState(false);
  const [SRUploadForm, setSRUploadForm] = useState(false);
  const [SIUploadForm, setSIUploadForm] = useState(false);
  const [RRUploadForm, setRRUploadForm] = useState(false);
  const [RREditModal, setRREditModal] = useState(false);
  const [RIEditModal, setRIEditModal] = useState(false);
  const [PIEditModal, setPIEditModal] = useState(false);
  const [modalName, setModalName] = useState("");
  console.log("Modal name: " + modalName);
  const [auxileryChecksHeater, setAuxileryChecksHeater] = useState({})
  const [auxileryChecksThermistor, setAuxileryChecksThermistor] = useState({})
  const [auxileryChecksThermostate, setAuxileryChecksThermostate] = useState({})
  const [auxileryCheckspt_100, setAuxileryCheckspt_100] = useState({})
  const [auxileryChecksBrake, setAuxileryChecksBrake] = useState({})
  const [auxileryChecksOther, setAuxileryChecksOther] = useState({})
  const [initialeditModal, setInitialeditModal] = useState(false);
  const [initialModalForm, setInitialModalForm] = useState({});
  const [initialModalFormdata, setInitialModalFormdata] = useState({});
  const [receiveAndDeliver, setReceiveAndDeliver] = useState(false);
  const [machineDataModal, setMachineDataModal] = useState(false);
  const [machineUploadModal, setMachineUploadModal] = useState(false);
  const [initialcondUploaModal, setInitialcondUploaModal] = useState(false);
  const [selectedFiles1, setSelectedFiles1] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImages1, setSelectedImages1] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [receiveAndDelData, setReceiveAndDelData] = useState({});
  const [statorWindingGlobaldata, setStatorWindingGlobaldata] = useState({});
  const [statorInsulationdata, setStatorInsulationdata] = useState({});
  const [statorRotarResistData, setStatorRotarResistData] = useState({});
  const [statorRotorInsulationData, setStatorRotorInsulationData] = useState(
    {}
  );
  const [statorPolarizationIndexData, setStatorPolarizationIndexData] =
    useState({});
  const [statorSurgeCompressionData, setStatorSurgeCompressionData] = useState({})
  const [radiodata, setRadiodata] = useState({
    quote_job_ref: "",
  });
  const [data, setData] = useState({
    quote_job_ref: "",
  });
  const onChange = (key) => {
    console.log(key);
  };
  const handleRadioChnge = (name, e) => {
    console.log(name, e.target.value);
    if (e.target.value == "") {
      setRadiodata({
        ...radiodata,
        [name]: false,
      });
      setData({
        ...data,
        [name]: e.target.value,
      });
    } else {
      setRadiodata({
        ...radiodata,
        [name]: true,
      });
      setData({
        ...data,
        [name]: e.target.value,
      });
    }
    console.log(radiodata, data);
  };
  const handleRadio1Chnge = (name, e) => {
    console.log(name, e.target.value);
    if (e.target.value == "" || e.target.value == null) {
      setReceiveAndDelData({
        ...receiveAndDelData,
        [name]: false,
      });
      setData({
        ...data,
        [name]: e.target.value,
      });
    } else {
      setReceiveAndDelData({
        ...receiveAndDelData,
        [name]: true,
      });
      setData({
        ...data,
        [name]: e.target.value,
      });
    }
    console.log(radiodata, data);
  };
  const handleRadio2Chnge = (name, e) => {
    console.log(name, e.target.value);
    setInitialModalFormdata({
      ...initialModalFormdata,
      [name]: e.target.value,
    });
  };
  function handleFileSelect(event) {
    const fileList = event.target.files;
    const newSelectedFiles = [];
    for (let i = 0; i < fileList.length; i++) {
      newSelectedFiles.push(fileList[i]);
    }
    //   console.log(selectedFiles)
    setSelectedFiles([...selectedFiles, newSelectedFiles[0]]);
  }
  const delUplFile = (i) => {
    let AfterDeleteFile = selectedFiles.filter((elem, index) => {
      return index !== i;
    });
    setSelectedFiles(AfterDeleteFile);
  };
  function handleFileSelect1(event) {
    const fileList = event.target.files;
    const newSelectedFiles = [];
    for (let i = 0; i < fileList.length; i++) {
      newSelectedFiles.push(fileList[i]);
    }
    //   console.log(selectedFiles)
    setSelectedFiles1([...selectedFiles1, newSelectedFiles[0]]);
  }
  const delUplFile1 = (i) => {
    let AfterDeleteFile = selectedFiles1.filter((elem, index) => {
      return index !== i;
    });
    setSelectedFiles1(AfterDeleteFile);
  };
  const uploadButton = (
    <div style={{ width: "200px" }}>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Profile Picture
      </div>
    </div>
  );
  const onRadioChange = (e) => {
    console.log("radio checked", e.target.value);
    setInitialModalForm({
      ...initialModalForm,
      [e.target.name]: e.target.value,
    });
  };

  const statorWindingGlobalRadioChange = (name, e) => {
    if (e.target.value == "" || e.target.value == null) {
      setStatorWindingGlobaldata({
        ...statorWindingGlobaldata,
        [name]: { checked: false, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    } else {
      setStatorWindingGlobaldata({
        ...statorWindingGlobaldata,
        [name]: { checked: true, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    }
    console.log(radiodata, data);
  };
  const auxilleryHeaterRadioChange = (name, e) => {
    if (e.target.value == "" || e.target.value == null) {
      setAuxileryChecksHeater({
        ...auxileryChecksHeater,
        [name]: { checked: false, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    } else {
      setAuxileryChecksHeater({
        ...auxileryChecksHeater,
        [name]: { checked: true, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    }
    console.log(radiodata, data);
  };
  const auxilleryThermistorRadioChange = (name, e) => {
    if (e.target.value == "" || e.target.value == null) {
      setAuxileryChecksThermistor({
        ...auxileryChecksThermistor,
        [name]: { checked: false, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    } else {

      setAuxileryChecksThermistor({
        ...auxileryChecksThermistor,
        [name]: { checked: true, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    }
    console.log(radiodata, data);
  };
  const auxilleryThermostateRadioChange = (name, e) => {
    if (e.target.value == "" || e.target.value == null) {
      setAuxileryChecksThermostate({
        ...auxileryChecksThermostate,
        [name]: { checked: false, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    } else {
      setAuxileryChecksThermostate({
        ...auxileryChecksThermostate,
        [name]: { checked: true, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    }
    console.log(radiodata, data);
  };
  const auxillerypt_100RadioChange = (name, e) => {
    if (e.target.value == "" || e.target.value == null) {
      setAuxileryCheckspt_100({
        ...auxileryCheckspt_100,
        [name]: { checked: false, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    } else {
      setAuxileryCheckspt_100({
        ...auxileryCheckspt_100,
        [name]: { checked: true, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    }
    console.log(radiodata, data);
  };
  const auxilleryBrakeRadioChange = (name, e) => {
    if (e.target.value == "" || e.target.value == null) {
      setAuxileryChecksBrake({
        ...auxileryChecksBrake,
        [name]: { checked: false, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    } else {
      setAuxileryChecksBrake({
        ...auxileryChecksBrake,
        [name]: { checked: true, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    }
    console.log(radiodata, data);
  };
  const auxilleryOtherRadioChange = (name, e) => {
    if (e.target.value == "" || e.target.value == null) {
      setAuxileryChecksOther({
        ...auxileryChecksOther,
        [name]: { checked: false, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    } else {
      setAuxileryChecksOther({
        ...auxileryChecksOther,
        [name]: { checked: true, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    }
    console.log(radiodata, data);
  };
  const statorInsulationRadioChange = (name, e) => {
    if (e.target.value == "" || e.target.value == null) {
      setStatorInsulationdata({
        ...statorInsulationdata,
        [name]: { checked: false, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    } else {
      setStatorInsulationdata({
        ...statorInsulationdata,
        [name]: { checked: true, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    }
  };
  const rotarRasistRadioChange = (name, e) => {
    if (e.target.value == "" || e.target.value == null) {
      setStatorRotarResistData({
        ...statorRotarResistData,
        [name]: { checked: false, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    } else {
      setStatorRotarResistData({
        ...statorRotarResistData,
        [name]: { checked: true, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    }
  };
  const rotarInsulationRadioChange = (name, e) => {
    if (e.target.value == "" || e.target.value == null) {
      setStatorRotorInsulationData({
        ...statorRotorInsulationData,
        [name]: { checked: false, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    } else {
      setStatorRotorInsulationData({
        ...statorRotorInsulationData,
        [name]: { checked: true, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    }
  };
  const polarizationIndexRadioChange = (name, e) => {
    if (e.target.value == "" || e.target.value == null) {
      setStatorPolarizationIndexData({
        ...statorPolarizationIndexData,
        [name]: { checked: false, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    } else {
      setStatorPolarizationIndexData({
        ...statorPolarizationIndexData,
        [name]: { checked: true, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    }
  };
  const surgeCompressionRadioChange = (name, e) => {
    if (e.target.value == "" || e.target.value == null) {
      setStatorSurgeCompressionData({
        ...statorSurgeCompressionData,
        [name]: { checked: false, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    } else {
      setStatorSurgeCompressionData({
        ...statorSurgeCompressionData,
        [name]: { checked: true, value: e.target.value },
      });
      // setData({
      //   ...data,
      //   [name]: e.target.value,
      // });
    }
  };
  return (
    <div>
      <SRUpload SRUploadForm={SRUploadForm} setSRUploadForm={setSRUploadForm} />
      <SIUpload SIUploadForm={SIUploadForm} setSIUploadForm={setSIUploadForm} />
      <RRUpload RRUploadForm={RRUploadForm} setRRUploadForm={setRRUploadForm} />
      <EditRRModal RREditModal={RREditModal} setRREditModal={setRREditModal} />
      <Modal
        title={
          <div className="d-flex align-items-center">
            <EditColorIcon />{" "}
            <span className="d-block ml-2"> Edit Details </span>
          </div>
        }
        visible={jobRefModal}
        onCancel={() => setJobRefModal(false)}
        footer={false}
        width={1000}
      >
        <div className="green-radio">
          <div className="mb-4 d-flex justify-content-between">
            <Radio style={{ width: "30%" }} checked={radiodata?.quote_job_ref}>
              Quote/Job Ref
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.quote_job_ref}
              onChange={(e) => handleRadioChnge("quote_job_ref", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between">
            <Radio style={{ width: "30%" }} checked={radiodata?.po_ref}>
              PO Ref
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.po_ref}
              onChange={(e) => handleRadioChnge("po_ref", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between">
            <Radio style={{ width: "30%" }} checked={radiodata?.customer}>
              Customer
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.customer}
              onChange={(e) => handleRadioChnge("customer", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between">
            <Radio style={{ width: "30%" }} checked={radiodata?.sales}>
              Sales
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.sales}
              onChange={(e) => handleRadioChnge("sales", e)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end mt-5">
          <Button key="cancel" onClick={() => setJobRefModal(false)}>
            Cancel
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => setJobRefModal(false)}
          >
            Save
          </Button>
        </div>
      </Modal>
      <Modal
        title={
          <div className="d-flex align-items-center">
            <EditColorIcon />{" "}
            <span className="d-block ml-2"> Edit Details </span>
          </div>
        }
        visible={receiveAndDeliver}
        onCancel={() => setReceiveAndDeliver(false)}
        footer={false}
        width={1000}
      >
        <div className="green-radio">
          <div className="mb-4 d-flex justify-content-between">
            <Radio
              style={{ width: "30%" }}
              checked={receiveAndDelData?.dateReceived}
            >
              Date Received
            </Radio>
            <DatePicker
              style={{ width: "70%" }}
              placeholder="Select Date"
              value={data?.dateReceived}
              onChange={(value) =>
                handleRadio1Chnge("dateReceived", { target: { value: value } })
              }
            />
          </div>
          <div className="mb-4 d-flex justify-content-between">
            <Radio
              style={{ width: "30%" }}
              checked={receiveAndDelData?.receivedBy}
            >
              Received By
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.receivedBy}
              onChange={(e) => handleRadio1Chnge("receivedBy", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between">
            <Radio
              style={{ width: "30%" }}
              checked={receiveAndDelData?.dateRequested}
            >
              Date Requested
            </Radio>
            <DatePicker
              style={{ width: "70%" }}
              placeholder="Select Date"
              value={data?.dateRequested}
              onChange={(value) =>
                handleRadio1Chnge("dateRequested", { target: { value: value } })
              }
            />
          </div>
          <div className="mb-4 d-flex justify-content-between">
            <Radio
              style={{ width: "30%" }}
              checked={receiveAndDelData?.dateDelivery}
            >
              Date Delivery
            </Radio>
            <DatePicker
              style={{ width: "70%" }}
              placeholder="Select Date"
              value={data?.dateDelivery}
              onChange={(value) =>
                handleRadio1Chnge("dateDelivery", { target: { value: value } })
              }
            />
          </div>
          <div className="mb-4 d-flex justify-content-between">
            <Radio
              style={{ width: "30%" }}
              checked={receiveAndDelData?.deliveredBy}
            >
              Delivered By
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.deliveredBy}
              onChange={(e) => handleRadio1Chnge("deliveredBy", e)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end mt-5">
          <Button key="cancel" onClick={() => setReceiveAndDeliver(false)}>
            Cancel
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => setReceiveAndDeliver(false)}
          >
            Save
          </Button>
        </div>
      </Modal>
      <Modal
        title={
          <div className="d-flex align-items-center">
            <EditColorIcon />{" "}
            <span className="d-block ml-2"> Edit Details </span>
          </div>
        }
        visible={machineDataModal}
        onCancel={() => setMachineDataModal(false)}
        footer={false}
        width={1000}
      >
        <div className="green-radio">
          <div className="mb-4 d-flex justify-content-between">
            <Radio
              style={{ width: "30%" }}
              checked={receiveAndDelData?.equipment}
            >
              Equipment
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.equipment}
              onChange={(e) => handleRadio1Chnge("equipment", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between">
            <Radio style={{ width: "30%" }} checked={receiveAndDelData?.tag_no}>
              Tag No
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.tag_no}
              onChange={(e) => handleRadio1Chnge("tag_no", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between">
            <Radio
              style={{ width: "30%" }}
              checked={receiveAndDelData?.manufacture}
            >
              Manufacture
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.manufacture}
              onChange={(e) => handleRadio1Chnge("manufacture", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between">
            <Radio
              style={{ width: "30%" }}
              checked={receiveAndDelData?.serial_no}
            >
              Serial No
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.serial_no}
              onChange={(e) => handleRadio1Chnge("serial_no", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between">
            <Radio style={{ width: "30%" }} checked={receiveAndDelData?.model}>
              Model
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.model}
              onChange={(e) => handleRadio1Chnge("model", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between">
            <Radio
              style={{ width: "30%" }}
              checked={receiveAndDelData?.frame_size}
            >
              Frame Size
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.frame_size}
              onChange={(e) => handleRadio1Chnge("frame_size", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between">
            <Radio style={{ width: "30%" }} checked={receiveAndDelData?.power}>
              Power
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.power}
              onChange={(e) => handleRadio1Chnge("power", e)}
              addonAfter="KW"
            />
          </div>
          <div className="mb-4 d-flex justify-content-between">
            <Radio
              style={{ width: "30%" }}
              checked={receiveAndDelData?.voltage}
            >
              Voltage
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.voltage}
              onChange={(e) => handleRadio1Chnge("voltage", e)}
              addonAfter="V"
            />
          </div>
        </div>
        <div className="d-flex justify-content-end mt-5">
          <Button key="cancel" onClick={() => setMachineDataModal(false)}>
            Cancel
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => setMachineDataModal(false)}
          >
            Save
          </Button>
        </div>
      </Modal>
      <Modal
        title={
          <div className="d-flex align-items-center">
            <EditColorIcon />{" "}
            <span className="d-block ml-2"> Edit Details </span>
          </div>
        }
        visible={initialeditModal}
        onCancel={() => setInitialeditModal(false)}
        footer={false}
        width={1000}
      >
        <div className="">
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="completed_unit"
              onChange={onRadioChange}
              value={initialModalForm?.completed_unit}
            >
              <Radio className="green-radio" value={1}>
                {" "}
              </Radio>
              <Radio className="red-radio" value={2}>
                {" "}
              </Radio>
              <Radio className="grey-radio" value={3}>
                {" "}
              </Radio>
            </Radio.Group>
            <labek>Completed Unit</labek>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.completed_unit}
              onChange={(e) => handleRadio2Chnge("completed_unit", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="complete_loose"
              onChange={onRadioChange}
              value={initialModalForm?.complete_loose}
            >
              <Radio className="green-radio" value={1}>
                {" "}
              </Radio>
              <Radio className="red-radio" value={2}>
                {" "}
              </Radio>
              <Radio className="grey-radio" value={3}>
                {" "}
              </Radio>
            </Radio.Group>
            <labek>Complete Loose</labek>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.complete_loose}
              onChange={(e) => handleRadio2Chnge("complete_loose", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="stator"
              onChange={onRadioChange}
              value={initialModalForm?.stator}
            >
              <Radio className="green-radio" value={1}>
                {" "}
              </Radio>
              <Radio className="red-radio" value={2}>
                {" "}
              </Radio>
              <Radio className="grey-radio" value={3}>
                {" "}
              </Radio>
            </Radio.Group>
            <labek>Stator</labek>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.stator}
              onChange={(e) => handleRadio2Chnge("stator", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="rotor"
              onChange={onRadioChange}
              value={initialModalForm?.rotor}
            >
              <Radio className="green-radio" value={1}>
                {" "}
              </Radio>
              <Radio className="red-radio" value={2}>
                {" "}
              </Radio>
              <Radio className="grey-radio" value={3}>
                {" "}
              </Radio>
            </Radio.Group>
            <labek>Rotor</labek>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.rotor}
              onChange={(e) => handleRadio2Chnge("rotor", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="coupling"
              onChange={onRadioChange}
              value={initialModalForm?.coupling}
            >
              <Radio className="green-radio" value={1}>
                {" "}
              </Radio>
              <Radio className="red-radio" value={2}>
                {" "}
              </Radio>
              <Radio className="grey-radio" value={3}>
                {" "}
              </Radio>
            </Radio.Group>
            <labek>Coupling</labek>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.coupling}
              onChange={(e) => handleRadio2Chnge("coupling", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="pulley"
              onChange={onRadioChange}
              value={initialModalForm?.pulley}
            >
              <Radio className="green-radio" value={1}>
                {" "}
              </Radio>
              <Radio className="red-radio" value={2}>
                {" "}
              </Radio>
              <Radio className="grey-radio" value={3}>
                {" "}
              </Radio>
            </Radio.Group>
            <labek>Pulley</labek>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.pulley}
              onChange={(e) => handleRadio2Chnge("pulley", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="impler"
              onChange={onRadioChange}
              value={initialModalForm?.impler}
            >
              <Radio className="green-radio" value={1}>
                {" "}
              </Radio>
              <Radio className="red-radio" value={2}>
                {" "}
              </Radio>
              <Radio className="grey-radio" value={3}>
                {" "}
              </Radio>
            </Radio.Group>
            <labek>Impeller</labek>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.impler}
              onChange={(e) => handleRadio2Chnge("impler", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="t_box"
              onChange={onRadioChange}
              value={initialModalForm?.t_box}
            >
              <Radio className="green-radio" value={1}>
                {" "}
              </Radio>
              <Radio className="red-radio" value={2}>
                {" "}
              </Radio>
              <Radio className="grey-radio" value={3}>
                {" "}
              </Radio>
            </Radio.Group>
            <labek>T-Box</labek>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.t_box}
              onChange={(e) => handleRadio2Chnge("t_box", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="t_box_cover"
              onChange={onRadioChange}
              value={initialModalForm?.t_box_cover}
            >
              <Radio className="green-radio" value={1}>
                {" "}
              </Radio>
              <Radio className="red-radio" value={2}>
                {" "}
              </Radio>
              <Radio className="grey-radio" value={3}>
                {" "}
              </Radio>
            </Radio.Group>
            <labek>T-Box Cover</labek>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.t_box_cover}
              onChange={(e) => handleRadio2Chnge("t_box_cover", e)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end mt-5">
          <Button key="cancel" onClick={() => setInitialeditModal(false)}>
            Cancel
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => {
              console.log(initialModalFormdata, initialModalForm);
              setInitialeditModal(false);
            }}
          >
            Save
          </Button>
        </div>
      </Modal>
      <Modal
        title={
          <div className="d-flex align-items-center">
            <ImagesIcon /> <span className="d-block ml-2"> Upload Photos </span>
          </div>
        }
        visible={machineUploadModal}
        onCancel={() => setMachineUploadModal(false)}
        footer={false}
        width={1000}
      >
        <div className="border bg-white rounded p-3 mt-4">
          <div className="d-flex flex-column justify-content-center align-items-center position-relative uploaddoc">
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
              multiple
              onChange={handleFileSelect}
            />
          </div>
          <div className="mt-4">
            {selectedFiles.length > 0 && (
              <ul className="p-0" style={{ width: "40%" }}>
                {selectedFiles.map((file, i) => (
                  <li key={file.name} className="my-3" style={styles.files}>
                    {" "}
                    <div className="d-flex align-items-center">
                      <UploadFileIcon />{" "}
                      <span className="ml-2">{file.name} </span>{" "}
                    </div>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => delUplFile(i)}
                    >
                      {" "}
                      <CloseCircleOutlined />{" "}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-end mt-5">
          <Button key="cancel" onClick={() => setMachineUploadModal(false)}>
            Cancel
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => {
              console.log(selectedFiles);
              const images = [];

              for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                const reader = new FileReader();

                reader.onload = (e) => {
                  images.push(e.target.result);
                  if (images.length === selectedFiles.length) {
                    setSelectedImages(images);
                  }
                };

                reader.readAsDataURL(file);
              }
              setMachineUploadModal(false);
            }}
          >
            Save
          </Button>
        </div>
      </Modal>
      <Modal
        title={
          <div className="d-flex align-items-center">
            <ImagesIcon /> <span className="d-block ml-2"> Upload Photos </span>
          </div>
        }
        visible={initialcondUploaModal}
        onCancel={() => setInitialcondUploaModal(false)}
        footer={false}
        width={1000}
      >
        <div className="border bg-white rounded p-3 mt-4">
          <div className="d-flex flex-column justify-content-center align-items-center position-relative uploaddoc">
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
              multiple
              onChange={handleFileSelect1}
            />
          </div>
          <div className="mt-4">
            {selectedFiles1.length > 0 && (
              <ul className="p-0" style={{ width: "40%" }}>
                {selectedFiles1.map((file, i) => (
                  <li key={file.name} className="my-3" style={styles.files}>
                    {" "}
                    <div className="d-flex align-items-center">
                      <UploadFileIcon />{" "}
                      <span className="ml-2">{file.name} </span>{" "}
                    </div>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => delUplFile1(i)}
                    >
                      {" "}
                      <CloseCircleOutlined />{" "}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-end mt-5">
          <Button key="cancel" onClick={() => setInitialcondUploaModal(false)}>
            Cancel
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => {
              console.log(selectedFiles1);
              const images = [];

              for (let i = 0; i < selectedFiles1.length; i++) {
                const file = selectedFiles1[i];
                const reader = new FileReader();

                reader.onload = (e) => {
                  images.push(e.target.result);
                  if (images.length === selectedFiles1.length) {
                    setSelectedImages1(images);
                  }
                };

                reader.readAsDataURL(file);
              }
              setInitialcondUploaModal(false);
            }}
          >
            Save
          </Button>
        </div>
      </Modal>
      <EditSIModal SIEditModal={SIEditModal} setSIEditModal={setSIEditModal} />
      {/* <EditModal model={"heater"} SREditModal={SREditModal} setSREditModal={setSREditModal} /> */}
      {modalName === "heater" && <EditModal SREditModal={SREditModal} setSREditModal={setSREditModal} />}
      {modalName === "thermistor" && <EditThermistor SREditModal={SREditModal} setSREditModal={setSREditModal} />}
      {modalName === "thermostat" && <EditThermistor SREditModal={SREditModal} setSREditModal={setSREditModal} />}
      {modalName === "PT_100" && <EditPT_100 SREditModal={SREditModal} setSREditModal={setSREditModal} />}
      {modalName === "brake" && <EditBrake SREditModal={SREditModal} setSREditModal={setSREditModal} />}
      {modalName === "others" && <EditOthers SREditModal={SREditModal} setSREditModal={setSREditModal} />}
      {modalName === "statorResistance" && <EditStatorResistance SREditModal={SREditModal} setSREditModal={setSREditModal} />}
      {modalName === "statorInsulation" && <EditStatorInsulation SIEditModal={SIEditModal} setSIEditModal={setSIEditModal} />}
      {modalName === "FreeLoadTest" && <EditFreeLoadTest SREditModal={SREditModal} setSREditModal={setSIEditModal} />}
      <EditRIModal RIEditModal={RIEditModal} setRIEditModal={setRIEditModal} />
      <EditPolarizationIndexModal PIEditModal={PIEditModal} setPIEditModal={setPIEditModal} />
      <EditSCModal SCEditModal={SCEditModal} setSCEditModal={setSCEditModal} />
      <div className="custom-full-width">
        <Space direction="vertical">
          <Collapse
            expandIconPosition={"end"}
            onChange={(data) => console.log(data)}
            className="mb-3"
          >
            <Panel
              header={
                <>
                  <img src={ReportSerchIcon} alt="..." />
                  Process Control
                </>
              }
              key="1"
            >
              <div className="normal-header-color">
                <Collapse
                  expandIconPosition={"end"}
                  onChange={(data) => console.log(data)}
                  className="mb-3"
                >
                  <Panel
                    header={
                      <>
                        General Process
                        <Button className="bg-primary text-white customEditButton">
                          <EditOutlined /> Edit
                        </Button>
                      </>
                    }
                    key="1"
                  >
                    {/* <div className="d-flex justify-content-end pr-4">
                    <Button className="bg-primary text-white"><EditOutlined /> Edit</Button>
                  </div> */}
                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}></div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <h5 className="text-gray-light">Operator(OP)</h5>
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <h5 className="text-gray-light">Date Start</h5>
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <h5 className="text-gray-light">Date Completed</h5>
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <h5 className="text-gray-light">Remarks</h5>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>Onsite Inspection</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>Onsite Dismantling</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Receiving Inspection</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Electrical Test and Free Run Test</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Disassemble Motor</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Mechanical Checks</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Clean Parts</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Bake stator in oven</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Varnish and Bake</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
                <Collapse className="mb-3">
                  <Panel
                    header={
                      <>
                        Rewinding
                        <Button className="bg-primary text-white customEditButton">
                          <EditOutlined /> Edit
                        </Button>
                      </>
                    }
                    key="1"
                  >
                    {/* <div className="d-flex justify-content-end pr-4">
                    <Button className="bg-primary text-white"><EditOutlined /> Edit</Button>
                  </div> */}
                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}></div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <h5 className="text-gray-light">Operator(OP)</h5>
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <h5 className="text-gray-light">Date Start</h5>
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <h5 className="text-gray-light">Date Completed</h5>
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <h5 className="text-gray-light">Remarks</h5>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Check winding dimension/connection</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Cut winding</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Burn out in heat cleaning oven</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Lamination core test</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Re-stack lamination (if required)</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Rewind Main Stator/Brake Coil</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS TIG/Soldering</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS In-Progress test on winding before varnish</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Pre-Heat before Varnish</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Varnish and Bake in oven</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
                <Collapse className="mb-3">
                  <Panel
                    header={
                      <>
                        Assembly and Final Test
                        <Button className="bg-primary text-white customEditButton">
                          <EditOutlined /> Edit
                        </Button>
                      </>
                    }
                    key="1"
                  >
                    {/* <div className="d-flex justify-content-end pr-4">
                    <Button className="bg-primary text-white"><EditOutlined /> Edit</Button>
                  </div> */}
                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}></div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <h5 className="text-gray-light">Operator(OP)</h5>
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <h5 className="text-gray-light">Date Start</h5>
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <h5 className="text-gray-light">Date Completed</h5>
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <h5 className="text-gray-light">Remarks</h5>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Dynamic Balancing of rotor</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Recondition of Housing Journal</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Electrical Test before Assembly</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Mechanical Check before Assembly</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Re-assemble Bearings</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Re-assemble Motor</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Re-assemble Seals</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Final Test and Inspection after Overhauling</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Painting</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>WS Packaging</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
                <Collapse className="mb-3">
                  <Panel
                    header={
                      <>
                        Deliver to Site{" "}
                        <Button className="bg-primary text-white customEditButton">
                          <EditOutlined /> Edit
                        </Button>
                      </>
                    }
                    key="1"
                  >
                    {/* <div className="d-flex justify-content-end pr-4">
                    <Button className="bg-primary text-white"><EditOutlined /> Edit</Button>
                  </div> */}
                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}></div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <h5 className="text-gray-light">Operator(OP)</h5>
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <h5 className="text-gray-light">Date Start</h5>
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <h5 className="text-gray-light">Date Completed</h5>
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <h5 className="text-gray-light">Remarks</h5>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>Onsite Installation and Alignment</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                      <div className="" style={{ width: "40%" }}>
                        <h5>Onsite Commissioning</h5>
                      </div>
                      <div className="d-flex" style={{ width: "60%" }}>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <Input placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white">
                            <RemarkIcon />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
                <div className="d-flex mb-3">
                  <div style={{ width: "25%" }}>
                    <h5>Responsible Person (RP)</h5>
                  </div>
                  <div style={{ width: "75%" }}>
                    <Input placeholder="type here..." />
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div style={{ width: "25%" }}>
                    <h5>Date</h5>
                  </div>
                  <div style={{ width: "75%" }}>
                    <DatePicker className="w-100" />
                  </div>
                </div>
              </div>
            </Panel>
          </Collapse>
          <Collapse className="mb-3">
            <Panel
              header={
                <>
                  <img src={ReportSerchIcon} alt="..." />
                  Parts Renewal List
                </>
              }
              key="2"
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
                <Button className="bg-primary text-white">+</Button>
              </div>
              <div className="grey-table mt-3">
                <Table
                  className="border rounded"
                  columns={columns}
                  dataSource={data2}
                />
              </div>
            </Panel>
          </Collapse>
          <Collapse className="mb-3">
            <Panel
              header={
                <>
                  <img src={ReportSerchIcon} alt="..." />
                  Job reference
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
                <Button
                  className="bg-primary text-white"
                  onClick={() => setJobRefModal(true)}
                >
                  {" "}
                  <EditOutlined /> Edit
                </Button>
              </div>
              <div className="grey-table mt-3">
                <Table
                  className="border rounded"
                  columns={columns1}
                  dataSource={data1}
                />
              </div>
            </Panel>
          </Collapse>
          <Collapse className="mb-3">
            <Panel
              header={
                <>
                  <img src={ReportSerchIcon} alt="..." />
                  Receiving & Delivery
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
                <Button
                  className="bg-primary text-white"
                  onClick={() => setReceiveAndDeliver(true)}
                >
                  {" "}
                  <EditOutlined /> Edit
                </Button>
              </div>
              <div className="grey-table mt-3">
                <Table
                  className="border rounded"
                  columns={columns3}
                  dataSource={data3}
                />
              </div>
            </Panel>
          </Collapse>
          <Collapse className="mb-3">
            <Panel
              header={
                <>
                  <img src={ReportSerchIcon} alt="..." />
                  Machine Data
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
                  <Button onClick={() => setMachineUploadModal(true)}>
                    {" "}
                    Upload Photos
                  </Button>
                  <Button
                    className="bg-primary text-white ml-2"
                    onClick={() => setMachineDataModal(true)}
                  >
                    {" "}
                    <EditOutlined /> Edit
                  </Button>
                </div>
              </div>
              <div className="grey-table mt-3">
                <Table
                  className="border rounded"
                  pagination={{
                    pageSize: 25,
                  }}
                  columns={columns4}
                  dataSource={data4}
                />
                <div className="mt-5">
                  <h5>Remarks</h5>
                  <TextArea rows={5} cols={16} placeholder="Type Here..." />
                </div>
                <div className="mt-5 d-flex justify-content-between">
                  <div className="d-flex justify-content-between w-50 align-items-center pr-4">
                    <h5 className="w-50">Checked By</h5>
                    <Input className="" placeholder="Add Operator Name" />
                  </div>
                  <div className="d-flex justify-content-between w-50 align-items-center pl-4">
                    <h5 className="mr-3">Date</h5>
                    <DatePicker className="w-50" />
                  </div>
                </div>
                <div className="mt-5">
                  <h5>Upload Photos</h5>
                  <div className="dashed-border">
                    {selectedImages.map((image, index) => (
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
                  </div>
                </div>
              </div>
            </Panel>
          </Collapse>
          <Collapse className="mb-3">
            <Panel
              header={
                <>
                  <img src={ReportSerchIcon} alt="..." />
                  Initial Conditions & Physical Inspection
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
                  <Button onClick={() => setInitialcondUploaModal(true)}>
                    {" "}
                    Upload Photos
                  </Button>
                  <Button
                    className="bg-primary text-white ml-2"
                    onClick={() => setInitialeditModal(true)}
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
                    checked={receiveAndDelData?.completed_unit}
                  >
                    Completed Unit
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.completed_unit}
                    onChange={(e) => handleRadio1Chnge("completed_unit", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.stator}
                  >
                    Stator
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.stator}
                    onChange={(e) => handleRadio1Chnge("stator", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.rotor}
                  >
                    Rotor
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.rotor}
                    onChange={(e) => handleRadio1Chnge("rotor", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.coupling}
                  >
                    Coupling
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.coupling}
                    onChange={(e) => handleRadio1Chnge("coupling", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.pulley}
                  >
                    Pulley
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.pulley}
                    onChange={(e) => handleRadio1Chnge("pulley", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.impller}
                  >
                    Impeller
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.impller}
                    onChange={(e) => handleRadio1Chnge("impller", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.t_box}
                  >
                    T-Box
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.t_box}
                    onChange={(e) => handleRadio1Chnge("t_box", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.t_box_cover}
                  >
                    T-Box Cover
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.t_box_cover}
                    onChange={(e) => handleRadio1Chnge("t_box_cover", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.power_cable}
                  >
                    Power Cable
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.power_cable}
                    onChange={(e) => handleRadio1Chnge("power_cable", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.terminal_board}
                  >
                    Terminal Board
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.terminal_board}
                    onChange={(e) => handleRadio1Chnge("terminal_board", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.connector}
                  >
                    Connector
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.connector}
                    onChange={(e) => handleRadio1Chnge("connector", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.cooling_fan_cover}
                  >
                    Cooling Fan Cover
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.cooling_fan_cover}
                    onChange={(e) => handleRadio1Chnge("cooling_fan_cover", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.cooling_fan}
                  >
                    Cooling Fan
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.cooling_fan}
                    onChange={(e) => handleRadio1Chnge("cooling_fan", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.blower}
                  >
                    Blower
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.blower}
                    onChange={(e) => handleRadio1Chnge("blower", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.pump}
                  >
                    Pump
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.pump}
                    onChange={(e) => handleRadio1Chnge("pump", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.brake}
                  >
                    Brake
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.brake}
                    onChange={(e) => handleRadio1Chnge("brake", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.gear_box}
                  >
                    Gear Box
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.gear_box}
                    onChange={(e) => handleRadio1Chnge("gear_box", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.de_seal}
                  >
                    DE Seal
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.de_seal}
                    onChange={(e) => handleRadio1Chnge("de_seal", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.nde_seal}
                  >
                    NDE Seal
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.nde_seal}
                    onChange={(e) => handleRadio1Chnge("nde_seal", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.nde_washer}
                  >
                    NDE Washer
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.nde_washer}
                    onChange={(e) => handleRadio1Chnge("nde_washer", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.de_washer}
                  >
                    DE Washer
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.de_washer}
                    onChange={(e) => handleRadio1Chnge("de_washer", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.de_circlip}
                  >
                    DE Circlip
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.de_circlip}
                    onChange={(e) => handleRadio1Chnge("de_circlip", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.nde_circlip}
                  >
                    NDE Circlip
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.nde_circlip}
                    onChange={(e) => handleRadio1Chnge("nde_circlip", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    checked={receiveAndDelData?.other}
                  >
                    Others
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    value={data?.other}
                    onChange={(e) => handleRadio1Chnge("other", e)}
                  />
                </div>

                <div className="mt-5">
                  <h5>Remarks</h5>
                  <TextArea rows={5} cols={16} placeholder="Type Here..." />
                </div>
                <div className="mt-5 d-flex justify-content-between">
                  <div className="d-flex justify-content-between w-50 align-items-center pr-4">
                    <h5 className="w-50">Checked By</h5>
                    <Input className="" placeholder="Add Operator Name" />
                  </div>
                  <div className="d-flex justify-content-between w-50 align-items-center pl-4">
                    <h5 className="mr-3">Date</h5>
                    <DatePicker className="w-50" />
                  </div>
                </div>
                <div className="mt-5">
                  <h5>Upload Photos</h5>
                  <div className="dashed-border">
                    {selectedImages1.map((image, index) => (
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
                  </div>
                </div>
              </div>
            </Panel>
          </Collapse>
          <Collapse className="mb-3">
            <Panel
              header={
                <>
                  <img src={ReportSerchIcon} alt="..." />
                  Stator winding electrical tests
                </>
              }
              key="3"
            >
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
                          <ConnectorResistIcon /> Stator Resistance{" "}
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
                            setSREditModal(true)
                            setModalName("statorResistance");
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
                          checked={statorWindingGlobaldata?.u1_u2?.checked}
                        >
                          U1-U2
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorWindingGlobaldata?.u1_u2?.value}
                          onChange={(e) =>
                            statorWindingGlobalRadioChange("u1_u2", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorWindingGlobaldata?.u_v?.checked}
                        >
                          U-V
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorWindingGlobaldata?.u_v?.value}
                          onChange={(e) =>
                            statorWindingGlobalRadioChange("u_v", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorWindingGlobaldata?.v1_v2?.checked}
                        >
                          V1-V2
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorWindingGlobaldata?.v1_v2?.value}
                          onChange={(e) =>
                            statorWindingGlobalRadioChange("v1_v2", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorWindingGlobaldata?.u_w?.checked}
                        >
                          U-W
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorWindingGlobaldata?.u_w?.value}
                          onChange={(e) =>
                            statorWindingGlobalRadioChange("u_w", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorWindingGlobaldata?.w1_w2?.checked}
                        >
                          W1-W2
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorWindingGlobaldata?.w1_w2?.value}
                          onChange={(e) =>
                            statorWindingGlobalRadioChange("w1_w2", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorWindingGlobaldata?.v_w?.checked}
                        >
                          V-W
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorWindingGlobaldata?.v_w?.value}
                          onChange={(e) =>
                            statorWindingGlobalRadioChange("v_w", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorWindingGlobaldata?.checked_by?.checked}
                        >
                          Checked by
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorWindingGlobaldata?.checked_by?.value}
                          onChange={(e) =>
                            statorWindingGlobalRadioChange("checked_by", e)
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorWindingGlobaldata?.instrument?.checked}
                        >
                          Instrument
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorWindingGlobaldata?.instrument?.value}
                          onChange={(e) =>
                            statorWindingGlobalRadioChange("instrument", e)
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorWindingGlobaldata?.date?.checked}
                        >
                          Date
                        </Radio>
                        <DatePicker
                          style={{ width: "70%" }}
                          placeholder="Select date"
                          value={statorWindingGlobaldata?.date?.value}
                          onChange={(e) =>
                            statorWindingGlobalRadioChange("date", {
                              target: { value: e },
                            })
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorWindingGlobaldata?.remarks?.checked}
                        >
                          Remarks
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorWindingGlobaldata?.remarks?.value}
                          onChange={(e) =>
                            statorWindingGlobalRadioChange("remarks", e)
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
                          <ConnectorResistIcon /> Stator Insulation{" "}
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
                            setSIUploadForm(true)
                          }} className="bg-primary text-white mr-1">
                            <WhiteImageIcon />
                          </Button>
                          <Button onClick={(e) => {
                            e.stopPropagation();
                            setSIEditModal(true)
                            setModalName("statorInsulation")
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
                          checked={statorInsulationdata?.uvw_e?.checked}
                        >
                          UVW-E
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorInsulationdata?.uvw_e?.value}
                          onChange={(e) =>
                            statorInsulationRadioChange("uvw_e", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorInsulationdata?.u_e?.checked}
                        >
                          U-E
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorInsulationdata?.u_e?.value}
                          onChange={(e) =>
                            statorInsulationRadioChange("u_e", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorInsulationdata?.v_e?.checked}
                        >
                          V-E
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorInsulationdata?.v_e?.value}
                          onChange={(e) =>
                            statorInsulationRadioChange("v_e", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorInsulationdata?.w_e?.checked}
                        >
                          W-E
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorInsulationdata?.w_e?.value}
                          onChange={(e) =>
                            statorInsulationRadioChange("w_e", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorInsulationdata?.u_v?.checked}
                        >
                          U-V
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorInsulationdata?.u_v?.value}
                          onChange={(e) =>
                            statorInsulationRadioChange("u_v", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorInsulationdata?.v_w?.checked}
                        >
                          V-W
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorInsulationdata?.v_w?.value}
                          onChange={(e) =>
                            statorInsulationRadioChange("v_w", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorInsulationdata?.u_w?.checked}
                        >
                          U-W
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorInsulationdata?.u_w?.value}
                          onChange={(e) =>
                            statorInsulationRadioChange("u_w", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorInsulationdata?.test_volt?.checked}
                        >
                          Test Volt
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorInsulationdata?.test_volt?.value}
                          onChange={(e) =>
                            statorInsulationRadioChange("test_volt", e)
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorInsulationdata?.checked_by?.checked}
                        >
                          Checked by
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorInsulationdata?.checked_by?.value}
                          onChange={(e) =>
                            statorInsulationRadioChange("checked_by", e)
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorInsulationdata?.instrument?.checked}
                        >
                          Instrument
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorInsulationdata?.instrument?.value}
                          onChange={(e) =>
                            statorInsulationRadioChange("instrument", e)
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorInsulationdata?.date?.checked}
                        >
                          Date
                        </Radio>
                        <DatePicker
                          style={{ width: "70%" }}
                          placeholder="Select date"
                          value={statorInsulationdata?.date?.value}
                          onChange={(e) =>
                            statorInsulationRadioChange("date", {
                              target: { value: e },
                            })
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorInsulationdata?.remarks?.checked}
                        >
                          Remarks
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorInsulationdata?.remarks?.value}
                          onChange={(e) =>
                            statorInsulationRadioChange("remarks", e)
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
                          <ConnectorResistIcon /> Rotor Resistance{" "}
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
                              // setRREditModal(true)
                              console.log("add");
                            }}
                          >
                            +
                          </Button>
                          <Button onClick={(e) => {
                            e.stopPropagation()
                            setRRUploadForm(true)
                          }} className="bg-primary text-white mr-1">
                            <WhiteImageIcon />
                          </Button>
                          <Button onClick={(e) => {
                            e.stopPropagation();
                            setRREditModal(true)
                            console.log("add");
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
                          checked={statorRotarResistData?.k_l?.checked}
                        >
                          K-L
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorRotarResistData?.k_l?.value}
                          onChange={(e) => rotarRasistRadioChange("k_l", e)}
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorRotarResistData?.k_m?.checked}
                        >
                          K-M
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorRotarResistData?.k_m?.value}
                          onChange={(e) => rotarRasistRadioChange("k_m", e)}
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorRotarResistData?.l_m?.checked}
                        >
                          L-M
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorRotarResistData?.l_m?.value}
                          onChange={(e) => rotarRasistRadioChange("l_m", e)}
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorRotarResistData?.checked_by?.checked}
                        >
                          Checked by
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorRotarResistData?.checked_by?.value}
                          onChange={(e) =>
                            rotarRasistRadioChange("checked_by", e)
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorRotarResistData?.instrument?.checked}
                        >
                          Instrument
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorRotarResistData?.instrument?.value}
                          onChange={(e) =>
                            rotarRasistRadioChange("instrument", e)
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorRotarResistData?.date?.checked}
                        >
                          Date
                        </Radio>
                        <DatePicker
                          style={{ width: "70%" }}
                          placeholder="Select date"
                          value={statorRotarResistData?.date?.value}
                          onChange={(e) =>
                            rotarRasistRadioChange("date", {
                              target: { value: e },
                            })
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorRotarResistData?.remarks?.checked}
                        >
                          Remarks
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorRotarResistData?.remarks?.value}
                          onChange={(e) => rotarRasistRadioChange("remarks", e)}
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
                          <ConnectorResistIcon /> Rotor Insulation{" "}
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
                          <Button className="bg-primary text-white mr-1">
                            <WhiteImageIcon />
                          </Button>
                          <Button onClick={(e) => {
                            e.stopPropagation();
                            setRIEditModal(true)
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
                          checked={statorRotorInsulationData?.klm_e?.checked}
                        >
                          KLM-E
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorRotorInsulationData?.klm_e?.value}
                          onChange={(e) =>
                            rotarInsulationRadioChange("klm_e", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorRotorInsulationData?.k_e?.checked}
                        >
                          K-E
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorRotorInsulationData?.k_e?.value}
                          onChange={(e) => rotarInsulationRadioChange("k_e", e)}
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorRotorInsulationData?.l_e?.checked}
                        >
                          L-E
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorRotorInsulationData?.l_e?.value}
                          onChange={(e) => rotarInsulationRadioChange("l_e", e)}
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorRotorInsulationData?.m_e?.checked}
                        >
                          M-E
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorRotorInsulationData?.m_e?.value}
                          onChange={(e) => rotarInsulationRadioChange("m_e", e)}
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={
                            statorRotorInsulationData?.test_volt?.checked
                          }
                        >
                          Test Volt
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorRotorInsulationData?.test_volt?.value}
                          onChange={(e) =>
                            rotarInsulationRadioChange("test_volt", e)
                          }
                          suffix="V"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={
                            statorRotorInsulationData?.checked_by?.checked
                          }
                        >
                          Checked by
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorRotorInsulationData?.checked_by?.value}
                          onChange={(e) =>
                            rotarInsulationRadioChange("checked_by", e)
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorRotorInsulationData?.date?.checked}
                        >
                          Date
                        </Radio>
                        <DatePicker
                          style={{ width: "70%" }}
                          placeholder="Select date"
                          value={statorRotorInsulationData?.date?.value}
                          onChange={(e) =>
                            rotarInsulationRadioChange("date", {
                              target: { value: e },
                            })
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorRotorInsulationData?.remarks?.checked}
                        >
                          Remarks
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorRotorInsulationData?.remarks?.value}
                          onChange={(e) =>
                            rotarInsulationRadioChange("remarks", e)
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
                          <ConnectorResistIcon /> Polarization Index{" "}
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
                          <Button className="bg-primary text-white mr-1">
                            <WhiteImageIcon />
                          </Button>
                          <Button onClick={(e) => {
                            e.stopPropagation();
                            setPIEditModal(true)
                          }} className="bg-primary text-white mr-1">
                            <EditOutlined />
                          </Button>
                        </span>
                      </>
                    }
                    key="1"
                  >
                    <div className="green-radio">
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={
                            statorPolarizationIndexData?.ins_1_min?.checked
                          }
                        >
                          Ins 1 min
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorPolarizationIndexData?.ins_1_min?.value}
                          onChange={(e) =>
                            polarizationIndexRadioChange("ins_1_min", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={
                            statorPolarizationIndexData?.ins_10_min?.checked
                          }
                        >
                          Ins 10 min
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorPolarizationIndexData?.ins_10_min?.value}
                          onChange={(e) =>
                            polarizationIndexRadioChange("ins_10_min", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorPolarizationIndexData?.pi?.checked}
                        >
                          PI
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorPolarizationIndexData?.pi?.value}
                          onChange={(e) =>
                            polarizationIndexRadioChange("pi", e)
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={
                            statorPolarizationIndexData?.test_volt?.checked
                          }
                        >
                          Test Volt
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorPolarizationIndexData?.test_volt?.value}
                          onChange={(e) =>
                            polarizationIndexRadioChange("test_volt", e)
                          }
                          suffix="V"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={
                            statorPolarizationIndexData?.checked_by?.checked
                          }
                        >
                          Checked by
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorPolarizationIndexData?.checked_by?.value}
                          onChange={(e) =>
                            polarizationIndexRadioChange("checked_by", e)
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={
                            statorPolarizationIndexData?.instrument?.checked
                          }
                        >
                          Instrument
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorPolarizationIndexData?.instrument?.value}
                          onChange={(e) =>
                            polarizationIndexRadioChange("instrument", e)
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorPolarizationIndexData?.date?.checked}
                        >
                          Date
                        </Radio>
                        <DatePicker
                          style={{ width: "70%" }}
                          placeholder="Select date"
                          value={statorPolarizationIndexData?.date?.value}
                          onChange={(e) =>
                            polarizationIndexRadioChange("date", {
                              target: { value: e },
                            })
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={
                            statorPolarizationIndexData?.remarks?.checked
                          }
                        >
                          Remarks
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorPolarizationIndexData?.remarks?.value}
                          onChange={(e) =>
                            polarizationIndexRadioChange("remarks", e)
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
                          <ConnectorResistIcon /> Surge Compression{" "}
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
                          <Button className="bg-primary text-white mr-1">
                            <WhiteImageIcon />
                          </Button>
                          <Button onClick={(e) => {
                            e.stopPropagation();
                            setSCEditModal(true);
                          }} className="bg-primary text-white mr-1">
                            <EditOutlined />
                          </Button>
                        </span>
                      </>
                    }
                    key="1"
                  >
                    <div className="green-radio">
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={
                            statorSurgeCompressionData?.u_v?.checked
                          }
                        >
                          U-V
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorSurgeCompressionData?.u_v?.value}
                          onChange={(e) =>
                            surgeCompressionRadioChange("u_v", e)
                          }
                        // suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={
                            statorSurgeCompressionData?.u_w?.checked
                          }
                        >
                          U-W
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorSurgeCompressionData?.u_w?.value}
                          onChange={(e) =>
                            surgeCompressionRadioChange("u_w", e)
                          }
                        // suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorSurgeCompressionData?.v_w?.checked}
                        >
                          V-W
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorSurgeCompressionData?.v_w?.value}
                          onChange={(e) =>
                            surgeCompressionRadioChange("v_w", e)
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={
                            statorSurgeCompressionData?.test_volt?.checked
                          }
                        >
                          Test Volt
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorSurgeCompressionData?.test_volt?.value}
                          onChange={(e) =>
                            surgeCompressionRadioChange("test_volt", e)
                          }
                          suffix="V"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={
                            statorSurgeCompressionData?.checked_by?.checked
                          }
                        >
                          Checked by
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorSurgeCompressionData?.checked_by?.value}
                          onChange={(e) =>
                            surgeCompressionRadioChange("checked_by", e)
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={
                            statorSurgeCompressionData?.instrument?.checked
                          }
                        >
                          Instrument
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorSurgeCompressionData?.instrument?.value}
                          onChange={(e) =>
                            surgeCompressionRadioChange("instrument", e)
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={statorSurgeCompressionData?.date?.checked}
                        >
                          Date
                        </Radio>
                        <DatePicker
                          style={{ width: "70%" }}
                          placeholder="Select date"
                          value={statorSurgeCompressionData?.date?.value}
                          onChange={(e) =>
                            surgeCompressionRadioChange("date", {
                              target: { value: e },
                            })
                          }
                        // suffix='mΩ'
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={
                            statorSurgeCompressionData?.remarks?.checked
                          }
                        >
                          Remarks
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={statorSurgeCompressionData?.remarks?.value}
                          onChange={(e) =>
                            surgeCompressionRadioChange("remarks", e)
                          }
                        // suffix='mΩ'
                        />
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            </Panel>
          </Collapse>
          <Collapse className="mb-3">
            <Panel
              header={
                <>
                  <img src={ReportSerchIcon} alt="..." />
                  Auxiliaries Checks
                </>
              }
              key="3"
            >
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
                          <AuxilleryChecksIcon /> Heater{" "}
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
                            setSREditModal(true)
                            setModalName("heater")
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
                          Insulation
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksHeater?.insulation?.value}
                          onChange={(e) =>
                            auxilleryHeaterRadioChange("insulation", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksHeater?.result1?.checked}
                        >
                          Result
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksHeater?.result1?.value}
                          onChange={(e) =>
                            auxilleryHeaterRadioChange("result1", e)
                          }
                          suffix="mΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksHeater?.resistance?.checked}
                        >
                          Resistance
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksHeater?.resistance?.value}
                          onChange={(e) =>
                            auxilleryHeaterRadioChange("resistance", e)
                          }
                          suffix="KΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksHeater?.result2?.checked}
                        >
                          Result
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksHeater?.result2?.value}
                          onChange={(e) =>
                            auxilleryHeaterRadioChange("result2", e)
                          }
                          suffix="KΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksHeater?.test_volt?.checked}
                        >
                          Test Volt
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksHeater?.test_volt?.value}
                          onChange={(e) =>
                            auxilleryHeaterRadioChange("test_volt", e)
                          }
                          suffix="v"
                        />
                      </div>
                      {/* <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksHeater?.date?.checked}
                        >
                          Date
                        </Radio>
                        <DatePicker
                          style={{ width: "70%" }}
                          placeholder="Select date"
                          value={auxileryChecksHeater?.date?.value}
                          onChange={(e) =>
                            auxilleryHeaterRadioChange("date", {
                              target: { value: e },
                            })
                          }
                          // suffix='mΩ'
                        />
                      </div> */}
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
                          <AuxilleryChecksIcon /> Thermistor{" "}
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
                            setSREditModal(true);
                            setModalName("thermistor")
                          }} className="bg-primary text-white mr-1">
                            <EditOutlined />
                          </Button>
                        </span>
                      </>
                    }
                    key="1"
                  >
                    <div className="green-radio">
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksThermistor?.resistance?.checked}
                        >
                          Resistance
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksThermistor?.resistance?.value}
                          onChange={(e) =>
                            auxilleryThermistorRadioChange("resistance", e)
                          }
                          suffix="KΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksThermistor?.result?.checked}
                        >
                          Result
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksThermistor?.result?.value}
                          onChange={(e) =>
                            auxilleryThermistorRadioChange("result", e)
                          }
                          suffix="KΩ"
                        />
                      </div>
                      {/* <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksThermistor?.date?.checked}
                        >
                          Date
                        </Radio>
                        <DatePicker
                          style={{ width: "70%" }}
                          placeholder="Select date"
                          value={auxileryChecksThermistor?.date?.value}
                          onChange={(e) =>
                            auxilleryThermistorRadioChange("date", {
                              target: { value: e },
                            })
                          }
                          // suffix='mΩ'
                        />
                      </div> */}
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksThermistor?.remarks?.checked}
                        >
                          Remarks
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksThermistor?.remarks?.value}
                          onChange={(e) =>
                            auxilleryThermistorRadioChange("remarks", e)
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
                          <AuxilleryChecksIcon /> Thermostat{" "}
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
                            setSREditModal(true)
                            setModalName("thermostat")
                          }} className="bg-primary text-white mr-1">
                            <EditOutlined />
                          </Button>
                        </span>
                      </>
                    }
                    key="1"
                  >
                    <div className="green-radio">
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksThermostate?.resistance?.checked}
                        >
                          Resistance
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksThermostate?.resistance?.value}
                          onChange={(e) =>
                            auxilleryThermostateRadioChange("resistance", e)
                          }
                          suffix="KΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksThermostate?.result?.checked}
                        >
                          Result
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksThermostate?.result?.value}
                          onChange={(e) =>
                            auxilleryThermostateRadioChange("result", e)
                          }
                          suffix="KΩ"
                        />
                      </div>
                      {/* <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksThermostate?.date?.checked}
                        >
                          Date
                        </Radio>
                        <DatePicker
                          style={{ width: "70%" }}
                          placeholder="Select date"
                          value={auxileryChecksThermostate?.date?.value}
                          onChange={(e) =>
                            auxilleryThermostateRadioChange("date", {
                              target: { value: e },
                            })
                          }
                          // suffix='mΩ'
                        />
                      </div> */}
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksThermostate?.remarks?.checked}
                        >
                          Remarks
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksThermostate?.remarks?.value}
                          onChange={(e) =>
                            auxilleryThermostateRadioChange("remarks", e)
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
                          <AuxilleryChecksIcon /> PT-100{" "}
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
                            setSREditModal(true)
                            setModalName("PT_100")
                          }} className="bg-primary text-white mr-1">
                            <EditOutlined />
                          </Button>
                        </span>
                      </>
                    }
                    key="1"
                  >
                    <div className="green-radio">
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryCheckspt_100?.resistance?.checked}
                        >
                          Resistance
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryCheckspt_100?.resistance?.value}
                          onChange={(e) =>
                            auxillerypt_100RadioChange("resistance", e)
                          }
                          suffix="Ω"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryCheckspt_100?.result?.checked}
                        >
                          Result
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryCheckspt_100?.result?.value}
                          onChange={(e) =>
                            auxillerypt_100RadioChange("result", e)
                          }
                          suffix="Ω"
                        />
                      </div>
                      {/* <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryCheckspt_100?.date?.checked}
                        >
                          Date
                        </Radio>
                        <DatePicker
                          style={{ width: "70%" }}
                          placeholder="Select date"
                          value={auxileryCheckspt_100?.date?.value}
                          onChange={(e) =>
                            auxillerypt_100RadioChange("date", {
                              target: { value: e },
                            })
                          }
                          // suffix='mΩ'
                        />
                      </div> */}
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryCheckspt_100?.remarks?.checked}
                        >
                          Remarks
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryCheckspt_100?.remarks?.value}
                          onChange={(e) =>
                            auxillerypt_100RadioChange("remarks", e)
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
                          <AuxilleryChecksIcon /> Brake{" "}
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
                            setSREditModal(true)
                            setModalName("brake");
                          }} className="bg-primary text-white mr-1">
                            <EditOutlined />
                          </Button>
                        </span>
                      </>
                    }
                    key="1"
                  >
                    <div className="green-radio">
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksBrake?.insulation?.checked}
                        >
                          Insulation
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksBrake?.insulation?.value}
                          onChange={(e) =>
                            auxilleryBrakeRadioChange("insulation", e)
                          }
                          suffix="MΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksBrake?.result_m?.checked}
                        >
                          Result
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksBrake?.result_m?.value}
                          onChange={(e) =>
                            auxilleryBrakeRadioChange("result_m", e)
                          }
                          suffix="MΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksBrake?.resistance?.checked}
                        >
                          Resistance
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksBrake?.resistance?.value}
                          onChange={(e) =>
                            auxilleryBrakeRadioChange("resistance", e)
                          }
                          suffix="KΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksBrake?.result_k?.checked}
                        >
                          Result
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksBrake?.result_k?.value}
                          onChange={(e) =>
                            auxilleryBrakeRadioChange("result_k", e)
                          }
                          suffix="KΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksBrake?.test_volt?.checked}
                        >
                          Test Volt
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksBrake?.test_volt?.value}
                          onChange={(e) =>
                            auxilleryBrakeRadioChange("test_volt", e)
                          }
                          suffix="V"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksBrake?.act_volt?.checked}
                        >
                          Act Volt
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksBrake?.act_volt?.value}
                          onChange={(e) =>
                            auxilleryBrakeRadioChange("act_volt", e)
                          }
                          suffix="V"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksBrake?.DC_volt?.checked}
                        >
                          DC Volt
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksBrake?.DC_volt?.value}
                          onChange={(e) =>
                            auxilleryBrakeRadioChange("DC_volt", e)
                          }
                          suffix="V"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksBrake?.current?.checked}
                        >
                          Current
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksBrake?.current?.value}
                          onChange={(e) =>
                            auxilleryBrakeRadioChange("current", e)
                          }
                          suffix="A"
                        />
                      </div>
                      {/* <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksBrake?.date?.checked}
                        >
                          Date
                        </Radio>
                        <DatePicker
                          style={{ width: "70%" }}
                          placeholder="Select date"
                          value={auxileryChecksBrake?.date?.value}
                          onChange={(e) =>
                            auxilleryBrakeRadioChange("date", {
                              target: { value: e },
                            })
                          }
                          // suffix='mΩ'
                        />
                      </div> */}
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksBrake?.remarks?.checked}
                        >
                          Remarks
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksBrake?.remarks?.value}
                          onChange={(e) =>
                            auxilleryBrakeRadioChange("remarks", e)
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
                          <AuxilleryChecksIcon /> other{" "}
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
                            setSREditModal(true)
                            setModalName("others");
                          }} className="bg-primary text-white mr-1">
                            <EditOutlined />
                          </Button>
                        </span>
                      </>
                    }
                    key="1"
                  >
                    <div className="green-radio">
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksOther?.test_records?.checked}
                        >
                          Test Records
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksOther?.test_records?.value}
                          onChange={(e) =>
                            auxilleryOtherRadioChange("test_records", e)
                          }
                        // suffix="KΩ"
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between">
                        <Radio
                          style={{ width: "30%" }}
                          checked={auxileryChecksOther?.remarks?.checked}
                        >
                          Remarks
                        </Radio>
                        <Input
                          style={{ width: "70%" }}
                          placeholder="Type here..."
                          value={auxileryChecksOther?.remarks?.value}
                          onChange={(e) =>
                            auxilleryOtherRadioChange("remarks", e)
                          }
                        // suffix='mΩ'
                        />
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              </div>

            </Panel>
          </Collapse>
          <FreeLoadTest setModalName={setModalName} setInitialcondUploaModa={initialcondUploaModal} setInitialeditModal={initialeditModal} receiveAndDelData={receiveAndDelData} data={data} handleRadioChnge={handleRadioChnge} handleRadio1Chnge={ConnectorResistIcon} statorWindingGlobaldata={statorWindingGlobaldata} statorWindingGlobalRadioChange={statorWindingGlobalRadioChange} selectedImages1={selectedImages1} setInitialeditModal={setInitialeditModal} />
          {/* <Collapse className="mb-3">
            <Panel
              header={
                <>
                  <img src={ReportSerchIcon} alt="..." />
                  Free Load tests
                </>
              }
              key="3"
            >
              <p>{text}</p>
            </Panel>
          </Collapse>
          <Collapse className="mb-3">
            <Panel
              header={
                <>
                  <img src={ReportSerchIcon} alt="..." />
                  Vibration tests
                </>
              }
              key="3"
            >
              <p>{text}</p>
            </Panel>
          </Collapse> */}
          <Collapse className="mb-3">
            <Panel
              header={
                <>
                  <img src={ReportSerchIcon} alt="..." />
                  Mechanical Inspections
                </>
              }
              key="3"
            >
              <MechanicalInspection setModalName={setModalName} auxilleryHeaterRadioChange={auxilleryHeaterRadioChange} auxileryChecksHeater={auxileryChecksHeater} setSRUploadForm={setSRUploadForm} setSREditModal={setSREditModal} />
            </Panel>
          </Collapse>

          <Collapse className="mb-3">
            <Panel
              header={
                <>
                  <img src={ReportSerchIcon} alt="..." />
                  Rotor shaft runout
                </>
              }
              key="3"
            >
              <RotatorShaftRunout handleRadioChnge={handleRadioChnge} setModalName={setModalName} auxileryChecksHeater={auxileryChecksHeater} setSRUploadForm={setSRUploadForm} setSREditModal={setSREditModal} />
            </Panel>
          </Collapse>
          <Collapse className="mb-3">
            <Panel
              header={
                <>
                  <img src={ReportSerchIcon} alt="..." />
                  Free volume checks (for explosive proof motor)
                </>
              }
              key="3"
            >
              <FreeVolumeCheck setModalName={setModalName} auxilleryHeaterRadioChange={auxilleryHeaterRadioChange} auxileryChecksHeater={auxileryChecksHeater} setSRUploadForm={setSRUploadForm} setSREditModal={setSREditModal} />
            </Panel>
          </Collapse>
          <Collapse className="mb-3">
            <Panel
              header={
                <>
                  <img src={ReportSerchIcon} alt="..." />
                  Flame path Dimension Checks
                </>
              }
              key="3"
            >
              <FlamePathDimension setModalName={setModalName} auxilleryHeaterRadioChange={auxilleryHeaterRadioChange} auxileryChecksHeater={auxileryChecksHeater} setSRUploadForm={setSRUploadForm} setSREditModal={setSREditModal} />
            </Panel>
          </Collapse>
          <Collapse className="mb-3">
            <Panel
              header={
                <>
                  <img src={ReportSerchIcon} alt="..." />
                  miscellaneous report Upload
                </>
              }
              key="3"
            >
              <MiscelleneousReport />
            </Panel>
          </Collapse>
        </Space>
      </div>
    </div>
  );
};

export default AddNewLifeCycleEvent;
