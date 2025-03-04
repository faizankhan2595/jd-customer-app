import React, { useState, useEffect } from "react";
import moment from "moment";
import { Empty } from "antd";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import ProjectDetails from "./SharedComponent/ProjectDetails";
import MachineData from "./SharedComponent/MachineData";
import WorkScope from "./SharedComponent/WorkScopeData";
import AdditionalWorkScope from "./SharedComponent/AdditionalWorkScope";
import SubsectionEventDetails from "./SharedComponent/SubsectionEventDetails";
import EventDetail from "./SharedComponent/EventDetail";
import FreeLoadTest from "./SharedComponent/FreeLoadTest";
import VibrationTest from "./SharedComponent/VibrationTest";
import Miscellanous from "./SharedComponent/MiscellanousReport";


function MainComponent({ reportData, machineData }) {

  // Create styles
  const styles = StyleSheet.create({
    page: { padding: 20 },

  });





  return (
    <Document>
      <Page style={styles.page} size="A4">
        <ProjectDetails
          reportData={reportData}
          machineData={machineData}
        />

      </Page>
      <Page style={styles.page} size="A4">
        <MachineData
          reportData={reportData}
          machineData={machineData}
        />
      </Page>
      <Page style={styles.page} size="A4">
        <WorkScope

        />
      </Page>
      <Page style={styles.page} size="A4">
        <AdditionalWorkScope />
      </Page>
      <Page style={styles.page} size="A4">
        <EventDetail
          reportData={reportData}
          machineData={machineData}
          heading={'6. Initial Conditions & Physical Inspection'}
        />
      </Page>
      <Page style={styles.page} size="A4">
        <FreeLoadTest
          reportData={reportData}
          machineData={machineData}
          heading={'7. Free Load Test'}
        />
      </Page>

      <Page style={styles.page} size="A4">
        <VibrationTest
          reportData={reportData}
          machineData={machineData}
          heading={'8. Vibration Tests'}
        />
      </Page>
      <Page style={styles.page} size="A4">
        <SubsectionEventDetails index={'9'} title={'Stator Winding Electrical Tests'}
          eventData={reportData.stator_winding_data}
        />
      </Page>
      <Page style={styles.page} size="A4">
        <SubsectionEventDetails index={'10'} title={'Auxiliary Checks'}
          eventData={reportData.auxiliaries_checks_data} isAuxiliary={true}
        />
      </Page>
      <Page style={styles.page} size="A4">
        <SubsectionEventDetails index={'11'} title={'Mechanical Inspections'}
          eventData={reportData.mechanical_inspection_data}
        />
      </Page>
      <Page style={styles.page} size="A4">
        <SubsectionEventDetails index={'12'} title={'Rotor Shaft Runout'}
          eventData={reportData.rotator_shaft_data}
        />
      </Page>
      <Page style={styles.page} size="A4">
        <SubsectionEventDetails index={'13'} title={'Free Volume Checks'}
          eventData={reportData.free_volume_data}
        />
      </Page>
      <Page style={styles.page} size="A4">
        <SubsectionEventDetails index={'14'} title={'Flame Path Dimension Checks'}
          eventData={reportData.flame_path_data}
        />
      </Page>
      
      {/* <Page style={styles.page} size="A4">
        <Miscellanous
          reportData={reportData}
          machineData={machineData}
          heading={'10. Miscellaneous Report Upload'}
        />
      </Page> */}
    </Document>
  );
}

export default MainComponent;
