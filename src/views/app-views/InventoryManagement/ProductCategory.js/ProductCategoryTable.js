import React, { useState } from "react";
import { Table, Button, Tag , Typography } from "antd";
import SprayPaintImg from "assets/SprayPaint.png"
import Actions from "./Actions";
import moment from "moment";

const {Text} = Typography;

const columns = [
  {
    title: "Category Id",
    dataIndex: "id",
  },
  {
    title: "Category Name",
    dataIndex: "category",
    // defaultSortOrder: "descend",
    // sorter: (a, b) => a.category - b.category,
    
  },
  {
    title: "Created On",
    dataIndex: "created_at",
    // defaultSortOrder: "descend",
    // sorter: (a, b) => a.brand - b.brand,
    render: (_,record) => <div>{moment(record.created_at).format('DD-MM-YYYY')}</div>,
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => <Actions />,
  },
];

const data = [
    {
      key: 1,
      id: "#1234",
      name: {text: "Spray Paint" , image: SprayPaintImg},
      category: "Colours",
      brand: "ABC Shine",
      lastPurchase: "20/08/2022",
      qty: "20",
      price: "S$120.23",
      status: "Out of Stock",
    },
  ];

const ProductCategoryTable = () => {
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
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
}

export default ProductCategoryTable