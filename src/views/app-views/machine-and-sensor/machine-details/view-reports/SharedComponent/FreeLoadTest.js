import React from 'react'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import Logo from "../../../../../../assets/Logo (2).png";
import Company from "../../../../../../assets/Group (2).png"
import moment from 'moment';
function FreeLoadTest({ reportData, machineData, heading }) {
    const styles = StyleSheet.create({
        page: { padding: 60 },
        header: { flexDirection: "row", justifyContent: "space-between" },
        title: { marginTop: 40, fontSize: 18, fontWeight: "bold" },
        section: { marginTop: 20 },
        boldText: {
            fontFamily: "Helvetica-Bold", // Use built-in bold font

            marginTop: 8
        },
        rawText: {
            marginTop: 8
        },
        row: { flexDirection: "row", marginTop: 5 },
        col: { flexDirection: "column", gap: 50 },
        col2: { flexDirection: "column", gap: 50, marginLeft: 90 },
        breakable: { width: "100%", height: 400, backgroundColor: "tomato" },
        tableRow: { flexDirection: "row", borderBottom: "1px solid black" },
        tableCol: { width: "50%", padding: 4 },
        emptyText: { textAlign: "center", marginTop: 10 },
        image: { width: 100, height: "auto" },
        container: (color) => ({
            backgroundColor: color,
            border: '2px solid #D6D6D6',
            borderRadius: 100,
            width: 20,
            height: 20,
            marginRight: 10
        }),
        flexing: {
            flexDirection: "row", // No need for `display: "flex"`



            fontFamily: "Helvetica-Bold", // Use built-in bold font

            marginTop: 8
        },
        imageMarking: { width: 300, height: "auto" },
    });

    const getColor = (status) => {
        if (status == 1) return '#01A643';
        if (status == 2) return '#FF4646';
        if (status == 3) return '#d2d2d2';
        return '#fff'; // Default color
    };
    return (

        <>
            < View fixed style={styles.header} >
                <Image src={Logo} style={styles.image} />
                <Image src={Company} style={styles.image} />
            </View >

            < Text style={styles.title} > {heading}</Text >

            <View style={styles.section}>
                <View style={styles.row}>

                    <View style={styles.col}>
                        {/* Stator volt */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.free_load_data?.freeLoadData?.stator_volt?.check))}
                            ></View>
                            <Text >

                                Stator Volt
                            </Text>
                        </View>

                        {/* Frequency         */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.free_load_data?.freeLoadData?.frequency?.check))}
                            ></View>
                            <Text >

                                Frequency
                            </Text>
                        </View>

                        {/* Currrent L1 */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.free_load_data?.freeLoadData?.current_l1?.check))}
                            ></View>
                            <Text >

                                Currrent L1
                            </Text>
                        </View>

                        {/* Currrent L2 */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.free_load_data?.freeLoadData?.current_l2?.check))}
                            ></View>
                            <Text >

                                Currrent L2
                            </Text>
                        </View>

                        {/* Currrent L3 */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.free_load_data?.freeLoadData?.current_l3?.check))}
                            ></View>
                            <Text >

                                Currrent L3
                            </Text>
                        </View>

                        {/* Connection */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.free_load_data?.freeLoadData?.connection?.check))}
                            ></View>
                            <Text >

                                Connection
                            </Text>
                        </View>

                        {/* Speed  */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.free_load_data?.freeLoadData?.speed?.check))}
                            ></View>
                            <Text >

                                Speed
                            </Text>
                        </View>

                        {/* Rotation      */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.free_load_data?.freeLoadData?.rotation?.check))}
                            ></View>
                            <Text >

                                Rotation
                            </Text>
                        </View>

                        {/* DE Temp */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.free_load_data?.freeLoadData?.de_temp?.check))}
                            ></View>
                            <Text >

                                DE Temp
                            </Text>
                        </View>

                        {/* NDE Temp */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.free_load_data?.freeLoadData?.nde_temp?.check))}
                            ></View>
                            <Text >

                                NDE Temp
                            </Text>
                        </View>

                        {/* Position */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.free_load_data?.freeLoadData?.position?.check))}
                            ></View>
                            <Text >

                                Position
                            </Text>
                        </View>

                        {/* Time */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.free_load_data?.freeLoadData?.time?.check))}
                            ></View>
                            <Text >

                                Time
                            </Text>
                        </View>



                    </View>

                    {/* Right Column */}
                    <View style={styles.col2}>

                        {/* <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.completedUnit?.value || "N/A"}</Text> */}

                        <Text style={styles.rawText}>{reportData.free_load_data?.freeLoadData?.stator_volt?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.free_load_data?.freeLoadData?.frequency?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.free_load_data?.freeLoadData?.current_l1?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.free_load_data?.freeLoadData?.current_l2?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.free_load_data?.freeLoadData?.current_l3?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.free_load_data?.freeLoadData?.connection?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.free_load_data?.freeLoadData?.speed?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.free_load_data?.freeLoadData?.rotation?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.free_load_data?.freeLoadData?.de_temp?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.free_load_data?.freeLoadData?.nde_temp?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.free_load_data?.freeLoadData?.position?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.free_load_data?.freeLoadData?.time?.value || "N/A"}</Text>
                        
                    </View>
                </View>
            </View>
            <View >
                <Text style={styles.boldText}>Remarks</Text>
                <Text >
                    {reportData.free_load_data?.freeLoadData?.remarks || "N/A"}
                </Text>
            </View>

            <View style={styles.section}>
                {reportData.free_load_data?.imagesData.length > 0 ? (reportData.free_load_data?.imagesData.map((image, ind) => {
                    return <View style={styles.row}  wrap={false}>
                        <View style={styles.col}>
                            <View style={styles.flexing}>
                                <Image src={image.url} style={styles.imageMarking} />
                            </View>
                        </View>
                        <View style={styles.col2}>
                            <Text style={styles.boldText}>Markings</Text>
                            <View style={styles.rawText}>

                                {image.image_markings && image.image_markings.length > 0 &&
                                    (image.image_markings.map((img_mark, ind) => {
                                        return <Text>{ind + 1}. {img_mark.text}</Text>
                                    }))
                                }
                            </View>
                        </View>
                    </View >
                }))
                    : <Text style={styles.emptyText}>No Images Found</Text>
                }
            </View>



        </>
    )
}

export default FreeLoadTest


// {
//     "time": {
//       "check": 1,
//       "value": "Time"
//     },
//     "speed": {
//       "check": 3,
//       "value": "Speed"
//     },
//     "de_temp": {
//       "check": 1,
//       "value": "DE Temp"
//     },
//     "remarks": "t6sasdfasdfasfsdfsdf",
//     "nde_temp": {
//       "check": 3,
//       "value": "NDE Temp"
//     },
//     "position": {
//       "check": 2,
//       "value": "Position"
//     },
//     "rotation": {
//       "check": 2,
//       "value": "Rotation"
//     },
//     "frequency": {
//       "check": 2,
//       "value": "Frequency"
//     },
//     "connection": {
//       "check": 2,
//       "value": "Connection"
//     },
//     "current_l1": {
//       "check": 1,
//       "value": "Currrent L1"
//     },
//     "current_l2": {
//       "check": 2,
//       "value": "Currrent L2"
//     },
//     "current_l3": {
//       "check": 3,
//       "value": "Currrent L3"
//     },
//     "stator_volt": {
//       "check": 3,
//       "value": "Stator Volt"
//     }
//   }
