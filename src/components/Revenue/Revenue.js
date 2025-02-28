

import React from 'react'
import DataDisplayWidget from 'components/shared-components/DataDisplayWidget'
import { BarChartOutlined } from '@ant-design/icons';
import { Card } from 'antd';

 const Revenue = () =>  {
	return (
		<div className="d-flex flex-column justify-content-start">
			
			<div style={{maxWidth: 562}} className="justify-content-start">
				<DataDisplayWidget 
					icon={<BarChartOutlined />}
					value="$37,212"
					title="Net Profit"
					color="cyan"
					size={'lg'}
					avatarSize={50}
					vertical={true}
					className="justify-content-start"
				/>
			</div>
		</div>
	)
	}

export default Revenue;
