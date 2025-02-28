import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { Table, Space, Typography, Modal, Button } from "antd";
import _ from "lodash";

import avatar from "assets/Avatar2.png";
import Actions from "./Actions";
import axios from "axios";

const { Text } = Typography;

let deleteHandler;

const data2 = [
  {
    key: 1,
    userId: "HC-12345",
    userName: {image: avatar , name: "John Smith"},
    role: "Manager",
    phoneNumber: "+65 123456789",
    emailId: "johnsmith@gmail.com",
    nationality: "Singaporean",
    gender: "Male",
    action: "",
  },
];
for (let i = 2; i <= 10; i++) {
  data2.push({
    key: i,
    userId: `HC-12345${i}`,
    image: "",
    userName: {image: avatar , name: "John Smith"},
    role: "Manager",
    phoneNumber: "+65 123456789",
    emailId: "johnsmith@gmail.com",
    nationality: "Singaporean",
    gender: "Male",
    action: "",
  });
}

const UserListTable = (props) => {
  // const { setError } = props;

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedUsers, setLoadedUsers] = useState(data2);
  const [backendData , setBackendData] = useState([]);
  const { searchText, onGetEditUser } = props;

  const getUsers = async () => {
    let response;
    setIsLoading(true);
    try {
      response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/get-all-users`
      );
      // console.log(response);
      if (response.data.success) {
        setBackendData(response.data.data);
        setLoadedUsers(
          backendData.map((item, index) => {
            return {
              key: index,
              userId: item.id,

              userName: {
                image: item.profile_pic || avatar,
                name: item.fullname,
              },
              role: _.startCase(item.role_name),
              phoneNumber: item.phone,
              emailId: item.email,
              nationality: item.nationality,
              gender: item.gender,
            };
          })
        );
        // console.log(response.data.data);
        // onGetData(loadedUsers);
        // console.log(loadedUsers);
      } else {
        throw new Error(response.data.message || "Something went Wrong");
      }
      // setError("e");
    } catch (err) {
      Modal.error({
        title: "Can't Load Users",
        content: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    // getUsers();
  }, [backendData ]);

  const columns = [
    {
      title: "User Id",
      dataIndex: "userId",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          _.isMatch(_.toLower(record.userName.name), _.toLower(value)) ||
          _.isMatch(_.toLower(record.userId), _.toLower(value)) ||
          _.isMatch(_.toLower(record.role), _.toLower(value)) ||
          _.isMatch(record.phoneNumber, value) ||
          _.isMatch(_.toLower(record.emailId), _.toLower(value)) ||
          _.isMatch(_.toLower(record.nationality), _.toLower(value)) ||
          _.isMatch(_.toLower(record.gender), _.toLower(value))
        );
      },

      defaultSortOrder: "descend",

      sorter: (a, b) => a.age - b.age,

      render: (item) => {
        const { image, name } = item;
        return (
          <Space size={40}>
            <img src={image} />
            {name}
          </Space>
        );
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Email Id",
      dataIndex: "emailId",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Action",
      dataIndex: "action",

      render: (_, record) => {
        const id = record.userId;
        // console.log(id);
        const [editUser] = backendData.filter((user) => user.id == id);
        
        
        return (
          <Actions
            id={id}
            onDelete={deleteHandler}
            
            editUser={editUser}
          />
        );
      },
    },
  ];

  deleteHandler = async (id) => {
    try {
      setIsLoading(true);
      // const res = await axios.delete(
      //   process.env.REACT_APP_BACKEND_URL + `/users/delete-user/${id}`
      // );
      // if (!res.data.success) {
      //   throw new Error(res.data.data);
      // }

      setLoadedUsers((prev) => prev.filter((item) => item.userId !== id));
      // setLoadedUsers((prev) => prev.filter((item) => item.userId !== id));
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(loadedUsers);

  // console.log(data.length);

  // if(data.length === 0){
  //   data = data2;
  // }

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
      {/* <Button onClick={modal2}> modal</Button> */}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={loadedUsers}
        loading={isLoading}
      />
    </div>
  );
};

export default UserListTable;
