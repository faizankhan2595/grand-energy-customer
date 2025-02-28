import { Avatar, Button, Divider, Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import './Bottom.css'
import Icon from '@ant-design/icons'
import { DocFileIcon, MicIcon, PhotoIcon, SendIcon, VideoIcon } from 'assets/svg/icon'
import moment from 'moment'
import axios from 'axios'
import { useForm } from 'antd/lib/form/Form'


function Bottom(props) {
  const myId = 1
  const senderId = 0
  const tok = localStorage.getItem('token')  
  console.log(props.allChats)
  const [form] = useForm()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (url) => {
    setIsModalOpen(url);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const submitForm = (val) => {
  //   console.log(val)
  // }

  const submitForm = (val) => {
    // console.log(val)
    axios({
      method: "POST",
      url: '/api/chat/send-message',
      headers: {
        Authorization: `Bearer ${tok}`
      },
      data: {
        "chat_id": props?.id,
        "chat_message": val.text,
        "chat_message_type": "TEXT",
      }
    }).then((res) => {
      console.log(res)
      form.resetFields()
    }).catch((err) => {
      console.log(err)
    })
  }


  return (
    <div className='BottomChatsRight'>
      <div className='chatBody'>
        <Divider><span className='text-primary font-size-sm font-weight-bold'>Yesterday</span></Divider>
        {/* <div className='BottomRightMsgContainer'>
          <Avatar className='ProfileIconChatBody' size='large' src="http://enlink.themenate.net/assets/images/avatars/thumb-3.jpg" />
          <div className='BottomRightMsgDetails'>
            <p className='BottomRightMsg' >Hello !</p>
            <p className='BottomRightTime' >9:00</p>
          </div>
        </div> */}
        {props.allChats?.map((data, i) => {
          return <div key={i} className={`BottomRightMsgContainer ${myId === senderId && 'myMsg'} `}>
            {myId !== senderId && <Avatar className='ProfileIconChatBody' size='large' src={data?.profile_pic} />}
            <div className={`BottomRightMsgDetails ${myId === senderId && 'myMsg'}`}>
              {data.chat_message_type === "TEXT" && <p className={`BottomRightMsg ${myId === senderId && 'myMsg'} `} >{data?.chat_message}</p>}
              {data.chat_message_type === "IMAGE" && <div onClick={() => showModal(data?.chat_message)} className={`cursor-pointer BottomRightMsg ${myId === senderId && 'myMsg'} `}> <img src={data?.chat_message} width="200px" /></div>}
              <p className={`BottomRightTime ${myId === senderId && 'myMsg'} `} >{moment(data?.created_at, "HH:mm").format("hh:mm A")}</p>
            </div>
          </div>
        })}
        {isModalOpen && <Modal title={isModalOpen.substring(isModalOpen?.lastIndexOf("/") + 1)} visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
          <img height="60%" width="100%" src={isModalOpen} alt="" />
        </Modal>}

      </div>
      <div className='ChatBodyFormContainer'>
        <Form
          onFinish={submitForm}
          form={form}
        >
          <Form.Item name='text'>
            <Input style={{marginBottom:"24px"}} className='ChatBodyFormContainerInput' placeholder='Type a message...' />
          </Form.Item>
          <div className='ChatBodyFormContainerIconsContainer'>
            <div className='ChatBodyFormContainerIcons'>
              <Icon component={PhotoIcon} />
              <Icon component={VideoIcon} />
              <Icon component={DocFileIcon} />
              <Icon component={MicIcon} />
            </div>
            <Form.Item>
              <Button className='submitBtn' type='ghost' htmlType='submit' icon={<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.227 16.9482C1.71176 17.4329 2.43889 17.377 3.26546 17.0103L18.1002 10.3791C18.4793 10.2113 18.7838 10.0311 18.9951 9.81978C19.4364 9.37853 19.4364 8.81919 18.9889 8.37173C18.7838 8.16664 18.4793 7.97398 18.1002 7.80618L3.19709 1.15634C2.45753 0.826954 1.71797 0.758591 1.23322 1.24335C0.64281 1.83375 0.860328 2.49874 1.28293 3.29423L3.52026 7.49544C3.81858 8.0672 4.0796 8.3158 4.67 8.33444L18.007 8.84405C18.1748 8.85027 18.268 8.96835 18.2742 9.09886C18.2804 9.22937 18.1686 9.34124 18.0132 9.34745L4.67622 9.88193C4.1231 9.913 3.82479 10.1616 3.52026 10.7271L1.32022 14.8413C0.872757 15.6617 0.63038 16.3515 1.227 16.9482Z" fill="#F78DA7" />
              </svg>}></Button>
            </Form.Item>
            {/* <Icon component={SendIcon} /> */}
          </div>
        </Form>

      </div>

    </div>
  )
}

export default Bottom