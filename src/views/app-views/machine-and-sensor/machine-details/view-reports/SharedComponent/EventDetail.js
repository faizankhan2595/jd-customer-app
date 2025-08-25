import React from 'react'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import Logo from "../../../../../../assets/Logo (2).png";
import Company from "../../../../../../assets/Group (2).png"
import moment from 'moment';
function EventDetail({ reportData, machineData, heading }) {
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
        imageMarking: { width: 300, height:"auto"},
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
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.completedUnit?.check))}
                            ></View>
                            <Text >
                                Completed Unit
                            </Text>
                        </View>
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.stator?.check))}
                            ></View>
                            <Text >
                                Stator
                            </Text>
                        </View>
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.rotor?.check))}
                            ></View>
                            <Text >
                                Rotor
                            </Text>
                        </View>


                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.coupling?.check))}
                            ></View>
                            <Text >
                                Coupling
                            </Text>
                        </View>
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.pulley?.check))}
                            ></View>
                            <Text >
                                Pulley
                            </Text>
                        </View>

                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.impeller?.check))}
                            ></View>
                            <Text >
                                Impeller
                            </Text>
                        </View>
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.t_box?.check))}
                            ></View>
                            <Text >
                                T-Box
                            </Text>
                        </View>
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.t_box_cover?.check))}
                            ></View>
                            <Text >
                                T-Box Cover
                            </Text>
                        </View>


                        {/* Power Cable */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.power_cable?.check))}
                            ></View>
                            <Text >
                                Power Cable
                            </Text>

                        </View>

                        {/* terminal_board  */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.terminal_board?.check))}
                            ></View>
                            <Text >
                                Terminal Board
                            </Text>
                        </View>

                        {/* connector */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.connector?.check))}
                            ></View>
                            <Text >
                                Connector
                            </Text>
                        </View>


                        {/* cooling_fan_cover  */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.cooling_fan_cover?.check))}
                            ></View>
                            <Text >
                                Cooling Fan Cover
                            </Text>
                        </View>

                        {/* cooling_fan  */}

                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.cooling_fan?.check))}
                            ></View>
                            <Text >
                                Cooling Fan
                            </Text>
                        </View>
                        {/* blower */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.blower?.check))}
                            ></View>
                            <Text >
                                Blower
                            </Text>
                        </View>

                        {/* Pump  */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.pump?.check))}
                            ></View>
                            <Text >
                                Pump
                            </Text>
                        </View>


                        {/* Brake  */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.brake?.check))}
                            ></View>
                            <Text >
                                Brake
                            </Text>

                        </View>


                        {/* gear_box */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.gear_box?.check))}
                            ></View>
                            <Text >
                                Gear Box
                            </Text>

                        </View>


                        {/* de_seal */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.de_seal?.check))}
                            ></View>
                            <Text >
                                DE Seal
                            </Text>

                        </View>

                        {/* nde_seal */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.nde_seal?.check))}
                            ></View>
                            <Text >
                                NDE Seal
                            </Text>

                        </View>
                        {/* nde_washer */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.nde_washer?.check))}
                            ></View>
                            <Text >
                                NDE Washer
                            </Text>

                        </View>

                        {/* de_washer */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.de_washer?.check))}
                            ></View>
                            <Text >
                                DE Washer
                            </Text>

                        </View>

                        {/* de_circlip */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.de_circlip?.check))}
                            ></View>
                            <Text >
                                DE Circlip
                            </Text>

                        </View>


                        {/* nde_circlip */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.nde_circlip?.check))}
                            ></View>
                            <Text >
                                NDE Circlip
                            </Text>

                        </View>

                        {/* others */}
                        <View style={styles.flexing}>
                            <View style={styles.container(getColor(
                                reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.others?.check))}
                            ></View>
                            <Text >
                                Others
                            </Text>

                        </View>


                    </View>

                    {/* Right Column */}
                    <View style={styles.col2}>

                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.completedUnit?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.stator?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.rotor?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.coupling?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.pulley?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.impeller?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.t_box?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.t_box_cover?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.power_cable?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.terminal_board?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.connector?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.cooling_fan_cover?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.cooling_fan?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.blower?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.pump?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.brake?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.gear_box?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.de_seal?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.nde_seal?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.nde_washer?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.de_washer?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.de_circlip?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.nde_circlip?.value || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData?.initial_conditions_and_physical_inspection?.initialConditionsAndPhysicalInspection?.others?.value || "N/A"}</Text>

                    </View>
                </View>
            </View>
            <View >
                <Text style={styles.boldText}>Remarks</Text>
                <Text >
                    {reportData.initial_conditions_and_physical_inspection.otherInitialData?.remarks || "N/A"}
                </Text>
            </View>
            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.boldText}>Checked By</Text>
                    <Text style={styles.boldText}>Date Checked</Text>

                </View>
                <View style={styles.col2}>
                    <Text style={
                        styles.rawText
                    }>
                        {reportData.initial_conditions_and_physical_inspection.otherInitialData?.checkedBy || "N/A"}
                    </Text>
                    <Text style={
                        styles.rawText
                    }>
                        {reportData.initial_conditions_and_physical_inspection.otherInitialData?.date ? moment(reportData.initial_conditions_and_physical_inspection.otherInitialData?.date).format("DD-MM-YYYY") : "N/A"}
                    </Text>
                </View>
            </View>
            <View style={styles.section}>
                {reportData.initial_conditions_and_physical_inspection?.imagesData.length > 0 ? (reportData.initial_conditions_and_physical_inspection?.imagesData.map((image, ind) => {
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

export default EventDetail

//
//     "pump": {
//         "check": null,
//         "value": ""
//     },
//     "brake": {
//         "check": null,
//         "value": ""
//     },
//     "rotor": {
//         "check": 1,
//         "value": "test Rotor"
//     },
//     "t_box": {
//         "check": null,
//         "value": ""
//     },
//     "blower": {
//         "check": null,
//         "value": ""
//     },
//     "others": {
//         "check": null,
//         "value": ""
//     },
//     "pulley": {
//         "check": 3,
//         "value": ""
//     },
//     "stator": {
//         "check": 2,
//         "value": "test Stator"
//     },
//     "de_seal": {
//         "check": null,
//         "value": ""
//     },
//     "coupling": {
//         "check": 2,
//         "value": ""
//     },
//     "gear_box": {
//         "check": null,
//         "value": ""
//     },
//     "impeller": {
//         "check": 1,
//         "value": ""
//     },
//     "nde_seal": {
//         "check": null,
//         "value": ""
//     },
//     "connector": {
//         "check": null,
//         "value": ""
//     },
//     "de_washer": {
//         "check": null,
//         "value": ""
//     },
//     "de_circlip": {
//         "check": null,
//         "value": ""
//     },
//     "nde_washer": {
//         "check": null,
//         "value": ""
//     },
//     "cooling_fan": {
//         "check": null,
//         "value": ""
//     },
//     "nde_circlip": {
//         "check": null,
//         "value": ""
//     },
//     "power_cable": {
//         "check": null,
//         "value": ""
//     },
//     "t_box_cover": {
//         "check": null,
//         "value": ""
//     },
//     "completedUnit": {
//         "check": 3,
//         "value": "test Completed Unit"
//     },
//     "terminal_board": {
//         "check": null,
//         "value": ""
//     },
//     "cooling_fan_cover": {
//         "check": null,
//         "value": ""
//     }
