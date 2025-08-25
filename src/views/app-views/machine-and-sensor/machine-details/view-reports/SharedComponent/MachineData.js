import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import Logo from "../../../../../../assets/Logo (2).png";
import Company from "../../../../../../assets/Group (2).png"
import moment from 'moment';
import { StandardFonts } from "@react-pdf/font";

function MachineData({ reportData, machineData }) {
    const styles = StyleSheet.create({
        page: { padding: 60 },
        header: { flexDirection: "row", justifyContent: "space-between" },
        title: { marginTop: 40, fontSize: 18, fontWeight: "bold" },
        section: { marginTop: 20 },
        boldText: {
            fontFamily: "Helvetica-Bold", // Use built-in bold font

            marginTop: 10
        },
        onlyBold: {
            fontFamily: "Helvetica-Bold", // Use built-in bold font
        },
        rawText: {
            marginTop: 10
        },
        row: { flexDirection: "row", marginTop: 5 },
        col: { flexDirection: "column", gap: 50 },
        col2: { flexDirection: "column", gap: 50, marginLeft: 90 },
        breakable: { width: "100%", height: 400, backgroundColor: "tomato" },
        tableRow: { flexDirection: "row", borderBottom: "1px solid black" },
        tableCol: { width: "50%", padding: 4 },
        emptyText: { textAlign: "center", marginTop: 10 },
        image: { width: 100, height: "auto" },
        imageMarking: { width: 300, height:"auto"},
        flexing: {
            flexDirection: "row", // No need for `display: "flex"`



            fontFamily: "Helvetica-Bold", // Use built-in bold font

            marginTop: 8
        },
    });

    useEffect(()=>{
        console.log(reportData.machine_data)
    },[reportData])
    return (

        <>
            < View fixed style={styles.header} >
                <Image src={Logo} style={styles.image} />
                <Image src={Company} style={styles.image} />
            </View >


            < Text style={styles.title} > 3. Machine Data</Text >
            <View style={styles.section}>
                <View style={styles.row}>

                    <View style={styles.col}>

                        {
                            reportData.machine_data.machineData?.map((item) => {
                                return <Text style={styles.boldText}>{item.title}</Text>
                            })
                        }
                    </View>

                    {/* Right Column */}
                    <View style={styles.col2}>
                        {
                            reportData.machine_data.machineData?.map((item) => {
                                return <Text style={styles.rawText}>{item.data || "N/A"}</Text>
                            })
                        }
                    </View>
                </View>
                <View >
                    <Text style={styles.boldText}>Remarks</Text>
                    <Text >
                        {reportData.machine_data.otherMachineData?.remarks || "N/A"}
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
                            {reportData.machine_data.otherMachineData?.remarks || "N/A"}
                        </Text>
                        <Text style={
                            styles.rawText
                        }>
                            {reportData.machine_data.otherMachineData?.date ? moment(reportData.machine_data.otherMachineData?.date).format("DD-MM-YYYY") : "N/A"}
                        </Text>
                    </View>
                </View>
                <View style={styles.section}>
                    { reportData.machine_data?.imagesData.length > 0 ? (reportData.machine_data?.imagesData.map((image, ind) => {
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
                                            return <Text>{ind+1}. {img_mark.text}</Text>
                                        }))
                                    }
                                </View>
                            </View>
                        </View >
                    }))
                    : <Text style={styles.emptyText}>No Images Found</Text>
                }
                </View>
            </View>



        </>
    )
}

export default MachineData