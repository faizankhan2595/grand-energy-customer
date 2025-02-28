import React from 'react'
import RegisterForm from '../../components/RegisterForm'
import { Row, Col } from "antd";
import { useSelector } from 'react-redux'

const backgroundURL = '/img/others/img-login.jpg'
const backgroundStyle = {
	backgroundImage: `url(${backgroundURL})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	boxShadow: 'inset 0 0 0 1000px rgba(87, 114, 255, 0.8)',
}

const RegisterTwo = props => {
	const theme = useSelector(state => state.theme.currentTheme)

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
								<img className="img-fluid mb-5" src="/img/others/img-19.png" alt=""/>
								<h1 className="text-white">Welcome to emilus</h1>
								<p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel convallis elit fermentum pellentesque.</p>
							</Col> */}
						</Row>
						<div className="d-flex justify-content-end pb-4">
							<div>
								{/* <a className="text-white" href="/#" onClick={e => e.preventDefault()}>Term & Conditions</a>
								<span className="mx-2 text-white"> | </span>
								<a className="text-white" href="/#" onClick={e => e.preventDefault()}>Privacy & Policy</a> */}
							</div>
						</div>
					</div>
				</Col>
				<Col xs={20} sm={20} md={24} lg={16}>
					<div className="container d-flex flex-column justify-content-center h-100">
						<Row justify="center">
							<Col xs={24} sm={24} md={20} lg={12} xl={8}>
								<h1>Sign Up</h1>
								<p>Already have an account? <a href="/auth/login-2">Sign In</a></p>
								<div className="mt-4">
									<RegisterForm {...props} />
								</div>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default RegisterTwo
