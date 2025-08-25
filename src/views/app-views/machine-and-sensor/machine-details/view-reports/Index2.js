import React, { useEffect, useState } from 'react'
import Logo from "../../../../../assets/Logo (2).png";
import Company from "../../../../../assets/Group (2).png"
import ProjectDetail from './MainComponent';
import { axiosInstance } from 'App';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { PDFViewer } from '@react-pdf/renderer';
import MainComponent from './MainComponent';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { Loading3QuartersOutlined } from '@ant-design/icons';
function Index2() {
    const { id, token } = useParams();
    const [loading, setloading] = useState(true);
    const location = useLocation();
    const [reportData, setReportData] = useState({
        job_reference: [],
        receive_and_deliver_data: [],
        machine_data: {
            machineData: [],
            imagesData: []
        },
        parts_renewal: [],
        initial_conditions_and_physical_inspection: {
            initialConditionsAndPhysicalInspection: [],
            imagesData: []
        },
        vibration_test_data: {
            vibrationData: {},
            imagesData: []
        },



        stator_winding_data: [],
        auxiliaries_checks_data: [],
        mechanical_inspection_data: [],
        rotator_shaft_data: [],
        free_volume_data: [],
        flame_path_data: [],
    });
    const [machineData, setMachineData] = useState({});
    const fetchEventData = async (event_id) => {
        const response = await axiosInstance.get(`api/admin/life-cycle-event/${+event_id}/show`);
        let data = response.data.item;
        if (data) {
            setReportData(data);

            console.log(data)
        }
    }


    const fetchMachineData = async (machine_id) => {
        const response = await axiosInstance.get(`api/admin/machines/${+machine_id}`);
        let data = response.data.item;
        if (data) {
            setMachineData(data);
        }
    }

    const fetchReportData = async () => {
        const response = await axiosInstance.get(`api/admin/reports/${id}/show`);
        let data = response.data.item;
        console.log(data)

        if (data.life_cycle_event_id) await fetchEventData(data.life_cycle_event_id);
        // else fetchEventData(6);
        if (data.machine_id) await fetchMachineData(data.machine_id);
        setloading(false);
    }

    const fetchReportDataMobile = async () => {
        const response = await axiosInstance.get(`api/admin/reports/${id}/show`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        let data = response.data.item;
        console.log(data)

        if (data.life_cycle_event_id) fetchEventDataMobile(data.life_cycle_event_id);
        // else fetchEventData(6);
        if (data.machine_id) fetchMachineDataMobile(data.machine_id);
        setloading(false);
    }

    const fetchEventDataMobile = async (event_id) => {
        const response = await axiosInstance.get(`api/admin/life-cycle-event/${+event_id}/show`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        let data = response.data.item;
        if (data) {
            setReportData(data);

        }
    }

    const fetchMachineDataMobile = async (machine_id) => {
        const response = await axiosInstance.get(`api/admin/machines/${+machine_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        let data = response.data.item;
        if (data) {
            setMachineData(data);
        }
    }


    useEffect(() => {
        if (location.pathname.includes("view-pdf") && token) {
            fetchReportDataMobile();
        } else {
            fetchReportData();
        }
    }, [])
    return (
        <>
            {loading ?
                <Loading3QuartersOutlined style={{ fontSize: '50px', display: 'block', margin: 'auto', marginTop: '20%' }} />
                :
                <PDFViewer style={{
                    width: "100%",
                    height: location.pathname.includes("view-pdf") ? "98vh" : "75vh",

                }}>

                    <MainComponent reportData={reportData} machineData={machineData} />

                </PDFViewer>
            }
        </>
    )
}

export default Index2