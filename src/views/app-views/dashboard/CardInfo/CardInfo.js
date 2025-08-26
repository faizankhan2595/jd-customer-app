import React, { useEffect, useState } from 'react'

// Custom hook for responsive design
const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowSize;
};

function CardInfo({ color, image, backgroundImage, value, heading }) {
	const { width } = useWindowSize();
	const isMobile = width <= 768;
    return (
        <div
            style={{
                borderRadius: "10px",
                width: isMobile ? "100%" : "32%",
                maxWidth: isMobile ? "300px" : "none",
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
                padding: isMobile ? "10px 15px" : "10px 30px"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: isMobile ? "15px" : "30px"
                }}>
                    <div style={{
                        fontWeight: "900",
                        fontSize: isMobile ? "28px" : "36px"
                    }}>
                        {value}
                    </div>
                    <div style={{
                        fontWeight: "400",
                        fontSize: isMobile ? "12px" : "14px"
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