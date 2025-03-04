import React from 'react'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import Logo from "../../../../../../assets/Logo (2).png";
import Company from "../../../../../../assets/Group (2).png"
import moment from 'moment';
function Miscellanous({ reportData, machineData, heading }) {
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
     
        flexing: {
            flexDirection: "row", // No need for `display: "flex"`



            fontFamily: "Helvetica-Bold", // Use built-in bold font

            marginTop: 8
        },
        imageMarking: { width: 300, height: "auto" },
    });

    return (

        <>
            < View fixed style={styles.header} >
                <Image src={Logo} style={styles.image} />
                <Image src={Company} style={styles.image} />
            </View >

            < Text style={styles.title} > {heading}</Text >

        

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

export default Miscellanous

