import React, { useEffect, useState } from 'react'
import CardInfo from './CardInfo/CardInfo'
import Image1 from "../../../assets/dashboard/enterprise (1) 1.png"
import bg1 from "../../../assets/dashboard/Rectangle 217.png"
import Image2 from "../../../assets/dashboard/map 1.png"
import Image3 from "../../../assets/dashboard/milling-machine (1) 1.png"
import Image4 from "../../../assets/dashboard/Accelerate Innovate Automate 1.png"
import { AppstoreOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { Card, Divider, Select } from 'antd'
import PieChartWidget from 'components/shared-components/pieChartWidget/PieChartWidget'
import LineChart from 'components/shared-components/lineChart/LineChart'
import BarChart from 'components/shared-components/BarChart/BarChart'
import { axiosInstance } from 'App'
import GoogleMapWithMarkers from 'components/shared-components/Map/googleMap'

// Custom hook for responsive design
const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowSize;
};

const Dashboard = () => {
	const { width } = useWindowSize();
	const isMobile = width <= 768;
	const [cardData, setCardData] = useState([
		// {
		// 	color: "#459ED8",
		// 	image: Image1,
		// 	backgroundImage: bg1,
		// 	value: "0",
		// 	heading: "Total Customers"
		// },
		{
			color: "#F05179",
			image: Image2,
			backgroundImage: bg1,
			value: "1",
			heading: "Total Jobsites"
		},
		{
			color: "#F89747",
			image: Image3,
			backgroundImage: bg1,
			value: "2",
			heading: "Total Machines"
		},
		{
			color: "#BB69C8",
			image: Image4,
			backgroundImage: bg1,
			value: "3",
			heading: "No. of Sensors"
		},
	]);

	const [offlineMachines, setOfflineMachines] = useState(0);
	const [onlineMachines, setOnlineMachines] = useState(0);

	const [health, setHealth] = useState(0);
	const [unhealthy, setUnhealthy] = useState(0);

	const [green, setGreen] = useState(0);
	const [yellow, setYellow] = useState(0);
	const [orange, setOrange] = useState(0);
	const [red, setRed] = useState(0);

	const [goodBattery, setGoodBattery] = useState(0);
	const [badBattery, setBadBattery] = useState(0);

	const [lineUnCountSeries,setLineUnCountSeries] = useState({
		name: "Series A",
		data: []
	})

	const [lineUnCountCategories,setLineUnCountCategories] = useState([]);

	const [uncountSeries,setUnCountSeries] = useState({
		name: "Series A",
		data: []
	});

	const [uncountCategories,setUnCountCategories] = useState([]);


	const [lineAlertSeries,setLineAlertSeries] = useState({
		name: "Series A",
		data: []
	})

	const [lineAlertCategories,setLineAlertCategories] = useState([]);


	const [alertSeries,setAlertSeries] = useState({
		name: "Series A",
		data: []
	})

	const [alertCategories,setAlertCategories] = useState([]);

	const [lineVibrationSeries,setLineVibrationSeries] = useState({
		name: "Series A",
		data: []
	})

	const [lineVibrationCategories,setLineVibrationCategories] = useState([]);
	

	const [vibrationSeries,setVibrationSeries] = useState({
		name: "Series A",
		data: []
	})

	const [vibrationCategories,setVibrationCategories] = useState([]);


	const [lineBatterySeries,setLineBatterySeries] = useState({
		name: "Series A",
		data: []
	})

	const [lineBatteryCategories,setLineBatteryCategories] = useState([]);
	
	const [batterySer,setBatterySer] = useState({
		name: "Series A",
		data: []
	})

	const [batteryCategories,setBatteryCategories] = useState([]);
	const [mapData, setMapData] = useState([]);
	
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axiosInstance.get(`api/admin/dashboard?customer_id=${localStorage.getItem("parent_id")==="null"?localStorage.getItem("user_id"):localStorage.getItem("parent_id")}`);
				const result = response.data.item.results;

				const newCardData = [
					// {
					// 	color: "#459ED8",
					// 	image: Image1,
					// 	backgroundImage: bg1,
					// 	value: result.totalCustomers,
					// 	heading: "Total Customers"
					// },
					{
						color: "#F05179",
						image: Image2,
						backgroundImage: bg1,
						value: result.totalOrders,
						heading: "Total Jobsites"
					},
					{
						color: "#F89747",
						image: Image3,
						backgroundImage: bg1,
						value: result.totalMachines,
						heading: "Total Machines"
					},
					{
						color: "#BB69C8",
						image: Image4,
						backgroundImage: bg1,
						value: result.totalMachineSensors,
						heading: "No. of Sensors"
					},
				];

				setCardData(newCardData);

				setOfflineMachines(result.offline_machines);
				setOnlineMachines(result.online_machines);
				setHealth(result.healthy_machines);
				setUnhealthy(result.unhealthy_machines);
				setGreen(result.green_machines);
				setYellow(result.yellow_machines);
				setOrange(result.orange_machines);
				setRed(result.red_machines);

				setGoodBattery(result.machines_with_good_battery);
				setBadBattery(result.machines_with_bad_battery);
				setLineUnCountSeries(result.offline_timerange_graph_chart.offline_machines_by_timerange_series[0]);
				setLineUnCountCategories(result.offline_timerange_graph_chart.offline_machines_by_timerange_categories);
				// setLineUnCountCategories(result.offline_graph_chart.offline_machines_by_job_site_categories);

				setUnCountSeries(result.offline_graph_chart.offline_machines_by_job_site_series[0]);
				setUnCountCategories(result.offline_graph_chart.offline_machines_by_job_site_categories);


				setLineAlertSeries(result.alert_timerange_graph_chart.machines_with_alert_by_timerange_series[0]);
				setLineAlertCategories(result.alert_timerange_graph_chart.machines_with_alert_by_timerange_categories);

				setAlertSeries(result.alert_graph_chart.machines_with_alert_by_job_site_series[0]);
				setAlertCategories(result.alert_graph_chart.machines_with_alert_by_job_site_categories);


				setLineVibrationSeries(result.warning_timerange_graph_chart.machines_with_warning_by_timerange_series[0]);
				setLineVibrationCategories(result.warning_timerange_graph_chart.machines_with_warning_by_timerange_categories);

				setVibrationSeries(result.warning_graph_chart.machines_with_warning_by_job_site_series[0]);
				setVibrationCategories(result.warning_graph_chart.machines_with_warning_by_job_site_categories);


				setLineBatterySeries(result.battery_alert_timerange_graph_chart.machines_with_battery_alert_by_timerange_series[0]);
				setLineBatteryCategories(result.battery_alert_timerange_graph_chart.machines_with_battery_alert_by_timerange_categories);

				setBatterySer(result.battery_alert_graph_chart.machines_with_battery_alert_by_job_site_series[0]);
				setBatteryCategories(result.battery_alert_graph_chart.machines_with_battery_alert_by_job_site_categories);


			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		const fetchMapData = async () => {
		
			
			try {
				const response = await axiosInstance.get(`api/admin/dashboard/map?customer_id=${localStorage.getItem("parent_id")==="null"?localStorage.getItem("user_id"):localStorage.getItem("parent_id")}`);
				setMapData(response.data.item.markersData.filter(item => item.lat && item.lng));
	
			} catch (err) {
				console.log(err)
			}
		}
		fetchMapData();
		fetchData();
	}, []);
	

	return (
		<div style={{
			padding: isMobile ? "10px" : "20px",

		}}>
			<div style={{
				display: "flex",
				justifyContent: "space-between",
				marginBottom: "20px"
			}}>
				<div>
					<h4> <AppstoreOutlined /><span style={{
						color: '#6a6a6a',
						fontWeight: '300'
					}}> Dashboard </span></h4>
				</div>
				{/* <div style={{
					display: "flex",
					gap: "10px"
				}}>
					<Select placeholder="Customer" style={{ width: 180 }} >
						<Select.Option value="jack">Jack</Select.Option>
						<Select.Option value="lucy">Lucy</Select.Option>
						<Select.Option value="Yiminghe">yiminghe</Select.Option>
					</Select>
					<Select placeholder="Jobsites" style={{ width: 180 }} >
						<Select.Option value="jack">Jack</Select.Option>
						<Select.Option value="lucy">Lucy</Select.Option>
						<Select.Option value="Yiminghe">yiminghe</Select.Option>
					</Select>
				</div> */}
			</div>
			<div style={{
				display: "flex",
				flexWrap: "wrap",
				justifyContent: isMobile ? "center" : "space-between",
				gap: isMobile ? "15px" : "0",
			}}>

				{cardData.map((item, index) => (
					<CardInfo {...item} key={index} />
				))}
			</div>

			<Card style={{
				marginTop: "20px",
				overflow: "auto",
			}}>
				<div style={{
					display: "flex",
					flexDirection: isMobile ? "column" : "row",
					justifyContent: "space-between",
				}}>
					<div style={{
						width: isMobile ? "100%" : "25%",
						borderRight: isMobile ? "none" : "1px solid #F0F0F0",
						borderBottom: isMobile ? "1px solid #F0F0F0" : "none",
						padding: "15px"
					}}>
						<PieChartWidget
							title="Availability"
							label={["Online", "Offline"]}
							colors={["#6467F0", "#38B4EC"]}
							value={[onlineMachines,offlineMachines]} />
						{/* <Divider />
						<LineChart title="Incident Counts-Unavailability" colors={["#38B4EC"]} series={[
							lineUnCountSeries
						]} categories={
							// uncountCategories
							lineUnCountCategories
						} />
						<Divider />
						<BarChart title="Incident Counts-Unavailability" colors={["#38B4EC"]} series={[
							uncountSeries
						]} categories={
							uncountCategories
						} /> */}
					</div>


					<div style={{
						width: isMobile ? "100%" : "25%",
						borderRight: isMobile ? "none" : "1px solid #F0F0F0",
						borderBottom: isMobile ? "1px solid #F0F0F0" : "none",
						padding: "15px"
					}}>
						<PieChartWidget title="Alert Status" label={["Healthy", "With Alert"]}
							colors={["#6467F0", "#B666C3"]}
							value={[health, unhealthy]} />
						{/* <Divider />
						<LineChart title="Incident Counts-Alert Status" colors={["#B666C3"]} series={
							[lineAlertSeries]
						} categories={
							lineAlertCategories
						} />
						<Divider />
						<BarChart title="Incident Counts-Alert Status" colors={["#B666C3"]} series={[
							alertSeries	
						]} categories={
							alertCategories
						} /> */}
					</div>

					<div style={{
						width: isMobile ? "100%" : "25%",
						borderRight: isMobile ? "none" : "1px solid #F0F0F0",
						borderBottom: isMobile ? "1px solid #F0F0F0" : "none",
						padding: "15px"
					}}>
						<PieChartWidget title={"Vibration Status"} label={["Green", "Yellow", "Orange", "Red"]}
							colors={["#00A843", "#FFCB21", "#FB8920", "#FF4646"]}
							value={[green, yellow, orange, red]}
						/>
						{/* <Divider />
						<LineChart
							title="Incident Counts-Vibration Status"
							colors={["#FB8920", "#FF4646"]}
							series={[
								lineVibrationSeries
							]}
							categories={
								lineVibrationCategories
							}
						/>
						<Divider />
						<BarChart title="Incident Counts-Vibration Status" colors={["#FB8920", "#FF4646"]} series={[
							vibrationSeries
						]} categories={
							vibrationCategories
						} /> */}
					</div>

					<div style={{
						width: isMobile ? "100%" : "25%",
						padding: "15px"
					}}>
						<PieChartWidget title="Battery Status" label={["Good", "Need to change within 3 months"]}
							colors={["#6467F0", "#B666C3"]}
							value={
								[goodBattery, badBattery]
							}
						/>
						{/* <Divider />
						<LineChart title="Incident Counts-Battery Status" colors={["#B666C3"]} series={[ 
							lineBatterySeries
						]} categories={
							lineBatteryCategories
						} />
						<Divider />
						<BarChart title="Incident Counts-Battery Status" colors={["#B666C3"]} series={[
							batterySer
						]} categories={
							batteryCategories
						} /> */}
					</div>
				</div>
			</Card>

			<Card title="Machine Locations" style={{
				marginTop: "20px",
				overflow: "hidden"
			}}>
				<div style={{
					height: isMobile ? "300px" : "400px",
					width: "100%"
				}}>
					<GoogleMapWithMarkers data={mapData}/>
				</div>
			</Card>
		</div>
	)
}

