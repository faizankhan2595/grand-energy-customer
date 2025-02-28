import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import React from 'react';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 32,
      color: '#1890ff',
    }}
  />
);

const SearchBox = ({setSearchText}) => {

  const onSearch = (value) => {
    console.log(value);
    setSearchText(value)
  }

  return (
  <Space direction="vertical">
    
    <Search
      placeholder="Search"
      allowClear
      onChange={(e)=>setSearchText(e.target.value)}
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    />
    
  </Space>
);
}
export default SearchBox;