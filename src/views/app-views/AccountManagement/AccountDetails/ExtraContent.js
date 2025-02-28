import React from 'react'

import {Button} from 'antd'
import SearchBox from '../../../../components/shared-components/SearchBox'
import Filter from '../../../../components/shared-components/Filter'

import filterIcon from 'assets/svg/filterIcon.svg'

const ExtraContent = () => {
  return (
    <div>
      <div className=" d-flex align-items-center justify-content-between">
          <SearchBox />
          <Filter>
            <Button className="d-flex align-items-center ml-2">
              <img className="mr-2" src={filterIcon} alt="filterIcon"></img>
              Filters
            </Button>
          </Filter>

          
        </div>
    </div>
  )
}

export default ExtraContent