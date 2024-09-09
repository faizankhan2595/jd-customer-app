import React, { useState } from 'react'
import LoginForm from '../../components/LoginForm'
import { Card, Row, Col, InputNumber, Select, Input, Button } from "antd";
import { useSelector } from 'react-redux';
import Logo from '../../../../Logo.svg'
import { OrangeLogo } from 'assets/svg/icon';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import OTPInput from 'otp-input-react';
const backgroundStyle = {
	backgroundImage: 'url(/img/others/wave.svg)',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'contain',
	backgroundPosition: 'top',
	backgroundColor: 'white'
}
const logoCss = {
	position: 'absolute',
	top: '1rem',
	left: '1rem'
}

const { Option } = Select;
const selectBefore = (
	<Select
		defaultValue="in"
		style={{
			width: 80,
		}}
	>
		<Option value="in">IND</Option>
		<Option value="sg">SG</Option>
	</Select>
);
const LoginOne = props => {
	const theme = useSelector(state => state.theme.currentTheme)
	const [step, setStep] = useState(1);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [otp, setOtp] = useState('');
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: false,
	};
	const handlePhoneNumberSubmit = () => {
		setStep(2);
	};

	const handleOTPSubmit = () => {
		console.log('OTP submitted:', otp);
	};
	return (
		<div className="h-100" style={backgroundStyle}>
			<div style={logoCss}> <img src={Logo} alt='...'></img></div>
			<div className="row d-flex h-100" style={{ paddingTop: '110px' }}>
				<div style={{ marginTop: '80px', width: '50%' }} className='d-flex flex-column justify-content-start align-items-center'>
					<div>
						<div className='d-flex justify-content-center mb-4'>
							<OrangeLogo />
						</div>
						<h2 className='text-center mt-2'>{step === 1 ? 'LOGIN' : 'Enter OTP'}</h2>
						<p className='text-center'> {step === 1
							? 'Please enter your phone number below to get started.'
							: `Please enter 4 digit OTP sent to +65 ${phoneNumber} below.`}</p>
						{step === 1 && (
							<><h4 style={{ marginTop: '2.7rem' }} className='font-bolder '>Phone Number</h4>
								<Input addonBefore={selectBefore} onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
								<Button style={{ backgroundColor: '#3CA6C1', color: 'white', marginTop: '4rem', marginBottom: '1.9rem' }} className='w-100' onClick={handlePhoneNumberSubmit}>Continue</Button></>)}
						{step === 2 && (
							<>
								<h4 style={{ marginTop: '2.7rem' }} className='font-bolder '>OTP Verification</h4>
								{/* Use the OTPInput component here */}
								<OTPInput
								className='OtpInput'
  value={otp}
  onChange={(otpValue) => setOtp(otpValue)}
  autoFocus
  OTPLength={4}
  isNumberInput
  shouldAutoFocus
  isInputNum
  inputStyle={{
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '0.5rem',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    outline: 'none',
  }}
  containerStyle={{ justifyContent: 'space-between' }} // Adjust to space between inputs
  inputContainerStyle={{ margin: '0 0.5rem' }}
  inputClassName="custom-otp-input"
  disabled={false}
  hasErrored={false}
  errorStyle={{ borderColor: 'red' }}
  focusStyle={{ borderColor: 'blue' }}
  onComplete={(otpValue) => handleOTPSubmit(otpValue)}
/>

  <p className='text-center mt-2'>Don't receive OTP?<a className='text-center' href='#' >Request Again</a></p>
								<Button
									style={{ backgroundColor: '#3CA6C1', color: 'white', marginTop: '4rem', marginBottom: '1.9rem' }}
									className='w-100'
									onClick={() => handleOTPSubmit(otp)}
								>
									Submit
								</Button>
							</>
						)}
						<p className='text-center'>By continuing, you agree to the JD Works Terms & Services</p>
						<a className='text-center d-block w-100' href='#' >Terms & Services</a>
					</div>
				</div>

				<div style={{ width: '50%' }} className='loginRightSlider' >
					<div>
						<Slider {...settings}>
							<div>
								<div style={{
									backgroundImage: 'url(/img/others/Rectanglepurple.svg)',
									backgroundRepeat: 'no-repeat',
									backgroundSize: 'cover',
									// width: '680px',
									// borderRadius: '20px',
									padding: '5rem',
									backgroundPosition: 'center',
									// height: '680px'
								}}>
									<h2 className='text-white mt-2' style={{ textTransform: 'uppercase', fontSize: '1.6rem' }}>Machine conditions monitoring get easy</h2>
									<p className='text-white mb-5' style={{ fontSize: '1rem', width: '80%', lineHeight: '18px', fontWeight: '100' }}>Enhancing productivity and efficiency with smart mobile applications</p>
									<img style={{ width: '65%', margin: 'auto' }} src='/img/others/machinefirst.svg' alt='...' />
								</div>
							</div>
							<div>
								<div style={{
									backgroundImage: 'url(/img/others/Rectanglegreen.svg)',
									backgroundRepeat: 'no-repeat',
									backgroundSize: 'cover',
									// width: '680px',
									// borderRadius: '20px',
									padding: '5rem',
									backgroundPosition: 'center',
									// height: '680px'
								}}>
									<h2 className='text-white mt-2' style={{ textTransform: 'uppercase', fontSize: '1.6rem', width: '80%' }}>Get ON-SITE MAINTENANCE SERVICES</h2>
									<p className='text-white mb-5' style={{ fontSize: '1rem', width: '70%', lineHeight: '18px', fontWeight: '100' }}>Our expert team deliver best on site maintenance
										services </p>
									<img style={{ width: '65%', margin: 'auto' }} src='/img/others/machinetwo.svg' alt='...' />
								</div>
							</div>
							<div>
								<div style={{
									backgroundImage: 'url(/img/others/Rectangleorange.svg)',
									backgroundRepeat: 'no-repeat',
									backgroundSize: 'cover',
									width: '100%',
									// borderRadius: '20px',
									padding: '5rem',
									// backgroundPosition: 'center',
									height: '100%'
								}}>
									<h2 className='text-white mt-2' style={{ textTransform: 'uppercase', fontSize: '1.6rem', width: '80%' }}>Get INSTANT QUOTATION
										ON INQURIY</h2>
									<p className='text-white mb-5' style={{ fontSize: '1rem', width: '70%', lineHeight: '18px', fontWeight: '100' }}>Generate quick quotation for your problems you
										inquire.</p>
									<img style={{ width: '65%', margin: 'auto' }} src='/img/others/machinethree.svg' alt='...' />
								</div>
							</div>
						</Slider>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginOne

{/* <Row justify="center">
					<Col xs={20} sm={20} md={20} lg={7}> */}
{/* <Card>
							<div className="my-4">
								<div className="text-center">
									<img className="img-fluid" src={`/img/${theme === 'light' ? 'logo.png': 'logo-white.png'}`} alt="" />
									<p>Don't have an account yet? <a href="/auth/register-1">Sign Up</a></p>
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
										
									</Col>
								</Row>
							</div>
						</Card> */}
{/* </Col>
				</Row> */}