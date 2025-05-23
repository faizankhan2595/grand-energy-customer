import React, { useState, useEffect } from "react";
import { Divider, Typography, Form, Input, Button } from "antd";
import Icon, { SendOutlined } from "@ant-design/icons";
import { SendIcon } from "assets/svg/icon";
import Actions from "./Actions";
import ProfilePic from "assets/PrimaryAccount.png";
import GrePic from "assets/grand-energy-logo-small.png";
// Import statements
import TextArea from "antd/lib/input/TextArea";
import "./Bottom.css";
import axios from "axios";
import moment from "moment";

const { Title, Text } = Typography;

const ChatingSection = ({ selectedChat }) => {
  const [chatId, setChatId] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [allGreAdmins, setAllGreAdmins] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [greData, setGreData] = useState({});
  const [count, setCount] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const customer_id = localStorage.getItem("customer_id");
  const customer_name = localStorage.getItem("customer_name");
  const associate_name = localStorage.getItem("name");
  const user_id = localStorage.getItem("user_id");

  const getGreData = () => {
    axios({
      method: 'post',
      url: "/api/tc/get-contact-details",
      data: {},
      // headers: {
      //     Authorization: `Bearer ${tok}`
      // },
    }).then(function (response) {
        console.log(response.data);
            
        let res = response.data.data
        setGreData(res);
    }).catch(function (error) {
        console.log(error);
    });
  }

  const sendMessage = () => {
    if(messageInput.trim().length >= 1) {
      axios({
        method: 'post',
        url: "/api/chat/send-message",
        data: {
          chat_id: chatId,
          chat_message: messageInput,
          chat_message_type: 'group',
        },
      }).then(function (response) {
        // const newMessage = {
        //   chat_message: messageInput,
        //   user_id: user_id,
        //   messenger_name: "You",
        //   created_at: new Date().toISOString(),
        // };
        // setChatMessages((prev) => [newMessage, ...prev]);

        setMessageInput("");
        getChatMessages(chatId);
      }).catch(function (error) {
          console.log(error);
      });
    }
  }

  const getChatMessages = (id) => {
    axios
    .post(
        "/api/chat/get-chat-messages",
        {
          chat_id: id
        },
      )
      .then((response) => {
        let res = response.data;
        // console.log(res);
        setChatMessages(res.messages.data.reverse())
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getAllAdmins = () => {
    axios
    .post(
        '/api/hrms/all-users',
        {
          page_index: 1,
          page_size: 100000,
        },
      )
      .then((response) => {
        let res = response.data;
        let users = res.all_users.data
        console.log(res.all_users.data);
        console.log(res);
        let ids = []
        for(let item of users) {
          let access = JSON.parse(item.can_access)
          if(access.ops_admin
            // && access.support_system
          ) {
            console.log(item)
            ids.push(item.id)
          }
        }
        setAllGreAdmins(ids);
        createOrGetChat();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const createOrGetChat = () => {
    axios
    .post(
        "/api/chat/create-or-get-chat",
        {
          user_ids: [+user_id, 16, ...allGreAdmins],
          chat_name: customer_name+' - '+associate_name,
          chat_type: "group",
          chat_module: "inquiry",
        },
      )
      .then((response) => {
        let res = response.data;
        console.log(res);
        getChatMessages(res.chat_id);
        if(res.chat_id) setChatId(res.chat_id)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getDateTime = (date) => {
    let message_date = moment(date).format("D-MM-YY");
    let message_time = moment(date).format("hh:mm A");
    if(moment(date) == moment(new Date())) {
      message_date = 'Today'
    }
    // return message_date + ' ' + message_time
    return message_time
  }

  useEffect(() => {
    getGreData();
    getAllAdmins();
    // createOrGetChat();
  }, []);

  useEffect(() => {
    let timeout_id = setTimeout(() => {
      if(chatId) getChatMessages(chatId);
      setCount(count => count+1)
    }, 10000);
    setTimeoutId(timeout_id);

    return () => {
      // This is the cleanup function
      // It will be called when the component is unmounted
      clearTimeout(timeoutId)
    };
  }, [count]);

  return (
    <div style={{ height: '100%', display: 'flex', width: "100%", flexDirection: 'column' }}>
      {/* Header with user info and actions */}
      <div style={{ padding: '16px 20px' }}>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <div style={{ width: "5rem" }} className="mr-3">
              <img
                style={{
                  width: "100%",
                  objectFit: "cover",
                  padding: '6px 5px'
                  // borderRadius: "50%",
                  // backgroundColor: '#d6d6d6',
                }}
                src={GrePic}
                alt="Profile"
              />
            </div>
            <div>
              <Title level={4} style={{ margin: 0 }}>Grand Energy Technologies</Title>
              <Text>{greData.mobile}</Text>
            </div>
          </div>
          {/* <Actions /> */}
        </div>
      </div>
      <Divider style={{ margin: '0 0 10px 0' }} />

      {/* Chat body - message area */}
      <div className="chat-body-container" style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div
          id="scrollableDiv"
          className="chatBody"
          style={{
            height: 'auto',
            flexGrow: 1,
            padding: '10px 20px 20px 20px',
            display: 'flex',
            flexDirection: 'column-reverse',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {chatMessages.map((message, index) => {
              const myMsg = message.user_id === +user_id;
              console.log(user_id);

              return (
                <div
                  key={index}
                  className={`BottomRightMsgContainer ${myMsg ? "myMsg" : ""}`}
                  style={{
                    margin: '8px 0',
                  }}
                >
                  <div
                    className={`d-flex flex-column justify-content-end ${myMsg ? "align-items-end" : "align-items-start"
                      }`}
                    style={{ width: '100%' }}
                  >
                    <div style={{ fontSize: '10px', marginBottom: '2px' }}>
                      {message.user_id === +user_id ? "You" : message.name}
                    </div>
                    <div className={`BottomRightMsg ${myMsg ? "myMsg" : ""}`}>
                      {message.chat_message}
                    </div>
                    <div className={`BottomRightTime ${myMsg ? "myMsg" : ""}`}>
                      {message.created_at
                        ? getDateTime(message.created_at)
                        : ""}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message input area */}
        <div style={{ padding: '15px 20px', borderTop: '1px solid #f0f0f0' }}>
          <Form>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap:"10px"
            }}>
              <div style={{
                flexGrow: 1,
              }}>
                <TextArea
                  rows={1}
                  style={{
                    borderRadius: '8px',
                    resize: 'none',
                    padding: '8px 12px'
                  }}
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  // marginTop: '8px',
                  height: '100%'
                }}
              >
                <Button
                  onClick={sendMessage}
                  disabled={messageInput.trim().length < 1}
                  type="primary"
                >
                  <SendOutlined />
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatingSection;

// import React from "react";
// import { Typography } from "antd";
// import Actions from "./Actions";
// import ProfilePic from "assets/PrimaryAccount.png";
// const { Title, Text } = Typography;

// const ChatingSection = () => {
//   return (
//     <div className="d-flex justify-content-between">
//       <div className="d-flex">
//         <div style={{ width: "4rem" }} className="mr-3">
//           <img style={{ width: "100%" }} src={ProfilePic} />
//         </div>
//         <div>
//           <Title strong level={4}>Johm Smith</Title>
//           <Text>+65 123456789</Text>
//         </div>
//       </div>
//       <Actions  />
//     </div>
//   );
// };

// export default ChatingSection;
