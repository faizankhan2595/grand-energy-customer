import React ,{useState} from 'react'

import { Table , Typography} from 'antd'

import Bag from '../Assets/Bag.png'
import Shoes from '../Assets/Shoes.png'
import Cars from '../Assets/Cars.png'
import Spaces from '../Assets/Spaces.png'

import Actions from './Actions'

const {Text} = Typography

const columns = [
  {
    title: "Category Id",
    dataIndex: 'categoryId',
    key: 'categoryId'
  },
  {
    title: "Category Name",
    dataIndex: 'categoryName',
    key: 'categoryName',

    defaultSortOrder: 'descend',
    sorter: (a, b) => a.categoryName - b.categoryName,

    render: (item) => {
      return (
        <div className='d-flex align-items-center'>
          <img src={item.image} className="mr-2"/>
          <Text strong>{item.name}</Text>
        </div>
      )
    }
  },
  {
    title: "No of Products",
    dataIndex: 'noOfProducts',
    key: 'noOfProducts',

    defaultSortOrder: 'descend',
    sorter: (a, b) => a.noOfProducts - b.noOfProducts,
  },
  {
    title: "Created On",
    dataIndex: 'createdOn',
    key: 'createdOn',

    defaultSortOrder: 'descend',
    sorter: (a, b) => a.createdOn - b.createdOn,
  },
  {
    title: "Action",
    dataIndex: 'action',
    key: 'action',
    
    render: () => <Actions/>

    
  },
]

const products = [
  {
    id: "BG-123456",
    name: "Bags",
    image: Bag,
    units: 10
  },
  {
    id: "SH-123456",
    name: "Shoes",
    image: Shoes,
    units: 20
  },
  {
    id: "CR-123456",
    name: "Cars",
    image: Cars,
    units: 20
  },
  {
    id: "HM-123456",
    name: "Spaces",
    image: Spaces,
    units: 10
  },
  {
    id: "BG-123456",
    name: "Bags",
    image: Bag,
    units: 10
  },
]

const dataSource = []


for(let i = 0 ; i < 5 ; i++){
  dataSource.push({
    key: i + 1,
    categoryId: products[i].id,
    categoryName: {name: products[i].name, image: products[i].image},
    noOfProducts: products[i].units,
    createdOn: "20/08/2022"
  })
}

const CategoryTable = () => {

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const selectChangeHandler = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: selectChangeHandler,
  };
  return (
    <Table columns={columns} dataSource={dataSource} rowSelection={rowSelection}/>
  )
}

export default CategoryTable