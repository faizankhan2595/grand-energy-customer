import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, Divider, Alert, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { GoogleSVG, FacebookSVG } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import {  
	showLoading, 
	showAuthMessage, 
	hideAuthMessage,
	authenticated
} from 'redux/actions/Auth';
import JwtAuthService from 'services/JwtAuthService'
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"
import axios from 'axios';

export const LoginForm = (props) => {
	let history = useHistory();
	const [agreeToTc, setAgreeToTc] = useState(false)

	const { 
		otherSignIn, 
		showForgetPassword, 
		hideAuthMessage,
		onForgetPasswordClick,
		showLoading,
		extra,
		loading,
		showMessage,
		message,
		authenticated,
		showAuthMessage,
		token,
		redirect,
		allowRedirect
	} = props

	const onLogin = values => {
		// showLoading()
		axios({
			method: "post",
			url: "/api/mobile-app/login",
			data: {
				email: values.email,
				password: values.password,
				// cristophori: true,
				grandEneryCustomer: true
			},
		})
		.then((response) => {
			showLoading(false)
			const res = response.data;
			console.log(res)
			if (res.token.token) {
				const user = res.user;
				const customer = res.customer;
				const associate_user = res.customer_user;
				console.log(user)
				// console.log(localStorage.getItem("token"))
				localStorage.clear();
				axios.defaults.headers.common['Authorization'] = 'Bearer '+ response.data.token.token;
				localStorage.setItem("token", res.token.token);
				localStorage.setItem("user_id", user.id);

				localStorage.setItem("customer_id", customer.id);
				localStorage.setItem("customer_name", customer.name);

				localStorage.setItem("associate_user_id", associate_user.id);
				localStorage.setItem("name", associate_user.name);
				localStorage.setItem("email", associate_user.email);
				localStorage.setItem("profile_pic", associate_user.profile_pic);
				history.push(redirect)
				return true;
			} else {
				if (res.errors) {
					console.log(res.errors.message);
					message.error(res.errors.message);
				} else {
					message.error("Something went wrong! please try again later");
				}
				return false;
			}
		})
		.catch((err) => {
			console.log(err);

			localStorage.removeItem("name");
			localStorage.removeItem("email");
			localStorage.removeItem("profile_pic");

			// message.error('Invalid token expired, please login again');
			return false;
		});
	};

	
	useEffect(() => {
		if (token !== null && allowRedirect) {
			// history.push(redirect)
		}
		if(showMessage) {
			setTimeout(() => {
				hideAuthMessage();
			}, 3000);
		}
	});
	
	// const onSignup = () => {
	// 	history.push("/auth/register-2")
	// }

	// const renderOtherSignIn = (
		// 	<div>
		// 		<Divider>
		// 			<span className="text-muted font-size-base font-weight-normal">or</span>
		// 		</Divider>
		// 		<div className="d-flex justify-content-center">
		// 			<Button 
		// 				onClick={() => onSignup()} 
		// 				className="w-100"
		// 				type='default'
		// 				disabled={loading}
	// 			>
	// 				Sign Up
	// 			</Button>
	// 		</div>
	// 	</div>
	// )

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
			<Form 
				layout="vertical" 
				name="login-form"
				onFinish={onLogin}
			>
				<Form.Item 
					name="email" 
					label="Email" 
					rules={[
						{ 
							required: true,
							message: 'Please input your email',
						},
						{ 
							type: 'email',
							message: 'Please enter a validate email!'
						}
					]}>
					<Input prefix={<MailOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="password" 
					label={
						<div className={`${showForgetPassword? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
							<span>Password</span>
							{
								showForgetPassword && 
								<span 
									onClick={() => onForgetPasswordClick} 
									className="cursor-pointer font-size-sm font-weight-normal text-muted"
								>
									Forget Password?
								</span>
							} 
						</div>
					} 
					rules={[
						{ 
							required: true,
							message: 'Please input your password',
						}
					]}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				{/* <Form.Item>
					<Checkbox checked={agreeToTc} onClick={(e) => setAgreeToTc(prev => !prev)}>
					I agree to <span style={{color: '#3e79f7'}} onClick={e => {
									e.preventDefault();
									history.push(`/auth/terms-and-conditions-web`);
								}}>terms & conditions</span>
                    </Checkbox>
				</Form.Item> */}
				<Form.Item>
					<Button type="primary" htmlType="submit" block>
						Sign In
					</Button>
				</Form.Item>
				{/* {
					otherSignIn ? renderOtherSignIn : null
				} */}
				{ extra }
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	// otherSignIn: false,
	showForgetPassword: false
};

const mapStateToProps = ({auth}) => {
	const {loading, message, showMessage, token, redirect} = auth;
  	return {loading, message, showMessage, token, redirect}
}

const mapDispatchToProps = {
	showAuthMessage,
	showLoading,
	hideAuthMessage,
	authenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
