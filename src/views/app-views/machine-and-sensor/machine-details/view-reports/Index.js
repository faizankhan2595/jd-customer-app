import React, {useState, useEffect} from "react";
import headerLogo from "assets/svg/Female09.png";
import signature from 'assets/svg/image 51.png';
import { axiosInstance } from "App";
import { useParams } from "react-router-dom";
import moment from "moment";

const tableData = [
  {
    srNo: 1,
    quoteJobRef: "Q123",
    poRef: "PO456",
    customer: "ABC Company",
    sales: "John Doe",
  },
  {
    srNo: 2,
    quoteJobRef: "Q124",
    poRef: "PO457",
    customer: "XYZ Inc.",
    sales: "Jane Smith",
  },
  {
    srNo: 3,
    quoteJobRef: "Q125",
    poRef: "PO458",
    customer: "123 Corp",
    sales: "Alex Brown",
  },
];
const tableData2 = [
    { srNo: 1, dateReceived: '2024-03-14', receivedBy: 'John Doe', dateRequested: '2024-03-10', dateDelivery: '2024-03-15', deliveredBy: 'Jane Smith' },
    { srNo: 2, dateReceived: '2024-03-15', receivedBy: 'Alex Brown', dateRequested: '2024-03-12', dateDelivery: '2024-03-17', deliveredBy: 'Michael Johnson' },
    { srNo: 3, dateReceived: '2024-03-16', receivedBy: 'Emily Wilson', dateRequested: '2024-03-14', dateDelivery: '2024-03-18', deliveredBy: 'Sarah Lee' }
  ];
