import React, { useEffect, useState } from "react";
import { Button, Collapse, DatePicker, Form, Input, message, Modal, Radio, Select, Space } from "antd";
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import Konva from 'konva';
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
  MachineIcon,
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
import moment from "moment";
import AuxiliariesChecks from "./Auxiliaries-Checks/AuxiliariesChecks";
import StatorWindingElectricalTests from "./Stator-Winding-Electrical-Tests/StatorWindingElectricalTests";
import VibrationTests from "./Vibration-Tests/VibrationTests";
import EditVibrationTests from "./Vibration-Tests/EditVibrationTests";
import { axiosInstance } from "App";
import marker_images from "./marker_images";
import { UploadImage } from "utils/Upload";
import { set } from "lodash";
import UploadPhotos from "./Upload-Photos/UploadPhotos";



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




// dateReceived: "",
//       receivedBy: "",
//       dateRequested: "",
//       dateDelivery: "",
//       deliveredBy: ""

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
    render:(text,record)=>(
      text? moment(text).format("DD-MM-YYYY"):""
    )
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
    render:(text,record)=>(
     text? moment(text).format("DD-MM-YYYY"):""
    )
  },
  {
    title: "Date Delivery",
    dataIndex: "dateDelivery",
    key: "dateDelivery",
    render:(text,record)=>(
     text? moment(text).format("DD-MM-YYYY"):null
    )
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
    render: (text, record) => (
       text.includes("-")? text.split("-")[0]+text.split("-")[1]: text
    )
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
    dataIndex: "quote_job_ref",
    key: "quoteJobRef",
  },
  {
    title: "PO Ref",
    dataIndex: "po_ref",
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
  const [form] =Form.useForm();
  const history = useHistory();
  const param = useParams();
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
  // console.log("Modal name: " + modalName);
  const [auxileryChecksHeater, setAuxileryChecksHeater] = useState({})
  const [auxileryChecksThermistor, setAuxileryChecksThermistor] = useState({})
  const [auxileryChecksThermostate, setAuxileryChecksThermostate] = useState({})
  const [auxileryCheckspt_100, setAuxileryCheckspt_100] = useState({})
  const [auxileryChecksBrake, setAuxileryChecksBrake] = useState({})
  const [auxileryChecksOther, setAuxileryChecksOther] = useState({})
  const [initialeditModal, setInitialeditModal] = useState(false);
  const {Option} = Select;
  //inital and physical inspection
  const [initialModalForm, setInitialModalForm] = useState({});
  const [initialModalFormdata, setInitialModalFormdata] = useState({});


  const [receiveAndDeliver, setReceiveAndDeliver] = useState(false);
  const [machineDataModal, setMachineDataModal] = useState(false);
  const [machineUploadModal, setMachineUploadModal] = useState(false);
  const [initialcondUploaModal, setInitialcondUploaModal] = useState(false);
  const [initialConditionUploaModal, setInitialConditionUploaModal] = useState(false); // for Initial condition and physical condition section
  const [initialcondVibrationUploaModal, setInitialcondVibrationUploaModal] = useState(false); // for vibration test section
  const [uploadModal, setUploadModal] = useState(false)
  const [uploadImageType, setUploadImageType] = useState('')

  const [selectedFiles1, setSelectedFiles1] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImages1, setSelectedImages1] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
 
  const [statorWindingGlobaldata, setStatorWindingGlobaldata] = useState({});
  const [statorInsulationdata, setStatorInsulationdata] = useState({});
  const [statorRotarResistData, setStatorRotarResistData] = useState({});
  const [statorRotorInsulationData, setStatorRotorInsulationData] = useState(
    {}
  );
  const [statorPolarizationIndexData, setStatorPolarizationIndexData] =
    useState({});
  const [statorSurgeCompressionData, setStatorSurgeCompressionData] = useState({})
  const [remarksModalForGeneralProcess, setRemarksModalForGeneralProcess] = useState(false);
  const [funcState, setFuncState] = useState("");
  const [funcState2,setFuncState2] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [machineId, setMachineId] = useState(false);



  const [receiveAndDelData, setReceiveAndDelData] = useState({});
  // receive and delivery
  const [receiveAndDeliverData, setReceiveAndDeliverData] = useState([
    {
      srNo: 1,
      dateReceived: "",
      receivedBy: "",
      dateRequested: "",
      dateDelivery: "",
      deliveredBy: ""
    }
  ])


  //Proccess Control State
  const [generalProcess, setGeneralProcess] = useState({
    onsite_inspection: {
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    onsite_dismantling: {
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    ws_receiving_inspection: {
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    ws_electrical_test_and_free_run_test: {
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    ws_disassemble_motor: {
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    ws_mechanical_checks: {
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    ws_clean_parts: {
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    ws_bake_stator_in_oven: {
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    ws_varnish_and_bake: {
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
  });
  const [rewinding, setRewinding] = useState({
    ws_check_winding_dimension:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: "" 
    },
    ws_cut_winding:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    } ,
    ws_burn_out_in_heat_cleaning_oven:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    ws_lamination_core_test:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    } ,
    ws_reStack_lamination:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    } ,
    ws_rewind_main_stator:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    } ,
    ws_tig_soldering:{
      operator: "", 
      start_date: "",
      completion_date: "",
      remarks: "" 
    } ,
    ws_in_progress_test_on_winding_before_varnish:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    } ,
    ws_pre_heat_before_varnish:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    } ,
    ws_varnish_and_bake_in_oven:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    } 
  })

  const [assemblyAndFinalTest,setAssemblyAndFinalTest] = useState({
    ws_dynamic_balancing_of_rotor:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: "" 
    },
    ws_recondition_of_housing_journal:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    ws_electrical_test_before_assembly:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    ws_mechanical_check_before_assembly:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    ws_re_assemble_bearings:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    ws_re_assemble_motor:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    ws_res_assemble_seals:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    ws_final_test_and_inspection_after_overhauling:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    ws_painting:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    ws_packaging:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    }
  })

  const [deliverToSite,setDeliverToSite] = useState({
    onsite_installation_and_alignment:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
    onsite_commissioning:{
      operator: "",
      start_date: "",
      completion_date: "",
      remarks: ""
    },
  })

  const [otherProcessControl,setOtherProcessControl] = useState({
      responsiblePerson:"",
      date:""
  })


  //parts renewal
  const [partsRenewal,setPartsRenewal] = useState([])
  const [partsRenewalModal,setPartsRenewalModal] = useState(false)
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
      // dataIndex: "action",
      render: (action) => {
        return (
          <>
            <Button className="bg-danger text-white"
              onClick={() => {
                setPartsRenewal(partsRenewal.filter((item) => item.srNo !== action.srNo));
              }}
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onFinishParts = (values) => {
    setPartsRenewal([...partsRenewal, {
      srNo: partsRenewal.length + 1,
      item: values.item,
      spec: values.spec,
      qty: values.qty,
      remarks: values.remarks
    }]);
    form.resetFields();
    setPartsRenewalModal(false)
  }

  const [machineDataUnit, setMachineDataUnit] = useState({
    power:"KW",
    voltage:"V",
    current:"A",
    sec_voltage:"V",
    sec_current:"A",
    frequency:"Hz",
    speed:"rpm",
  })
  

  //free volume checks
  const [freeVolumeData, setFreeVolumeData] = useState([
    {
      key: "1",
      srNo: 1,
      title: "Frame - V1- Motor body / Stator",
      photos: [],
      data: [
          {
              key: 1,
              name: "Motor Frame inner dia 'a'",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Motor Core length 'b'",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Motor Core Length 'f'",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "Remark",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "2",
      srNo: 2,
      title: "Frame - V2- Lead Connection Chamber",
      photos: [],
      data: [
          {
              key: 1,
              name: "Width",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Breadth",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Height",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "Remark",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "3",
      srNo: 3,
      title: "Terminal Box - V3- Rectangular box",
      photos: [],
      data: [
          {
              key: 1,
              name: "T-box internal width 'w'",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "T-box internal breadth 'b'",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "T-box internal height 'h'",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "4",
      srNo: 4,
      title: "Terminal Box -V4- Circular box",
      photos: [],
      data: [
          {
              key: 1,
              name: "T-Box internal width 'w'",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "T-Box internal breadth 'h'",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "5",
      srNo: 5,
      title: "Auxiliary box - V5- Rectangular box",
      photos: [],
      data: [
          {
              key: 1,
              name: "T-Box internal width 'w'",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Diameter",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "T-box internal breadth 'b'",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "6",
      srNo: 6,
      title: "Auxiliary box - V6- Circular box",
      photos: [],
      data: [
          {
              key: 1,
              name: "T-box internal width 'w'",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "T-box internal breadth 'h'",
              check: null,
              value: "",
          },
      ],
    },
  ])

  //flame path 
  const [flamePathData, setFlamePathData] = useState([
    {
      key: "1",
      srNo: 1,
      title: "Position A",
      photos: [],
      data: [
          {
              key: 1,
              name: "Chamber Volume",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Flame Path Length",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Maximum permissible gap",
              check: null,
              value: "",
          }, 
          {
              key: 4,
              name: "Logically larger diameter",
              check: null,
              value: "",
          }, 
          {
              key: 5,
              name: "Logically smaller diameter",
              check: null,
              value: ""
          }, 
          {
              key: 6,
              name: "Gap",
              check: null,
              value: ""
          }, 
          {
              key: 7,
              name: "Acceptable to standard",
              check: null,
              value: ""
          },
      ],
    },
    {
      key: "2",
      srNo: 2,
      title: "Position B",
      photos: [],
      data: [
          {
              key: 1,
              name: "Chamber Volume",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Flame Path Length",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Maximum permissible gap",
              check: null,
              value: "",
          }, 
          {
              key: 4,
              name: "Logically larger diameter",
              check: null,
              value: "",
          }, 
          {
              key: 5,
              name: "Logically smaller diameter",
              check: null,
              value: ""
          }, 
          {
              key: 6,
              name: "Gap",
              check: null,
              value: ""
          }, 
          {
              key: 7,
              name: "Acceptable to standard",
              check: null,
              value: ""
          },
      ],
    },
    {
      key: "3",
      srNo: 3,
      title: "Position C",
      photos: [],
      data: [
          {
              key: 1,
              name: "Chamber Volume",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Flame Path Length",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Maximum permissible gap",
              check: null,
              value: "",
          }, 
          {
              key: 4,
              name: "Logically larger diameter",
              check: null,
              value: "",
          }, 
          {
              key: 5,
              name: "Logically smaller diameter",
              check: null,
              value: ""
          }, 
          {
              key: 6,
              name: "Gap",
              check: null,
              value: ""
          }, 
          {
              key: 7,
              name: "Acceptable to standard",
              check: null,
              value: ""
          },
      ],
    },
    {
      key: "4",
      srNo: 4,
      title: "Position C1",
      photos: [],
      data: [
          {
              key: 1,
              name: "Chamber Volume",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Flame Path Length",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Maximum permissible gap",
              check: null,
              value: "",
          }, 
          {
              key: 4,
              name: "Logically larger diameter",
              check: null,
              value: "",
          }, 
          {
              key: 5,
              name: "Logically smaller diameter",
              check: null,
              value: ""
          }, 
          {
              key: 6,
              name: "Gap",
              check: null,
              value: ""
          }, 
          {
              key: 7,
              name: "Acceptable to standard",
              check: null,
              value: ""
          },
      ],
    },
    {
      key: "5",
      srNo: 5,
      title: "Position D",
      photos: [],
      data: [
          {
              key: 1,
              name: "Chamber Volume",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Flame Path Length",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Maximum permissible gap",
              check: null,
              value: "",
          }, 
          {
              key: 4,
              name: "Logically larger diameter",
              check: null,
              value: "",
          }, 
          {
              key: 5,
              name: "Logically smaller diameter",
              check: null,
              value: ""
          }, 
          {
              key: 6,
              name: "Gap",
              check: null,
              value: ""
          }, 
          {
              key: 7,
              name: "Acceptable to standard",
              check: null,
              value: ""
          },
      ],
    },
    {
      key: "6",
      srNo: 6,
      title: "Position E",
      photos: [],
      data: [
          {
              key: 1,
              name: "Chamber Volume",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Flame Path Length",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Maximum permissible gap",
              check: null,
              value: "",
          }, 
          {
              key: 4,
              name: "Logically larger diameter",
              check: null,
              value: "",
          }, 
          {
              key: 5,
              name: "Logically smaller diameter",
              check: null,
              value: ""
          }, 
          {
              key: 6,
              name: "Gap",
              check: null,
              value: ""
          }, 
          {
              key: 7,
              name: "Acceptable to standard",
              check: null,
              value: ""
          },
      ],
    },
    {
      key: "7",
      srNo: 7,
      title: "Position E1",
      photos: [],
      data: [
          {
              key: 1,
              name: "Chamber Volume",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Flame Path Length",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Maximum permissible gap",
              check: null,
              value: "",
          }, 
          {
              key: 4,
              name: "Logically larger diameter",
              check: null,
              value: "",
          }, 
          {
              key: 5,
              name: "Logically smaller diameter",
              check: null,
              value: ""
          }, 
          {
              key: 6,
              name: "Gap",
              check: null,
              value: ""
          }, 
          {
              key: 7,
              name: "Acceptable to standard",
              check: null,
              value: ""
          },
      ],
    },
    {
      key: "8",
      srNo: 8,
      title: "Position G",
      photos: [],
      data: [
          {
              key: 1,
              name: "Chamber Volume",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Flame Path Length",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Maximum permissible gap",
              check: null,
              value: "",
          }, 
          {
              key: 4,
              name: "Logically larger diameter",
              check: null,
              value: "",
          }, 
          {
              key: 5,
              name: "Logically smaller diameter",
              check: null,
              value: ""
          }, 
          {
              key: 6,
              name: "Gap",
              check: null,
              value: ""
          }, 
          {
              key: 7,
              name: "Acceptable to standard",
              check: null,
              value: ""
          },
      ],
    },
    {
      key: "9",
      srNo: 9,
      title: "Position H",
      photos: [],
      data: [
          {
              key: 1,
              name: "Chamber Volume",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Flame Path Length",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Maximum permissible gap",
              check: null,
              value: "",
          }, 
          {
              key: 4,
              name: "Logically larger diameter",
              check: null,
              value: "",
          }, 
          {
              key: 5,
              name: "Logically smaller diameter",
              check: null,
              value: ""
          }, 
          {
              key: 6,
              name: "Gap",
              check: null,
              value: ""
          }, 
          {
              key: 7,
              name: "Acceptable to standard",
              check: null,
              value: ""
          },
      ],
    },
    {
      key: "10",
      srNo: 10,
      title: "Position J",
      photos: [],
      data: [
          {
              key: 1,
              name: "Chamber Volume",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Flame Path Length",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Maximum permissible gap",
              check: null,
              value: "",
          }, 
          {
              key: 4,
              name: "Logically larger diameter",
              check: null,
              value: "",
          }, 
          {
              key: 5,
              name: "Logically smaller diameter",
              check: null,
              value: ""
          }, 
          {
              key: 6,
              name: "Gap",
              check: null,
              value: ""
          }, 
          {
              key: 7,
              name: "Acceptable to standard",
              check: null,
              value: ""
          },
      ],
    },
    {
      key: "11",
      srNo: 11,
      title: "Position K",
      photos: [],
      data: [
          {
              key: 1,
              name: "Chamber Volume",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Flame Path Length",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Maximum permissible gap",
              check: null,
              value: "",
          }, 
          {
              key: 4,
              name: "Logically larger diameter",
              check: null,
              value: "",
          }, 
          {
              key: 5,
              name: "Logically smaller diameter",
              check: null,
              value: ""
          }, 
          {
              key: 6,
              name: "Gap",
              check: null,
              value: ""
          }, 
          {
              key: 7,
              name: "Acceptable to standard",
              check: null,
              value: ""
          },
      ],
    },
    {
      key: "12",
      srNo: 12,
      title: "Position L",
      photos: [],
      data: [
          {
              key: 1,
              name: "Chamber Volume",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Flame Path Length",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Maximum permissible gap",
              check: null,
              value: "",
          }, 
          {
              key: 4,
              name: "Logically larger diameter",
              check: null,
              value: "",
          }, 
          {
              key: 5,
              name: "Logically smaller diameter",
              check: null,
              value: ""
          }, 
          {
              key: 6,
              name: "Gap",
              check: null,
              value: ""
          }, 
          {
              key: 7,
              name: "Acceptable to standard",
              check: null,
              value: ""
          },
      ],
    },
    {
      key: "13",
      srNo: 13,
      title: "Position M",
      photos: [],
      data: [
          {
              key: 1,
              name: "Chamber Volume",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Flame Path Length",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Maximum permissible gap",
              check: null,
              value: "",
          }, 
          {
              key: 4,
              name: "Logically larger diameter",
              check: null,
              value: "",
          }, 
          {
              key: 5,
              name: "Logically smaller diameter",
              check: null,
              value: ""
          }, 
          {
              key: 6,
              name: "Gap",
              check: null,
              value: ""
          }, 
          {
              key: 7,
              name: "Acceptable to standard",
              check: null,
              value: ""
          },
      ],
    },
    {
      key: "14",
      srNo: 14,
      title: "Position N",
      photos: [],
      data: [
          {
              key: 1,
              name: "Chamber Volume",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Flame Path Length",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Maximum permissible gap",
              check: null,
              value: "",
          }, 
          {
              key: 4,
              name: "Logically larger diameter",
              check: null,
              value: "",
          }, 
          {
              key: 5,
              name: "Logically smaller diameter",
              check: null,
              value: ""
          }, 
          {
              key: 6,
              name: "Gap",
              check: null,
              value: ""
          }, 
          {
              key: 7,
              name: "Acceptable to standard",
              check: null,
              value: ""
          },
      ],
    },
    {
      key: "15",
      srNo: 15,
      title: "Position P",
      photos: [],
      data: [
          {
              key: 1,
              name: "Chamber Volume",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Flame Path Length",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Maximum permissible gap",
              check: null,
              value: "",
          }, 
          {
              key: 4,
              name: "Logically larger diameter",
              check: null,
              value: "",
          }, 
          {
              key: 5,
              name: "Logically smaller diameter",
              check: null,
              value: ""
          }, 
          {
              key: 6,
              name: "Gap",
              check: null,
              value: ""
          }, 
          {
              key: 7,
              name: "Acceptable to standard",
              check: null,
              value: ""
          },
      ],
    },
    {
      key: "16",
      srNo: 16,
      title: "Position P1",
      photos: [],
      data: [
          {
              key: 1,
              name: "Flange surface and flatness checked and acceptable",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "17",
      srNo: 17,
      title: "Position L1",
      photos: [],
      data: [
          {
              key: 1,
              name: "Flange surface and flatness checked and acceptable",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "18",
      srNo: 18,
      title: "Position M1",
      photos: [],
      data: [
          {
              key: 1,
              name: "Flange surface and flatness checked and acceptable",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "19",
      srNo: 19,
      title: "Position K1",
      photos: [],
      data: [
          {
              key: 1,
              name: "Flange surface and flatness checked and acceptable",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "20",
      srNo: 20,
      title: "Position M2",
      photos: [],
      data: [
          {
              key: 1,
              name: "Number of threads engaged",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Thread",
              check: null,
              value: "",
          },
          {
              key: 3,
              name: "Condition acceptable to Standard",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "21",
      srNo: 21,
      title: "Position R",
      photos: [],
      data: [
          {
              key: 1,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
  ])


  //rotar shaft runout
  const [rotatorShaftData, setRotatorShaftData] = useState([
    {
      key: "1",
      srNo: 1,
      title: "Position 1",
      photos: [],
      data: [
          {
              key: 1,
              name: "Name",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Diameter",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Length",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "A",
              check: null,
              value: "",
          },
          {
              key: 5,
              name: "B",
              check: null,
              value: "",
          },
          {
              key: 6,
              name: "C",
              check: null,
              value: "",
          },
          {
              key: 7,
              name: "D",
              check: null,
              value: "",
          },
          {
              key: 8,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "2",
      srNo: 2,
      title: "Position 2",
      photos: [],
      data: [
          {
              key: 1,
              name: "Name",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Diameter",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Length",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "A",
              check: null,
              value: "",
          },
          {
              key: 5,
              name: "B",
              check: null,
              value: "",
          },
          {
              key: 6,
              name: "C",
              check: null,
              value: "",
          },
          {
              key: 7,
              name: "D",
              check: null,
              value: "",
          },
          {
              key: 8,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "3",
      srNo: 3,
      title: "Position 3",
      photos: [],
      data: [
          {
              key: 1,
              name: "Name",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Diameter",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Length",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "A",
              check: null,
              value: "",
          },
          {
              key: 5,
              name: "B",
              check: null,
              value: "",
          },
          {
              key: 6,
              name: "C",
              check: null,
              value: "",
          },
          {
              key: 7,
              name: "D",
              check: null,
              value: "",
          },
          {
              key: 8,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "4",
      srNo: 4,
      title: "Position 4",
      photos: [],
      data: [
          {
              key: 1,
              name: "Name",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Diameter",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Length",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "A",
              check: null,
              value: "",
          },
          {
              key: 5,
              name: "B",
              check: null,
              value: "",
          },
          {
              key: 6,
              name: "C",
              check: null,
              value: "",
          },
          {
              key: 7,
              name: "D",
              check: null,
              value: "",
          },
          {
              key: 8,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "5",
      srNo: 5,
      title: "Position 5",
      photos: [],
      data: [
          {
              key: 1,
              name: "Name",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Diameter",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Length",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "A",
              check: null,
              value: "",
          },
          {
              key: 5,
              name: "B",
              check: null,
              value: "",
          },
          {
              key: 6,
              name: "C",
              check: null,
              value: "",
          },
          {
              key: 7,
              name: "D",
              check: null,
              value: "",
          },
          {
              key: 8,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
  ])

  //mechanical inspection
  const [mechanicalInspectionData, setMechanicalInspectionData] = useState([
    {
      key: "1",
      srNo: 1,
      title: "Bearing Journal DE",
      photos: [],
      data: [
          {
              key: 1,
              name: "A-A`",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "B-B`",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "C-C`",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "2",
      srNo: 2,
      title: "Bearing Journal NDE",
      photos: [],
      data: [
          {
              key: 1,
              name: "A-A`",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "B-B`",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "C-C`",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "3",
      srNo: 3,
      title: "Bearing Housing DE",
      photos: [],
      data: [
          {
              key: 1,
              name: "A-A`",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "B-B`",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "C-C`",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "4",
      srNo: 4,
      title: "Bearing Housing NDE",
      photos: [],
      data: [
          {
              key: 1,
              name: "A-A`",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "B-B`",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "C-C`",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "5",
      srNo: 5,
      title: "Other",
      photos: [],
      data: [
          {
              key: 1,
              name: "A-A`",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "B-B`",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "C-C`",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
  ])

  //stator winding 
  const [statorWindingData, setStatorWindingData] = useState([
    {
      key: "1",
      srNo: 1,
      title: "Stator Resistance",
      photos: [],
      data: [
          {
              key: 1,
              name: "U1-U2",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "U-V",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "V1-V2",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "U-W",
              check: null,
              value: "",
          },
          {
              key: 5,
              name: "W1-W2",
              check: null,
              value: "",
          },
          {
              key: 6,
              name: "V-W",
              check: null,
              value: "",
          },
          {
              key: 7,
              name: "Checked by",
              check: null,
              value: "",
          },
          {
              key: 8,
              name: "Instrument",
              check: null,
              value: "",
          },
          {
              key: 9,
              name: "Date",
              check: null,
              value: "",
          },
          {
              key: 10,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "2",
      srNo: 2,
      title: "Stator Insulation",
      photos: [],
      data: [
          {
              key: 1,
              name: "UVW-E",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "U-E",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "V-E",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "W-E",
              check: null,
              value: "",
          },
          {
              key: 5,
              name: "U-V",
              check: null,
              value: "",
          },
          {
              key: 6,
              name: "V-W",
              check: null,
              value: "",
          },
          {
              key: 7,
              name: "U-W",
              check: null,
              value: "",
          },
          {
              key: 8,
              name: "Test Volt",
              check: null,
              value: "",
          },
          {
              key: 9,
              name: "Checked by",
              check: null,
              value: "",
          },
          {
              key: 10,
              name: "Instrument",
              check: null,
              value: "",
          },
          {
              key: 11,
              name: "Date",
              check: null,
              value: "",
          },
          {
              key: 12,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "3",
      srNo: 3,
      title: "Rotor Resistance",
      photos: [],
      data: [
          {
              key: 1,
              name: "K-L",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "K-M",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "L-M",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "Checked by",
              check: null,
              value: "",
          },
          {
              key: 5,
              name: "Instrument",
              check: null,
              value: "",
          },
          {
              key: 6,
              name: "Date",
              check: null,
              value: "",
          },
          {
              key: 7,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "4",
      srNo: 4,
      title: "Rotor Insulation",
      photos: [],
      data: [
          {
              key: 1,
              name: "KLM-E",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "K-E",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "L-E",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "M-E",
              check: null,
              value: "",
          },
          {
              key: 5,
              name: "Test Volt",
              check: null,
              value: "",
          },
          {
              key: 6,
              name: "Checked by",
              check: null,
              value: "",
          },
          {
              key: 7,
              name: "Instrument",
              check: null,
              value: "",
          },
          {
              key: 8,
              name: "Date",
              check: null,
              value: "",
          },
          {
              key: 9,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "5",
      srNo: 5,
      title: "Polarization  Index",
      photos: [],
      data: [
          {
              key: 1,
              name: "Ins 1 min",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Ins 10 min",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "PI",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "Test Volt",
              check: null,
              value: "",
          },
          {
              key: 5,
              name: "Checked by",
              check: null,
              value: "",
          },
          {
              key: 6,
              name: "Instrument",
              check: null,
              value: "",
          },
          {
              key: 7,
              name: "Date",
              check: null,
              value: "",
          },
          {
              key: 8,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "6",
      srNo: 6,
      title: "Surge Compression",
      photos: [],
      data: [
          {
              key: 1,
              name: "U-V",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "U-W",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "V-W",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "Test Volt",
              check: null,
              value: "",
          },
          {
              key: 5,
              name: "Checked by",
              check: null,
              value: "",
          },
          {
              key: 6,
              name: "Instrument",
              check: null,
              value: "",
          },
          {
              key: 7,
              name: "Date",
              check: null,
              value: "",
          },
          {
              key: 8,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
  ])

  //auxiliaries checks
  const [auxiliariesChecksData, setAuxiliariesChecksData] = useState([
    {
      key: "1",
      srNo: 1,
      title: "Heater",
      photos: [],
      data: [
          {
              key: 1,
              name: "Insulation",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Result",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Resistance",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "Result",
              check: null,
              value: "",
          },
          {
              key: 5,
              name: "Test Volt",
              check: null,
              value: "",
          },
          {
              key: 6,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "2",
      srNo: 2,
      title: "Thermistor",
      photos: [],
      data: [
          {
              key: 1,
              name: "Resistance",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Result",
              check: null,
              value: "",
          },
          {
              key: 3,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "3",
      srNo: 3,
      title: "Thermostat",
      photos: [],
      data: [
          {
              key: 1,
              name: "Resistance",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Result",
              check: null,
              value: "",
          },
          {
              key: 3,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "4",
      srNo: 4,
      title: "PT-100",
      photos: [],
      data: [
          {
              key: 1,
              name: "Resistance",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Result",
              check: null,
              value: "",
          },
          {
              key: 3,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "5",
      srNo: 5,
      title: "Brake",
      photos: [],
      data: [
          {
              key: 1,
              name: "Insulation",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Result",
              check: null,
              value: "",
          }, 
          {
              key: 3,
              name: "Resistance",
              check: null,
              value: "",
          },
          {
              key: 4,
              name: "Result",
              check: null,
              value: "",
          },
          {
              key: 5,
              name: "Test Volt",
              check: null,
              value: "",
          },
          {
              key: 6,
              name: "Act Volt",
              check: null,
              value: "",
          },
          {
              key: 7,
              name: "DC Volt",
              check: null,
              value: "",
          },
          {
              key: 8,
              name: "Current",
              check: null,
              value: "",
          },
          {
              key: 9,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
    {
      key: "6",
      srNo: 6,
      title: "Other Tests",
      photos: [],
      data: [
          {
              key: 1,
              name: "Test records",
              check: null,
              value: "",
          },
          {
              key: 2,
              name: "Remarks",
              check: null,
              value: "",
          },
      ],
    },
  ])

  

  //machineData
  const [otherMachineData, setOtherMachineData] = useState({
    remarks: "",
    checkedBy: "",
    date:""
  })
  const [machineData, setMachineData] = useState([
  {
    key: "1",
    srNo: 1,
    title: "Equipment",
    data: "",
  },
  {
    key: "2",
    srNo: 2,
    title: "Tag No",
    data: "",
  },
  {
    key: "3",
    srNo: 3,
    title: "Manufacturer",
    data: "",
  },
  {
    key: "4",
    srNo: 4,
    title: "Serial No",
    data: "",
  },
  {
    key: "5",
    srNo: 5,
    title: "Model",
    data: "",
  },
  {
    key: "6",
    srNo: 6,
    title: "Frame Size",
    data: "",
  },
  {
    key: "7",
    srNo: 7,
    title: "Power",
    data: "",
  },
  {
    key: "8",
    srNo: 8,
    title: "Voltage",
    data: "",
  },
  {
    key: "9",
    srNo: 9,
    title: "Current",
    data: "",
  },
  {
    key: "10",
    srNo: 10,
    title: "Sec Voltage",
    data: "",
  },
  {
    key: "11",
    srNo: 11,
    title: "Sec Current",
    data: "",
  },
  {
    key: "12",
    srNo: 12,
    title: "Phase",
    data: "",
  },
  {
    key: "13",
    srNo: 13,
    title: "Frequency",
    data: "",
  },
  {
    key: "14",
    srNo: 14,
    title: "Pole",
    data: "",
  },
  {
    key: "15",
    srNo: 15,
    title: "Speed",
    data: "",
  },
  {
    key: "16",
    srNo: 16,
    title: "Power Factor",
    data: "",
  },
  {
    key: "17",
    srNo: 17,
    title: "Insulation Class",
    data: "",
  },
  {
    key: "18",
    srNo: 18,
    title: "IP",
    data: "",
  },
  {
    key: "19",
    srNo: 19,
    title: "Ex-Proof Type",
    data: "",
  },
  {
    key: "20",
    srNo: 20,
    title: "Ex-Proof Cert",
    data: "",
  },
  {
    key: "21",
    srNo: 21,
    title: "DE Bearing",
    data: "",
  },
  {
    key: "22",
    srNo: 22,
    title: "NDE Bearing",
    data: "",
  },
  {
    key: "23",
    srNo: 23,
    title: "Colour",
    data: "",
  },
  ])
  

  //initial conditions and physical inspection
  const [initialConditionsAndPhysicalInspection, setInitialConditionAndPhysicalInspection] = useState({
    completedUnit:{
      check: null,
      value: ""
    },
    stator:{
      check: null,
      value: ""
    },
    rotor:{
      check: null,
      value: ""
    },
    coupling:{
      check: null,
      value: ""
    },
    pulley:{
      check: null,
      value: ""
    },
    impeller:{
      check: null,
      value: ""
    },
    t_box:{
      check: null,
      value: ""
    },
    t_box_cover:{
      check: null,
      value: ""
    },
    power_cable:{
      check: null,
      value: ""
    },
    terminal_board:{
      check: null,
      value: ""
    },
    connector:{
      check: null,
      value: ""
    },
    cooling_fan_cover:{
     check: null,
      value: ""
    },
    cooling_fan:{
      check: null,
      value: ""
    },
    blower:{
      check: null,
      value: ""
    },
    pump:{
     check: null,
      value: ""
    },
    brake:{
      check: null,
      value: ""
    },
    gear_box:{
      check: null,
      value: ""
    } ,
    de_seal:{
      check: null,
      value: ""
    },
    nde_seal:{
       check: null,
      value: ""
    },
    nde_washer:{
     check: null,
      value: ""
    },

    de_washer:{
     check: null,
      value: ""
    },
    de_circlip:{
       check: null,
      value: ""
    },
    nde_circlip:{
       check: null,
      value: ""
    },
    others:{
        check: null,
      value: ""
    },
    
})
const [otherInitialData, setOtherInitialData] = useState({
  remarks: "",
  checkedBy: "",
  date:"" 
})

const [miscelleneousReportData, setMiscelleneousReportData] = useState([])

//free load test
const [selectedImages2, setSelectedImages2] = useState([]);
const [freeLoadTestModal, setFreeLoadTestModal] = useState(false)
const [freeLoadData, setFreeLoadData] = useState({
  stator_volt:{
    check: null,
    value: ""
  },
  frequency:{
    check: null,
    value: ""
  },
  current_l1:{
    check: null,
    value: ""
  },
  current_l2:{
    check: null,
    value: ""
  },
  current_l3:{
    check: null,
    value: ""
  },
  connection:{
    check: null,
    value: ""
  },
  speed:{
    check: null,
    value: ""
  },
  rotation:{
    check: null,
    value: ""
  },
  de_temp:{
    check: null,
    value: ""
  },
  nde_temp:{
    check: null,
    value: ""
  },
  position:{
    check: null,
    value: ""
  },
  time:{
    check: null,
    value: ""
  },

})

//free load test
const [selectedImages3, setSelectedImages3] = useState([]);
const [selectedImageTemp, setSelectedImageTemp] = useState('');
const [vibrationTestModal, setVibrationTestModal] = useState(false)
const [vibrationData, setVibrationData] = useState({
  point_1:{
    check: null,
    value: ""
  },
  point_2:{
    check: null,
    value: ""
  },
  point_3:{
    check: null,
    value: ""
  },
  point_4:{
    check: null,
    value: ""
  },
  point_5:{
    check: null,
    value: ""
  },
  point_6:{
    check: null,
    value: ""
  },
  de_bearing:{
    check: null,
    value: ""
  },
  nde_bearing:{
    check: null,
    value: ""
  },
  others:{
    check: null,
    value: ""
  },
  remarks:{
    check: null,
    value: ""
  },

})


const [jobReference, setJobReference] = useState([
  {
    srNo: 1,
    quote_job_ref: "",
    po_ref: "",
    customer: "",
    sales: "",   
  }
])

const data2= {
  processControl: {
    generalProcess: generalProcess,
    rewinding: rewinding,
    assemblyAndFinalTest: assemblyAndFinalTest,
    deliverToSite: deliverToSite,
    otherProcessControl: otherProcessControl
  },
  partsRenewal: partsRenewal,
  jobReference: jobReference,
  receiveAndDeliverData: receiveAndDeliverData,
  machineData: {
    machineData,
    otherMachineData,
    imagesData: selectedImages
  },
  initialConditionsAndPhysicalInspection: {
    initialConditionsAndPhysicalInspection,
    otherInitialData,
    imagesData: selectedImages1
  },
  statorWindingData: statorWindingData,
  auxiliariesChecksData: auxiliariesChecksData,
  freeLoadData: {
    freeLoadData,
    imagesData: selectedImages2
  },
  vibrationData: {
    vibrationData,
    imagesData: selectedImages3
  },
  mechanicalInspectionData: mechanicalInspectionData,
  rotatorShaftData: rotatorShaftData,
  freeVolumeData: freeVolumeData,
  flamePathData: flamePathData,
  miscelleneousReport: miscelleneousReportData
}


const returnClass = (value) => {
  if (value === 1) {
    return "green-radio";
  } else if (value === 2) {
    return "red-radio";
  } else if (value === 3) {
    return "grey-radio";
  }
}

  const [radiodata, setRadiodata] = useState({
    quote_job_ref: "",
  });
  const [data, setData] = useState({});



  const handleRadioChnge = (name, e) => {
    const value = e.target.value;
  
    // Update radiodata state
    setRadiodata((prevRadiodata) => ({
      ...prevRadiodata,
      [name]: value !== "" ? true : false,
    }));
  
    // Update data state
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    console.log(name, value);
    console.log(radiodata, data); // Note: Logs may not show immediate updates due to React state batching
  };
  
  const handleRadio1Chnge = (name, e) => {
    const value = e.target.value;
  
    // Update receiveAndDelData state
    setReceiveAndDelData((prevReceiveAndDelData) => ({
      ...prevReceiveAndDelData,
      [name]: value !== "" && value !== null,
    }));
  
    // Update data state
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };
  
  const handleRadio2Chnge = (name, e) => {
    console.log(name, e.target.value);
    setInitialModalFormdata((prevData) => ({
    ...prevData,
    [name]: e.target.value,
  }));
  };

  function handleFileSelect(event) {
    const fileList = event.target.files;
    const newSelectedFiles = [];
    for (let i = 0; i < fileList.length; i++) {
      newSelectedFiles.push(fileList[i]);
    }
    //   console.log(selectedFiles)
    // setSelectedImages([...selectedImages, newSelectedFiles[0]]);

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
      // console.log(image_src);
      if(image_src) {
        setSelectedImageTemp(image_src);
        UploadImageMarkingKonva(image_src, imageMarkings);
      }
    };
    reader.readAsDataURL(file);
  }
  const delUplFile = (i) => {
    let AfterDeleteFile = selectedImages.filter((elem, index) => {
      return index !== i;
    });
    setSelectedImages(AfterDeleteFile);
  };

  function handleFileSelect1(event) {
    const fileList = event.target.files;
    const newSelectedFiles = [];
    for (let i = 0; i < fileList.length; i++) {
      newSelectedFiles.push(fileList[i]);
    }
    // setSelectedImages1([...selectedImages1, newSelectedFiles[0]]);
    
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
      // console.log(image_src);
      if(image_src) {
        setSelectedImageTemp(image_src);
        UploadImageMarkingKonva(image_src, imageMarkings);
      }
    };
    reader.readAsDataURL(file);
  }
  const delUplFile1 = (i) => {
    let AfterDeleteFile = selectedImages1.filter((elem, index) => {
      return index !== i;
    });
    setSelectedImages1(AfterDeleteFile);
  };

  function handleFileSelect2(event) {
    const fileList = event.target.files;
    const newSelectedFiles = [];
    for (let i = 0; i < fileList.length; i++) {
      newSelectedFiles.push(fileList[i]);
    }
    // setSelectedImages2([...selectedFiles1, newSelectedFiles[0]]);

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
  const delUplFile2 = (i) => {
    let AfterDeleteFile = selectedImages2.filter((elem, index) => {
      return index !== i;
    });
    setSelectedImages2(AfterDeleteFile);
  };

  function handleFileSelectVibrationTest(event) {
    const fileList = event.target.files;
    const newSelectedFiles = [];
    for (let i = 0; i < fileList.length; i++) {
      newSelectedFiles.push(fileList[i]);
    }
    // setSelectedImages3([...selectedFiles1, newSelectedFiles[0]]);
    
    // new logic
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
  const delUplFile3 = (i) => {
    let AfterDeleteFile = selectedImages3.filter((elem, index) => {
      return index !== i;
    });
    setSelectedImages3(AfterDeleteFile);
  };

  const delSubUploadedPhoto = (i, type) => {
    let img_section = type.split(' ~ ')[0];
    let img_subsection = type.split(' ~ ')[1];
    // console.log(i, type)
    if(img_section == 'Flame-Path') {
      let index = flamePathData.findIndex((e) => e.title == img_subsection)
      // let all_data = flamePathData
      // all_data[index].photos = all_data[index].photos.filter((e, ind) => ind !== i);
      setFlamePathData((prevData) => {
        return prevData.map((el,ind) => {
          return {
            ...el,
            photos: ind == index ? el.photos.filter((e, ind) => ind !== i) : el.photos
          }
        })
      });
    }
    if(img_section == 'Free-Volume') {
      let index = freeVolumeData.findIndex((e) => e.title == img_subsection)
      // let all_data = freeVolumeData
      // all_data[index].photos = freeVolumeData[index].photos.filter((e, ind) => ind !== i);
      setFreeVolumeData((prevData) => {
        return prevData.map((el,ind) => {
          return {
            ...el,
            photos: ind == index ? el.photos.filter((e, ind) => ind !== i) : el.photos
          }
        })
      });
    }
    if(img_section == 'Rotor-Shaft') {
      let index = rotatorShaftData.findIndex((e) => e.title == img_subsection)
      // let all_data = rotatorShaftData
      // all_data[index].photos = all_data[index].photos.filter((e, ind) => ind !== i);
      setRotatorShaftData((prevData) => {
        return prevData.map((el,ind) => {
          return {
            ...el,
            photos: ind == index ? el.photos.filter((e, ind) => ind !== i) : el.photos
          }
        })
      });
    }
    if(img_section == 'Mechanical-Inspection') {
      let index = mechanicalInspectionData.findIndex((e) => e.title == img_subsection)
      // let all_data = mechanicalInspectionData
      // all_data[index].photos = all_data[index].photos.filter((e, ind) => ind !== i);
      setMechanicalInspectionData((prevData) => {
        return prevData.map((el,ind) => {
          return {
            ...el,
            photos: ind == index ? el.photos.filter((e, ind) => ind !== i) : el.photos
          }
        })
      });
    }
    if(img_section == 'Auxiliary-Checks') {
      let index = auxiliariesChecksData.findIndex((e) => e.title == img_subsection)
      // let all_data = auxiliariesChecksData
      // all_data[index].photos = all_data[index].photos.filter((e, ind) => ind !== i);
      setAuxiliariesChecksData((prevData) => {
        return prevData.map((el,ind) => {
          return {
            ...el,
            photos: ind == index ? el.photos.filter((e, ind) => ind !== i) : el.photos
          }
        })
      });
    }
    if(img_section == 'Stator-Winding') {
      let index = statorWindingData.findIndex((e) => e.title == img_subsection)
      // let all_data = statorWindingData
      // all_data[index].photos = all_data[index].photos.filter((e, ind) => ind !== i);
      setStatorWindingData((prevData) => {
        return prevData.map((el,ind) => {
          return {
            ...el,
            photos: ind == index ? el.photos.filter((e, ind) => ind !== i) : el.photos
          }
        })
      });
    }
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
    setInitialModalForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
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

  const setImagesData = async (type) => {
    let imageData = [];
    if(type == 'Vibration-Test') {
      imageData = data2.vibrationData.imagesData;
    } else if(type == 'Free-Load') {
      imageData = data2.freeLoadData.imagesData;
    } else if(type == 'Initial-Condition') {
      imageData = data2.initialConditionsAndPhysicalInspection.imagesData;
    } else if(type == 'Machine-Data') {
      imageData = data2.machineData.imagesData;
    }

    const images = imageData.map(async (image) => {
      let url = image.url;
      if(url.includes('base64')) {
        const base64sign = image.url;
        const base64Data = base64sign.replace(/^data:image\/\w+;base64,/, "");
        const blob = new Blob([Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))], { type: 'image/png' });
        const file = new File([blob], "uploaded_image.png", { type: 'image/png' });
        url = await UploadImage(file);
      }
      let url_unmodified = image.url_unmodified;
      if(url_unmodified.includes('base64')) {
        const base64sign2 = image.url_unmodified;
        const base64Data2 = base64sign2.replace(/^data:image\/\w+;base64,/, "");
        const blob2 = new Blob([Uint8Array.from(atob(base64Data2), c => c.charCodeAt(0))], { type: 'image/png' });
        const file2 = new File([blob2], "uploaded_image.png", { type: 'image/png' });
        url_unmodified = await UploadImage(file2);
      }
      let img = await Promise.all(url, url_unmodified);
      if(img) {
        return {
          ...image,
          url: url,
          url_unmodified: url_unmodified
        }
      }
    })
    let imgs = await Promise.all(images);
    if(imgs) {
      console.log(imgs)
      // data2.vibrationData.imagesData = imgs;
      if(type == 'Vibration-Test') {
        imageData = data2.vibrationData.imagesData = imgs;
      } else if(type == 'Free-Load') {
        imageData = data2.freeLoadData.imagesData = imgs;
      } else if(type == 'Initial-Condition') {
        imageData = data2.initialConditionsAndPhysicalInspection.imagesData = imgs;
      } else if(type == 'Machine-Data') {
        imageData = data2.machineData.imagesData = imgs;
      }
      return true;
    } else {
      return false
    }
  }

  const setSubsectionImagesData = async (type) => {
    let imageData = [];
    let all_data = []
    if(type.includes('Flame-Path')) {
      all_data = flamePathData;
    }
    if(type.includes('Free-Volume')) {
      all_data = freeVolumeData;
    }
    if(type.includes('Rotor-Shaft')) {
      all_data = rotatorShaftData;
    }
    if(type.includes('Mechanical-Inspection')) {
      all_data = mechanicalInspectionData;
    }
    if(type.includes('Auxiliary-Checks')) {
      all_data = auxiliariesChecksData;
    }
    if(type.includes('Stator-Winding')) {
      all_data = statorWindingData;
    }

    for(let i=0; i < all_data.length; i++) {
      imageData = all_data[i].photos
      const images = imageData.map(async (image) => {
        let url = image.url;
        if(url.includes('base64')) {
          const base64sign = image.url;
          const base64Data = base64sign.replace(/^data:image\/\w+;base64,/, "");
          const blob = new Blob([Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))], { type: 'image/png' });
          const file = new File([blob], "uploaded_image.png", { type: 'image/png' });
          url = await UploadImage(file);
        }
        let url_unmodified = image.url_unmodified;
        if(url_unmodified.includes('base64')) {
          const base64sign2 = image.url_unmodified;
          const base64Data2 = base64sign2.replace(/^data:image\/\w+;base64,/, "");
          const blob2 = new Blob([Uint8Array.from(atob(base64Data2), c => c.charCodeAt(0))], { type: 'image/png' });
          const file2 = new File([blob2], "uploaded_image.png", { type: 'image/png' });
          url_unmodified = await UploadImage(file2);
        }
        let img = await Promise.all(url, url_unmodified);
        if(img) {
          return {
            ...image,
            url: url,
            url_unmodified: url_unmodified
          }
        }
      })
      let imgs = await Promise.all(images);
      if(imgs) {
        all_data[i].photos = imgs
      } else {
        return false
      }
    }
    if(type.includes('Flame-Path')) {
      setFlamePathData(all_data);
    }
    if(type.includes('Free-Volume')) {
      setFreeVolumeData(all_data);
    }
    if(type.includes('Rotor-Shaft')) {
      setRotatorShaftData(all_data);
    }
    if(type.includes('Mechanical-Inspection')) {
      setMechanicalInspectionData(all_data);
    }
    if(type.includes('Auxiliary-Checks')) {
      setAuxiliariesChecksData(all_data);
    }
    if(type.includes('Stator-Winding')) {
      setStatorWindingData(all_data);
    }
    return true;
  }

  const onFinishHandler = async () => {
    let imgs_convert_check1 = await setImagesData('Vibration-Test');
    let imgs_convert_check2 = await setImagesData('Free-Load');
    let imgs_convert_check3 = await setImagesData('Initial-Condition');
    let imgs_convert_check4 = await setImagesData('Machine-Data');
    let imgs_convert_check5 = await setSubsectionImagesData('Flame-Path');
    let imgs_convert_check6 = await setSubsectionImagesData('Free-Volume');
    let imgs_convert_check7 = await setSubsectionImagesData('Rotor-Shaft');
    let imgs_convert_check8 = await setSubsectionImagesData('Mechanical-Inspection');
    let imgs_convert_check9 = await setSubsectionImagesData('Auxiliary-Checks');
    let imgs_convert_check10 = await setSubsectionImagesData('Stator-Winding');
    if(!imgs_convert_check1 
      || !imgs_convert_check2
      || !imgs_convert_check3 
      || !imgs_convert_check4
      || !imgs_convert_check5
      || !imgs_convert_check6
      || !imgs_convert_check7
      || !imgs_convert_check8
      || !imgs_convert_check9
      || !imgs_convert_check10
    ) {
      return
    }
    try {
        let url = `/api/admin/life-cycle-event/store`;
        if(isEdit) {
          url = `/api/admin/life-cycle-event/${param.id}/update`
          const resp = await axiosInstance.put(url, {
              id: isEdit ? param.id : null,
              machine_id: isEdit ? machineId : param.id,
              process_control: JSON.stringify(data2.processControl),
              parts_renewal: JSON.stringify(data2.partsRenewal),
              job_reference: JSON.stringify(data2.jobReference),
              receive_and_deliver_data: JSON.stringify(data2.receiveAndDeliverData),
              machine_data: JSON.stringify(data2.machineData),
              initial_conditions_and_physical_inspection: JSON.stringify(data2.initialConditionsAndPhysicalInspection),
              stator_winding_data: JSON.stringify(data2.statorWindingData),
              auxiliaries_checks_data: JSON.stringify(data2.auxiliariesChecksData),
              free_load_data: JSON.stringify(data2.freeLoadData),
              mechanical_inspection_data: JSON.stringify(data2.mechanicalInspectionData),
              rotator_shaft_data: JSON.stringify(data2.rotatorShaftData),
              free_volume_data: JSON.stringify(data2.freeVolumeData),
              flame_path_data: JSON.stringify(data2.flamePathData),
              vibration_test_data: JSON.stringify(data2.vibrationData),
              miscelleneous_report: JSON.stringify(data2.miscelleneousReport),
  
              // date: moment().format('YYYY-MM-DD'),
              last_updated_at: moment().format('YYYY-MM-DD')
          })
          const response = resp.data;
          console.log(response)
          if(response.status) {
            message.success("Lifecycle Event updated successfully");
            setTimeout(() => {
              history.goBack()
            }, 500);
          }
        } else {
          const resp = await axiosInstance.post(url, {
              id: isEdit ? param.id : null,
              machine_id: isEdit ? machineId : param.id,
              process_control: JSON.stringify(data2.processControl),
              parts_renewal: JSON.stringify(data2.partsRenewal),
              job_reference: JSON.stringify(data2.jobReference),
              receive_and_deliver_data: JSON.stringify(data2.receiveAndDeliverData),
              machine_data: JSON.stringify(data2.machineData),
              initial_conditions_and_physical_inspection: JSON.stringify(data2.initialConditionsAndPhysicalInspection),
              stator_winding_data: JSON.stringify(data2.statorWindingData),
              auxiliaries_checks_data: JSON.stringify(data2.auxiliariesChecksData),
              free_load_data: JSON.stringify(data2.freeLoadData),
              mechanical_inspection_data: JSON.stringify(data2.mechanicalInspectionData),
              rotator_shaft_data: JSON.stringify(data2.rotatorShaftData),
              free_volume_data: JSON.stringify(data2.freeVolumeData),
              flame_path_data: JSON.stringify(data2.flamePathData),
              vibration_test_data: JSON.stringify(data2.vibrationData),
              miscelleneous_report: JSON.stringify(data2.miscelleneousReport),
  
              // date: moment().format('YYYY-MM-DD'),
              // last_updated_at: moment().format('YYYY-MM-DD')
          })
          const response = resp.data;
          if(response.status) {
            message.success("Lifecycle Event added successfully");
            setTimeout(() => {
              history.goBack()
            }, 500);
          }
        }

    } catch (error) {
        const errorResponse = error.response.data.data;
          if (errorResponse && errorResponse.error) {
            const errorMessage = errorResponse.error[0]; 
            message.warn(errorMessage);
          }
    }
  }

  const fetchData = async () => {
    console.log("fetch called")
    const response = await axiosInstance.get(`api/admin/life-cycle-event/${param.id}/show`);
    console.log(response)
    let data = response.data.item;
    if(data) {
      setMachineId(data.machine_id)
      
      // processControl
      let gen_keys = Object.keys(data.process_control.generalProcess);
      let gen_data = {}
      for(let key of gen_keys) {
        gen_data[key] = {
          ...data.process_control.generalProcess[key], 
          start_date: data.process_control.generalProcess[key].start_date ? moment(data.process_control.generalProcess[key].start_date) : null, 
          completion_date: data.process_control.generalProcess[key].completion_date ? moment(data.process_control.generalProcess[key].completion_date) : null
        }
      }
      setGeneralProcess(gen_data);
      // console.log(gen_data)

      let rew_keys = Object.keys(data.process_control.rewinding);
      let rew_data = {}
      for(let key of rew_keys) {
        rew_data[key] = {
          ...data.process_control.rewinding[key], 
          start_date: data.process_control.rewinding[key].start_date ? moment(data.process_control.rewinding[key].start_date) : null, 
          completion_date: data.process_control.rewinding[key].completion_date ? moment(data.process_control.rewinding[key].completion_date) : null
        }
      }
      setRewinding(rew_data);
      // console.log(rew_data)

      let asm_keys = Object.keys(data.process_control.assemblyAndFinalTest);
      let asm_data = {}
      for(let key of asm_keys) {
        asm_data[key] = {
          ...data.process_control.assemblyAndFinalTest[key], 
          start_date: data.process_control.assemblyAndFinalTest[key].start_date ? moment(data.process_control.assemblyAndFinalTest[key].start_date) : null, 
          completion_date: data.process_control.assemblyAndFinalTest[key].completion_date ? moment(data.process_control.assemblyAndFinalTest[key].completion_date) : null
        }
      }
      setAssemblyAndFinalTest(asm_data);
      // console.log(asm_data)

      let dts_keys = Object.keys(data.process_control.deliverToSite);
      let dts_data = {}
      for(let key of dts_keys) {
        dts_data[key] = {
          ...data.process_control.deliverToSite[key], 
          start_date: data.process_control.deliverToSite[key].start_date ? moment(data.process_control.deliverToSite[key].start_date) : null, 
          completion_date: data.process_control.deliverToSite[key].completion_date ? moment(data.process_control.deliverToSite[key].completion_date) : null
        }
      }
      setDeliverToSite(dts_data);
      // console.log(dts_data)

      let oth_data = {
        ...data.process_control.otherProcessControl, 
        date: data.process_control.otherProcessControl.date ? moment(data.process_control.otherProcessControl.date) : null, 
      }
      setOtherProcessControl(oth_data);
      // console.log(oth_data)
      // setOtherProcessControl(data.process_control.otherProcessControl)
      
      // parts renewal, job reference, & recieve and deliver data
      setPartsRenewal(data.parts_renewal)
      setJobReference(data.job_reference)
      setReceiveAndDeliverData(data.receive_and_deliver_data.map((item, index) => {
        return {
            ...item, 
            dateReceived: item.dateReceived ? moment(item.dateReceived) : null,
            dateRequested: item.dateRequested ? moment(item.dateRequested) : null,
            dateDelivery: item.dateDelivery ? moment(item.dateDelivery) : null,
        }
      }));

      // machineData
      setMachineData(data.machine_data.machineData)
      setOtherMachineData({
        ...data.machine_data.otherMachineData, 
        date: data.machine_data.otherMachineData.date ? moment(data.machine_data.otherMachineData.date) : null,
      });
      setSelectedImages(data.machine_data.imagesData || []);

      // Initial Conditions And Physical Inspection
      setInitialConditionAndPhysicalInspection(data.initial_conditions_and_physical_inspection.initialConditionsAndPhysicalInspection)
      setOtherInitialData({
        ...data.initial_conditions_and_physical_inspection.otherInitialData, 
        date: data.initial_conditions_and_physical_inspection.otherInitialData.date ? moment(data.initial_conditions_and_physical_inspection.otherInitialData.date) : null,
      });
      setSelectedImages1(data.initial_conditions_and_physical_inspection.imagesData || []);

      setStatorWindingData(data.stator_winding_data.map((e, index) => {
        return {
          ...data.stator_winding_data[index], 
          data: data.stator_winding_data[index].data.map((el) => {
            return {
              ...el,
              value: el.name == 'Date' && el.value ? moment(el.value) : el.value
            }
          }),
        }
      }));

      setAuxiliariesChecksData(data.auxiliaries_checks_data)
      setMechanicalInspectionData(data.mechanical_inspection_data)
      setRotatorShaftData(data.rotator_shaft_data)
      setFreeVolumeData(data.free_volume_data)
      setFlamePathData(data.flame_path_data)
      setMiscelleneousReportData(data.miscelleneous_report)

      setFreeLoadData(data.free_load_data.freeLoadData)
      setSelectedImages2(data.free_load_data.imagesData || []);
      setVibrationData(data.vibration_test_data.vibrationData)
      setSelectedImages3(data.vibration_test_data.imagesData || []);
    }
  }

  // canvas variables
  let width = null;
  let height = null;
  let stage = null;
  let layer = null;
  // let container_width = null;
  // let container_height = null;
  const [editImageId, setEditImageId] = useState(null)
  const [layerTemp, setLayerTemp] = useState(null)
  const [imageMarkings, setImageMarkings] = useState([]);

  // canvas markings setup
  const UploadImageMarkingKonva = (image_url, image_markings)=> {
    // if(!initialcondVibrationUploaModal) {
    //   console.log("edit return modal")
    //   return
    // }
    if(!image_url) {
      console.log("edit return image")
      return
    }
    if(stage) {
      console.log("edit return stage")
      return
    }

    let container = "upload_image_marking_canvas_container";
    let container_elem = document.getElementById("upload_image_marking_canvas_container");
    console.log(initialcondVibrationUploaModal)
    
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
      // let cont_width = container_elem.clientWidth;
      // let cont_height = container_elem.clientHeight;
      // setContainerWidth(cont_width);
      // setContainerHeight(cont_height);
      width = container_elem.clientWidth;
      height = container_elem.clientHeight;

      stage = new Konva.Stage({
        // container: 'upload_image_marking_canvas_container',
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

  const SaveUploadedImageData = (type) => {
    let container_elem = document.getElementById("upload_image_marking_canvas_container");
    let width_current = container_elem.clientWidth;
    let height_current = container_elem.clientHeight;
  
    // Create a temporary container for the new stage
    const tempContainer = document.createElement('div');
    tempContainer.style.width = `${width_current}px`;
    tempContainer.style.height = `${height_current}px`;
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';  // Hide it off-screen
    document.body.appendChild(tempContainer);
  
    // Create a temporary Konva stage and layer
    const tempStage = new Konva.Stage({
      container: tempContainer,
      width: width_current,
      height: height_current
    });
    const tempLayer = layerTemp
    tempStage.add(tempLayer);
  
    // add image and markings to temporary layer
    Konva.Image.fromURL(selectedImageTemp, image => {
      image.setAttrs({
        width: width_current,
        height: height_current,
      })
      tempLayer.add(image);
      tempLayer.draw();
      console.log(tempLayer)
      
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
          tempLayer.add(image);
          tempLayer.draw();
  
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
    
    let all_images = [];
    if(type == 'Vibration-Test') {
      all_images = selectedImages3;
    }
    if(type == 'Free-Load') {
      all_images = selectedImages2;
    }
    if(type == 'Initial-Condition') {
      all_images = selectedImages1;
    }
    if(type == 'Machine-Data') {
      all_images = selectedImages;
    }
    let ind = null;
    if(type.includes('~')) {
      let temp_type = type.split(' ~ ');
      if(temp_type[0] == 'Flame-Path') {
        all_images = flamePathData.find((e)=> e.title == temp_type[1]).photos;
        ind = flamePathData.findIndex((e)=> e.title == temp_type[1]);
      }
      if(temp_type[0] == 'Free-Volume') {
        all_images = freeVolumeData.find((e)=> e.title == temp_type[1]).photos;
        ind = freeVolumeData.findIndex((e)=> e.title == temp_type[1]);
      }
      if(temp_type[0] == 'Rotor-Shaft') {
        all_images = rotatorShaftData.find((e)=> e.title == temp_type[1]).photos;
        ind = rotatorShaftData.findIndex((e)=> e.title == temp_type[1]);
      }
      if(temp_type[0] == 'Mechanical-Inspection') {
        all_images = mechanicalInspectionData.find((e)=> e.title == temp_type[1]).photos;
        ind = mechanicalInspectionData.findIndex((e)=> e.title == temp_type[1]);
      }
      if(temp_type[0] == 'Auxiliary-Checks') {
        all_images = auxiliariesChecksData.find((e)=> e.title == temp_type[1]).photos;
        ind = auxiliariesChecksData.findIndex((e)=> e.title == temp_type[1]);
      }
      if(temp_type[0] == 'Stator-Winding') {
        all_images = statorWindingData.find((e)=> e.title == temp_type[1]).photos;
        ind = statorWindingData.findIndex((e)=> e.title == temp_type[1]);
      }
    }
    // Convert the stage to a data URL
    setTimeout(() => {
      tempStage.toDataURL({
        callback: (dataUrl) => {
          document.body.removeChild(tempContainer);
          if(editImageId) {
            let newImages = all_images.map((image, index) => {
              if(image.id === editImageId) {
                return {
                  id: image.id,
                  url: dataUrl,
                  url_unmodified: image.url_unmodified,
                  image_markings: imageMarkings,
                }
              } else {
                return image
              }
            })
            if(type == 'Vibration-Test') {
              setSelectedImages3(newImages);
            }
            if(type == 'Free-Load') {
              setSelectedImages2(newImages);
            }
            if(type == 'Initial-Condition') {
              setSelectedImages1(newImages);
            }
            if(type == 'Machine-Data') {
              setSelectedImages(newImages);
            }
            if(type.includes('~')) {
              let temp_type = type.split(' ~ ');
              if(temp_type[0] == 'Flame-Path') {
                setFlamePathData((prev) => {
                  let data = prev;
                  data[+ind].photos = newImages
                  return data
                })
              }
              if(temp_type[0] == 'Free-Volume') {
                setFreeVolumeData((prev) => {
                  let data = prev;
                  data[+ind].photos = newImages
                  return data
                })
              }
              if(temp_type[0] == 'Rotor-Shaft') {
                setRotatorShaftData((prev) => {
                  let data = prev;
                  data[+ind].photos = newImages
                  return data
                })
              }
              if(temp_type[0] == 'Mechanical-Inspection') {
                setMechanicalInspectionData((prev) => {
                  let data = prev;
                  data[+ind].photos = newImages
                  return data
                })
              }
              if(temp_type[0] == 'Auxiliary-Checks') {
                setAuxiliariesChecksData((prev) => {
                  let data = prev;
                  data[+ind].photos = newImages
                  return data
                })
              }
              if(temp_type[0] == 'Stator-Winding') {
                setStatorWindingData((prev) => {
                  let data = prev;
                  data[+ind].photos = newImages
                  return data
                })
              }
            }
          } else {
            if(type == 'Vibration-Test') {
              setSelectedImages3([...all_images, {
                id: dataUrl.slice(22, 122),
                url: dataUrl,
                url_unmodified: selectedImageTemp,
                image_markings: imageMarkings
              }]);
            }
            if(type == 'Free-Load') {
              setSelectedImages2([...all_images, {
                id: dataUrl.slice(22, 122),
                url: dataUrl,
                url_unmodified: selectedImageTemp,
                image_markings: imageMarkings
              }]);
            }
            if(type == 'Initial-Condition') {
              setSelectedImages1([...all_images, {
                id: dataUrl.slice(22, 122),
                url: dataUrl,
                url_unmodified: selectedImageTemp,
                image_markings: imageMarkings
              }]);
            }
            if(type == 'Machine-Data') {
              setSelectedImages([...all_images, {
                id: dataUrl.slice(22, 122),
                url: dataUrl,
                url_unmodified: selectedImageTemp,
                image_markings: imageMarkings
              }]);
            }
            if(type.includes('~')) {
              let temp_type = type.split(' ~ ');
              if(temp_type[0] == 'Flame-Path') {
                setFlamePathData((prev) => {
                  let data = prev;
                  data[+ind].photos = [...data[+ind].photos, {
                    id: dataUrl.slice(22, 122),
                    url: dataUrl,
                    url_unmodified: selectedImageTemp,
                    image_markings: imageMarkings
                  }]
                  return data
                })
              }
              if(temp_type[0] == 'Free-Volume') {
                setFreeVolumeData((prev) => {
                  let data = prev;
                  data[+ind].photos = [...data[+ind].photos, {
                    id: dataUrl.slice(22, 122),
                    url: dataUrl,
                    url_unmodified: selectedImageTemp,
                    image_markings: imageMarkings
                  }]
                  return data
                })
              }
              if(temp_type[0] == 'Rotor-Shaft') {
                setRotatorShaftData((prev) => {
                  let data = prev;
                  data[+ind].photos = [...data[+ind].photos, {
                    id: dataUrl.slice(22, 122),
                    url: dataUrl,
                    url_unmodified: selectedImageTemp,
                    image_markings: imageMarkings
                  }]
                  return data
                })
              }
              if(temp_type[0] == 'Mechanical-Inspection') {
                setMechanicalInspectionData((prev) => {
                  let data = prev;
                  data[+ind].photos = [...data[+ind].photos, {
                    id: dataUrl.slice(22, 122),
                    url: dataUrl,
                    url_unmodified: selectedImageTemp,
                    image_markings: imageMarkings
                  }]
                  return data
                })
              }
              if(temp_type[0] == 'Auxiliary-Checks') {
                setAuxiliariesChecksData((prev) => {
                  let data = prev;
                  data[+ind].photos = [...data[+ind].photos, {
                    id: dataUrl.slice(22, 122),
                    url: dataUrl,
                    url_unmodified: selectedImageTemp,
                    image_markings: imageMarkings
                  }]
                  return data
                })
              }
              if(temp_type[0] == 'Stator-Winding') {
                setStatorWindingData((prev) => {
                  let data = prev;
                  data[+ind].photos = [...data[+ind].photos, {
                    id: dataUrl.slice(22, 122),
                    url: dataUrl,
                    url_unmodified: selectedImageTemp,
                    image_markings: imageMarkings
                  }]
                  return data
                })
              }
            }
          }
          resetImageData();
        }
      });
    }, 500);
  }

  const convertImageToBase64 = async (imageUrl, markings) => {
    console.log("Image URL:", imageUrl);
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


  const resetImageData = () => {
    setSelectedImageTemp(null);
    setImageMarkings([]);
    // generateImageMarkingPoints(null, []);
    stage = null;
    layer = null;
    let container_elem = document.getElementById("upload_image_marking_canvas_container");
    container_elem.style.width = '100px';
    container_elem.style.height = '100px';
    setEditImageId(null);
    setUploadModal(false);
  }

  useEffect(() => {
    let isEditingEvent = window.location.href.includes('edit-life-cycle-event') ? true : false;

    if(isEditingEvent) {
      setIsEdit(true)
      fetchData();
    }
  }, [])
  

  return (
    <div>
      <h4 className="d-flex align-items-center m-0 mb-2">
          {" "}
          <MachineIcon color={"#72849A"} />
          <span
            style={{
              color: "#6a6a6a",
              fontWeight: "300",
              marginLeft: '5px'
            }}
          >
            {" "}
            Machines & Sensor{" "}
          </span>
          <span style={{color: "#6a6a6a", fontWeight: "300",}}>{" "}/ Life Cycle Management{" "}/</span>
          {isEdit ? " Edit":" Add New"} Life Cycle Event{" "}
      </h4>
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
            onClick={() => {
              setJobRefModal(false);
              setJobReference([
                {
                  srNo: 1,
                  quote_job_ref: data.quote_job_ref,
                  po_ref: data.po_ref,
                  customer: data.customer,
                  sales: data.sales,
                },
              ]);
            }}
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
            onClick={() => {
              setReceiveAndDeliver(false)
              setReceiveAndDeliverData([
                {
                  srNo: 1,
                  dateReceived: data.dateReceived,
                  receivedBy: data.receivedBy,
                  dateRequested: data.dateRequested,
                  dateDelivery: data.dateDelivery,
                  deliveredBy: data.deliveredBy
                }
              ])
            }}
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
              addonAfter={
                <Select value={machineDataUnit?.power}
                onChange={(e)=>{
                  setMachineDataUnit({
                    ...machineDataUnit,
                    power: e
                  })
                }}
                style={{ width: 70 }}>
                  <Option value="HP">HP</Option>
                  <Option value="KW">KW</Option>
                </Select>
              }
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
              addonAfter={
                <Select value={machineDataUnit?.voltage}
                onChange={(e)=>{
                  setMachineDataUnit({
                    ...machineDataUnit,
                    voltage: e
                  })
                }}
                style={{ width: 70 }}>
                  <Option value="V">V</Option>
                </Select>
              }
            />
          </div>
          <div className="mb-4 d-flex justify-content-between">
            <Radio style={{ width: "30%" }} checked={receiveAndDelData?.current}>
              Current
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.current}
              onChange={(e) => handleRadio1Chnge("current", e)}
              addonAfter={
                <Select value={machineDataUnit?.current}
                onChange={(e)=>{
                  setMachineDataUnit({
                    ...machineDataUnit,
                    current: e
                  })
                }}
                style={{ width: 70 }}>
                  <Option value="A">A</Option>
                </Select>
              } 
            />
            </div>

            <div className="mb-4 d-flex justify-content-between">
            <Radio style={{ width: "30%" }} checked={receiveAndDelData?.sec_voltage}>
              Sec Voltage
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.sec_voltage}
              onChange={(e) => handleRadio1Chnge("sec_voltage", e)}
              addonAfter={
                <Select value={machineDataUnit?.sec_voltage}
                onChange={(e)=>{
                  setMachineDataUnit({
                    ...machineDataUnit,
                    sec_voltage: e
                  })
                }}
                style={{ width: 70 }}>
                  <Option value="V">V</Option>
                </Select>
              }
            />
            </div>

            <div className="mb-4 d-flex justify-content-between">
            <Radio style={{ width: "30%" }} checked={receiveAndDelData?.sec_current}>
              Sec Current
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.sec_current}
              onChange={(e) => handleRadio1Chnge("sec_current", e)}
              addonAfter={
                <Select value={machineDataUnit?.sec_current}
                onChange={(e)=>{
                  setMachineDataUnit({
                    ...machineDataUnit,
                    sec_current: e
                  })
                }}
                style={{ width: 70 }}>
                  <Option value="A">A</Option>
                </Select>
              }
            />

              </div>

              <div className="mb-4 d-flex justify-content-between">
            <Radio style={{ width: "30%" }} checked={receiveAndDelData?.phase}>
              Phase
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.phase}
              onChange={(e) => handleRadio1Chnge("phase", e)}
            />
            </div>


            <div className="mb-4 d-flex justify-content-between">
            <Radio style={{ width: "30%" }} checked={receiveAndDelData?.frequency}>
              Frequency
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.frequency}
              onChange={(e) => handleRadio1Chnge("frequency", e)}
              addonAfter={
                <Select value={machineDataUnit?.frequency}
                onChange={(e)=>{
                  setMachineDataUnit({
                    ...machineDataUnit,
                    frequency: e
                  })
                }}
                style={{ width: 70 }}>
                  <Option value="Hz">Hz</Option>
                </Select>
              }
            />
            </div> 


            <div className="mb-4 d-flex justify-content-between">
            <Radio style={{ width: "30%" }} checked={receiveAndDelData?.pole}>
              Pole
            </Radio>

            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.pole}
              onChange={(e) => handleRadio1Chnge("pole", e)}
            />
            </div>

            <div className="mb-4 d-flex justify-content-between">
            <Radio style={{ width: "30%" }} checked={receiveAndDelData?.speed}>
              Speed
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.speed}
              onChange={(e) => handleRadio1Chnge("speed", e)}
              addonAfter={
                <Select value={machineDataUnit?.speed}
                onChange={(e)=>{
                  setMachineDataUnit({
                    ...machineDataUnit,
                    speed: e
                  })
                }}
                style={{ width: 70 }}>
                  <Option value="rpm">rpm</Option>
                </Select>
              }
            />
            </div>  
              {/* Power factor  */}
            <div className="mb-4 d-flex justify-content-between">
            <Radio style={{ width: "30%" }} checked={receiveAndDelData?.power_factor}>
              Power Factor
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.power_factor}
              onChange={(e) => handleRadio1Chnge("power_factor", e)}
            />
            </div>

            <div className="mb-4 d-flex justify-content-between">
            <Radio style={{ width: "30%" }} checked={receiveAndDelData?.insulation_class}>
              Insulation Class
            </Radio>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={data?.insulation_class}
              onChange={(e) => handleRadio1Chnge("insulation_class", e)}
            />

            </div>

            <div className="mb-4 d-flex justify-content-between">
              <Radio style={{ width: "30%" }} checked={receiveAndDelData?.ip}>
                IP
              </Radio>
              <Input
                style={{ width: "70%" }}
                placeholder="Type here..."
                value={data?.ip}
                onChange={(e) => handleRadio1Chnge("ip", e)}
              />
              </div>

              <div className="mb-4 d-flex justify-content-between">
              <Radio style={{ width: "30%" }} checked={receiveAndDelData?.ex_proof_type}>
                Ex Proof Type
              </Radio>
              <Input
                style={{ width: "70%" }}
                placeholder="Type here..."
                value={data?.ex_proof_type}
                onChange={(e) => handleRadio1Chnge("ex_proof_type", e)}
              />
              </div>


              <div className="mb-4 d-flex justify-content-between">
              <Radio style={{ width: "30%" }} checked={receiveAndDelData?.ex_proof_cert}>
                Ex Proof Cert
              </Radio>
              <Input
                style={{ width: "70%" }}
                placeholder="Type here..."
                value={data?.ex_proof_cert}
                onChange={(e) => handleRadio1Chnge("ex_proof_cert", e)}
              />
              </div>

              <div className="mb-4 d-flex justify-content-between">
              <Radio style={{ width: "30%" }} checked={receiveAndDelData?.de_bearing}>
                DE Bearing
              </Radio>
              <Input
                style={{ width: "70%" }}
                placeholder="Type here..."
                value={data?.de_bearing}
                onChange={(e) => handleRadio1Chnge("de_bearing", e)}
              />
              </div>

              <div className="mb-4 d-flex justify-content-between">
              <Radio style={{ width: "30%" }} checked={receiveAndDelData?.nde_bearing}>
                NDE Bearing
              </Radio>
              <Input
                style={{ width: "70%" }}
                placeholder="Type here..."
                value={data?.nde_bearing}
                onChange={(e) => handleRadio1Chnge("nde_bearing", e)}
              />
              </div>


              <div className="mb-4 d-flex justify-content-between">
              <Radio style={{ width: "30%" }} checked={receiveAndDelData?.color}>
                Color
              </Radio>
              <Input
                style={{ width: "70%" }}
                placeholder="Type here..."
                value={data?.color}
                onChange={(e) => handleRadio1Chnge("color", e)}
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
            onClick={() => {
              setMachineDataModal(false)
             setMachineData([
                {
                  key: "1",
                  srNo: 1,
                  title: "Equipment",
                  data: data?.equipment,
                },
                {
                  key: "2",
                  srNo: 2,
                  title: "Tag No",
                  data: data?.tag_no,
                },
                {
                  key: "3",
                  srNo: 3,
                  title: "Manufacturer",
                  data: data?.manufacture,
                },
                {
                  key: "4",
                  srNo: 4,
                  title: "Serial No",
                  data: data?.serial_no,
                },
                {
                  key: "5",
                  srNo: 5,
                  title: "Model",
                  data: data?.model,
                },
                {
                  key: "6",
                  srNo: 6,
                  title: "Frame Size",
                  data: data?.frame_size,
                },
                {
                  key: "7",
                  srNo: 7,
                  title: "Power",
                  data: data?.power+"-"+machineDataUnit?.power,
                },
                {
                  key: "8",
                  srNo: 8,
                  title: "Voltage",
                  data: data?.voltage+"-"+machineDataUnit?.voltage,
                },
                {
                  key: "9",
                  srNo: 9,
                  title: "Current",
                  data: data?.current+"-"+machineDataUnit?.current,
                },
                {
                  key: "10",
                  srNo: 10,
                  title: "Sec Voltage",
                  data: data?.sec_voltage+"-"+machineDataUnit?.sec_voltage,
                },
                {
                  key: "11",
                  srNo: 11,
                  title: "Sec Current",
                  data: data?.sec_current+"-"+machineDataUnit?.sec_current,
                },
                {
                  key: "12",
                  srNo: 12,
                  title: "Phase",
                  data: data?.phase,   
                },
                {
                  key: "13",
                  srNo: 13,
                  title: "Frequency",
                  data: data?.frequency+"-"+machineDataUnit?.frequency,
                },
                {
                  key: "14",
                  srNo: 14,
                  title: "Pole",
                  data: data?.pole,
                },
                {
                  key: "15",
                  srNo: 15,
                  title: "Speed",
                  data: data?.speed+"-"+machineDataUnit?.speed,
                },
                {
                  key: "16",
                  srNo: 16,
                  title: "Power Factor",
                  data: data?.power_factor,   
                },
                {
                  key: "17",
                  srNo: 17,
                  title: "Insulation Class",
                  data: data?.insulation_class,
                },
                {
                  key: "18",
                  srNo: 18,
                  title: "IP",
                  data: data?.ip,
                },
                {
                  key: "19",
                  srNo: 19,
                  title: "Ex-Proof Type",
                  data: data?.ex_proof_type,
                },
                {
                  key: "20",
                  srNo: 20,
                  title: "Ex-Proof Cert",
                  data: data?.ex_proof_cert,
                },
                {
                  key: "21",
                  srNo: 21,
                  title: "DE Bearing",
                  data: data?.de_bearing,
                },
                {
                  key: "22",
                  srNo: 22,
                  title: "NDE Bearing",
                  data: data?.nde_bearing,
                },
                {
                  key: "23",
                  srNo: 23,
                  title: "Colour",
                  data: data?.color,
                },
              ])
            }}
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
            <label>Completed Unit</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.completed_unit}
              onChange={(e) => handleRadio2Chnge("completed_unit", e)}
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
            <label>Stator</label>
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
            <label>Rotor</label>
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
            <label>Coupling</label>
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
            <label>Pulley</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.pulley}
              onChange={(e) => handleRadio2Chnge("pulley", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="impeller"
              onChange={onRadioChange}
              value={initialModalForm?.impeller}
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
            <label>Impeller</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.impeller}
              onChange={(e) => handleRadio2Chnge("impeller", e)}
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
            <label>T-Box</label>
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
            <label>T-Box Cover</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.t_box_cover}
              onChange={(e) => handleRadio2Chnge("t_box_cover", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="power_cable"
              onChange={onRadioChange}
              value={initialModalForm?.power_cable}
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
            <label>Power Cable</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.power_cable}
              onChange={(e) => handleRadio2Chnge("power_cable", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="terminal_board"
              onChange={onRadioChange}
              value={initialModalForm?.terminal_board}
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
            <label>Terminal Board</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.terminal_board}
              onChange={(e) => handleRadio2Chnge("terminal_board", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="connector"
              onChange={onRadioChange}
              value={initialModalForm?.connector}
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
            <label>Connector</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.connector}
              onChange={(e) => handleRadio2Chnge("connector", e)}
            />
          </div>

          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="cooling_fan_cover"
              onChange={onRadioChange}
              value={initialModalForm?.cooling_fan_cover}
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
            <label>Cooling Fan Cover</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.cooling_fan_cover}
              onChange={(e) => handleRadio2Chnge("cooling_fan_cover", e)}
            />
          </div>

          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="cooling_fan"
              onChange={onRadioChange}
              value={initialModalForm?.cooling_fan}
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
            <label>Cooling Fan</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.cooling_fan}
              onChange={(e) => handleRadio2Chnge("cooling_fan", e)}
            />
          </div>


          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="blower"
              onChange={onRadioChange}
              value={initialModalForm?.blower}
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
            <label>Blower</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.blower}
              onChange={(e) => handleRadio2Chnge("blower", e)}
            />
          </div>

          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="pump"
              onChange={onRadioChange}
              value={initialModalForm?.pump}
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
            <label>Pump</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.pump}
              onChange={(e) => handleRadio2Chnge("pump", e)}
            />
          </div>

          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="brake"
              onChange={onRadioChange}
              value={initialModalForm?.brake}
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
            <label>Brake</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.brake}
              onChange={(e) => handleRadio2Chnge("brake", e)}
            />
          </div>

          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="gear_box"
              onChange={onRadioChange}
              value={initialModalForm?.gear_box}
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
            <label>Gear Box</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.gear_box}
              onChange={(e) => handleRadio2Chnge("gear_box", e)}
            />
          </div>

          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="de_seal"
              onChange={onRadioChange}
              value={initialModalForm?.de_seal}
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
            <label>DE Seal</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.de_seal}
              onChange={(e) => handleRadio2Chnge("de_seal", e)}
            />
          </div>
          
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="nde_seal"
              onChange={onRadioChange}
              value={initialModalForm?.nde_seal}
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
            <label>NDE Seal</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.nde_seal}
              onChange={(e) => handleRadio2Chnge("nde_seal", e)}
            />
          </div>

          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="nde_washer"
              onChange={onRadioChange}
              value={initialModalForm?.nde_washer}
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
            <label>NDE Washer</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.nde_washer}
              onChange={(e) => handleRadio2Chnge("nde_washer", e)}
            />
          </div>

          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="de_washer"
              onChange={onRadioChange}
              value={initialModalForm?.de_washer}
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
            <label>DE Washer</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.de_washer}
              onChange={(e) => handleRadio2Chnge("de_washer", e)}
            />
          </div>

          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="de_circlip"
              onChange={onRadioChange}
              value={initialModalForm?.de_circlip}
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
            <label>DE Circlip</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.de_circlip}
              onChange={(e) => handleRadio2Chnge("de_circlip", e)}
            />
          </div>

          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="nde_circlip"
              onChange={onRadioChange}
              value={initialModalForm?.nde_circlip}
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
            <label>NDE Circlip</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.nde_circlip}
              onChange={(e) => handleRadio2Chnge("nde_circlip", e)}
            />
          </div>

          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="others"
              onChange={onRadioChange}
              value={initialModalForm?.others}
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
            <label>Others</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.others}
              onChange={(e) => handleRadio2Chnge("others", e)}
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
              // console.log(initialModalFormdata, initialModalForm);
              setInitialeditModal(false);
              setInitialConditionAndPhysicalInspection({
                completedUnit:{
                  value: initialModalFormdata?.completed_unit,
                  check: initialModalForm?.completed_unit
                },
                stator:{
                  value: initialModalFormdata?.stator,
                  check: initialModalForm?.stator
                },
                rotor:{
                  value: initialModalFormdata?.rotor,
                  check: initialModalForm?.rotor
                },
                coupling:{
                  value: initialModalFormdata?.coupling,
                  check: initialModalForm?.coupling
                },
                pulley:{
                  value: initialModalFormdata?.pulley,
                  check: initialModalForm?.pulley
                },
                impeller:{
                  value: initialModalFormdata?.impeller,
                  check: initialModalForm?.impeller
                },
                t_box:{
                  value: initialModalFormdata?.t_box,
                  check: initialModalForm?.t_box
                },
                t_box_cover:{
                  value: initialModalFormdata?.t_box_cover,
                  check: initialModalForm?.t_box_cover
                } ,
                power_cable:{
                  value: initialModalFormdata?.power_cable,
                  check: initialModalForm?.power_cable
                },
                terminal_board:{
                  value: initialModalFormdata?.terminal_board,
                  check: initialModalForm?.terminal_board
                },
                connector:{
                  value: initialModalFormdata?.connector,
                  check: initialModalForm?.connector
                },
                cooling_fan_cover:{
                  value: initialModalFormdata?.cooling_fan_cover,
                  check: initialModalForm?.cooling_fan_cover 
                },
                cooling_fan:{
                  value: initialModalFormdata?.cooling_fan,
                  check: initialModalForm?.cooling_fan
                },
                blower:{
                  value: initialModalFormdata?.blower,
                  check: initialModalForm?.blower
                },
                pump:{
                  value: initialModalFormdata?.pump,
                  check: initialModalForm?.pump
                },
                brake:{
                  value: initialModalFormdata?.brake,
                  check: initialModalForm?.brake
                },
                gear_box:{
                  value: initialModalFormdata?.gear_box,
                  check: initialModalForm?.gear_box
                },
                de_seal:{
                  value: initialModalFormdata?.de_seal,
                  check: initialModalForm?.de_seal
                },
                nde_seal:{
                  value: initialModalFormdata?.nde_seal,
                  check: initialModalForm?.nde_seal
                },
                nde_washer:{
                  value: initialModalFormdata?.nde_washer,
                  check: initialModalForm?.nde_washer
                },
                de_washer:{
                  value: initialModalFormdata?.de_washer,
                  check: initialModalForm?.de_washer
                },
                de_circlip:{
                  value: initialModalFormdata?.de_circlip,
                  check: initialModalForm?.de_circlip
                },
                nde_circlip:{
                  value: initialModalFormdata?.nde_circlip,
                  check: initialModalForm?.nde_circlip
                },
                others:{
                  value: initialModalFormdata?.others,
                  check: initialModalForm?.others
                }
                
              })


            }}
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
        visible={freeLoadTestModal}
        onCancel={() => setFreeLoadTestModal(false)}
        footer={false}
        width={1000}
      >
        <div className="">
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="stator_volt"
              onChange={onRadioChange}
              value={initialModalForm?.stator_volt}
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
            <label>Stator Volt</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.stator_volt}
              onChange={(e) => handleRadio2Chnge("stator_volt", e)}
            />
          </div>      
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="frequency"
              onChange={onRadioChange}
              value={initialModalForm?.frequency}
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
            <label>Frequency</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.frequency}
              onChange={(e) => handleRadio2Chnge("frequency", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="current_l1"
              onChange={onRadioChange}
              value={initialModalForm?.current_l1}
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
            <label>Currrent L1</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.current_l1}
              onChange={(e) => handleRadio2Chnge("current_l1", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="current_l2"
              onChange={onRadioChange}
              value={initialModalForm?.current_l2}
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
            <label>Currrent L2</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.current_l2}
              onChange={(e) => handleRadio2Chnge("current_l2", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="current_l3"
              onChange={onRadioChange}
              value={initialModalForm?.current_l3}
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
            <label>Currrent L3</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.current_l3}
              onChange={(e) => handleRadio2Chnge("current_l3", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="connection"
              onChange={onRadioChange}
              value={initialModalForm?.connection}
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
            <label>Connection</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.connection}
              onChange={(e) => handleRadio2Chnge("connection", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="speed"
              onChange={onRadioChange}
              value={initialModalForm?.speed}
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
            <label>Speed</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.speed}
              onChange={(e) => handleRadio2Chnge("speed", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="rotation"
              onChange={onRadioChange}
              value={initialModalForm?.rotation}
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
            <label>Rotation</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.rotation}
              onChange={(e) => handleRadio2Chnge("rotation", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="de_temp"
              onChange={onRadioChange}
              value={initialModalForm?.de_temp}
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
            <label>DE Temp</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.de_temp}
              onChange={(e) => handleRadio2Chnge("de_temp", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="nde_temp"
              onChange={onRadioChange}
              value={initialModalForm?.nde_temp}
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
            <label>NDE Temp</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.nde_temp}
              onChange={(e) => handleRadio2Chnge("nde_temp", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="position"
              onChange={onRadioChange}
              value={initialModalForm?.position}
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
            <label>Position</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.position}
              onChange={(e) => handleRadio2Chnge("position", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="time"
              onChange={onRadioChange}
              value={initialModalForm?.time}
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
            <label>Time</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.time}
              onChange={(e) => handleRadio2Chnge("time", e)}
            />
          </div>


        </div>
        <div className="d-flex justify-content-end mt-5">
          <Button key="cancel" onClick={() => setFreeLoadTestModal(false)}>
            Cancel
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => {
              // console.log(initialModalFormdata, initialModalForm);
              setFreeLoadTestModal(false);
              setFreeLoadData({
                  ...freeLoadData,
                  stator_volt:{
                    check: initialModalForm?.stator_volt,
                    value:  initialModalFormdata?.stator_volt
                  },
                  frequency:{
                    check: initialModalForm?.frequency,
                    value: initialModalFormdata?.frequency
                  },
                  current_l1:{
                    check: initialModalForm?.current_l1,
                    value: initialModalFormdata?.current_l1 
                  },
                  current_l2:{
                    check: initialModalForm?.current_l2,
                    value: initialModalFormdata?.current_l2
                  },
                  current_l3:{
                    check: initialModalForm?.current_l3,
                    value: initialModalFormdata?.current_l3 
                  },
                  connection:{
                    check: initialModalForm?.connection,
                    value: initialModalFormdata?.connection
                  },
                  speed:{
                    check: initialModalForm?.speed,
                    value: initialModalFormdata?.speed
                  },
                  rotation:{
                    check: initialModalForm?.rotation,
                    value: initialModalFormdata?.rotation
                  },
                  de_temp:{
                    check: initialModalForm?.de_temp,
                    value: initialModalFormdata?.de_temp
                  },
                  nde_temp:{
                    check: initialModalForm?.nde_temp,
                    value: initialModalFormdata?.nde_temp
                  },
                  position:{
                    check: initialModalForm?.position,
                    value: initialModalFormdata?.position
                  },
                  time:{
                    check: initialModalForm?.time,
                    value: initialModalFormdata?.time
                  },
           
                
                
              })
            }}
          >
            Save
          </Button>
        </div>
      </Modal>

      {/* Vibration test edit modal */}
      {vibrationTestModal && <EditVibrationTests vibrationTestModal={vibrationTestModal} setVibrationTestModal={setVibrationTestModal}
      onRadioChange={onRadioChange} handleRadio2Chnge={handleRadio2Chnge} initialModalForm={initialModalForm} 
      initialModalFormdata={initialModalFormdata} setVibrationData={setVibrationData} vibrationData={vibrationData}
      setInitialModalFormdata={setInitialModalFormdata}
      />}

      <Modal
        title={
          <div className="d-flex align-items-center">
            <ImagesIcon /> <span className="d-block ml-2"> Upload Photos - Machine Data</span>
          </div>
        }
        visible={machineUploadModal}
        onCancel={() => setMachineUploadModal(false)}
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
              onChange={handleFileSelect}
            />
          </div>}

          <div className="mt-4">
            {false && selectedFiles.length > 0 && (
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
          <Button key="cancel" onClick={() => setMachineUploadModal(false)}>
            Cancel
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => {
              if(!selectedImageTemp) {
                message.error("Please select an image to save");
                return
              }
              SaveUploadedImageData('Machine-Data');
              setMachineUploadModal(false);
              // console.log(selectedFiles);
              // const images = [];

              // for (let i = 0; i < selectedFiles.length; i++) {
              //   const file = selectedFiles[i];
              //   const reader = new FileReader();

              //   reader.onload = (e) => {
              //     images.push(e.target.result);
              //     if (images.length === selectedFiles.length) {
              //       setSelectedImages(images);
              //     }
              //   };

              //   reader.readAsDataURL(file);
              // }
            }}
          >
            Save
          </Button>
        </div>
      </Modal>

      <Modal
        title={
          <div className="d-flex align-items-center">
            <ImagesIcon /> <span className="d-block ml-2"> Upload Photos - Initial Conditions & Physical Inspection</span>
          </div>
        }
        visible={initialConditionUploaModal}
        onCancel={() => {
          resetImageData();
          setInitialConditionUploaModal(false)
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
              onChange={handleFileSelect1}
            />
          </div>}

          <div className="mt-4">
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
            setInitialConditionUploaModal(false);
          }}>
            Cancel
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => {
              if(!selectedImageTemp) {
                message.error("Please select an image to save");
                return
              }
              SaveUploadedImageData('Initial-Condition');
              setInitialConditionUploaModal(false);
            }}
          >
            Save
          </Button>
        </div>
      </Modal>
      
      <Modal
        title={
          <div className="d-flex align-items-center">
            <ImagesIcon /> <span className="d-block ml-2"> Upload Photos - Free Load Test</span>
          </div>
        }
        visible={initialcondUploaModal}
        onCancel={() => {
          resetImageData();
          setInitialcondUploaModal(false)
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
              onChange={handleFileSelect2}
            />
          </div>}

          <div className="mt-4">
            {false && selectedImages2.length > 0 && (
              <ul className="p-0" style={{ width: "40%" }}>
                {selectedImages2.map((file, i) => (
                  <li key={file.name} className="my-3" style={styles.files}>
                    {" "}
                    <div className="d-flex align-items-center">
                      <UploadFileIcon />{" "}
                      <span className="ml-2">{file.name} </span>{" "}
                    </div>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => delUplFile2(i)}
                    >
                      {" "}
                      <CloseCircleOutlined />{" "}
                    </span>
                  </li>
                ))}
              </ul>
            )}

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
            setInitialcondUploaModal(false);
          }}>
            Cancel
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => {
              if(!selectedImageTemp) {
                message.error("Please select an image to save");
                return
              }
              SaveUploadedImageData('Free-Load');
              setInitialcondUploaModal(false);

              // const images = [];
              // for (let i = 0; i < selectedImages2.length; i++) {
              //   const file = selectedImages2[i];
              //   const reader = new FileReader();

              //   reader.onload = (e) => {
              //     images.push(e.target.result);
              //     if (images.length === selectedImages2.length) {
              //       setSelectedImages2(images);
              //     }
              //   };
              //   reader.readAsDataURL(file);
              // }
            }}
          >
            Save
          </Button>
        </div>
      </Modal>

      <Modal
        title={
          <div className="d-flex align-items-center">
            <ImagesIcon /> <span className="d-block ml-2"> Upload Photos - Vibration Tests</span>
          </div>
        }
        visible={initialcondVibrationUploaModal}
        onCancel={() => {
          resetImageData();
          setInitialcondVibrationUploaModal();
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
              onChange={handleFileSelectVibrationTest}
            />
          </div>}
          <div className="mt-0">
            {false && selectedImages3.length > 0 && (
              <ul className="p-0" style={{ width: "40%" }}>
                {selectedImages3.map((file, i) => (
                  <li key={file.name} className="my-3" style={styles.files}>
                    {" "}
                    <div className="d-flex align-items-center">
                      <UploadFileIcon />{" "}
                      <span className="ml-2">{file.name} </span>{" "}
                    </div>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => delUplFile3(i)}
                    >
                      {" "}
                      <CloseCircleOutlined />{" "}
                    </span>
                  </li>
                ))}
              </ul>
            )}

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
            setInitialcondVibrationUploaModal(false);
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
              SaveUploadedImageData('Vibration-Test');
              setInitialcondVibrationUploaModal(false);

              // const images = [];
              // for (let i = 0; i < selectedImages3.length; i++) {
              //   const file = selectedImages3[i];
              //   const reader = new FileReader();

              //   reader.onload = (e) => {
              //     images.push(e.target.result);
              //     if (images.length === selectedImages3.length) {
              //       setSelectedImages3(images);
              //     }
              //   };

              //   reader.readAsDataURL(file);
              // }
            }}
          >
            Save
          </Button>
        </div>
      </Modal>

      {uploadModal && <UploadPhotos setUploadModal={setUploadModal} 
        uploadModal={uploadModal} setSelectedImageTemp={setSelectedImageTemp} 
        selectedImageTemp={selectedImageTemp} setImageMarkings={setImageMarkings} 
        imageMarkings={imageMarkings} setEditImageId={setEditImageId} 
        uploadImageType={uploadImageType} SaveUploadedImageData={SaveUploadedImageData}
        layerTemp={layerTemp} setLayerTemp={setLayerTemp}
        stage={stage} layer={layer}
        />}

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
                  // onChange={(data) => console.log(data)}
                  className="mb-3"
                >
                  <Panel
                    header={
                      <>
                        General Process
                        {/* <Button className="bg-primary text-white customEditButton">
                          <EditOutlined /> Edit
                        </Button> */}
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
                          <Input value={
                            generalProcess?.onsite_inspection?.operator
                          }

                            onChange={(e) => {
                              setGeneralProcess({
                                ...generalProcess,
                                onsite_inspection: {
                                  ...generalProcess.onsite_inspection,
                                  operator: e.target.value,
                                },
                              });
                            }}
                            placeholder="Operator" />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                            value={
                              generalProcess?.onsite_inspection?.start_date
                            }

                            onChange={(e) => {
                              setGeneralProcess({
                                ...generalProcess,
                                onsite_inspection: {
                                  ...generalProcess.onsite_inspection,
                                  start_date: e,
                                },
                              });
                            }}

                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                            value={
                              generalProcess?.onsite_inspection?.completion_date
                            }

                            onChange={(e) => {
                              setGeneralProcess({
                                ...generalProcess,
                                onsite_inspection: {
                                  ...generalProcess.onsite_inspection,
                                  completion_date: e,
                                },
                              });
                            }}

                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("onsite_inspection");
                              setFuncState2("general_process");
                              setRemarks(generalProcess?.onsite_inspection?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator"
                            value={
                              generalProcess?.onsite_dismantling?.operator
                            }

                            onChange={(e) => {
                              setGeneralProcess({
                                ...generalProcess,
                                onsite_dismantling: {
                                  ...generalProcess.onsite_dismantling,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                            value={
                              generalProcess?.onsite_dismantling?.start_date
                            }

                            onChange={(e) => {
                              setGeneralProcess({
                                ...generalProcess,
                                onsite_dismantling: {
                                  ...generalProcess.onsite_dismantling,
                                  start_date: e,
                                },
                              });
                            }}
                          
                          // onChange={(date) => console.log(date)}
                           />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={
                              generalProcess?.onsite_dismantling?.completion_date
                            }

                            onChange={(e) => {
                              setGeneralProcess({
                                ...generalProcess,
                                onsite_dismantling: {
                                  ...generalProcess.onsite_dismantling,
                                  completion_date: e,
                                },
                              });
                            }}
                          
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("onsite_dismantling");
                              setFuncState2("general_process");
                              setRemarks(generalProcess?.onsite_dismantling?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator"
                              value={generalProcess?.ws_receiving_inspection?.operator}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_receiving_inspection: {
                                    ...generalProcess.ws_receiving_inspection,
                                    operator: e.target.value,
                                  },
                                });
                              }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                              value={generalProcess?.ws_receiving_inspection?.start_date}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_receiving_inspection: {
                                    ...generalProcess.ws_receiving_inspection,
                                    start_date: e,
                                  },
                                });
                              }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                              value={generalProcess?.ws_receiving_inspection?.completion_date}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_receiving_inspection: {
                                    ...generalProcess.ws_receiving_inspection,
                                    completion_date: e,
                                  },
                                });
                              }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_receiving_inspection");
                              setFuncState2("general_process");
                              setRemarks(generalProcess?.ws_receiving_inspection?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator" 
                              value={generalProcess?.ws_electrical_test?.operator}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_electrical_test: {
                                    ...generalProcess.ws_electrical_test,
                                    operator: e.target.value,
                                  },
                                });
                              }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                              value={generalProcess?.ws_electrical_test?.start_date}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_electrical_test: {
                                    ...generalProcess.ws_electrical_test,
                                    start_date: e,
                                  },
                                });
                              }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                              value={generalProcess?.ws_electrical_test?.completion_date}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_electrical_test: {
                                    ...generalProcess.ws_electrical_test,
                                    completion_date: e,
                                  },
                                });
                              }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_electrical_test");
                              setFuncState2("general_process");
                              setRemarks(generalProcess?.ws_electrical_test?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator" 
                              value={generalProcess?.ws_disassemble_motor?.operator}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_disassemble_motor: {
                                    ...generalProcess.ws_disassemble_motor,
                                    operator: e.target.value,
                                  },
                                });
                              }}

                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                              value={generalProcess?.ws_disassemble_motor?.start_date}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_disassemble_motor: {
                                    ...generalProcess.ws_disassemble_motor,
                                    start_date: e,
                                  },
                                });
                              }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker value={generalProcess?.ws_disassemble_motor?.completion_date}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_disassemble_motor: {
                                    ...generalProcess.ws_disassemble_motor,
                                    completion_date: e,
                                  },
                                });
                              }}
                          
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_disassemble_motor");
                              setFuncState2("general_process");
                              setRemarks(generalProcess?.ws_disassemble_motor?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator"
                              value={generalProcess?.ws_mechanical_checks?.operator}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_mechanical_checks: {
                                    ...generalProcess.ws_mechanical_checks,
                                    operator: e.target.value,
                                  },
                                });
                              }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                              value={generalProcess?.ws_mechanical_checks?.start_date}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_mechanical_checks: {
                                    ...generalProcess.ws_mechanical_checks,
                                    start_date: e,
                                  },
                                });
                              }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                              value={generalProcess?.ws_mechanical_checks?.completion_date}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_mechanical_checks: {
                                    ...generalProcess.ws_mechanical_checks,
                                    completion_date: e,
                                  },
                                });
                              }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_mechanical_checks");
                              setFuncState2("general_process");
                              setRemarks(generalProcess?.ws_mechanical_checks?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator"
                              value={generalProcess?.ws_clean_parts?.operator}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_clean_parts: {
                                    ...generalProcess.ws_clean_parts,
                                    operator: e.target.value,
                                  },
                                });
                              }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                              value={generalProcess?.ws_clean_parts?.start_date}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_clean_parts: {
                                    ...generalProcess.ws_clean_parts,
                                    start_date: e,
                                  },
                                });
                              }}
                          
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                              value={generalProcess?.ws_clean_parts?.completion_date}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_clean_parts: {
                                    ...generalProcess.ws_clean_parts,
                                    completion_date: e,
                                  },
                                });
                              }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_clean_parts");
                              setFuncState2("general_process");
                              setRemarks(generalProcess?.ws_clean_parts?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator"
                              value={generalProcess?.ws_bake_stator_in_oven?.operator}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_bake_stator_in_oven: {
                                    ...generalProcess.ws_bake_stator_in_oven,
                                    operator: e.target.value,
                                  },
                                });
                              }} 
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                              value={generalProcess?.ws_bake_stator_in_oven?.start_date}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_bake_stator_in_oven: {
                                    ...generalProcess.ws_bake_stator_in_oven,
                                    start_date: e,
                                  },
                                });
                              }}     

                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                              value={generalProcess?.ws_bake_stator_in_oven?.completion_date}
                              onChange={(e) => {
                                setGeneralProcess({
                                  ...generalProcess,
                                  ws_bake_stator_in_oven: {
                                    ...generalProcess.ws_bake_stator_in_oven,
                                    completion_date: e,
                                  },
                                });
                              }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_bake_stator_in_oven");
                              setFuncState2("general_process");
                              setRemarks(generalProcess?.ws_bake_stator_in_oven?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator" 
                            value={generalProcess?.ws_varnish_and_bake?.operator}
                            onAbort={(e)=>{
                              setGeneralProcess({
                                ...generalProcess,
                                ws_varnish_and_bake: {
                                  ...generalProcess.ws_varnish_and_bake,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={generalProcess?.ws_varnish_and_bake?.start_date}
                            onChange={(e) => {
                              setGeneralProcess({
                                ...generalProcess,
                                ws_varnish_and_bake: {
                                  ...generalProcess.ws_varnish_and_bake,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={generalProcess?.ws_varnish_and_bake?.completion_date}
                            onChange={(e) => {
                              setGeneralProcess({
                                ...generalProcess,
                                ws_varnish_and_bake: {
                                  ...generalProcess.ws_varnish_and_bake,
                                  completion_date: e,
                                },
                              });
                            }}
                            
                          
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_varnish_and_bake");
                              setFuncState2("general_process");
                              setRemarks(generalProcess?.ws_varnish_and_bake?.remarks);
                            }}
                          >
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
                        {/* <Button className="bg-primary text-white customEditButton">
                          <EditOutlined /> Edit
                        </Button> */}
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
                          <Input placeholder="Operator"
                            value={rewinding?.ws_check_winding_dimension?.operator}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_check_winding_dimension: {
                                  ...rewinding.ws_check_winding_dimension,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={rewinding?.ws_check_winding_dimension?.start_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_check_winding_dimension: {
                                  ...rewinding.ws_check_winding_dimension,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={rewinding?.ws_check_winding_dimension?.completion_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_check_winding_dimension: {
                                  ...rewinding.ws_check_winding_dimension,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_check_winding_dimension");
                              setFuncState2("rewinding");
                              setRemarks(rewinding?.ws_check_winding_dimension?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator" 
                            value={rewinding?.ws_cut_winding?.operator}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_cut_winding: {
                                  ...rewinding.ws_cut_winding,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={rewinding?.ws_cut_winding?.start_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_cut_winding: {
                                  ...rewinding.ws_cut_winding,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={rewinding?.ws_cut_winding?.completion_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_cut_winding: {
                                  ...rewinding.ws_cut_winding,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_cut_winding");
                              setFuncState2("rewinding");
                              setRemarks(rewinding?.ws_cut_winding?.remarks);
                            }}
                          
                          >
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
                          <Input placeholder="Operator" 
                            value={rewinding?.ws_burn_out_in_heat_cleaning_oven?.operator}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_burn_out_in_heat_cleaning_oven: {
                                  ...rewinding.ws_burn_out_in_heat_cleaning_oven,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={rewinding?.ws_burn_out_in_heat_cleaning_oven?.start_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_burn_out_in_heat_cleaning_oven: {
                                  ...rewinding.ws_burn_out_in_heat_cleaning_oven,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={rewinding?.ws_burn_out_in_heat_cleaning_oven?.completion_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_burn_out_in_heat_cleaning_oven: {
                                  ...rewinding.ws_burn_out_in_heat_cleaning_oven,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_burn_out_in_heat_cleaning_oven");
                              setFuncState2("rewinding");
                              setRemarks(rewinding?.ws_burn_out_in_heat_cleaning_oven?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator" 
                            value={rewinding?.ws_lamination_core_test?.operator}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_lamination_core_test: {
                                  ...rewinding.ws_lamination_core_test,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={rewinding?.ws_lamination_core_test?.start_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_lamination_core_test: {
                                  ...rewinding.ws_lamination_core_test,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={rewinding?.ws_lamination_core_test?.completion_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_lamination_core_test: {
                                  ...rewinding.ws_lamination_core_test,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_lamination_core_test");
                              setFuncState2("rewinding");
                              setRemarks(rewinding?.ws_lamination_core_test?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator" 
                            value={rewinding?.ws_re_stack_lamination?.operator}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_re_stack_lamination: {
                                  ...rewinding.ws_re_stack_lamination,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={rewinding?.ws_re_stack_lamination?.start_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_re_stack_lamination: {
                                  ...rewinding.ws_re_stack_lamination,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                            value={rewinding?.ws_re_stack_lamination?.completion_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_re_stack_lamination: {
                                  ...rewinding.ws_re_stack_lamination,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_re_stack_lamination");
                              setFuncState2("rewinding");
                              setRemarks(rewinding?.ws_re_stack_lamination?.remarks);
                            }}
                            
                          >
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
                          <Input placeholder="Operator" 
                            value={rewinding?.ws_rewind_main_stator_brake_coil?.operator}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_rewind_main_stator_brake_coil: {
                                  ...rewinding.ws_rewind_main_stator_brake_coil,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={rewinding?.ws_rewind_main_stator_brake_coil?.start_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_rewind_main_stator_brake_coil: {
                                  ...rewinding.ws_rewind_main_stator_brake_coil,
                                  start_date: e,
                                },
                              });
                            }}
                          
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                            value={rewinding?.ws_rewind_main_stator_brake_coil?.completion_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_rewind_main_stator_brake_coil: {
                                  ...rewinding.ws_rewind_main_stator_brake_coil,
                                  completion_date: e,
                                },
                              });
                            }}
                          
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_rewind_main_stator_brake_coil");
                              setFuncState2("rewinding");
                              setRemarks(rewinding?.ws_rewind_main_stator_brake_coil?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator" 
                            value={rewinding?.ws_tig_soldering?.operator}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_tig_soldering: {
                                  ...rewinding.ws_tig_soldering,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={rewinding?.ws_tig_soldering?.start_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_tig_soldering: {
                                  ...rewinding.ws_tig_soldering,
                                  start_date: e,
                                },
                              });
                            }}
                           />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={rewinding?.ws_tig_soldering?.completion_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_tig_soldering: {
                                  ...rewinding.ws_tig_soldering,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_tig_soldering");
                              setFuncState2("rewinding");
                              setRemarks(rewinding?.ws_tig_soldering?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator" 
                            value={rewinding?.ws_in_progress_test_on_winding_before_varnish?.operator}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_in_progress_test_on_winding_before_varnish: {
                                  ...rewinding.ws_in_progress_test_on_winding_before_varnish,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={rewinding?.ws_in_progress_test_on_winding_before_varnish?.start_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_in_progress_test_on_winding_before_varnish: {
                                  ...rewinding.ws_in_progress_test_on_winding_before_varnish,
                                  start_date: e,
                                },
                              });
                            }}
                           />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={rewinding?.ws_in_progress_test_on_winding_before_varnish?.completion_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_in_progress_test_on_winding_before_varnish: {
                                  ...rewinding.ws_in_progress_test_on_winding_before_varnish,
                                  completion_date: e,
                                },
                              });
                            }}    
                                
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_in_progress_test_on_winding_before_varnish");
                              setFuncState2("rewinding");
                              setRemarks(rewinding?.ws_in_progress_test_on_winding_before_varnish?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator" 
                            value={rewinding?.ws_pre_heat_before_varnish?.operator}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_pre_heat_before_varnish: {
                                  ...rewinding.ws_pre_heat_before_varnish,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={rewinding?.ws_pre_heat_before_varnish?.start_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_pre_heat_before_varnish: {
                                  ...rewinding.ws_pre_heat_before_varnish,
                                  start_date: e,
                                },
                              });
                            }}

                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={rewinding?.ws_pre_heat_before_varnish?.completion_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_pre_heat_before_varnish: {
                                  ...rewinding.ws_pre_heat_before_varnish,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_pre_heat_before_varnish");
                              setFuncState2("rewinding");
                              setRemarks(rewinding?.ws_pre_heat_before_varnish?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator"
                            value={rewinding?.ws_varnish_and_bake_in_oven?.operator}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_varnish_and_bake_in_oven: {
                                  ...rewinding.ws_varnish_and_bake_in_oven,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={rewinding?.ws_varnish_and_bake_in_oven?.start_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_varnish_and_bake_in_oven: {
                                  ...rewinding.ws_varnish_and_bake_in_oven,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                            value={rewinding?.ws_varnish_and_bake_in_oven?.completion_date}
                            onChange={(e) => {
                              setRewinding({
                                ...rewinding,
                                ws_varnish_and_bake_in_oven: {
                                  ...rewinding.ws_varnish_and_bake_in_oven,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_varnish_and_bake_in_oven");
                              setFuncState2("rewinding");
                              setRemarks(rewinding?.ws_varnish_and_bake_in_oven?.remarks);
                            }}
                          >
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
                        {/* <Button className="bg-primary text-white customEditButton">
                          <EditOutlined /> Edit
                        </Button> */}
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
                          <Input placeholder="Operator"
                            value={assemblyAndFinalTest?.ws_dynamic_balancing_of_rotor?.operator}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_dynamic_balancing_of_rotor: {
                                  ...assemblyAndFinalTest.ws_dynamic_balancing_of_rotor,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                            value={assemblyAndFinalTest?.ws_dynamic_balancing_of_rotor?.start_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_dynamic_balancing_of_rotor: {
                                  ...assemblyAndFinalTest.ws_dynamic_balancing_of_rotor,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                            value={assemblyAndFinalTest?.ws_dynamic_balancing_of_rotor?.completion_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_dynamic_balancing_of_rotor: {
                                  ...assemblyAndFinalTest.ws_dynamic_balancing_of_rotor,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_dynamic_balancing_of_rotor");
                              setFuncState2("assembly_and_final_test");
                              setRemarks(assemblyAndFinalTest?.ws_dynamic_balancing_of_rotor?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator"
                            value={assemblyAndFinalTest?.ws_recondition_of_housing_journal?.operator}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_recondition_of_housing_journal: {
                                  ...assemblyAndFinalTest.ws_recondition_of_housing_journal,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={assemblyAndFinalTest?.ws_recondition_of_housing_journal?.start_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_recondition_of_housing_journal: {
                                  ...assemblyAndFinalTest.ws_recondition_of_housing_journal,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={assemblyAndFinalTest?.ws_recondition_of_housing_journal?.completion_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_recondition_of_housing_journal: {
                                  ...assemblyAndFinalTest.ws_recondition_of_housing_journal,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_recondition_of_housing_journal");
                              setFuncState2("assembly_and_final_test");
                              setRemarks(assemblyAndFinalTest?.ws_recondition_of_housing_journal?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator" 
                            value={assemblyAndFinalTest?.ws_electrical_test_before_assembly?.operator}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_electrical_test_before_assembly: {
                                  ...assemblyAndFinalTest.ws_electrical_test_before_assembly,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={assemblyAndFinalTest?.ws_electrical_test_before_assembly?.start_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_electrical_test_before_assembly: {
                                  ...assemblyAndFinalTest.ws_electrical_test_before_assembly,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                            value={assemblyAndFinalTest?.ws_electrical_test_before_assembly?.completion_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_electrical_test_before_assembly: {
                                  ...assemblyAndFinalTest.ws_electrical_test_before_assembly,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_electrical_test_before_assembly");
                              setFuncState2("assembly_and_final_test");
                              setRemarks(assemblyAndFinalTest?.ws_electrical_test_before_assembly?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator" 
                            value={assemblyAndFinalTest?.ws_mechanical_check_before_assembly?.operator}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_mechanical_check_before_assembly: {
                                  ...assemblyAndFinalTest.ws_mechanical_check_before_assembly,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={assemblyAndFinalTest?.ws_mechanical_check_before_assembly?.start_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_mechanical_check_before_assembly: {
                                  ...assemblyAndFinalTest.ws_mechanical_check_before_assembly,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={assemblyAndFinalTest?.ws_mechanical_check_before_assembly?.completion_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_mechanical_check_before_assembly: {
                                  ...assemblyAndFinalTest.ws_mechanical_check_before_assembly,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_mechanical_check_before_assembly");
                              setFuncState2("assembly_and_final_test");
                              setRemarks(assemblyAndFinalTest?.ws_mechanical_check_before_assembly?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator" 
                            value={assemblyAndFinalTest?.ws_re_assemble_bearings?.operator}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_re_assemble_bearings: {
                                  ...assemblyAndFinalTest.ws_re_assemble_bearings,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={assemblyAndFinalTest?.ws_re_assemble_bearings?.start_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_re_assemble_bearings: {
                                  ...assemblyAndFinalTest.ws_re_assemble_bearings,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={assemblyAndFinalTest?.ws_re_assemble_bearings?.completion_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_re_assemble_bearings: {
                                  ...assemblyAndFinalTest.ws_re_assemble_bearings,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_re_assemble_bearings");
                              setFuncState2("assembly_and_final_test");
                              setRemarks(assemblyAndFinalTest?.ws_re_assemble_bearings?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator" 
                            value={assemblyAndFinalTest?.ws_re_assemble_motor?.operator}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_re_assemble_motor: {
                                  ...assemblyAndFinalTest.ws_re_assemble_motor,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={assemblyAndFinalTest?.ws_re_assemble_motor?.start_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_re_assemble_motor: {
                                  ...assemblyAndFinalTest.ws_re_assemble_motor,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                            value={assemblyAndFinalTest?.ws_re_assemble_motor?.completion_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_re_assemble_motor: {
                                  ...assemblyAndFinalTest.ws_re_assemble_motor,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_re_assemble_motor");
                              setFuncState2("assembly_and_final_test");
                              setRemarks(assemblyAndFinalTest?.ws_re_assemble_motor?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator" 
                            value={assemblyAndFinalTest?.ws_re_assemble_seals?.operator}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_re_assemble_seals: {
                                  ...assemblyAndFinalTest.ws_re_assemble_seals,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={assemblyAndFinalTest?.ws_re_assemble_seals?.start_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_re_assemble_seals: {
                                  ...assemblyAndFinalTest.ws_re_assemble_seals,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                            value={assemblyAndFinalTest?.ws_re_assemble_seals?.completion_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_re_assemble_seals: {
                                  ...assemblyAndFinalTest.ws_re_assemble_seals,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_re_assemble_seals");
                              setFuncState2("assembly_and_final_test");
                              setRemarks(assemblyAndFinalTest?.ws_re_assemble_seals?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator" 
                            value={assemblyAndFinalTest?.ws_final_test_and_inspection_after_overhauling?.operator}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_final_test_and_inspection_after_overhauling: {
                                  ...assemblyAndFinalTest.ws_final_test_and_inspection_after_overhauling,
                                  operator: e.target.value,
                                },
                              });
                            }}
                            
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={assemblyAndFinalTest?.ws_final_test_and_inspection_after_overhauling?.start_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_final_test_and_inspection_after_overhauling: {
                                  ...assemblyAndFinalTest.ws_final_test_and_inspection_after_overhauling,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={assemblyAndFinalTest?.ws_final_test_and_inspection_after_overhauling?.completion_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_final_test_and_inspection_after_overhauling: {
                                  ...assemblyAndFinalTest.ws_final_test_and_inspection_after_overhauling,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_final_test_and_inspection_after_overhauling");
                              setFuncState2("assembly_and_final_test");
                              setRemarks(assemblyAndFinalTest?.ws_final_test_and_inspection_after_overhauling?.remarks);
                            }}
                          
                          >
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
                          <Input placeholder="Operator" 
                            value={assemblyAndFinalTest?.ws_painting?.operator}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_painting: {
                                  ...assemblyAndFinalTest.ws_painting,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={assemblyAndFinalTest?.ws_painting?.start_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_painting: {
                                  ...assemblyAndFinalTest.ws_painting,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                            value={assemblyAndFinalTest?.ws_painting?.completion_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_painting: {
                                  ...assemblyAndFinalTest.ws_painting,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3"
                          onClick={() => {
                            setRemarksModalForGeneralProcess(true);
                            setFuncState("ws_painting");
                            setFuncState2("assembly_and_final_test");
                            setRemarks(assemblyAndFinalTest?.ws_painting?.remarks);
                          }}
                        
                        >
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
                          <Input placeholder="Operator" 
                            value={assemblyAndFinalTest?.ws_packaging?.operator}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_packaging: {
                                  ...assemblyAndFinalTest.ws_packaging,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={assemblyAndFinalTest?.ws_packaging?.start_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_packaging: {
                                  ...assemblyAndFinalTest.ws_packaging,
                                  start_date: e,
                                },
                              });
                            }}
                          
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={assemblyAndFinalTest?.ws_packaging?.completion_date}
                            onChange={(e)=>{
                              setAssemblyAndFinalTest({
                                ...assemblyAndFinalTest,
                                ws_packaging: {
                                  ...assemblyAndFinalTest.ws_packaging,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("ws_packaging");
                              setFuncState2("assembly_and_final_test");
                              setRemarks(assemblyAndFinalTest?.ws_packaging?.remarks);
                            }}
                          >
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
                        {/* <Button className="bg-primary text-white customEditButton">
                          <EditOutlined /> Edit
                        </Button> */}
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
                          <Input placeholder="Operator" 
                            value={deliverToSite?.onsite_installation_and_alignment?.operator}
                            onChange={(e)=>{
                              setDeliverToSite({
                                ...deliverToSite,
                                onsite_installation_and_alignment: {
                                  ...deliverToSite.onsite_installation_and_alignment,
                                  operator: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={deliverToSite?.onsite_installation_and_alignment?.start_date}
                            onChange={(e)=>{
                              setDeliverToSite({
                                ...deliverToSite,
                                onsite_installation_and_alignment: {
                                  ...deliverToSite.onsite_installation_and_alignment,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={deliverToSite?.onsite_installation_and_alignment?.completion_date}
                            onChange={(e)=>{
                              setDeliverToSite({
                                ...deliverToSite,
                                onsite_installation_and_alignment: {
                                  ...deliverToSite.onsite_installation_and_alignment,
                                  completion_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("onsite_installation_and_alignment");
                              setFuncState2("deliver_to_site");
                              setRemarks(deliverToSite?.onsite_installation_and_alignment?.remarks);
                            }}
                          >
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
                          <Input placeholder="Operator" 
                            value={deliverToSite?.onsite_commissioning?.operator}
                            onChange={(e)=>{
                              setDeliverToSite({
                                ...deliverToSite,
                                onsite_commissioning: {
                                  ...deliverToSite.onsite_commissioning,
                                  operator: e.target.value,
                                },
                              });
                            }}

                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker
                            value={deliverToSite?.onsite_commissioning?.start_date}
                            onChange={(e)=>{
                              setDeliverToSite({
                                ...deliverToSite,
                                onsite_commissioning: {
                                  ...deliverToSite.onsite_commissioning,
                                  start_date: e,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="w-25 d-flex justify-content-start pl-3">
                          <DatePicker 
                            value={deliverToSite?.onsite_commissioning?.completion_date}
                            onChange={(e)=>{
                              setDeliverToSite({
                                ...deliverToSite,
                                onsite_commissioning: {
                                  ...deliverToSite.onsite_commissioning,
                                  completion_date: e,
                                },
                              });
                            }}  
                            />
                        </div>
                        <div className="w-25 d-flex justify-content-center pl-3">
                          <Button className="bg-primary text-white"
                            onClick={() => {
                              setRemarksModalForGeneralProcess(true);
                              setFuncState("onsite_commissioning");
                              setFuncState2("deliver_to_site");
                              setRemarks(deliverToSite?.onsite_commissioning?.remarks);
                            }}
                            
                          >
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
                    <Input placeholder="type here..."
                      value={otherProcessControl?.responsiblePerson}
                      onChange={(e) => {
                        setOtherProcessControl({
                          ...otherProcessControl,
                          responsiblePerson: e.target.value,
                        });
                      }}
                    
                    />
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div style={{ width: "25%" }}>
                    <h5>Date</h5>
                  </div>
                  <div style={{ width: "75%" }}>
                    <DatePicker className="w-100" 
                      value={
                        otherProcessControl?.date
                        
                      }
                      onChange={(e) => {
                        setOtherProcessControl({
                          ...otherProcessControl,
                          date: e,
                        });
                      }}
                    />
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
                <Button className="bg-primary text-white"
                  onClick={()=>{
                    setPartsRenewalModal(true);
                  }}
                >+</Button>
              </div>
              <div className="grey-table mt-3">
                <Table
                  className="border rounded"
                  columns={columns}
                  dataSource={partsRenewal}
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
                    {/* <HistoryOutlined /> Last updated an hour ago{" "} */}
                  </span>{" "}
                </h4>
                <Button
                  className="bg-primary text-white"
                  onClick={() => {
                    
                    setJobRefModal(true)
                    const data2 = {
                      quote_job_ref: jobReference[0].quote_job_ref,
                      po_ref:jobReference[0]?.po_ref,
                      customer:jobReference[0]?.customer,
                      sales:jobReference[0]?.sales
                    }

                    // setData({
                    //   quote_job_ref: "12321 ",
                    //   po_ref:"",
                    //   customer:"",
                    //   sales:""  
                    // })
                    handleRadioChnge("quote_job_ref", {
                      target: {
                        value: data2.quote_job_ref
                      }
                    })
                    handleRadioChnge("customer_po", {
                      target: {
                        value: data2.po_ref
                      }
                    })
                    handleRadioChnge("customer", {
                      target: {
                        value: data2.customer
                      }
                    })
                    handleRadioChnge("sales", {
                      target: {
                        value: data2.sales
                      }
                    }) 


                  }}
                >
                  {" "}
                  <EditOutlined /> Edit
                </Button>
              </div>
              <div className="grey-table mt-3">
                <Table
                  className="border rounded"
                  columns={columns1}
                  dataSource={jobReference}
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
                  onClick={() => {
                    setReceiveAndDeliver(true)
                    const data2 = {
                      dateReceived:  receiveAndDeliverData[0].dateReceived,
                      receivedBy: receiveAndDeliverData[0].receivedBy,
                      dateRequested:  receiveAndDeliverData[0].dateRequested,
                      dateDelivery: receiveAndDeliverData[0].dateDelivery,
                      deliveredBy:  receiveAndDeliverData[0].deliveredBy,
                      
                    }
                    handleRadio1Chnge("dateReceived", {
                      target: {
                        value: data2.dateReceived
                      }
                    })
                    handleRadio1Chnge("receivedBy", {
                      target: {
                        value: data2.receivedBy
                      }
                    })
                    handleRadio1Chnge("dateRequested", {
                      target: {
                        value: data2.dateRequested
                      }
                    })
                    handleRadio1Chnge("dateDelivery", {
                      target: {
                        value: data2.dateDelivery
                      }
                    })
                    handleRadio1Chnge("deliveredBy", {
                      target: {
                        value: data2.deliveredBy
                      }
                    })


                  }}
                >
                  {" "}
                  <EditOutlined /> Edit
                </Button>
              </div>
              <div className="grey-table mt-3">
                <Table
                  className="border rounded"
                  columns={columns3}
                  dataSource={receiveAndDeliverData}
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
                  <Button onClick={() => {
                    // setMachineUploadModal(true)
                    setUploadModal(true);
                    setUploadImageType('Machine-Data');
                    }}>
                    {" "}
                    Upload Photos
                  </Button>
                  <Button
                    className="bg-primary text-white ml-2"
                    onClick={() => {
                      setMachineDataModal(true)
                     
                      handleRadio1Chnge("equipment", {
                        target: {
                          value: machineData[0].data
                        }
                      })
                      

                      handleRadio1Chnge("tag_no",{
                        target: {
                          value: machineData[1].data
                        }
                      })

                      handleRadio1Chnge("manufacture",{
                        target: {
                          value: machineData[2].data
                        }
                      })

                      handleRadio1Chnge("serial_no",{
                        target: {
                          value: machineData[3].data
                        }
                      })

                      handleRadio1Chnge("model",{
                        target: {
                          value: machineData[4].data
                        }
                      })
                      handleRadio1Chnge("frame_size",{
                        target: {
                          value: machineData[5].data
                        }
                      })

                      handleRadio1Chnge("power",{
                        target: {
                          value: machineData[6].data.split("-")[0]
                        }
                      })
                      setMachineDataUnit((machineDataUnit) => ({
                        ...machineDataUnit,
                        power: machineData[6]?.data?.split("-")[1] || "", // Add null/undefined checks and a fallback value
                      }));

                      handleRadio1Chnge("voltage",{
                        target: {
                          value:  machineData[7].data.split("-")[0]
                        }
                      })
                      setMachineDataUnit((machineDataUnit) => ({
                        ...machineDataUnit,
                        voltage: machineData[7]?.data?.split("-")[1] || "", // Add null/undefined checks and a fallback value
                      }));

                      handleRadio1Chnge("current",{
                        target: {
                          value: machineData[8].data.split("-")[0]
                        }
                      })
                      setMachineDataUnit((machineDataUnit) => ({
                        ...machineDataUnit,
                        current: machineData[8]?.data?.split("-")[1] || "", // Add null/undefined checks and a fallback value
                      }));

                      handleRadio1Chnge("sec_voltage",{
                        target: {
                          value: machineData[9].data.split("-")[0]
                        }
                      })
                      setMachineDataUnit((machineDataUnit) => ({
                        ...machineDataUnit,
                        sec_voltage: machineData[9]?.data?.split("-")[1] || "", // Add null/undefined checks and a fallback value
                      }));

                      handleRadio1Chnge("sec_current",{
                        target: {
                          value: machineData[10].data.split("-")[0]
                        }
                      }) 

                      setMachineDataUnit((machineDataUnit) => ({
                        ...machineDataUnit,
                        sec_current: machineData[10]?.data?.split("-")[1] || "", // Add null/undefined checks and a fallback value
                      }))


                      handleRadio1Chnge("phase",{
                        target: {
                          value: machineData[11].data
                        }
                      })


                      handleRadio1Chnge("frequency",{
                        target: {
                          value: machineData[12].data.split("-")[0]
                        }
                      })

                      setMachineDataUnit((machineDataUnit) => ({
                        ...machineDataUnit,
                        frequency: machineData[12]?.data?.split("-")[1] || "", // Add null/undefined checks and a fallback value
                      }))
                      
                      handleRadio1Chnge("pole",{
                        target: {
                          value: machineData[13].data
                        }
                      })

                      handleRadio1Chnge("speed",{
                        target: {
                          value: machineData[14].data?.split("-")[0]
                        }
                      })

                      setMachineDataUnit((machineDataUnit) => ({
                        ...machineDataUnit,
                        speed: machineData[14]?.data?.split("-")[1] || "", // Add null/undefined checks and a fallback value 
                      }))

                      handleRadio1Chnge("power_factor",{
                        target: {
                          value: machineData[15].data
                        }
                      })

                      handleRadio1Chnge("insulation_class",{
                        target: {
                          value: machineData[16].data
                        }
                      })

                      handleRadio1Chnge("ip",{
                        target: {
                          value: machineData[17].data
                        }
                      })

                     handleRadio1Chnge("ex_proof_type",{
                        target: {
                          value: machineData[18].data
                        }
                     })

                     handleRadio1Chnge("ex_proof_cert",{
                        target: {
                          value: machineData[19].data
                        }
                     })

                      handleRadio1Chnge("de_bearing",{
                        target: {
                          value: machineData[20].data
                        }
                      })

                      handleRadio1Chnge("nde_bearing",{
                        target: {
                          value: machineData[21].data
                        }
                      })


                      handleRadio1Chnge("color",{
                        target: {
                          value: machineData[22].data
                        }
                      })

                    }}
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
                  dataSource={machineData}
                />
                <div className="mt-5">
                  <h5>Remarks</h5>
                  <TextArea
                    value={otherMachineData?.remarks}
                    onChange={(e) => {
                      setOtherMachineData({
                        ...otherMachineData,
                        remarks: e.target.value,
                      });
                    }}
                  rows={5} cols={16} placeholder="Type Here..." />
                </div>
                <div className="mt-5 d-flex justify-content-between">
                  <div className="d-flex justify-content-between w-50 align-items-center pr-4">
                    <h5 className="w-50">Checked By</h5>
                    <Input
                      value={otherMachineData?.checkedBy}
                      onChange={(e) => {
                        setOtherMachineData({
                          ...otherMachineData,
                          checkedBy: e.target.value,
                        });
                      }}
                    className="" placeholder="Add Operator Name" />
                  </div>
                  <div className="d-flex justify-content-between w-50 align-items-center pl-4">
                    <h5 className="mr-3">Date</h5>
                    <DatePicker
                      value={otherMachineData?.date}
                      format={'DD-MM-YYYY'}
                      onChange={(e) => {
                        setOtherMachineData({
                          ...otherMachineData,
                          date: e,
                        });
                      }}
                    className="w-50" />
                  </div>
                </div>
                <div className="mt-5">
                  <h5>Uploaded Photos</h5>
                  <div className="dashed-border p-2">
                    {false && selectedImages.map((image, index) => (
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
                    {selectedImages.map((image, index) => (
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
                                          // setMachineUploadModal(true);
                                          setUploadModal(true);
                                          setUploadImageType('Machine-Data');
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
                                          delUplFile(index)
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
                                  </div>))
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
                  <Button onClick={() => {
                      // setInitialConditionUploaModal(true);
                      setUploadModal(true);
                      setUploadImageType('Initial-Condition');
                    }}>
                    {" "}
                    Upload Photos
                  </Button>
                  <Button
                    className="bg-primary text-white ml-2"
                    onClick={() =>{
                      setInitialeditModal(true)
                        setInitialModalFormdata((prev)=>{
                          return {
                            ...prev,
                            completed_unit: initialConditionsAndPhysicalInspection.completedUnit.value,
                            stator: initialConditionsAndPhysicalInspection.stator.value,
                            rotor: initialConditionsAndPhysicalInspection.rotor.value,
                            coupling: initialConditionsAndPhysicalInspection.coupling.value,
                            pulley: initialConditionsAndPhysicalInspection.pulley.value,
                            impeller: initialConditionsAndPhysicalInspection.impeller.value, 
                            t_box: initialConditionsAndPhysicalInspection.t_box.value,
                            t_box_cover: initialConditionsAndPhysicalInspection.t_box_cover.value,
                            power_cable: initialConditionsAndPhysicalInspection.power_cable.value,
                            terminal_board: initialConditionsAndPhysicalInspection.terminal_board.value,
                            connector: initialConditionsAndPhysicalInspection.connector.value,
                            cooling_fan_cover: initialConditionsAndPhysicalInspection.cooling_fan_cover.value,
                            cooling_fan: initialConditionsAndPhysicalInspection.cooling_fan.value,
                            blower: initialConditionsAndPhysicalInspection.blower.value,
                            pump: initialConditionsAndPhysicalInspection.pump.value,  
                            brake: initialConditionsAndPhysicalInspection.brake.value,  
                            gear_box: initialConditionsAndPhysicalInspection.gear_box.value,  
                            de_seal: initialConditionsAndPhysicalInspection.de_seal.value,  
                            nde_seal: initialConditionsAndPhysicalInspection.nde_seal.value,  
                            nde_washer: initialConditionsAndPhysicalInspection.nde_washer.value,  
                            de_washer: initialConditionsAndPhysicalInspection.de_washer.value,  
                            nde_circlip: initialConditionsAndPhysicalInspection.nde_circlip.value,  
                            de_circlip: initialConditionsAndPhysicalInspection.de_circlip.value,  
                            others: initialConditionsAndPhysicalInspection.others.value,
                          }
                        })

                        setInitialModalForm((prev)=>{
                          return {
                            ...prev,
                            completed_unit: initialConditionsAndPhysicalInspection.completedUnit.check,
                            stator: initialConditionsAndPhysicalInspection.stator.check,
                            rotor: initialConditionsAndPhysicalInspection.rotor.check,
                            coupling: initialConditionsAndPhysicalInspection.coupling.check,
                            pulley: initialConditionsAndPhysicalInspection.pulley.check,
                            impeller: initialConditionsAndPhysicalInspection.impeller.check,
                            t_box: initialConditionsAndPhysicalInspection.t_box.check,
                            t_box_cover: initialConditionsAndPhysicalInspection.t_box_cover.check,
                            power_cable: initialConditionsAndPhysicalInspection.power_cable.check,
                            terminal_board: initialConditionsAndPhysicalInspection.terminal_board.check,
                            connector: initialConditionsAndPhysicalInspection.connector.check,
                            cooling_fan_cover: initialConditionsAndPhysicalInspection.cooling_fan_cover.check,
                            cooling_fan: initialConditionsAndPhysicalInspection.cooling_fan.check,
                            blower: initialConditionsAndPhysicalInspection.blower.check,
                            pump: initialConditionsAndPhysicalInspection.pump.check,
                            brake: initialConditionsAndPhysicalInspection.brake.check,
                            gear_box: initialConditionsAndPhysicalInspection.gear_box.check,
                            de_seal: initialConditionsAndPhysicalInspection.de_seal.check,
                            nde_seal: initialConditionsAndPhysicalInspection.nde_seal.check,
                            nde_washer: initialConditionsAndPhysicalInspection.nde_washer.check,
                            de_washer: initialConditionsAndPhysicalInspection.de_washer.check,
                            nde_circlip: initialConditionsAndPhysicalInspection.nde_circlip.check,
                            de_circlip: initialConditionsAndPhysicalInspection.de_circlip.check,
                            others: initialConditionsAndPhysicalInspection.others.check,   
                          }
                        })

                    }}
                  >
                    {" "}
                    <EditOutlined /> Edit
                  </Button>
                </div>
              </div>
              <div className=" mt-4 mb-5">
                <div className="mb-4 d-flex justify-content-between">
                <Radio
                  style={{ width: "30%" }}
                  disabled
                  className={returnClass(initialConditionsAndPhysicalInspection?.completedUnit?.check)}
                  checked={initialConditionsAndPhysicalInspection?.completedUnit?.check}
                >
                  Completed Unit
                </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.completedUnit?.value}
                    // value={data?.completed_unit}
                    // onChange={(e) => handleRadio1Chnge("completed_unit", e)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.stator?.check)}
                    checked={initialConditionsAndPhysicalInspection?.stator?.check}
                  >
                    Stator
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.stator?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.rotor?.check)}
                    checked={initialConditionsAndPhysicalInspection?.rotor?.check}  
                  >
                    Rotor
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.rotor?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.coupling?.check)}
                    checked={initialConditionsAndPhysicalInspection?.coupling?.check} 
                  >
                    Coupling
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.coupling?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.pulley?.check)}
                    checked={initialConditionsAndPhysicalInspection?.pulley?.check} 
                  >
                    Pulley
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.pulley?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.impeller?.check)}
                    checked={initialConditionsAndPhysicalInspection?.impeller?.check} 
                  >
                    Impeller
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.impeller?.value} 
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.t_box?.check)} 
                    checked={initialConditionsAndPhysicalInspection?.t_box?.check} 
                  >
                    T-Box
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.t_box?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.t_box_cover?.check)} 
                    checked={initialConditionsAndPhysicalInspection?.t_box_cover?.check} 
                  >
                    T-Box Cover
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.t_box_cover?.value} 
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.power_cable?.check)}   
                    checked={initialConditionsAndPhysicalInspection?.power_cable?.check}
                  >
                    Power Cable
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.power_cable?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.terminal_board?.check)}
                    checked={initialConditionsAndPhysicalInspection?.terminal_board?.check}  
                  >
                    Terminal Board
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.terminal_board?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.connector?.check)} 
                    checked={initialConditionsAndPhysicalInspection?.connector?.check} 
                  >
                    Connector
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.connector?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.cooling_fan_cover?.check)}
                    checked={initialConditionsAndPhysicalInspection?.cooling_fan_cover?.check} 
                  >
                    Cooling Fan Cover
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.cooling_fan_cover?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.cooling_fan?.check)}
                    checked={initialConditionsAndPhysicalInspection?.cooling_fan?.check} 
                  >
                    Cooling Fan
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.cooling_fan?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.blower?.check)}
                    checked={initialConditionsAndPhysicalInspection?.blower?.check} 
                  >
                    Blower
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.blower?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.pump?.check)}
                    checked={initialConditionsAndPhysicalInspection?.pump?.check} 
                  >
                    Pump
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.pump?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.brake?.check)}
                    checked={initialConditionsAndPhysicalInspection?.brake?.check} 
                  >
                    Brake
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.brake?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.gear_box?.check)} 
                    checked={initialConditionsAndPhysicalInspection?.gear_box?.check} 
                  >
                    Gear Box
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.gear_box?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.de_seal?.check)}
                    checked={initialConditionsAndPhysicalInspection?.de_seal?.check}
                  >
                    DE Seal
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.de_seal?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.nde_seal?.check)}
                    checked={initialConditionsAndPhysicalInspection?.nde_seal?.check} 
                  >
                    NDE Seal
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.nde_seal?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.nde_washer?.check)}
                    checked={initialConditionsAndPhysicalInspection?.nde_washer?.check} 
                  >
                    NDE Washer
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.nde_washer?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.de_washer?.check)}
                    checked={initialConditionsAndPhysicalInspection?.de_washer?.check}   

                  >
                    DE Washer
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.de_washer?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.de_circlip?.check)}
                    checked={initialConditionsAndPhysicalInspection?.de_circlip?.check}
                  >
                    DE Circlip
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.de_circlip?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.nde_circlip?.check)}
                    checked={initialConditionsAndPhysicalInspection?.nde_circlip?.check}
                  >
                    NDE Circlip
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.nde_circlip?.value}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <Radio
                    style={{ width: "30%" }}
                    disabled
                    className={returnClass(initialConditionsAndPhysicalInspection?.others?.check)}
                    checked={initialConditionsAndPhysicalInspection?.others?.check}
                  >
                    Others
                  </Radio>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Type here..."
                    disabled
                    value={initialConditionsAndPhysicalInspection?.others?.value}
                  />
                </div>

                <div className="mt-5">
                  <h5>Remarks</h5>
                  <TextArea
                    value={otherInitialData?.remarks}
                    onChange={(e) => {
                      setOtherInitialData({
                        ...otherInitialData,
                        remarks: e.target.value,
                      });
                    }}
                  rows={5} cols={16} placeholder="Type Here..." />
                </div>
                <div className="mt-5 d-flex justify-content-between">
                  <div className="d-flex justify-content-between w-50 align-items-center pr-4">
                    <h5 className="w-50">Checked By</h5>
                    <Input
                      value={otherInitialData?.checkedBy}
                      onChange={(e) => {
                        setOtherInitialData({
                          ...otherInitialData,
                          checkedBy: e.target.value,
                        });
                      }}
                    className="" placeholder="Add Operator Name" />
                  </div>
                  <div className="d-flex justify-content-between w-50 align-items-center pl-4">
                    <h5 className="mr-3">Date</h5>
                    <DatePicker
                      value={otherInitialData?.date}
                      format={'DD-MM-YYYY'}
                      onChange={(e) => {
                        setOtherInitialData({
                          ...otherInitialData,
                          date: e,
                        });
                      }}
                    className="w-50" />
                  </div>
                </div>
                <div className="mt-5">
                  <h5>Uploaded Photos</h5>
                  <div className="dashed-border p-2">
                    {false && selectedImages1.map((image, index) => (
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
                    
                    {selectedImages1.map((image, index) => (
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
                                          // setInitialConditionUploaModal(true);
                                          setUploadModal(true);
                                          setUploadImageType('Initial-Condition');
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
                                          delUplFile1(index)
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
              <StatorWindingElectricalTests 
                setStatorWindingData={setStatorWindingData} 
                statorWindingData={statorWindingData}

                setUploadModal={setUploadModal}
                setUploadImageType={setUploadImageType}
                setSelectedImageTemp={setSelectedImageTemp}
                selectedImageTemp={selectedImageTemp}
                setImageMarkings={setImageMarkings}
                imageMarkings={imageMarkings}
                UploadImageMarkingKonva={UploadImageMarkingKonva}
                setEditImageId={setEditImageId}
                delSubUploadedPhoto={delSubUploadedPhoto}
              />
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
              <AuxiliariesChecks 
                auxiliariesChecksData={auxiliariesChecksData} 
                setAuxiliariesChecksData={setAuxiliariesChecksData}

                setUploadModal={setUploadModal}
                setUploadImageType={setUploadImageType}
                setSelectedImageTemp={setSelectedImageTemp}
                selectedImageTemp={selectedImageTemp}
                setImageMarkings={setImageMarkings}
                imageMarkings={imageMarkings}
                UploadImageMarkingKonva={UploadImageMarkingKonva}
                setEditImageId={setEditImageId}
                delSubUploadedPhoto={delSubUploadedPhoto}
              />
            </Panel>
          </Collapse>

          <FreeLoadTest 
            initialcondUploaModal={initialcondUploaModal} 
            setInitialcondUploaModal={setInitialcondUploaModal}
            setInitialeditModal={setFreeLoadTestModal} 
            freeLoadData={freeLoadData}
            initialModalFormdata={initialModalFormdata}
            setInitialModalFormdata={setInitialModalFormdata}
            initialModalForm={initialModalForm}
            setInitialModalForm={setInitialModalForm}                  
            setFreeLoadData={setFreeLoadData}
            returnClass={returnClass}
            selectedImages2={selectedImages2}

            setSelectedImageTemp={setSelectedImageTemp}
            setImageMarkings={setImageMarkings}
            UploadImageMarkingKonva={UploadImageMarkingKonva}
            setEditImageId={setEditImageId}
            delUplFile2={delUplFile2}
            setUploadModal={setUploadModal}
            setUploadImageType={setUploadImageType}
          />

          <Collapse className="mb-3">
            <Panel
              header={
                <>
                  <img src={ReportSerchIcon} alt="..." />
                  Vibration Tests
                </>
              }
              key="3"
            >
              <VibrationTests 
                initialcondVibrationUploaModal={initialcondVibrationUploaModal} 
                setInitialcondVibrationUploaModal={setInitialcondVibrationUploaModal}

                initialModalFormdata={initialModalFormdata}
                setInitialModalFormdata={setInitialModalFormdata}
                initialModalForm={initialModalForm}
                setInitialModalForm={setInitialModalForm}
                returnClass={returnClass}

                selectedImages3={selectedImages3}
                vibrationData={vibrationData}
                setInitialeditModal={setVibrationTestModal} 
                setVibrationData={setVibrationData}

                setSelectedImageTemp={setSelectedImageTemp}
                selectedImageTemp={selectedImageTemp}
                setImageMarkings={setImageMarkings}
                imageMarkings={imageMarkings}
                UploadImageMarkingKonva={UploadImageMarkingKonva}
                setEditImageId={setEditImageId}
                delUplFile3={delUplFile3}
                setUploadModal={setUploadModal}
                setUploadImageType={setUploadImageType}
              />
            </Panel>
          </Collapse>

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
              <MechanicalInspection 
                mechanicalInspectionData={mechanicalInspectionData} 
                setMechanicalInspectionData={setMechanicalInspectionData} 

                setUploadModal={setUploadModal}
                setUploadImageType={setUploadImageType}
                setSelectedImageTemp={setSelectedImageTemp}
                selectedImageTemp={selectedImageTemp}
                setImageMarkings={setImageMarkings}
                imageMarkings={imageMarkings}
                UploadImageMarkingKonva={UploadImageMarkingKonva}
                setEditImageId={setEditImageId}
                delSubUploadedPhoto={delSubUploadedPhoto}
              />
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
              <RotatorShaftRunout 
                rotatorShaftData={rotatorShaftData} 
                setRotatorShaftData={setRotatorShaftData} 

                setUploadModal={setUploadModal}
                setUploadImageType={setUploadImageType}
                setSelectedImageTemp={setSelectedImageTemp}
                selectedImageTemp={selectedImageTemp}
                setImageMarkings={setImageMarkings}
                imageMarkings={imageMarkings}
                UploadImageMarkingKonva={UploadImageMarkingKonva}
                setEditImageId={setEditImageId}
                delSubUploadedPhoto={delSubUploadedPhoto}
              />
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
              <FreeVolumeCheck 
                freeVolumeData={freeVolumeData} 
                setFreeVolumeData={setFreeVolumeData} 

                setUploadModal={setUploadModal}
                setUploadImageType={setUploadImageType}
                setSelectedImageTemp={setSelectedImageTemp}
                selectedImageTemp={selectedImageTemp}
                setImageMarkings={setImageMarkings}
                imageMarkings={imageMarkings}
                UploadImageMarkingKonva={UploadImageMarkingKonva}
                setEditImageId={setEditImageId}
                delSubUploadedPhoto={delSubUploadedPhoto}
              />
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
              <FlamePathDimension 
                flamePathData={flamePathData} 
                setFlamePathData={setFlamePathData}

                setUploadModal={setUploadModal}
                setUploadImageType={setUploadImageType}
                setSelectedImageTemp={setSelectedImageTemp}
                selectedImageTemp={selectedImageTemp}
                setImageMarkings={setImageMarkings}
                imageMarkings={imageMarkings}
                UploadImageMarkingKonva={UploadImageMarkingKonva}
                setEditImageId={setEditImageId}
                delSubUploadedPhoto={delSubUploadedPhoto}
              />
            </Panel>
          </Collapse>
          <Collapse className="mb-3">
            <Panel
              header={
                <>
                  <img src={ReportSerchIcon} alt="..." />
                  Miscellaneous Report Upload
                </>
              }
              key="3"
            >
              <MiscelleneousReport miscelleneousReportData={miscelleneousReportData} setMiscelleneousReportData={setMiscelleneousReportData} />
            </Panel>
          </Collapse>
        </Space>
      </div>

      <div
        style={{ gap: "10px" }}
        className="mt-3 d-flex justify-content-end"
      >
          <Button
              className="px-4 font-weight-semibold"
              htmlType="button"
              onClick={() => {history.goBack()}}
          >
              Back
          </Button>

          <Button
              className="px-4 font-weight-semibold text-white bg-primary"
              onClick={() => {onFinishHandler()}}
          >
              Save
          </Button>
      </div>
      <Modal title="Remarks" visible={remarksModalForGeneralProcess} onOk={
        () => {
          if(funcState2==='general_process'){
            setGeneralProcess({
              ...generalProcess,
              [funcState]: {
                ...generalProcess[funcState],
                remarks: remarks
              }
            })
          }else if(funcState2=='rewinding'){
            setRewinding({
              ...rewinding,
              [funcState]: {
                ...rewinding[funcState],
                remarks: remarks
              }
            })
          }else if(funcState2==="assembly_and_final_test"){
            setAssemblyAndFinalTest({
              ...assemblyAndFinalTest,
              [funcState]: {
                ...assemblyAndFinalTest[funcState],
                remarks: remarks
              }
            })
          }else if(funcState2 ==="deliver_to_site"){
            setDeliverToSite({
              ...deliverToSite,
              [funcState]: {
                ...deliverToSite[funcState],
                remarks: remarks
              }
            })
          }
          setRemarksModalForGeneralProcess(false)
          setFuncState("");
          setFuncState2("");
        }
      } onCancel={() => {
        setFuncState("");
        setFuncState2("");
        setRemarksModalForGeneralProcess(false)
      }}>
        <Form >
          <Form.Item label="Remarks" 
          // name={"remarks"}
            rules={[
              {
                required: true,
                message: "Please input your Remarks!",
              }
            ]}
          >
            <Input.TextArea
              value={remarks}
              onChange={(e) => {
                setRemarks(e.target.value)
              }}
              rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Parts Renewal List" visible={partsRenewalModal} 
      onOk={() => {
        form.submit();

        // setPartsRenewalModal(false)
      }}
      onCancel={() => {
        setPartsRenewalModal(false)
      }}>
        <Form
          name="basic"
          layout="vertical"       
          form={form}
          onFinish={onFinishParts}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Item" name={"item"}
            rules={[
              {
                required: true,
                message: "Please input your Item!",
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Spec" name={"spec"}
            rules={[
              {
                required: true,
                message: "Please input your Spec!",
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Quantity" name={"qty"}
            rules={[
              {
                required: true,
                message: "Please input your Quantity!",
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Remarks" name={"remarks"}
            rules={[
              {
                required: true,
                message: "Please input your Remarks!",
              }
            ]}
          >
            <Input />
          </Form.Item> 

        </Form>

        </Modal>


    </div>
  );
};

export default AddNewLifeCycleEvent;