export default Dashboard



// {
// 	"totalMachines": 11,
// 	"totalCustomers": 42,
// 	"totalOrders": 11,
// 	"totalMachineSensors": 8,
// 	"offline_machines": 11,
// 	"online_machines": 0,
// 	"healthy_machines": 0,
// 	"unhealthy_machines": 11,
// 	"green_machines": 0,
// 	"yellow_machines": 0,
// 	"orange_machines": 0,
// 	"red_machines": 11,
// 	"machines_with_good_battery": 0,
// 	"machines_with_bad_battery": 11,
// 	"offline_graph_chart": {
// 	  "offline_machines_by_job_site_series": [
// 		{
// 		  "name": "Offline Machines",
// 		  "data": [
// 			3,
// 			3,
// 			4,
// 			1
// 		  ]
// 		}
// 	  ],
// 	  "offline_machines_by_job_site_categories": [
// 		"Pumping Station ",
// 		"Pumping Station 2",
// 		"Jobsite 1",
// 		"Jobsite for DNY"
// 	  ]
// 	},
// 	"alert_graph_chart": {
// 	  "machines_with_alert_by_job_site_series": [
// 		{
// 		  "name": "Machines with Alert",
// 		  "data": [
// 			3,
// 			3,
// 			4,
// 			1
// 		  ]
// 		}
// 	  ],
// 	  "machines_with_alert_by_job_site_categories": [
// 		"Pumping Station ",
// 		"Pumping Station 2",
// 		"Jobsite 1",
// 		"Jobsite for DNY"
// 	  ]
// 	},
// 	"warning_graph_chart": {
// 	  "machines_with_warning_by_job_site_series": [
// 		{
// 		  "name": "Machines with Warning",
// 		  "data": [
// 			3,
// 			3,
// 			4,
// 			1
// 		  ]
// 		}
// 	  ],
// 	  "machines_with_warning_by_job_site_categories": [
// 		"Pumping Station ",
// 		"Pumping Station 2",
// 		"Jobsite 1",
// 		"Jobsite for DNY"
// 	  ]
// 	},
// 	"battery_alert_graph_chart": {
// 	  "machines_with_battery_alert_by_job_site_series": [
// 		{
// 		  "name": "Machines with Battery Alert",
// 		  "data": [
// 			3,
// 			3,
// 			4,
// 			1
// 		  ]
// 		}
// 	  ],
// 	  "machines_with_battery_alert_by_job_site_categories": [
// 		"Pumping Station ",
// 		"Pumping Station 2",
// 		"Jobsite 1",
// 		"Jobsite for DNY"
// 	  ]
// 	},
// 	"offline_timerange_graph_chart": {
// 	  "offline_machines_by_timerange_series": [
// 		{
// 		  "name": "Offline Machines",
// 		  "data": [
// 			11,
// 			11,
// 			11,
// 			11,
// 			11,
// 			11
// 		  ]
// 		}
// 	  ],
// 	  "offline_machines_by_timerange_categories": [
// 		"23:00",
// 		"0:00",
// 		"1:00",
// 		"2:00",
// 		"3:00",
// 		"4:00"
// 	  ]
// 	},
// 	"alert_timerange_graph_chart": {
// 	  "machines_with_alert_by_timerange_series": [
// 		{
// 		  "name": "Machines with Alert",
// 		  "data": []
// 		}
// 	  ],
// 	  "machines_with_alert_by_timerange_categories": []
// 	},
// 	"warning_timerange_graph_chart": {
// 	  "machines_with_warning_by_timerange_series": [
// 		{
// 		  "name": "Machines with Warning",
// 		  "data": []
// 		}
// 	  ],
// 	  "machines_with_warning_by_timerange_categories": []
// 	},
// 	"battery_alert_timerange_graph_chart": {
// 	  "machines_with_battery_alert_by_timerange_series": [
// 		{
// 		  "name": "Machines with Battery Alert",
// 		  "data": []
// 		}
// 	  ],
// 	  "machines_with_battery_alert_by_timerange_categories": []
// 	}
//   }