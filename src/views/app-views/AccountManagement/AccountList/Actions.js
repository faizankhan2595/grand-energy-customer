import React from 'react'
// import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import EllipsisDropdown from '../../../../components/shared-components/EllipsisDropdown/index'
import { Menu } from 'antd'

const Actions = () =>  {
	return (
		<EllipsisDropdown menu={
			<Menu>
				<Menu.Item>
					<span>Menu Item 1</span>
				</Menu.Item>
				<Menu.Item>
					<span>Menu Item 2</span>
				</Menu.Item>
				<Menu.Item>
					<span>Menu Item 3</span>
				</Menu.Item>
			</Menu>
		}/>
  );
	}


export default Actions;