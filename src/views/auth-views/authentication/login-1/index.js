import React, { useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm";
import {
  Card,
  Row,
  Col,
  InputNumber,
  Select,
  Input,
  Button,
  message,
  Modal,
  Form,
  Spin,
  AutoComplete,
} from "antd";
import { useSelector } from "react-redux";
import Logo from "../../../../Logo.svg";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { OrangeLogo } from "assets/svg/icon";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OTPInput from "otp-input-react";
import { axiosInstance } from "App";
import { auth } from "auth/FirebaseOtp";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { MailOutlined } from "@ant-design/icons";
import PhoneCode from "utils/PhoneCode";
const backgroundStyle = {
  backgroundImage: "url(/img/others/wave.svg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "top",
  backgroundColor: "white",
};
const logoCss = {
  position: "absolute",
  top: "1rem",
  left: "1rem",
};

const { Option } = Select;

const LoginOne = (props) => {
  const theme = useSelector((state) => state.theme.currentTheme);
  const [step, setStep] = useState(1);
  const [form] = Form.useForm();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+65");
  const [visibleModal, setVisible] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const history = useHistory();
  const [otp, setOtp] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const fetchCompanies = async (searchValue) => {
    if (!searchValue) return;
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `/api/app/auth/searchExistingCompanies`,
        {
          search: searchValue,
        }
      );
      console.log(response.data.items);
      setOptions(
        response.data.items.map((item) => {
          return { value: item.company_name };
        })
      ); // Ensure response.data is an array of company names or objects
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/app");
    } else {
      // history.push('/auth/login')
    }
  });
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

  const selectBefore = (
    <PhoneCode value={countryCode} onChange={(e) => {
      setCountryCode(e)
    }
    } />
  );

  function onCaptchVerify() {
    const recaptchaContainer = document.getElementById("recaptcha-container");

    if (!recaptchaContainer) {
      console.error("Error: recaptcha-container element not found!");
      return;
    }
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("recaptcha resolved");
          },
        }
      );
    }
  }

  const firebaseLogin = async () => {
    const appVerifier = await window.recaptchaVerifier;
    const formatPh = `${countryCode}${phoneNumber}`;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("confirmationResult", confirmationResult);
        setStep(2);
      })
      .catch((error) => {
        console.log("error", error);
        // setOtpToggle(false);
        // console.log("error", error);
        if (error) {
          message.error(
            "Invalid number entered ! please confirm country code and registered number"
          );
        }
      });
  };
  const handlePhoneNumberSubmit = async () => {
    setOtp("");
    if (phoneNumber.length < 8) {
      message.error("Please enter a valid phone number");
      return;
    }
    try {
      const res = await axiosInstance.post("/api/app/auth/checkByNumber", {
        // phoneNumber: countryCode + phoneNumber,
        phoneCode: countryCode,
        phoneNo: phoneNumber,
      });
      if (res.data.item.success == true) {
        sendUID({ phoneCode: countryCode, phoneNo: phoneNumber });
      } else {
        setVisible(true);
      }
      console.log(res.data);
      // if (res.data.item.exists == false) {
      // 	message.error(res.data.message)
      // } else {

      // 	onCaptchVerify();
      // 	firebaseLogin();

      // }
    } catch (err) {
      console.log(err);
      message.error("You are not registered. Please sign up");
      setVisible(true);
      // message.error('Something went wrong. Please try again later');
    }
    // setStep(2);
  };

  const sendUID = async (data) => {
    try {
      const res = await axiosInstance.post("/api/web/auth/login", {
        // uid: uid,
        ...data,
      });
      console.log(res.data);
      if (res.data.item.token?.token) {
        if (signUp) {
          message.success("Account created successfully");
          setVisible(false);
          setSignUp(false);
          setPhoneNumber("");
          return;
        }
        console.log(res.data.item.user);
        localStorage.setItem("company_name", res.data.item.user?.company_name);
        localStorage.setItem("parent_id", res.data.item.user?.parent_id);
        localStorage.setItem("token", res.data.item.token?.token);
        localStorage.setItem("role", res.data.item.user?.role_id);
        localStorage.setItem("name", res.data.item.user?.name);
        localStorage.setItem("user_id", res.data.item.user?.id);

        message.success("Logged in successfully");
        window.location.reload();


      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      message.error("Something went wrong. Please try again later");
    }
  };

  const handleOTPSubmit = () => {
    if (otp.length < 6) {
      message.error("Please enter a valid OTP");
      return;
    }
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        // console.log(result.user);
        const user = result.user.uid;
        sendUID(user);
        // ...
      })
      .catch((error) => {
        message.error("Invalid OTP entered");
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  const onFinish = async (values) => {
    if (!searchValue) {
      message.error("Please select a company name");
    }
    console.log(values, searchValue);
    if(signUp){
      try {
        const res = await axiosInstance.post("/api/app/auth/checkByNumber", {
          // phoneNumber: countryCode + phoneNumber,
          phoneCode: countryCode,
          phoneNo: phoneNumber,
        });
      
        if (res.data.item.success == true) {
          message.error("Phone number already exists. Please login");
          return;
        }
      
        // }
      } catch (err) {
        console.log(err);
        sendUID({
          phoneCode: countryCode,
          phoneNo: phoneNumber,
          name: values.name,
          company_name: searchValue,
          email: values.email,
          // nric_fin_number: values.nric_fin_number
        })

      }
    }
    else{
      sendUID({
        phoneCode: countryCode,
        phoneNo: phoneNumber,
        name: values.name,
        company_name: searchValue,
        email: values.email,
        // nric_fin_number: values.nric_fin_number
      });
    }
   
  };

  return (
    <div className="h-100" style={backgroundStyle}>
      <div id="recaptcha-container"></div>
      <div style={logoCss}>
        {" "}
        <img src={Logo} alt="..."></img>
      </div>
      <div className="row d-flex h-100" style={{ paddingTop: "110px" }}>
        <div
          style={{ marginTop: "80px", width: "50%" }}
          className="d-flex flex-column justify-content-start align-items-center"
        >
          <div>
            <div className="d-flex justify-content-center mb-4">
              <OrangeLogo />
            </div>
            <h2 className="text-center mt-2">
              {step === 1 ? "LOGIN" : "Enter OTP"}
            </h2>
            <p className="text-center">
              {" "}
              {step === 1
                ? "Please enter your phone number below to get started."
                : `Please enter 6 digit OTP sent to ${countryCode} ${phoneNumber} below.`}
            </p>
            {step === 1 && (
              <>
                <h4 style={{ marginTop: "2.7rem" }} className="font-bolder ">
                  Phone Number
                </h4>
                <Input
                  addonBefore={selectBefore}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                />
                <Button
                  style={{
                    backgroundColor: "#3CA6C1",
                    color: "white",
                    marginTop: "1rem",
                    marginBottom: "1.9rem",
                  }}
                  className="w-100"
                  onClick={handlePhoneNumberSubmit}
                >
                  Continue
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <h4 style={{ marginTop: "2.7rem" }} className="font-bolder ">
                  OTP Verification
                </h4>
                {/* Use the OTPInput component here */}
                <OTPInput
                  className="OtpInput"
                  value={otp}
                  onChange={(otpValue) => setOtp(otpValue)}
                  autoFocus
                  OTPLength={6}
                  isNumberInput
                  shouldAutoFocus
                  isInputNum
                  inputStyle={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "0.5rem",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                    outline: "none",
                  }}
                  containerStyle={{ justifyContent: "space-between" }} // Adjust to space between inputs
                  inputContainerStyle={{ margin: "0 0.5rem" }}
                  inputClassName="custom-otp-input"
                  disabled={false}
                  hasErrored={false}
                  errorStyle={{ borderColor: "red" }}
                  focusStyle={{ borderColor: "blue" }}
                  onComplete={(otpValue) => handleOTPSubmit(otpValue)}
                />

                <p className="text-center mt-2">
                  Don't receive OTP?{" "}
                  <span
                    style={{
                      color: "#3CA6C1",
                      cursor: "pointer",
                    }}
                    className="text-center"
                    onClick={() => {
                      handlePhoneNumberSubmit();
                    }}
                  >
                    Request Again
                  </span>
                </p>
                <Button
                  style={{
                    backgroundColor: "#3CA6C1",
                    color: "white",
                    marginTop: "4rem",
                    marginBottom: "1.9rem",
                  }}
                  className="w-100"
                  onClick={() => handleOTPSubmit(otp)}
                >
                  Submit
                </Button>
              </>
            )}
            <p className="text-center">
              By continuing, you agree to the JD Works Terms & Services
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              // flexDirection: 'column',
            }}>
              {
               false&& step === 1 && (
                  <div
              onClick={() => {
                setVisible(true);
                setSignUp(true);
              }}
              style={{
                textAlign: 'center',
                cursor: 'pointer',
                color: 'rgb(62, 121, 247)',
           
              }}> 
                Sign Up
              </div>
                )
              }
            <a className="text-center " href="#">
              Terms & Services
            </a>
            </div>
          </div>
        </div>

        <div style={{ width: "50%" }} className="loginRightSlider">
          <div>
            <Slider {...settings}>
              <div>
                <div
                  style={{
                    backgroundImage: "url(/img/others/Rectanglepurple.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    // width: '680px',
                    // borderRadius: '20px',
                    padding: "5rem",
                    backgroundPosition: "center",
                    // height: '680px'
                  }}
                >
                  <h2
                    className="text-white mt-2"
                    style={{ textTransform: "uppercase", fontSize: "1.6rem" }}
                  >
                    Machine conditions monitoring get easy
                  </h2>
                  <p
                    className="text-white mb-5"
                    style={{
                      fontSize: "1rem",
                      width: "80%",
                      lineHeight: "18px",
                      fontWeight: "100",
                    }}
                  >
                    Enhancing productivity and efficiency with smart mobile
                    applications
                  </p>
                  <img
                    style={{ width: "65%", margin: "auto" }}
                    src="/img/others/machinefirst.svg"
                    alt="..."
                  />
                </div>
              </div>
              <div>
                <div
                  style={{
                    backgroundImage: "url(/img/others/Rectanglegreen.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    // width: '680px',
                    // borderRadius: '20px',
                    padding: "5rem",
                    backgroundPosition: "center",
                    // height: '680px'
                  }}
                >
                  <h2
                    className="text-white mt-2"
                    style={{
                      textTransform: "uppercase",
                      fontSize: "1.6rem",
                      width: "80%",
                    }}
                  >
                    Get ON-SITE MAINTENANCE SERVICES
                  </h2>
                  <p
                    className="text-white mb-5"
                    style={{
                      fontSize: "1rem",
                      width: "70%",
                      lineHeight: "18px",
                      fontWeight: "100",
                    }}
                  >
                    Our expert team deliver best on site maintenance services{" "}
                  </p>
                  <img
                    style={{ width: "65%", margin: "auto" }}
                    src="/img/others/machinetwo.svg"
                    alt="..."
                  />
                </div>
              </div>
              <div>
                <div
                  style={{
                    backgroundImage: "url(/img/others/Rectangleorange.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    width: "100%",
                    // borderRadius: '20px',
                    padding: "5rem",
                    // backgroundPosition: 'center',
                    height: "100%",
                  }}
                >
                  <h2
                    className="text-white mt-2"
                    style={{
                      textTransform: "uppercase",
                      fontSize: "1.6rem",
                      width: "80%",
                    }}
                  >
                    Get INSTANT QUOTATION ON INQURIY
                  </h2>
                  <p
                    className="text-white mb-5"
                    style={{
                      fontSize: "1rem",
                      width: "70%",
                      lineHeight: "18px",
                      fontWeight: "100",
                    }}
                  >
                    Generate quick quotation for your problems you inquire.
                  </p>
                  <img
                    style={{ width: "65%", margin: "auto" }}
                    src="/img/others/machinethree.svg"
                    alt="..."
                  />
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
      <Modal
        title="Sign Up"
        visible={visibleModal}
        onOk={() => {
          //   onFinish();
          form.submit();
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" },
            { pattern: /^[a-zA-Z\s]*$/, message: "Please enter a valid name!" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Company Name"
          // name="company_name"
          // rules={[
          //   { required: true, message: "Please input your company name!" },
          // ]}
          >
            <AutoComplete
              options={options} // List of company suggestions
              onSearch={fetchCompanies} // API call on typing
              onSelect={(value) => setSearchValue(value)} // Sets selected value
              onChange={(value) => setSearchValue(value)} // Allows free text input
              value={searchValue} // Keeps input value controlled
            >
              <Input placeholder="Search or enter company name" />
            </AutoComplete>
            {loading && <Spin size="small" style={{ marginLeft: 10 }} />}
          </Form.Item>
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your email",
              },
              {
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined className="text-primary" />} />
          </Form.Item>
          {/* <Form.Item
            name="nric_fin_number"
            label="NRIC/FIN Number"
            rules={[
              {
                required: true,
                message: "Please input your NRIC/FIN number!",
              },
              {
                pattern: /^[STFG]\d{7}[A-Z]$/,
                message: "Please enter a valid NRIC/FIN number!",
              }
            ]}
          >
            <Input />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default LoginOne;

{
  /* <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={7}> */
}
{
  /* <Card>
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
            </Card> */
}
{
  /* </Col>
        </Row> */
}
