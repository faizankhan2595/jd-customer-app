import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { UserOutlined, PhoneOutlined, BankOutlined } from '@ant-design/icons';
import { Button, Form, Input, Alert, Row, Col, AutoComplete } from "antd";
import { showAuthMessage, showLoading, hideAuthMessage, authenticated } from 'redux/actions/Auth';
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"
import JwtAuthService from 'services/JwtAuthService'
import PhoneCode from 'utils/PhoneCode'

const rules = {
	name: [
		{ 
			required: true,
			message: 'Please input your name'
		}
	],
	phoneCode: [
		{ 
			required: true,
			message: 'Please select country code'
		}
	],
	phoneNo: [
		{ 
			required: true,
			message: 'Please input your phone number'
		},
		{
			pattern: /^[0-9]{8,15}$/,
			message: 'Please enter a valid phone number (8-15 digits)'
		}
	],
	company_name: [
		{ 
			required: false
		}
	]
}

export const RegisterForm = (props) => {

	const { showLoading, token, loading, redirect, message, showMessage, hideAuthMessage, authenticated, allowRedirect } = props
	const [form] = Form.useForm();
	const [companies, setCompanies] = useState([]);
	let history = useHistory();

	const onSignUp = () => {
    	form.validateFields().then(values => {
			showLoading()
			// Prepare data for phone-based signup like mobile app
			const signupData = {
				phoneCode: values.phoneCode,
				phoneNo: values.phoneNo,
				name: values.name,
				company_name: values.company_name || null
			}
			JwtAuthService.phoneSignUp(signupData).then(resp => {
				authenticated(resp.data.token)
			}).catch(e => {
				showAuthMessage(e.message || 'Signup failed')
			})
		}).catch(info => {
			console.log('Validate Failed:', info);
		});
	}

	const searchCompanies = async (searchText) => {
		if (searchText && searchText.length > 2) {
			try {
				const result = await JwtAuthService.searchCompanies({ search: searchText })
				if (result.data && result.data.success) {
					const companyOptions = result.data.data.map(company => ({
						value: company.company_name,
						label: company.company_name
					}))
					setCompanies(companyOptions)
				}
			} catch (error) {
				console.log('Company search error:', error)
			}
		} else {
			setCompanies([])
		}
	}

	useEffect(() => {
    	if (token !== null && allowRedirect) {
			history.push(redirect)
		}
		if(showMessage) {
				setTimeout(() => {
				hideAuthMessage();
			}, 3000);
		}
  });
	
	return (
		<>
			<motion.div 
				initial={{ opacity: 0, marginBottom: 0 }} 
				animate={{ 
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0 
				}}> 
				<Alert type="error" showIcon message={message}></Alert>
			</motion.div>
			<Form form={form} layout="vertical" name="register-form" onFinish={onSignUp} initialValues={{ phoneCode: '+65' }}>
				<Form.Item 
					name="name" 
					label="Full Name" 
					rules={rules.name}
					hasFeedback
				>
					<Input prefix={<UserOutlined className="text-primary" />} placeholder="Enter your full name"/>
				</Form.Item>
				<Form.Item 
					name="company_name" 
					label="Company Name (Optional)" 
					rules={rules.company_name}
				>
					<AutoComplete
						options={companies}
						onSearch={searchCompanies}
						placeholder="Enter or search company name"
					>
						<Input prefix={<BankOutlined className="text-primary" />} />
					</AutoComplete>
				</Form.Item>
				<Form.Item label="Phone Number" required>
					<Row gutter={8}>
						<Col span={8}>
							<Form.Item 
								name="phoneCode" 
								rules={rules.phoneCode}
								noStyle
							>
								<PhoneCode />
							</Form.Item>
						</Col>
						<Col span={16}>
							<Form.Item 
								name="phoneNo" 
								rules={rules.phoneNo}
								noStyle
							>
								<Input prefix={<PhoneOutlined className="text-primary" />} placeholder="Phone number" />
							</Form.Item>
						</Col>
					</Row>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Sign Up
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

const mapStateToProps = ({auth}) => {
	const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect }
}

const mapDispatchToProps = {
	showAuthMessage,
	hideAuthMessage,
	showLoading,
	authenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
