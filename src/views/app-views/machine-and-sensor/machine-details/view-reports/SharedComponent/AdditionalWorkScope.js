import React from 'react'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import Logo from "../../../../../../assets/Logo (2).png";
import Company from "../../../../../../assets/Group (2).png"
import moment from 'moment';
import { StandardFonts } from "@react-pdf/font";

function AdditionalWorkScope() {
    const styles = StyleSheet.create({
        page: { padding: 60 },
        header: { flexDirection: "row", justifyContent: "space-between" },
        title: { marginTop: 40, fontSize: 18, fontWeight: "bold" },
        section: { marginTop: 20 },
        boldText: {
            fontFamily: "Times-Bold", // Use built-in bold font

            marginTop: 10
        },
        onlyBold: {
            fontFamily: "Times-Bold", // Use built-in bold font
        },
        rawText: {
            marginTop: 8,
            fontSize: 16
        },
        normalMargin: {
            marginTop: 8,
            fontSize: 17
        },
        row: { flexDirection: "row", marginTop: 5 },
        col: { flexDirection: "column", gap: 50 },
        col2: { flexDirection: "column", gap: 50, marginLeft: 80 },
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


            < Text style={styles.title} > 5. Additional Work Scope</Text >
            <View style={styles.section}>
                <Text style={styles.normalMargin} >1. Conduct incoming inspection and perform initial testing upon receiving of the motor.</Text>
                <Text style={styles.rawText}>- Winding Insulation Resistance test </Text>
                <Text style={styles.rawText}>- Accessories Insulation Resistance test</Text>
                <Text style={styles.rawText}>- Free Load test. Voltage, Current, Temperature and Vibration measurement</Text>
                <Text style={styles.normalMargin} >2. Disassemble motor for further inspection.</Text>
                <Text style={styles.rawText}>- Surge comparison test</Text>
                <Text style={styles.rawText}>- Mechanical check on bearing housings, journals (DE and NDE) areas.</Text>
                <Text style={styles.normalMargin} >3. Cleaning and Painting of the motor</Text>
                <Text style={styles.rawText}>- General cleaning of stator, rotor and parts with cleanser. Bake under controlled temperature.</Text>
                <Text style={styles.rawText}>- Spray painting on motor exterior (standard coat)</Text>
                <Text style={styles.normalMargin} >4. Varnish Treatment</Text>
                <Text style={styles.rawText}>- Varnish stator using class 'H' varnish and bake to cure.</Text>
                <Text style={styles.normalMargin} >5. Dynamic balancing of rotor, coupling and fan blades assembly</Text>
                <Text style={styles.normalMargin} >6. Renewal of Spare parts</Text>
                <Text style={styles.rawText}>- Standard Deep groove ball bearings for both motor DE and NDE side.</Text>
                <Text style={styles.rawText}>- Standard General purpose oil seal/V-ring for both motor DE and NDE side.</Text>
                <Text style={styles.normalMargin}  >7. Re-assemble the motor</Text>
                <Text style={styles.normalMargin} >8. Conduct final testing of the motor.</Text>
                <Text style={styles.rawText}>- Winding Insulation Resistance test</Text>
                <Text style={styles.rawText}>- Accessories Insulation Resistance test</Text>
                <Text style={styles.rawText}>- Free Load test. Voltage, Current, Temperature and Vibration measurement</Text>
                <Text style={styles.normalMargin} >9. Service Report</Text>
                <Text style={styles.rawText}>- Final report in e-copy</Text>


            </View>



        </>
    )
}

export default AdditionalWorkScope


