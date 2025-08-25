import React from 'react'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import Logo from "../../../../../../assets/Logo (2).png";
import Company from "../../../../../../assets/Group (2).png"
import moment from 'moment';
function VibrationTest({ reportData, machineData, heading }) {
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
                        {/* <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.free_load_data?.freeLoadData?.stator_volt?.check))}
                            ></View>
                            <Text >

                                Stator Volt
                            </Text>
                        </View> */}
                        {/* Point 1 */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.vibration_test_data?.vibrationData?.point_1?.check))}
                            ></View>
                            <Text >

                                Point 1
                            </Text>
                        </View>

                        {/* Point 2 */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.vibration_test_data?.vibrationData?.point_2?.check))}
                            ></View>
                            <Text >

                                Point 2
                            </Text>
                        </View>

                        {/* Point 3 */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.vibration_test_data?.vibrationData?.point_3?.check))}
                            ></View>
                            <Text >

                                Point 3
                            </Text>
                        </View>

                        {/* Point 4 */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.vibration_test_data?.vibrationData?.point_4?.check))}
                            ></View>
                            <Text >

                                Point 4
                            </Text>
                        </View>

                        {/* Point 5 */}

                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.vibration_test_data?.vibrationData?.point_5?.check))}
                            ></View>
                            <Text >

                                Point 5
                            </Text>
                        </View>

                        {/* Point 6 */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.vibration_test_data?.vibrationData?.point_6?.check))}
                            ></View>
                            <Text >

                                Point 6
                            </Text>
                        </View>

                        {/* De Bearing */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.vibration_test_data?.vibrationData?.de_bearing?.check))}
                            ></View>
                            <Text >

                                DE Bearing
                            </Text>
                        </View>

                        {/* NDE Bearing */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.vibration_test_data?.vibrationData?.nde_bearing?.check))}
                            ></View>
                            <Text >

                                NDE Bearing
                            </Text>
                        </View>

                        {/* Others */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData.vibration_test_data?.vibrationData?.others?.check))}
                            ></View>
                            <Text >

                                Others
                            </Text>
                        </View>






                    </View>

                    {/* Right Column */}
                    <View style={styles.col2}>


                        {/* <Text style={styles.rawText}>{reportData.free_load_data?.freeLoadData?.stator_volt?.value || "N/A"}</Text> */}

                        <Text style={styles.rawText}>{reportData.vibration_test_data?.vibrationData?.point_1?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.vibration_test_data?.vibrationData?.point_2?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.vibration_test_data?.vibrationData?.point_3?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.vibration_test_data?.vibrationData?.point_4?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.vibration_test_data?.vibrationData?.point_5?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.vibration_test_data?.vibrationData?.point_6?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.vibration_test_data?.vibrationData?.de_bearing?.value+'-g' || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.vibration_test_data?.vibrationData?.nde_bearing?.value+'-g' || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.vibration_test_data?.vibrationData?.others?.value || "N/A"}</Text>


                    </View>
                </View>
            </View >
            <View >
                <Text style={styles.boldText}>Remarks</Text>
                <Text >
                {typeof reportData.vibration_test_data?.vibrationData?.remarks === "object" 
  ? reportData.vibration_test_data.vibrationData.remarks.value || "N/A" 
  : reportData.vibration_test_data?.vibrationData?.remarks || "N/A"}

                </Text>
            </View>

            <View style={styles.section}>
                {reportData.vibration_test_data?.imagesData.length > 0 ? (reportData.vibration_test_data?.imagesData.map((image, ind) => {
                    return <View style={styles.row} wrap={false}>
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

export default VibrationTest


// {
//     "others": {
//       "check": 3,
//       "value": "423"
//     },
//     "point_1": {
//       "check": 2,
//       "value": "1-mm/s"
//     },
//     "point_2": {
//       "check": 3,
//       "value": "23-mm/s"
//     },
//     "point_3": {
//       "check": 1,
//       "value": "4234-mm/s"
//     },
//     "point_4": {
//       "check": 2,
//       "value": "2342432-mm/s"
//     },
//     "point_5": {
//       "check": 3,
//       "value": "3244-mm/s"
//     },
//     "point_6": {
//       "check": 2,
//       "value": "23423423-mm/s"
//     },
//     "remarks": "srfsdfsdfsdf",
//     "de_bearing": {
//       "check": 1,
//       "value": "4234"
//     },
//     "nde_bearing": {
//       "check": 2,
//       "value": "423"
//     }
//   }