import React from 'react'
import { Card, Avatar } from 'antd'
import Flex from '../Flex'
import CustomStatistic from '../CustomStatistic'

import './index.css';

const DataDisplayWidget = props => {
	const { size, value, title, text , icon, color, avatarSize, vertical, alignItems , elementName , iconBgColor } = props
	const customStatisticProps = { size, value, text , elementName }
	
	return (
		<Card className={elementName} style={{overflow: "hidden"}}>
			<Flex elementName={elementName} alignItems={alignItems} flexDirection={vertical ? 'column' : 'row'} >
				{/* {icon && <Avatar size={avatarSize} shape="square" icon={icon} className={`ant-avatar-${color} mb-4`} />} */}

				{icon && <div className='icon' style={{background: iconBgColor}}>
					<img src={icon}></img>
				</div>}
					
				<div className='title'>{title}</div>
				<div className={vertical ? 'mt-3 ' : 'ml-3'}>
					<CustomStatistic {...customStatisticProps}/>
				</div>
			</Flex>
		</Card>
	)
}

DataDisplayWidget.defaultProps = {
	avatarSize: 50,
	vertical: false
};

export default DataDisplayWidget
