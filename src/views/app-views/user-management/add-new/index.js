import { Button, Form, Input, Select, Modal, DatePicker, Upload, message, Radio, InputNumber } from "antd";
import { BasicDetail, LocationIcon, SuccessTickIcon, UploadDocument, UploadFileIcon } from "assets/svg/icon";

import React, { useContext } from "react";
import { useState } from "react";
import { Tabs } from "antd";
import { CloseCircleOutlined, EnvironmentOutlined, EyeOutlined, PlusOutlined, TeamOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
// import axios from "../../../../axios";
import moment from "moment";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from 'react-router-dom';
// import uploadImage from "middleware/uploadImage";
import { API_BASE_URL } from "constants/ApiConstant";
import { axiosInstance } from "App";
import { UploadFile, UploadImage } from "utils/Upload";
import CountrySelector from "utils/CountrySelector";
import PhoneCode from "utils/PhoneCode";
import usePostalCodeLookup from "hooks/usePostalCodeLookup";
import { CountryContext } from "CountryContext";
import { getAssignablePermissions, getParentPermissions } from "utils/permissionUtils";
import { Row, Col, Avatar, Typography, Card } from "antd";
import {
  Table,
  Tag,
  Space,
  Dropdown,
  Menu,
  Checkbox,
  Switch,
  Divider,
} from "antd";
import { canEditPermissions } from "utils/role";

const { Title, Text } = Typography;
export default function AddNewAdminAccount() {
    const { TabPane } = Tabs;
    const {id } = useParams();
    const history = useHistory();
    const [statu, setStatu] = useState("")
    const [mainStatus, setMainStatus] = useState('')
    const [mainId, setMainId] = useState(null)
    const [activeTab, setActiveTab] = useState("1");
    const [isChangeStudModalOpen, setIsChangeStudModalOpen] = useState(false);
    const [deactiveModalOpen, setIsDeactiveModalOpen] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const location = useLocation();
    const [countryCode, setCountryCode] = useState('+65')
    const queryParams = new URLSearchParams(location.search);
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState();
    // const id = queryParams.get('id')
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [alertModal, setAlertModal] = useState(false)
    const [country, setCountry] = useState([
        {
            country: "India",
        }
    ]);

    // Add can_access state management
    const [orderManagementCheck, setOrderManagementCheck] = useState([
        { label: 'View Orders', check: false },
        { label: 'Create New Orders', check: false },
        { label: 'Delete Orders', check: false }
    ]);

    const [InquirymanagementCheck, setInquirymanagementCheck] = useState([
        { label: 'View Inquiry', check: false },
        { label: 'Create New Inquiry', check: false }
    ]);

    const [jobSitesCheck, setJobSitesCheck] = useState([
        { label: 'View Jobsites', check: false },
        { label: 'Create New Jobsites', check: false },
        { label: 'Edit Jobsites', check: false },
        { label: 'Delete Jobsites', check: false }
    ]);

    const [machinesAndSensorsCheck, setMachinesAndSensorsCheck] = useState([
        { label: 'View Machines and Sensors', check: false },
        { label: 'Create New Machines and Sensors', check: false },
    ]);

    const [operationalAreasCheck, setOperationalAreasCheck] = useState([
        { label: 'View Operational Areas', check: false },
        { label: 'Create New Operational Areas', check: false },
        { label: 'Edit Operational Areas', check: false },
        { label: 'Delete Operational Areas', check: false }
    ]);

    const [userManagementCheck, setUserManagementCheck] = useState([
        { label: 'View Users', check: false },
        { label: 'Create New Users', check: false },
        { label: 'Edit Users', check: false },
        { label: 'Delete Users', check: false }
    ]);

    const [technicianManagementCheck, setTechnicianManagementCheck] = useState([
        { label: 'View Technicians', check: false },
        { label: 'Create New Technicians', check: false },
        { label: 'Edit Technicians', check: false },
        { label: 'Delete Technicians', check: false }
    ]);

    // Parent permissions for inheritance validation
    const [parentPermissions, setParentPermissions] = useState({});

    const [dataMobileAppPer, setDataMobileAppPer] = useState([
        { title: "Jobsites", key: "jobsites", check: false },
        { title: "Machines", key: "machines", check: false },
        { title: "Sensors", key: "sensors", check: false },
        { title: "Inquiries", key: "inquiries", check: false },
        { title: "Orders", key: "orders", check: false }
    ]);

    // Track if current user can edit Access tab for the target user
    const [canEditAccessTab, setCanEditAccessTab] = useState(true);

    // Track if free user is editing their own profile
    const [isFreeUserEditingOwnProfile, setIsFreeUserEditingOwnProfile] = useState(false);

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
    const [succesmodaltext, setSuccesmodaltext] = useState({
        title: "Staff Status Change Successfully!",
        text: "Staff status changed to terminated.",
    });

    function handleTabClick(key) {
        setActiveTab(key);
    }
    const successOk = () => {
        setSuccessModal(false);
    };
    const successCancel = () => {
        setSuccessModal(false);
    };

    const changeStudHandleOk = () => {
        setIsChangeStudModalOpen(false);
    };
    const DeactiveHandleOk = () => {
        setIsDeactiveModalOpen(false);
    };

    function handleBackClick() {
        // if (activeTab > 1 && activeTab <= 7) {
        //   let actnum = Number(activeTab) - 1;
        //   setActiveTab(actnum.toString());
        // }
        if (activeTab > 1) {
            let actnum = Number(activeTab) - 1;
            setActiveTab(actnum.toString());
            return;
        }
        history.goBack();
    }

    const handleNext = (active) => {
        if (active === "1") {
            form1.validateFields().then(() => {
                setActiveTab("2");
            }).catch(() => {
                // Stay on current tab if validation fails
            })
        } else if (active === "2") {
            form2.validateFields().then(() => {
                setActiveTab("3");
            }).catch(() => {
                // Stay on current tab if validation fails
            })
        } else if (active === "3") {
            // Check if user can edit Access tab, if not, save directly
            if (canEditAccessTab) {
                setActiveTab("4");
            } else {
                onFinish();
            }
        } else {
            onFinish();
        }
    }

    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    
    const { countryList } = useContext(CountryContext);
    const { lookupPostalCode, loading: postalLoading } = usePostalCodeLookup(form2, countryList);

    const handlePostalCodeChange = async (e) => {
        const postalCode = e.target.value;
        if (postalCode && postalCode.length === 6) {
            await lookupPostalCode(postalCode);
        }
    };

    // Fetch parent customer permissions for inheritance validation
    const fetchParentPermissions = async () => {
        try {
            const parentId = localStorage.getItem("parent_id");
            if (parentId && parentId !== "null") {
                const response = await axiosInstance.get(`/api/admin/customer-users/parent-permissions/${parentId}`);
                if (response.data?.item?.can_access) {
                    setParentPermissions(response.data.item.can_access);
                    console.log('Parent permissions loaded:', response.data.item.can_access);
                }
            } else {
                // For free users, get their own permissions as the limit
                const storedParentPermissions = getParentPermissions();
                setParentPermissions(storedParentPermissions);
            }
            
            // Initialize default permissions after parent permissions are loaded
            initializePermissionDefaults();
        } catch (error) {
            console.error('Error fetching parent permissions:', error);
            // If we can't fetch parent permissions, show all options (fallback)
            setParentPermissions({});
            initializePermissionDefaults();
        }
    };
    
    // Initialize permission defaults based on assignable permissions
    const initializePermissionDefaults = () => {
        const assignablePermissions = getAssignablePermissions();
        if (assignablePermissions?.web_app) {
            if (assignablePermissions.web_app.order_management) {
                setOrderManagementCheck(assignablePermissions.web_app.order_management);
            }
            if (assignablePermissions.web_app.inquiry_management) {
                setInquirymanagementCheck(assignablePermissions.web_app.inquiry_management);
            }
            if (assignablePermissions.web_app.job_sites) {
                setJobSitesCheck(assignablePermissions.web_app.job_sites);
            }
            if (assignablePermissions.web_app.machines_and_sensors) {
                setMachinesAndSensorsCheck(assignablePermissions.web_app.machines_and_sensors);
            }
            if (assignablePermissions.web_app.operational_areas) {
                setOperationalAreasCheck(assignablePermissions.web_app.operational_areas);
            }
            if (assignablePermissions.web_app.user_management) {
                setUserManagementCheck(assignablePermissions.web_app.user_management);
            }
            if (assignablePermissions.web_app.technician_management) {
                setTechnicianManagementCheck(assignablePermissions.web_app.technician_management);
            }
        }
        if (assignablePermissions?.mobile_app) {
            setDataMobileAppPer(assignablePermissions.mobile_app);
        }
    };

    // Check if a specific permission is allowed by parent
    const isPermissionAllowedByParent = (section, permissionLabel) => {
        // If no parent permissions loaded, allow all (for backwards compatibility)
        if (!parentPermissions?.web_app) return true;
        
        const parentSection = parentPermissions.web_app[section];
        if (!parentSection || !Array.isArray(parentSection)) return true;
        
        // Find the permission in parent's permissions
        const parentPermission = parentSection.find(perm => perm.label === permissionLabel);
        return parentPermission ? parentPermission.check : false;
    };

    // Render a permission checkbox only if allowed by parent
    const renderPermissionCheckbox = (element, index, section, setStateFunction) => {
        const isAllowed = isPermissionAllowedByParent(section, element.label);
        
        if (!isAllowed) {
            return null; // Don't render if parent doesn't have this permission
        }
        
        return (
            <Checkbox
                key={index}
                style={{ margin: '0' }}
                checked={element.check}
                onChange={(val) => setStateFunction((previous) => {
                    return previous.map((elm, i) => {
                        if (i === index) {
                            return {
                                ...elm,
                                check: val.target.checked,
                            }
                        } else {
                            return elm
                        }
                    })
                })}
            >
                {element.label}
            </Checkbox>
        );
    };

    // Select All/Deselect All Functions for Individual Cards
    const handleOrderManagementSelectAll = (selectAll) => {
        setOrderManagementCheck(prev => prev.map(item => ({ ...item, check: selectAll })));
    };

    const handleInquiryManagementSelectAll = (selectAll) => {
        setInquirymanagementCheck(prev => prev.map(item => ({ ...item, check: selectAll })));
    };

    const handleJobSitesSelectAll = (selectAll) => {
        setJobSitesCheck(prev => prev.map(item => ({ ...item, check: selectAll })));
    };

    const handleMachinesAndSensorsSelectAll = (selectAll) => {
        setMachinesAndSensorsCheck(prev => prev.map(item => ({ ...item, check: selectAll })));
    };

    const handleOperationalAreasSelectAll = (selectAll) => {
        setOperationalAreasCheck(prev => prev.map(item => ({ ...item, check: selectAll })));
    };

    const handleUserManagementSelectAll = (selectAll) => {
        setUserManagementCheck(prev => prev.map(item => ({ ...item, check: selectAll })));
    };

    const handleTechnicianManagementSelectAll = (selectAll) => {
        setTechnicianManagementCheck(prev => prev.map(item => ({ ...item, check: selectAll })));
    };

    const handleMobileAppSelectAll = (selectAll) => {
        setDataMobileAppPer(prev => prev.map(item => ({ ...item, check: selectAll })));
    };

    // Global Select All/Deselect All Functions
    const handleWebAppGlobalSelectAll = (selectAll) => {
        handleOrderManagementSelectAll(selectAll);
        handleInquiryManagementSelectAll(selectAll);
        handleJobSitesSelectAll(selectAll);
        handleMachinesAndSensorsSelectAll(selectAll);
        handleOperationalAreasSelectAll(selectAll);
        handleUserManagementSelectAll(selectAll);
        handleTechnicianManagementSelectAll(selectAll);
    };
    const onFinish = async (values) => {
        // Prepare can_access object
        const can_access = {
            web_app: {
                order_management: orderManagementCheck,
                inquiry_management: InquirymanagementCheck,
                job_sites: jobSitesCheck,
                machines_and_sensors: machinesAndSensorsCheck,
                operational_areas: operationalAreasCheck,
                user_management: userManagementCheck,
                technician_management: technicianManagementCheck
            },
            mobile_app: dataMobileAppPer
        };
        
        // Debug: Log the permissions being sent
        console.log('Permissions being sent:', JSON.stringify(can_access, null, 2));

        let profile_pic = imageUrl

        console.log(fileList);
        if(profile_pic?.includes('base64')){
            profile_pic = await UploadImage(fileList);
        }

        let file = [];

        const temp = selectedFiles.filter((item) => {
            return item.url === undefined;
        })

        const temp2 = selectedFiles.filter((item) => {
            return item.url !== undefined;
        })

        if (temp.length !== 0) {
            const uploadPromise = temp.map(async (item) => {
                if (item.url === undefined) {
                    const url = await UploadImage(item);
                    return url;
                } else {
                    return item.url;
                }
            })

            file = await Promise.all(uploadPromise);
            console.log(file);
        }

        file = [...file, ...temp2.map((item) => {
            return item.url
        })];

        if (id) {
            try {
                setLoading(true);
                const resp = await axiosInstance.post(`/api/admin/customer-users/${id}/update`, {
                    ...form1.getFieldsValue(),
                    ...form2.getFieldsValue(),
                    dob: form1.getFieldValue('dob').format('YYYY-MM-DD'),
                    parent_id:localStorage.getItem("parent_id"),
                    phone_code: countryCode,
                    profile_pic,
                    documents: file,
                    can_access: JSON.stringify(can_access)
                })
                setLoading(false);
                if(resp.data.message=="Invalid phone number format. Please provide a valid phone number."){
                    message.error("Invalid phone number format. Please provide a valid phone number.");
                    return;
                }
                else{
                    message.success("Admin Account Updated Successfully");
                    history.goBack();
                }
            } catch (error) {
                setLoading(false);
                const errorResponse = error?.response?.data?.data;
                if (errorResponse && errorResponse.error) {
                    const errorMessage = errorResponse.error[0];
                    message.warn(errorMessage);
                } else {
                    message.error("Something went wrong. Please try again.");
                }
            }
        } else {


            try {
                // handleOpenAlert()
                setLoading(true);
                
                // Debug: Log the complete payload being sent to API
                const payload = {
                    ...form1.getFieldsValue(),
                    ...form2.getFieldsValue(),
                    phone_code: countryCode,
                    parent_id:localStorage.getItem("parent_id"),
                    profile_pic,
                    dob: form1.getFieldValue('dob') ? form1.getFieldValue('dob').format('YYYY-MM-DD') : null,
                    documents: file,
                    can_access: JSON.stringify(can_access)
                };
                console.log('Complete API payload for CREATE USER:', payload);
                
                const resp = await axiosInstance.post(`/api/admin/customer-users/store`, payload);
                setLoading(false);
                if(resp.data.message=="Invalid phone number format. Please provide a valid phone number."){
                    message.error("Invalid phone number format. Please provide a valid phone number.");
                    return;
                }
                handleCloseAlert()
                message.success("Admin Account Created Successfully");
                setTimeout(() => {
                    history.goBack()
                }, 1000)

            } catch (error) {
                setLoading(false);
                const errorResponse = error?.response?.data?.data;

                if (errorResponse && errorResponse.error) {
                    const errorMessage = errorResponse.error[0];
                    message.warn(errorMessage);
                } else {
                    message.error("Something went wrong. Please try again.");
                }
            }
        }
    };

    const sendStatus = async (status) => {

    }

    // const onFinishFailed = (errorInfo) => {
    //   console.log("Failed:", errorInfo);
    // };
    const handleChange = (info) => {
        const file = info.fileList[0]?.originFileObj;
        let formData = new FormData();
        if (file) {
            formData.append("file", file);
            setFileList(file);
        }
        if (info?.fileList[0]) {
            getBase64(info.fileList[0].originFileObj, (url) => {
                setImageUrl(url);
            });
        }
    };

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
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



    const handleOpenAlert = () => {
        setAlertModal(true)
    }
    const handleCloseAlert = () => {
        setAlertModal(false)

    }

    // Fetch Country
    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await axiosInstance.get('/api/admin/country/list');
                setCountry(response.data.items);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCountry();
        fetchParentPermissions(); // Load parent permissions and initialize defaults
        
        if (id) {
            getData();
        }
    }, []);

    const getData = async () => {
        try {
            const response = await axiosInstance.post(`/api/admin/customer-users/${id}/show`);
            const data = response.data.item;
            setImageUrl(data.profile_pic)
            form1.setFieldsValue({
                name: data.name,
                email: data.email,
                phone_no: data.phone_no,
                nric_fin_number: data.nric_fin_number,
                dob: data.dob ? moment(data.dob) : null,
                gender: data.gender?.toString(),
                role_id: data.role_id
            })

            form2.setFieldsValue({
                postal_code: data.address?.postal_code,
                block_number: data.address?.block_number,
                street_number: data.address?.street_number,
                unit_number: data.address?.unit_number,
                level_number: data.address?.level_number,
                country: data.address?.country

            })
            setSelectedFiles(data?.documents.map((item, index) => {
                return {
                    url: item?.document_url,
                    name: `Document ${index + 1}`
                }
            }))
            setCountryCode(data.phone_code)
            
            // Load can_access permissions
            const can_access = data.can_access;
            if (can_access && Object.keys(can_access).length !== 0) {
                if (can_access?.web_app?.order_management) {
                    setOrderManagementCheck(can_access.web_app.order_management);
                }
                if (can_access?.web_app?.inquiry_management) {
                    setInquirymanagementCheck(can_access.web_app.inquiry_management);
                }
                if (can_access?.web_app?.job_sites) {
                    setJobSitesCheck(can_access.web_app.job_sites);
                }
                if (can_access?.web_app?.machines_and_sensors) {
                    setMachinesAndSensorsCheck(can_access.web_app.machines_and_sensors);
                }
                if (can_access?.web_app?.operational_areas) {
                    setOperationalAreasCheck(can_access.web_app.operational_areas);
                }
                if (can_access?.web_app?.user_management) {
                    setUserManagementCheck(can_access.web_app.user_management);
                }
                if (can_access?.web_app?.technician_management) {
                    setTechnicianManagementCheck(can_access.web_app.technician_management);
                }
                if (can_access?.mobile_app) {
                    setDataMobileAppPer(can_access.mobile_app);
                }
            }

            // Check if current user can edit Access tab for this role
            const currentUserRole = parseInt(localStorage.getItem("role"));
            setCanEditAccessTab(canEditPermissions(currentUserRole, data.role_id));

            // Check if free user is editing their own profile
            const currentUserId = localStorage.getItem("user_id");
            const isFreeUser = currentUserRole === 5;
            const isEditingOwnProfile = currentUserId && currentUserId === id?.toString();
            setIsFreeUserEditingOwnProfile(isFreeUser && isEditingOwnProfile);
        } catch (error) {
            // console.error(error);
            message.error(error.response.data.message);
        }
    }


    return (
        <div className="customTableBackground">
            <Modal
                visible={alertModal}
                onCancel={() => setAlertModal(false)}
                footer={false}
            >
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <SuccessTickIcon />
                    <h3>Operation Admin Created Successfully!</h3>
                    <h4 style={{ fontWeight: '300', width: '350px' }} className='text-center'>Username Jane cooper account created as operation admin successfully!</h4>
                </div>
                <div className='d-flex justify-content-center mt-3'>
                    <Button className='bg-primary text-white ml-2' onClick={handleCloseAlert}>
                        Close
                    </Button>
                </div>
            </Modal>
            <h4> <UserSwitchOutlined /><span style={{
                color: '#6a6a6a',
                fontWeight: '300'
            }}> User Management / User Accounts</span> / {
                    id ? "Edit User Account" : "Add New User Account"
            }</h4>

            <Tabs activeKey={activeTab} onTabClick={handleTabClick} >
                <TabPane
                    tab={
                        <div className="d-flex justify-content-center">
                            <BasicDetail /> <span className="ml-2">Basic Details</span>
                        </div>
                    }
                    key="1"
                >
                    <Form
                        layout="vertical"
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        form={form1}
                        name="control-hooks"
                    >
                        <div className="border rounded p-3 bg-white">
                            {" "}
                            <Form.Item name="profile_pic">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    maxCount={1}
                                    onChange={handleChange}
                                    accept='image/*'
                                >
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt="avatar"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />
                                    ) : (
                                        uploadButton
                                    )}
                                </Upload>
                            </Form.Item>
                            <div style={{ gap: "60px" }} className="d-flex ">
                                <div style={{ width: "45%" }}>
                                    <Form.Item
                                        name="name"
                                        label="Admin Name"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter Admin Name",
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div style={{ width: "45%" }}>

                                    {/* <Form.Item
                                        name="workshop_user_name"
                                        label="Workshop User name"
                                        rules={[
                                            { required: true, message: "Please enter full name" },
                                        ]}
                                    >
                                        <Input placeholder="Workshop User name" />
                                    </Form.Item> */}
                                </div>
                            </div>
                            <div style={{ gap: "60px" }} className="d-flex ">
                                <div style={{ width: "45%" }}>
                                    <Form.Item
                                        name="email"
                                        label="Email Id"
                                        rules={[
                                            { required: true, message: "Please enter Email Id" },
                                        ]}
                                    >
                                        <Input style={{ width: "100%" }} placeholder="Email Id" />
                                    </Form.Item>
                                </div>
                                <div style={{ width: "45%" }}>

                                    {/* <Form.Item
                                        name="workshop_user_name"
                                        label="Workshop User name"
                                        rules={[
                                            { required: true, message: "Please enter full name" },
                                        ]}
                                    >
                                        <Input placeholder="Workshop User name" />
                                    </Form.Item> */}
                                    <div></div>
                                    <Form.Item
                                        name="phone_no"
                                        label="Phone Number"
                                        rules={[
                                            { required: true, message: "Please enter Full Name" },
                                        ]}
                                    >
                                        <Input
                                            addonBefore={
                                                <PhoneCode value={countryCode} onChange={(e) => {
                                                    setCountryCode(e)
                                                }
                                                } />
                                            }
                                            style={{ width: "100%" }}
                                            placeholder="Phone number"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div style={{ gap: "60px" }} className="d-flex ">
                                {!isFreeUserEditingOwnProfile && (
                                <div style={{ width: "45%" }}>
                                    <Form.Item
                                        name="nric_fin_number"
                                        label="NRIC/FIN"
                                        rules={[
                                            { required: false, message: "Please enter NRIC/FIN" },
                                        ]}
                                    >
                                        <Input style={{ width: "100%" }} placeholder="NRIC/FIN" />
                                    </Form.Item>
                                </div>
                                )}
                                <div style={{ width: isFreeUserEditingOwnProfile ? "90%" : "45%" }}>
                                    <Form.Item
                                        name="dob"
                                        label="Date of Birth"
                                        rules={[{ required: true, message: "Please enter DOB" }]}
                                    >
                                        <DatePicker
                                            placeholder="Date of birth"
                                            style={{ width: "100%" }}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div style={{ gap: "60px" }} className="d-flex ">
                                <div style={{ width: isFreeUserEditingOwnProfile ? "90%" : "45%" }}>
                                    <Form.Item
                                        name="gender"
                                        label="Gender"
                                        rules={[
                                            { required: true, message: "Please select gender." },
                                        ]}
                                    >
                                        <Radio.Group>
                                            <Radio value={"1"}>Male</Radio>
                                            <Radio value={"2"}>Female</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                                {!isFreeUserEditingOwnProfile && (
                                <div style={{ width: "45%" }}>
                                    <Form.Item
                                        name="role_id"
                                        label="Role"
                                        rules={[
                                            { required: true, message: "Please select role." },
                                        ]}
                                    >
                                        <Radio.Group onChange={(e) => {
                                            const currentUserRole = parseInt(localStorage.getItem("role"));
                                            setCanEditAccessTab(canEditPermissions(currentUserRole, e.target.value));
                                        }}>
                                            <Radio value={7}>Admin</Radio>
                                            <Radio value={8}>Manager</Radio>
                                            <Radio value={9}>User</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                                )}
                            </div>

                        </div>
                    </Form>
                </TabPane>
                <TabPane
                    disabled={activeTab < "2"}
                    tab={
                        <div className="d-flex justify-content-center">
                            <LocationIcon /> <span className="ml-2">Address Details</span>
                        </div>
                    }
                    key="2"
                >
                    <Form
                        layout="vertical"
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        form={form2}
                        name="control-hooks"
                    >
                        <div className="border rounded p-3 bg-white">

                            <div style={{ gap: "60px" }} className="d-flex ">
                                <div style={{ width: "45%" }}>
                                    <Form.Item
                                        label={'Postal Code'}
                                        name="postal_code"
                                        rules={[{ required: true, message: 'Please enter the postal code!' },{
                                                      pattern: new RegExp(/^[0-9\b]+$/),
                                                      message: "Please enter valid postal code",
                                                    },
                                                    {
                                                        len: 6,
                                                        message: "Postal code must be exactly 6 digits",
                                                    }]}
                                    >
                                        <Input 
                                            placeholder="Postal Code" 
                                            style={{ width: '100%' }} 
                                            onChange={handlePostalCodeChange}
                                            loading={postalLoading}
                                            maxLength={6}
                                        />
                                    </Form.Item>
                                </div><div style={{ width: "45%" }}>
                                    <Form.Item
                                        label={'Block Number'}
                                        name="block_number"
                                        rules={[{ required: true, message: 'Please enter the block number!' }]}
                                    >
                                        <Input placeholder="Block Number" style={{ width: '100%' }} />
                                    </Form.Item>
                                </div>
                            </div>
                            <div style={{ gap: "60px" }} className="d-flex ">
                                <div style={{ width: "45%" }}>
                                    <Form.Item
                                        label={'Street Number'}
                                        name="street_number"
                                        rules={[{ required: true, message: 'Please enter the street number!' }]}
                                    >
                                        <Input placeholder="Street Number" style={{ width: '100%' }} />
                                    </Form.Item>
                                </div><div style={{ width: "45%" }}>
                                    <Form.Item
                                        label={'Unit Number'}
                                        name="unit_number"
                                        rules={[{ required: true, message: 'Please enter the unit number!' }, {
                                                        pattern: new RegExp(/^[0-9\b]+$/),
                                                        message: "Please enter valid unit number",
                                                      }]}
                                    >
                                        <Input placeholder='Unit Number' style={{ width: '100%' }} />
                                    </Form.Item>
                                </div>
                            </div>
                            <div style={{ gap: "60px" }} className="d-flex ">
                                <div style={{ width: "45%" }}>

                                    <Form.Item
                                        label={'Level Number'}
                                        name="level_number"
                                        rules={[{ required: true, message: 'Please enter the level number!' }]}
                                    >
                                        <Input placeholder="Level Number" style={{ width: '100%' }} />
                                    </Form.Item>
                                </div><div style={{ width: "45%" }}>
                                    <Form.Item
                                        label={'Country'}
                                        name="country"
                                        rules={[{ required: true, message: 'Please select a country!' }]}
                                    >
                                        <CountrySelector/>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </Form>
                </TabPane>
                <TabPane
                    disabled={activeTab < "3"}
                    tab={
                        <div className="d-flex justify-content-center">
                            <UploadDocument />{" "}
                            <span className="ml-2">Upload Documents</span>
                        </div>
                    }
                    key="3"
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
                                                {/* <span className="ml-5">
                                                    {file.url ? (<EyeOutlined style={{ cursor: "pointer" }} onClick={() => window.open(file.url)} />) : null}
                                                </span> */}
                                            </div>
                                            <div>
                        {
                          file.url && <span className="ml-3 " style={{
                            cursor: "pointer"
                          }} onClick={() => {
                            window.open(file.url, '_blank')
                          }}>
                            <EyeOutlined />
                          </span>
                        }
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => delUplFile(i)}
                        >
                          {" "}
                          <CloseCircleOutlined />{" "}
                        </span>
                      </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </TabPane>
                {canEditAccessTab && (
                <TabPane
                    disabled={activeTab < "4"}
                    tab={
                        <div className="d-flex justify-content-center">
                            <UploadDocument /> <span className="ml-2">Access</span>
                        </div>
                    }
                    key="4"
                >
                    <div className="border bg-white rounded p-3">
                        {/* Tabs for Web App and Mobile App */}
                        <Tabs defaultActiveKey="1">
                            {/* Web App Tab */}
                            <TabPane
                                tab={
                                    <div className="d-flex align-items-center justify-content-center" style={{ gap: '5px' }}>
                                        Web App
                                    </div>
                                }
                                key="1"
                            >
                                {/* Global Web App Select All Controls */}
                                <Row justify="end" style={{ marginBottom: '16px' }}>
                                    <Col>
                                        <Button.Group size="small">
                                            <Button onClick={() => handleWebAppGlobalSelectAll(true)}>Select All</Button>
                                            <Button onClick={() => handleWebAppGlobalSelectAll(false)}>Deselect All</Button>
                                        </Button.Group>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 24]}>
                                    {/* Order Management */}
                                    <Col span={6}>
                                        <div
                                            style={{
                                                border: "1px solid #d9d9d9",
                                                borderRadius: "8px",
                                                padding: "20px",
                                                minHeight: '300px'
                                            }}
                                        >
                                            <Row justify="space-between" align="middle">
                                                <Title level={5}>Order Management</Title>
                                            </Row>
                                            <Row justify="space-between" align="middle" style={{ marginBottom: '8px' }}>
                                                <Col>
                                                    <Button.Group size="small">
                                                        <Button onClick={() => handleOrderManagementSelectAll(true)}>All</Button>
                                                        <Button onClick={() => handleOrderManagementSelectAll(false)}>None</Button>
                                                    </Button.Group>
                                                </Col>
                                            </Row>
                                            <Divider />
                                            <div className="d-flex flex-column">
                                                {orderManagementCheck.map((element, index) => 
                                                    renderPermissionCheckbox(element, index, 'order_management', setOrderManagementCheck)
                                                )}
                                            </div>
                                        </div>
                                    </Col>

                                    {/* Inquiry Management */}
                                    <Col span={6}>
                                        <div
                                            style={{
                                                border: "1px solid #d9d9d9",
                                                borderRadius: "8px",
                                                padding: "20px",
                                                minHeight: '300px'
                                            }}
                                        >
                                            <Row justify="space-between" align="middle">
                                                <Title level={5}>Inquiry Management</Title>
                                            </Row>
                                            <Row justify="space-between" align="middle" style={{ marginBottom: '8px' }}>
                                                <Col>
                                                    <Button.Group size="small">
                                                        <Button onClick={() => handleInquiryManagementSelectAll(true)}>All</Button>
                                                        <Button onClick={() => handleInquiryManagementSelectAll(false)}>None</Button>
                                                    </Button.Group>
                                                </Col>
                                            </Row>
                                            <Divider />
                                            <div className="d-flex flex-column">
                                                {InquirymanagementCheck.map((element, index) => 
                                                    renderPermissionCheckbox(element, index, 'inquiry_management', setInquirymanagementCheck)
                                                )}
                                            </div>
                                        </div>
                                    </Col>

                                    {/* Job Sites */}
                                    <Col span={6}>
                                        <div
                                            style={{
                                                border: "1px solid #d9d9d9",
                                                borderRadius: "8px",
                                                padding: "20px",
                                                minHeight: '300px'
                                            }}
                                        >
                                            <Row justify="space-between" align="middle">
                                                <Title level={5}>Job Sites</Title>
                                            </Row>
                                            <Row justify="space-between" align="middle" style={{ marginBottom: '8px' }}>
                                                <Col>
                                                    <Button.Group size="small">
                                                        <Button onClick={() => handleJobSitesSelectAll(true)}>All</Button>
                                                        <Button onClick={() => handleJobSitesSelectAll(false)}>None</Button>
                                                    </Button.Group>
                                                </Col>
                                            </Row>
                                            <Divider />
                                            <div className="d-flex flex-column">
                                                {jobSitesCheck.map((element, index) => 
                                                    renderPermissionCheckbox(element, index, 'job_sites', setJobSitesCheck)
                                                )}
                                            </div>
                                        </div>
                                    </Col>

                                    {/* Machines and Sensors */}
                                    <Col span={6}>
                                        <div
                                            style={{
                                                border: "1px solid #d9d9d9",
                                                borderRadius: "8px",
                                                padding: "20px",
                                                minHeight: '300px'
                                            }}
                                        >
                                            <Row justify="space-between" align="middle">
                                                <Title level={5}>Machines and Sensors</Title>
                                            </Row>
                                            <Row justify="space-between" align="middle" style={{ marginBottom: '8px' }}>
                                                <Col>
                                                    <Button.Group size="small">
                                                        <Button onClick={() => handleMachinesAndSensorsSelectAll(true)}>All</Button>
                                                        <Button onClick={() => handleMachinesAndSensorsSelectAll(false)}>None</Button>
                                                    </Button.Group>
                                                </Col>
                                            </Row>
                                            <Divider />
                                            <div className="d-flex flex-column">
                                                {machinesAndSensorsCheck.map((element, index) => 
                                                    renderPermissionCheckbox(element, index, 'machines_and_sensors', setMachinesAndSensorsCheck)
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                {/* Second Row */}
                                <Row gutter={[16, 24]} style={{ marginTop: '24px' }}>
                                    {/* Operational Areas */}
                                    <Col span={6}>
                                        <div
                                            style={{
                                                border: "1px solid #d9d9d9",
                                                borderRadius: "8px",
                                                padding: "20px",
                                                minHeight: '300px'
                                            }}
                                        >
                                            <Row justify="space-between" align="middle">
                                                <Title level={5}>Operational Areas</Title>
                                            </Row>
                                            <Row justify="space-between" align="middle" style={{ marginBottom: '8px' }}>
                                                <Col>
                                                    <Button.Group size="small">
                                                        <Button onClick={() => handleOperationalAreasSelectAll(true)}>All</Button>
                                                        <Button onClick={() => handleOperationalAreasSelectAll(false)}>None</Button>
                                                    </Button.Group>
                                                </Col>
                                            </Row>
                                            <Divider />
                                            <div className="d-flex flex-column">
                                                {operationalAreasCheck.map((element, index) => 
                                                    renderPermissionCheckbox(element, index, 'operational_areas', setOperationalAreasCheck)
                                                )}
                                            </div>
                                        </div>
                                    </Col>

                                    {/* User Management */}
                                    <Col span={6}>
                                        <div
                                            style={{
                                                border: "1px solid #d9d9d9",
                                                borderRadius: "8px",
                                                padding: "20px",
                                                minHeight: '300px'
                                            }}
                                        >
                                            <Row justify="space-between" align="middle">
                                                <Title level={5}>User Management</Title>
                                            </Row>
                                            <Row justify="space-between" align="middle" style={{ marginBottom: '8px' }}>
                                                <Col>
                                                    <Button.Group size="small">
                                                        <Button onClick={() => handleUserManagementSelectAll(true)}>All</Button>
                                                        <Button onClick={() => handleUserManagementSelectAll(false)}>None</Button>
                                                    </Button.Group>
                                                </Col>
                                            </Row>
                                            <Divider />
                                            <div className="d-flex flex-column">
                                                {userManagementCheck.map((element, index) => 
                                                    renderPermissionCheckbox(element, index, 'user_management', setUserManagementCheck)
                                                )}
                                            </div>
                                        </div>
                                    </Col>

                                    {/* Technician Management */}
                                    <Col span={6}>
                                        <div
                                            style={{
                                                border: "1px solid #d9d9d9",
                                                borderRadius: "8px",
                                                padding: "20px",
                                                minHeight: '300px'
                                            }}
                                        >
                                            <Row justify="space-between" align="middle">
                                                <Title level={5}>Technician Management</Title>
                                            </Row>
                                            <Row justify="space-between" align="middle" style={{ marginBottom: '8px' }}>
                                                <Col>
                                                    <Button.Group size="small">
                                                        <Button onClick={() => handleTechnicianManagementSelectAll(true)}>All</Button>
                                                        <Button onClick={() => handleTechnicianManagementSelectAll(false)}>None</Button>
                                                    </Button.Group>
                                                </Col>
                                            </Row>
                                            <Divider />
                                            <div className="d-flex flex-column">
                                                {technicianManagementCheck.map((element, index) => 
                                                    renderPermissionCheckbox(element, index, 'technician_management', setTechnicianManagementCheck)
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>

                            {/* Mobile App Tab */}
                            <TabPane
                                tab={
                                    <div className="d-flex align-items-center justify-content-center" style={{ gap: '5px' }}>
                                        Mobile App
                                    </div>
                                }
                                key="2"
                            >
                                {/* Global Mobile App Select All Controls */}
                                <Row justify="end" style={{ marginBottom: '16px' }}>
                                    <Col>
                                        <Button.Group size="small">
                                            <Button onClick={() => handleMobileAppSelectAll(true)}>Select All</Button>
                                            <Button onClick={() => handleMobileAppSelectAll(false)}>Deselect All</Button>
                                        </Button.Group>
                                    </Col>
                                </Row>
                                <Row gutter={[24, 24]} style={{ padding: '20px' }}>
                                    {dataMobileAppPer.map((item) => (
                                        <Col xs={24} sm={12} key={item.key}>
                                            <Card>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <div>
                                                        {item.title}
                                                    </div>
                                                    <div>
                                                        <Switch
                                                            checked={item.check}
                                                            onChange={(checked) => {
                                                                setDataMobileAppPer((prev) => {
                                                                    return prev.map((elm) => {
                                                                        if (elm.key === item.key) {
                                                                            return {
                                                                                ...elm,
                                                                                check: checked
                                                                            }
                                                                        } else {
                                                                            return elm
                                                                        }
                                                                    })
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </TabPane>
                        </Tabs>
                    </div>
                </TabPane>
                )}
            </Tabs>
            <Form.Item>
                <div
                    style={{ gap: "10px" }}
                    className="mt-5 d-flex justify-content-end"
                >
                    <Button
                        className="px-4 font-weight-semibold"
                        htmlType="button"
                        onClick={handleBackClick}
                    >
                        Back
                    </Button>
                    {/* <Button className="px-4 font-weight-semibold" htmlType="button">
                            Save Draft
                        </Button> */}
                    <Button
                        className="px-4 bg-primary font-weight-semibold text-white bg-info"
                        htmlType="submit"
                        loading={loading}
                        onClick={() => {
                            handleNext(activeTab)
                        }}
                    >
                        {(activeTab === "4" && canEditAccessTab) || (activeTab === "3" && !canEditAccessTab) ? "Save" : "Next"}
                    </Button>
                </div>
            </Form.Item>

            <Modal
                width={600}
                footer={null}
                visible={deactiveModalOpen}
                onOk={DeactiveHandleOk}
                onCancel={() => setIsDeactiveModalOpen(false)}
            >
                <div className="d-flex my-3 flex-column w-75">
                    <h4 className="mb-4">Sure you want to deactivate staff?</h4>
                    <h5>Staff ID #TC-1234 will be deleted from system</h5>
                </div>
                <div
                    style={{ gap: "10px" }}
                    className="mt-5 d-flex justify-content-end"
                >
                    <Button
                        className="px-4 font-weight-semibold"
                        onClick={() => setIsDeactiveModalOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="px-4 font-weight-semibold text-white bg-info"
                        onClick={() => {
                            if (mainStatus === "Inactive") {
                                sendStatus("Active")
                            } else {
                                sendStatus("Inactive")
                            }
                            setIsDeactiveModalOpen(false);
                            setSuccesmodaltext({
                                title: "Staff Deactivated",
                                text: "Staff ID #TC-1234 deleted.",
                            });
                            setSuccessModal(true);
                        }}
                    >
                        Yes, confirm
                    </Button>
                </div>
            </Modal>
            <Modal
                width={600}
                footer={null}
                visible={isChangeStudModalOpen}
                onOk={changeStudHandleOk}
                onCancel={() => setIsChangeStudModalOpen(false)}
            >
                <div className="d-flex my-3 flex-column w-75">
                    <h4 className="mb-4">Change Employee Status</h4>
                    <h5>Working Status</h5>
                    <Select
                        placeholder="Select"
                        optionFilterProp="children"
                        value={statu}
                        onChange={(val) => setStatu(val)}
                        filterOption={(input, option) =>
                            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                            {
                                value: "Active",
                                label: "Active",
                            },
                            {
                                value: "Inactive",
                                label: "Inactive",
                            },
                            // {
                            //   value: "terminated",
                            //   label: "Terminated",
                            // },
                            // {
                            //   value: "Contract_end",
                            //   label: "Contract end",
                            // },
                        ]}
                    />
                </div>
                <div
                    style={{ gap: "10px" }}
                    className="mt-5 d-flex justify-content-end"
                >
                    <Button
                        className="px-4 font-weight-semibold"
                        onClick={() => setIsChangeStudModalOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="px-4 font-weight-semibold text-white bg-info"
                        onClick={() => {
                            if (statu === '') {
                                message.error(`Please select status first !`)
                                return
                            }
                            sendStatus(statu)
                        }}
                    >
                        Save
                    </Button>
                </div>
            </Modal>
            <Modal
                width={500}
                footer={null}
                visible={successModal}
                onOk={successOk}
                onCancel={successCancel}
            >
                <div className="d-flex my-3 align-items-center flex-column justify-content-center">
                    {/* <CustomIcon svg={Verified} /> */}
                    <svg
                        width="65"
                        height="64"
                        viewBox="0 0 65 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M32.5 0C37.4636 0 42.1609 1.13082 46.358 3.14781C44.64 4.50697 43.0471 5.81176 41.5629 7.06762C38.7358 6.04009 35.6859 5.48012 32.5054 5.48012C25.1823 5.48012 18.5496 8.44852 13.7545 13.2491C8.95396 18.0496 5.98556 24.6769 5.98556 32C5.98556 39.3231 8.95396 45.9504 13.7545 50.7509C18.555 55.5515 25.1823 58.5199 32.5054 58.5199C39.8286 58.5199 46.4613 55.5515 51.2564 50.7509C56.0569 45.9504 59.0253 39.3231 59.0253 32C59.0253 30.2603 58.8568 28.5532 58.536 26.9059C59.9115 25.1118 61.3196 23.3231 62.7603 21.5508C63.8911 24.8236 64.5054 28.3411 64.5054 32C64.5054 40.8345 60.9227 48.8372 55.1327 54.6273C49.3427 60.4173 41.34 64 32.5054 64C23.6709 64 15.6682 60.4173 9.87819 54.6273C4.08274 48.8372 0.5 40.8345 0.5 32C0.5 23.1655 4.08274 15.1628 9.87275 9.37275C15.6628 3.58274 23.6655 0 32.5 0ZM17.5928 26.7428L25.3998 26.6395L25.9815 26.7917C27.5581 27.6996 29.0423 28.738 30.4286 29.9123C31.429 30.7604 32.3858 31.6847 33.2938 32.685C36.0936 28.178 39.0783 24.0408 42.2316 20.2351C45.6838 16.0652 49.3481 12.2813 53.1973 8.82909L53.9584 8.53551H62.4776L60.7596 10.4438C55.4806 16.3099 50.691 22.3717 46.3634 28.6239C42.0359 34.8814 38.165 41.3401 34.7236 47.9891L33.6526 50.055L32.6685 47.9511C30.8527 44.053 28.6781 40.4757 26.0848 37.279C23.4915 34.0822 20.4742 31.2443 16.9567 28.8304L17.5928 26.7428Z"
                            fill="#00AB6F"
                        />
                    </svg>
                    <h3 className="font-weight-bold mt-4">{succesmodaltext.title}</h3>
                    <span className="text-center font-size-sm w-75 font-weight-semibold">
                        {succesmodaltext.text}
                    </span>
                </div>
            </Modal>
        </div>
    );
}
