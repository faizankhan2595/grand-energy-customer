import React from 'react'

import { Button , Card} from 'antd';

import Bag1 from 'assets/Bag1.png'
import Bag2 from 'assets/Bag2.png'
import Bag3 from 'assets/Bag3.png'
import Bag4 from 'assets/Bag4.png'

import ImageUpload from 'views/app-views/ItemsAndServices/Quotations/ImageUpload';

const Images = (props) => {

  const nextHandler = () => {
    props.drawerHandler();
  }

  const backHandler = () => {
    props.prev();
  }
  return (
    <React.Fragment>
      <Card>
        <ImageUpload/>

        <div className='d-flex justify-content-around'>
          <img src={Bag1}/>
          <img src={Bag2}/>
          <img src={Bag3}/>
          <img src={Bag4}/>
        </div>
      </Card>

      <div className="d-flex justify-content-end actions">
        <Button onClick={backHandler}>Back</Button>
          <Button type="primary" onClick={nextHandler}>Next</Button>
      </div>
    </React.Fragment>
  )
}

export default Images