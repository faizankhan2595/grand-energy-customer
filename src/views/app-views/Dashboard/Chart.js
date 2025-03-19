import React from 'react'
import ChartWidget from 'components/shared-components/ChartWidget'

import './Chart.css'

 const Chart = () => {

	const visitorChartData = {
  	series: [
			// {
			// 	name: "Forcasted Revenue",
			// 	data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
			// },
			{
				name: "Total Spends",
				data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
			}
		],
		categories:[
			'01 Jan', 
			'02 Jan', 
			'03 Jan', 
			'04 Jan', 
			'05 Jan', 
			'06 Jan', 
			'07 Jan', 
			'08 Jan', 
			'09 Jan',
			'10 Jan', 
			'11 Jan', 
			'12 Jan'
		]
	}
	return (
		<ChartWidget 
			title="Total Spends" 
			series={visitorChartData.series} 
			xAxis={visitorChartData.categories} 
			height={500}
		/>
	)
}

export default Chart;