const ViewReports = () => {
  const { id } = useParams();
  const [reportData, setReportData] = useState({});
  const [jobReference, setJobReference] = useState([
    {
      srNo: 1,
      quote_job_ref: "",
      po_ref: "",
      customer: "",
      sales: "",   
    }
  ])
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


  const fetchEventData = async (event_id) => {
      const response = await axiosInstance.get(`api/admin/life-cycle-event/${+event_id}/show`);
      let data = response.data.item;
      if(data) {
        setJobReference(data.job_reference)
        setReceiveAndDeliverData(data.receive_and_deliver_data)
        console.log(data.job_reference)
        console.log(data.receive_and_deliver_data)
      }
    }

  const fetchReportData = async () => {
    const response = await axiosInstance.get(`api/admin/reports/${id}/show`);
    let data = response.data.item;
    setReportData(data);
    if(data.life_cycle_event_id) fetchEventData(data.life_cycle_event_id);
  }

  useEffect(() => {
    fetchReportData();
  }, [])
  
  return (
    <div className="bg-white">
      <div>
        <h3
          className="bg-primary p-3 text-white d-flex justify-content-center align-items-center"
          style={{ gap: "8px" }}
        >
          {/* <img src={headerLogo} alt="./.." /> */}
          <img src={'/img/logo.svg'} alt="./.." />
        </h3>
      </div>
      <div className="p-3 mt-4">
        <div className="d-flex justify-content-between">
          <h5>
            Created By:{" "}
            {/* <span className="font-weight-300">
              John Smith (Operation Manager)
            </span> */}
            <span className="font-weight-300">
              {reportData.created_by_name || ''}
            </span>
          </h5>
          <h5>
            Date: <span className="font-weight-300">{moment(reportData.created_at).format("DD MMM YYYY, hh:mm A")}</span>
          </h5>
        </div>
        <div
          style={{
            borderTop: "0.5px solid #b2adad",
            width: "100%",
            margin: "auto",
          }}
        ></div>

        {reportData.enabled_fields && reportData.enabled_fields.includes('Job Reference') && <h5 className="mt-4">Job Reference </h5>}
        {reportData.enabled_fields && reportData.enabled_fields.includes('Job Reference') && <div
          style={{
            border: "1px solid rgb(233 233 233)",
            padding: "0px",
            width: "100%",
          }}
        >
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr
                style={{
                  backgroundColor: "#5badd5",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <th style={{ padding: "12px", border: "none" }}>
                  Sr No
                </th>
                <th style={{ padding: "12px", border: "none" }}>
                  Quote/Job Ref
                </th>
                <th style={{ padding: "12px", border: "none" }}>
                  PO Ref
                </th>
                <th style={{ padding: "12px", border: "none" }}>
                  Customer
                </th>
                <th style={{ padding: "12px", border: "none" }}>
                  Sales
                </th>
              </tr>
            </thead>
            <tbody>
              {jobReference.map((row, index) => (
                <tr key={index}>
                  <td style={{ padding: "8px", border: "none" }}>
                    {row.srNo}
                  </td>
                  <td style={{ padding: "8px", border: "none" }}>
                    {row.quote_job_ref}
                  </td>
                  <td style={{ padding: "8px", border: "none" }}>
                    {row.po_ref}
                  </td>
                  <td style={{ padding: "8px", border: "none" }}>
                    {row.customer}
                  </td>
                  <td style={{ padding: "8px", border: "none" }}>
                    {row.sales}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
        {reportData.enabled_fields && (reportData.enabled_fields.includes('Receiving & Delivery') || reportData.enabled_fields.includes('Recieving and Delivery'))
         && <h5 className="mt-4">Receiving & Delivery </h5>}
        {reportData.enabled_fields && (reportData.enabled_fields.includes('Receiving & Delivery') || reportData.enabled_fields.includes('Recieving and Delivery'))
         && <div
          style={{
            border: "1px solid rgb(233 233 233)",
            padding: "0px",
            width: "100%",
          }}
        >
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr
                style={{
                  backgroundColor: "#5badd5",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <th style={{ padding: "12px", border: "none" }}>
                  Sr No
                </th>
                <th style={{ padding: "12px", border: "none" }}>
                Date of Recieved
                </th>
                <th style={{ padding: "12px", border: "none" }}>
                Received By
                </th>
                <th style={{ padding: "12px", border: "none" }}>
                Date Requested
                </th>
                <th style={{ padding: "12px", border: "none" }}>
                Date Delivery 
                </th>
                <th style={{ padding: "12px", border: "none" }}>
                Delivered By 
                </th>
              </tr>
            </thead>
            <tbody>
            {receiveAndDeliverData.map((row, index) => (
            <tr key={index}>
              <td style={{ padding: "8px", border: "none" }}>{row.srNo}</td>
              <td style={{ padding: "8px", border: "none" }}>{row.dateReceived? 
              moment(row.dateReceived).format("DD-MM-YYYY"): ''  
            }</td>
              <td style={{ padding: "8px", border: "none" }}>{row.receivedBy}</td>
              <td style={{ padding: "8px", border: "none" }}>{row.dateRequested?
              moment(row.dateRequested).format("DD-MM-YYYY"): ''  
            }</td>
              <td style={{ padding: "8px", border: "none" }}>{row.dateDelivery?
              moment(row.dateDelivery).format("DD-MM-YYYY"): ''  
            }</td>
              <td style={{ padding: "8px", border: "none" }}>{row.deliveredBy}</td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>}
        <h4 className="mt-5 font-weight-400" style={{color:'#1a3353a6',fontSize:'15px'}}>
        {/* Date of Report: 11 Aug 2023, 10:00 Am */}
        Date of Report: {moment(reportData.created_at).format("DD MMM YYYY, hh:mm A")}
        </h4>
        <h5 className="mt-3"><sup>*</sup>Term & Conditions Apply</h5>
        {/* <p className="w-75" style={{color:'black'}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec id turpis malesuada nibh. Faucibus vitae, blandit aliquet scelerisque faucibus magna volutpat. Vitae aliquet maecenas purus sem. Egestas pellentesque varius elit quisque placerat integer elit sed senectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec id turpis malesuada nibh. Faucibus vitae, blandit aliquet scelerisque faucibus magna volutpat. Vitae aliquet maecenas purus sem. Egestas pellentesque varius elit quisque placerat integer elit sed senectus. 
        </p> */}
        <img className="mt-2" src={signature} alt="..." />
        <h3 className="mb-0">{reportData.created_by_name || ''}</h3>
        {/* <p style={{fontSize:'16px',fontWeight:'300'}} className="mb-0">Operation Manager, Acme Co</p> */}
        <p style={{fontSize:'16px',fontWeight:'300'}}>{moment(reportData.created_at).format("DD MMM YYYY, hh:mm A")}</p>
      </div>
    </div>
  );
};

export default ViewReports;
