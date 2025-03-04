import React from 'react'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import Logo from "../../../../../../assets/Logo (2).png";
import Company from "../../../../../../assets/Group (2).png"
import moment from 'moment';

function ProjectDetails({ reportData, machineData }) {
    const styles = StyleSheet.create({
        page: { padding: 60 },
        header: { flexDirection: "row", justifyContent: "space-between" },
        title: { marginTop: 40, fontSize: 18, fontWeight: "bold" },
        section: { marginTop: 20 },
        boldText: {
            fontFamily: "Helvetica-Bold", // Use built-in bold font
 
            marginTop: 10
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
    });
    return (

        <>
            < View fixed style={styles.header} >
                <Image src={Logo} style={styles.image} />
                <Image src={Company} style={styles.image} />
            </View >


            < Text style={styles.title} > 1. Project Details</Text >
            <View style={styles.section}>
                <View style={styles.row}>

                    <View style={styles.col}>
                        <Text style={styles.boldText}>Project Name</Text>
                        <Text style={styles.boldText}>Customer Name</Text>
                        <Text style={styles.boldText}>Ref Quote No.</Text>
                        <Text style={styles.boldText}>PO Ref</Text>
                        <Text style={styles.boldText}>Sales</Text>
                        <Text style={styles.boldText}>Received By</Text>
                        <Text style={styles.boldText}>Delivered By</Text>
                        <Text style={styles.boldText}>Date Requested</Text>
                        <Text style={styles.boldText}>Date Received</Text>
                        <Text style={styles.boldText}>Date Delivered</Text>
                    </View>

                    {/* Right Column */}
                    <View style={styles.col2}>
                        <Text style={styles.rawText}>{machineData.name || "N/A"}</Text>
                        <Text style={styles.rawText}>{machineData.user?.name || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.job_reference[0]?.quote_job_ref || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.job_reference[0]?.po_ref || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.job_reference[0]?.sales || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.receive_and_deliver_data[0]?.receivedBy || "N/A"}</Text>
                        <Text style={styles.rawText}>{reportData.receive_and_deliver_data[0]?.deliveredBy || "N/A"}</Text>
                        <Text style={styles.rawText}>
                            {reportData.receive_and_deliver_data[0]?.dateRequested
                                ? moment(reportData.receive_and_deliver_data[0]?.dateRequested).format("DD-MM-YYYY")
                                : "N/A"}
                        </Text>
                        <Text style={styles.rawText}>
                            {reportData.receive_and_deliver_data[0]?.dateReceived
                                ? moment(reportData.receive_and_deliver_data[0]?.dateReceived).format("DD-MM-YYYY")
                                : "N/A"}
                        </Text>
                        <Text style={styles.rawText}>
                            {reportData.receive_and_deliver_data[0]?.dateDelivery
                                ? moment(reportData.receive_and_deliver_data[0]?.dateDelivery).format("DD-MM-YYYY")
                                : "N/A"}
                        </Text>
                    </View>
                </View>
            </View>


            <Text style={styles.title}>2. Parts Renewal</Text>
            <View style={styles.section}>
                {reportData.parts_renewal.length > 0 ? (
                    reportData.parts_renewal.map((item) => (
                        <Text key={item.srNo}>
                            {item.srNo}. {item.item} ({item.spec} - {item.qty})
                        </Text>
                    ))
                ) : (
                    <Text style={styles.emptyText}>No parts renewed</Text>
                )}
            </View>
        </>
    )
}

export default ProjectDetails