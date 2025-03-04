import React from 'react'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import Logo from "../../../../../../assets/Logo (2).png";
import Company from "../../../../../../assets/Group (2).png"
import moment from 'moment';
import { Button, Collapse, Input, Radio } from "antd";
// import RadioGreen from "../../../../../../assets/images/radio-green.png"
// import RadioRed from "../../../../../../assets/images/radio-red.png"
// import RadioGrey from "../../../../../../assets/images/radio-grey.png"

const SubsectionEventDetails = ({index, title, eventData, isAuxiliary}) => {
    const styles = StyleSheet.create({
      page: { padding: 60 },
      header: { flexDirection: "row", justifyContent: "space-between" },
      title: { marginTop: 16, fontSize: 18, fontWeight: "bold" },
      section: { marginTop: 5 },
      boldText: {
          fontFamily: "Helvetica-Bold", // Use built-in bold font

          marginTop: 7
      },
      rawText: {
          marginTop: 7
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
          borderRadius: 100,
          width: 20,
          height: 20,
          marginRight: 10,
          border: '2px solid #D6D6D6'
      }),
      flexing: {
          flexDirection: "row", // No need for `display: "flex"`
          fontFamily: "Helvetica-Bold", // Use built-in bold font
          marginTop: 7
      },
      flexingText: {
          flexDirection: "row", // No need for `display: "flex"`
          marginTop: 7
      },
      imageMarking: { width: 'auto', height: 150},
    });

    console.log(eventData)

    const getColor = (status) => {
      if (status == 1) return '#01A643';
      if (status == 2) return '#FF4646';
      if (status == 3) return '#D2D2D2';
      return '#fff'; // Default color
    };

    const getDataValue = (data, isResistanceData=false) => {
      let value = ''
      let suffix = ''
      let val1 = '';
      let val2 = '';
      let suf1 = '';
      let suf2 = '';

      if(isAuxiliary, isResistanceData) {
        if(data.includes('~')) {
          let val = data.split(' ~ ')

          val1 = val[0] ? val[0]?.split('-')[0] : ''
          suf1 = val[0] ? val[0]?.split('-')[1] : ''

          val2 = val[1] ? val[1]?.split('-')[0] : ''
          suf2 = val[1] ? val[1]?.split('-')[1] : ''
        }
        return val1+' '+suf1+' - '+val2+' '+suf2;
      } else {
        value = data.split('-')[0]
        suffix = data.split('-')[1]
        return value+' '+suffix
      }

    }

  return (
    <>
      <View fixed style={styles.header} >
          <Image src={Logo} style={styles.image} />
          <Image src={Company} style={styles.image} />
      </View>

      <Text style={styles.title} > {index}. {title}</Text >

      {eventData.map((item,indx) => {
        return <View wrap={false} key={indx} >
            <Text style={styles.title}>
              {indx+1 + '. '} {item.title}</Text >
            <View style={styles.section}>
              <View style={styles.row} >
                <View style={styles.col}>
                    {item?.data.length > 0 && (item.data.map((evt,ind) => {
                      return <View style={styles.flexing}>
                                <View style={styles.container(getColor(evt?.check))}></View>
                                <Text>{evt.name}</Text>
                            </View>
                    }))}
                </View>
                <View style={styles.col2}>
                    {item?.data.length > 0 && (item.data.map((evt,ind) => {
                      
                      // return <View style={styles.flexingText}><Text>{evt?.value || 'N/A'}</Text></View>
                      if(isAuxiliary) {
                        return <View style={styles.flexingText}><Text>{evt?.value ? getDataValue(evt?.value, evt.name.toUpperCase().includes('RESISTANCE')): 'N/A'}</Text></View>
                      }

                      // return <View style={styles.flexingText}><Text>{evt?.value ? value+' '+suffix: 'N/A'}</Text></View>
                      return <View style={styles.flexingText}><Text>{evt?.value ? getDataValue(evt?.value): 'N/A'}</Text></View>
                    }))}
                </View>
              </View>
            </View>
            <View style={styles.section}>
                  {item.photos && item.photos.length > 0 && (item.photos.map((image,ind) => {
                    return  <View style={styles.row}  wrap={false}>
                              <View style={styles.col}>
                                <View style={styles.flexing}>
                                  <Image src={image.url} style={styles.imageMarking} /> 
                                </View>
                              </View>
                              <View style={styles.col2}>
                                  {/* <View style={styles.flexing}> */}
                                    <Text style={styles.boldText}>Markings</Text>
                                    <View style={styles.rawText}>
                                    {image.image_markings && image.image_markings.length > 0 && 
                                    (image.image_markings.map((img_mark,ind) => {
                                        return <Text>{ind + 1}.{img_mark.text}</Text>
                                      }))
                                    }
                                    </View>
                                  {/* </View> */}
                              </View>
                            </View >
                  }))}

                </View>
        </View>
      })}
    </>
  )
}

export default SubsectionEventDetails