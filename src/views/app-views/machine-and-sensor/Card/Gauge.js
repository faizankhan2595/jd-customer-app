import React from "react";
import GaugeChart from "react-gauge-chart";
import { retry } from "redux-saga/effects";


function Gauge({ value }) {
    function getGaugeColor(value) {
        if (value >= 7 && value <= 10) {
            return "Good"
        } else if (value >= 5 && value < 7) {
            return "Satisfactory"
        } else if (value >= 2 && value < 5) {
            return "Warning"
        } else if (value >= 0 && value < 2) {
            return "Critical"
        }
    }

    //     like 7-10 hai to Good
    // 5-7 hai to Satisfactory
    // 5-2 hai to Warning
    // 2-0 hai to Critical
    return (
        <>
            <GaugeChart
                id="gauge-chart3"
                nrOfLevels={30}
                colors={['#F93737', '#FB5D2C', '#FB8920', '#FFA500', '#FFCB21', '#A6D62E', '#00A843']}
                arcWidth={0.3} // Thickness of the arc
                percent={value / 10}
                textColor="black" // Label text color
                arcLength={0.5} // Ensures a semi-circle
                needleColor="black" // Pointer color
            />
            <div style={{
                display: "flex",
                justifyContent: "center",
            }}>
                <span style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "black",
                    textAlign: "center"
                }}>{getGaugeColor(value)}</span>
            </div>
        </>
    );
}

export default Gauge;
