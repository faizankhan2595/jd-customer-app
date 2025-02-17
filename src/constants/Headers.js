export const AdminAccount = [
    { label: "Id", key: "id" },
    // { label: "Image", key: "image" },
    { label: "Name", key: "username" },
    { label: "Mobile Number", key: "contactNumber" },
    { label: "Email ID", key: "email" },
    { label: "Created On", key: "userSince" },
    { label: "Status", key: "status" },
]

export const CustomerAccountCSV = [
    { label: "Id", key: "id" },
    // { label: "Image", key: "profile_pic" },
    { label: "Customer Organization", key: "name" },
    { label: "Contact Number", key: "phone_no" },
    // { label: "Membership Type", key: "membershipType" },
    { label: "Email ID", key: "email" },
    { label: "Customer Since", key: "created_at" },
    { label: "Status", key: "status" },
]

export const FreeUserAccountCSV = [
    { label: "Id", key: "id" },
    // { label: "Image", key: "profile_pic" },
    { label: "User Name", key: "name" },
    { label: "Contact Number", key: "phone_no" },
    { label: "Email ID", key: "email" },
    { label: "Created On", key: "created_at" },
    { label: "Status", key: "status" },
]

export const WorkshopUserAccountCSV = [
    { label: "Id", key: "id" },
    // { label: "Image", key: "profile_pic" },
    { label: "Name", key: "name" },
    { label: "Mobile Number", key: "phone_no" },
    { label: "Workshop", key: "workshop" },
    { label: "Email ID", key: "email" },
    { label: "Created On", key: "created_at" },
    { label: "Status", key: "status" },
]



export const OrderManagementCSV = [
    { label: "Id", key: "id" },
    { label: "Name", key: "name" },
    { label: "Job Site", key: "jobSite" },
    { label: "Machine", key: "machine" },
    { label: "Faults", key: "faults" },
    { label: "Order Date", key: "orderDate" },
    { label: "Technician Assigned", key: "technicianAssigned" },
    { label: "Status", key: "status" },
]

export const MachineAndSensorCSV = [
    { label: "Id", key: "id" },
    { label: "Image", key: "image" },
    { label: "Customer", key: "name" },
    { label: "Jobsite", key: "Jobsite" },
    { label: "Machines", key: "machine_detail" },
    { label: "Active Since", key: "ActiveSince" },
    { label: "Machine Status", key: "machine_status" },
    { label: "Overall Status", key: "OverallStatus" },
]

export const SensorListCSV = [
    { label: "Id", key: "id" },
    // { label: "Image", key: "image" },
    { label: "Sensor ID", key: "sensor_id" },
    { label: "Sensor Type", key: "sensor_type" },
    { label: "Sensor Name", key: "sensor_name" },
    { label: "Location", key: "sensor_location" },
    { label: "Last Update On", key: "updated_at" },
    { label: "Status", key: "sensor_status" },
]


export const CustomerAdmin = [
    { label: "Id", key: "id" },
    { label: "Image", key: "image" },
    { label: "User Name", key: "name" },
    { label: "Phone Number", key: "phone_no" },
    { label: "Email ID", key: "email" },
    { label: "Created On", key: "created_at" },
    { label: "Status", key: "status" },
]

export const InquiryList = [
    { label: "Id", key: "id" },
    {label:"Inquiry Details",key:"inquiry_details"},
    {label:"Inquiry Type",key:"inquiry_type"},
    {label:"Inquiry Date",key:"inquiry_date"},
    {label:"Created On",key:"created_at"},
    {label:"Status",key:"status"}

]

export const OrderList = [
    { label: "Id", key: "id" },
    {label:"Job Site",key:"jobsite"},
    {label:"Machine",key:"machine"},
    {label:"Sensor Location",key:"sensor_location"},
    {label:"Order Date",key:"created_at"},
    {label:"Status",key:"status"}
]

export const TechnicianMangementCsv = [
    { label: "Id", key: "id" },
    {label:"Technician Name",key:"name"},
    {label:"Gender",key:"gender"},
    {label:"Mobile Number",key:"phone_no"},
    {label:"Email ID",key:"email"},
    {label:"Status",key:"status"}
]

export const JobsitesCsv = [
    { label: "Id", key: "id" },
    {label: "Jobsite Name", key:"name"},
    {label: "Area", key:"area"},
    {label: "Mobile Number", key:"phone_no"},
    {label: "Created On", key:"created_at"},
    {label: "Status", key:"status"}
]