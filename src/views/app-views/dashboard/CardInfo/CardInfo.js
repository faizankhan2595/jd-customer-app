import React from 'react'

function CardInfo({ color, image, backgroundImage, value, heading }) {
    return (
        <div
            style={{
                borderRadius: "10px",
                width: "23%",
                backgroundColor: color,

                color: "white",

                position: "relative",
            }}
        >
            <div style={{
                position: "absolute",
            }}>
                <img src={backgroundImage} alt="" style={{ width: "100%" }} />
            </div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 30px"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px"
                }}>
                    <div style={{
                        fontWeight: "900",
                        fontSize: "36px"
                    }}>
                        {value}
                    </div>
                    <div style={{
                        fontWeight: "400",
                        fontSize: "14px"
                    }}>
                        {heading}
                    </div>
                </div>
                <div>
                    <img src={image} alt="" style={{ width: "100%" }} />
                </div>
            </div>
        </div>
    )
}

export default CardInfo