import React from 'react'
import LoginForm from '../../components/LoginForm'
import { Row, Col } from "antd";
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from "react-router-dom";

// const backgroundURL = '/img/others/img-17.jpg'
const backgroundURL = '/img/others/img-login.jpg'
const backgroundStyle = {
	backgroundImage: `url(${backgroundURL})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	boxShadow: 'inset 0 0 0 1000px rgba(87, 114, 255, 0.8)',
}

const LoginTwo = props => {
	const theme = useSelector(state => state.theme.currentTheme);
	let history = useHistory();
	const match = useRouteMatch();

	return (
		<div className={`h-100 ${theme === 'light' ? 'bg-white' : ''}`}>
			<Row justify="center" className="align-items-stretch h-100">
				<Col xs={0} sm={0} md={0} lg={8}>
					<div className="d-flex flex-column justify-content-between h-100 px-4 pt-2" style={backgroundStyle}>
						<div className="text-left">
							<img src="/img/grand-energy-logo-white.png" alt="logo" style={{height: '60px'}}/>
						</div>
						<Row justify="center">
							{/* <Col xs={0} sm={0} md={0} lg={20}>
								<img className="img-fluid mb-5" src="/img/others/img-login.png" alt=""/>
								<h1 className="text-white">Welcome to emilus</h1>
								<p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel convallis elit fermentum pellentesque.</p>
							</Col> */}
						</Row>
						<div className="d-flex justify-content-end pb-4">
							<div>
								{/* <span className="text-white" style={{cursor: 'pointer'}} onClick={e => {
									e.preventDefault();
									history.push(`/auth/terms-and-conditions-web`);
								}}>Terms & Conditions</span> */}
								{/* <span className="mx-2 text-white"> | </span>
								<a className="text-white" href="/#" onClick={e => e.preventDefault()}>Privacy & Policy</a> */}
							</div>
						</div>
					</div>
				</Col>
				<Col xs={20} sm={20} md={24} lg={16}>
					<div className="container d-flex flex-column justify-content-center h-100">
						<Row justify="center">
							<Col xs={24} sm={24} md={20} lg={12} xl={8}>
								{/* <h1>Sign In</h1> */}
								<h1>Login</h1>
								{/* <p>Don't have an account yet? <a href="/auth/register-2">Sign Up</a></p> */}
								<div className="mt-4">
									<LoginForm {...props}/>
								</div>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default LoginTwo
