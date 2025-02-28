import React from 'react'
import ChartWidget from 'components/shared-components/ChartWidget'

import Button from 'antd/es/button'
import { Divider, Select } from 'antd'

export const BarChart = () => {

	const uniqueVisitorsData = {
		series: [
			{
				name: "Session Duration",
				data: [45, 52, 38, 24, 33, 26, 21]
			},
			{
				name: "Page Views",
				data: [35, 41, 62, 42, 13, 18, 29]
			}
		],
		categories:[
			'01 Jan', 
			'02 Jan', 
			'03 Jan', 
			'04 Jan', 
			'05 Jan', 
			'06 Jan', 
			'07 Jan'
		]
	}

	return (
		<ChartWidget 
			series={uniqueVisitorsData.series} 
			xAxis={uniqueVisitorsData.categories} 
			title="Open Vs Closed Orders"
      card={true}
			height={400}
			type="bar"
			customOptions={
				{
					colors: ['#38BDF8', '#6366F1']
				}
			}
			extra={
				<> <Select placeholder="This Year"/>
				
				</>
				
			}
		/>
	)
}