import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import React from "react";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
// const onSearch = (value) => console.log(value);
const SearchBox = (props) => {
  // const {placeholder , onSearch} = props

  const placeholder = props.placeholder?props.placeholder : "input search text";
  const onSearch = props.onSearch;
  const onChange = props.onChange;
  return (
    <Space direction="vertical">
      <Search
        placeholder={placeholder}
        allowClear
        onSearch={onSearch}
        onChange={onChange}
        style={{
          width: 200,
        }}
      />
    </Space>
  );
};
export default SearchBox;
