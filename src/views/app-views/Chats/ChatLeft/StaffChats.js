import React from 'react'
import ChatOutline from '../ChatOutline'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import './StaffChats.css'
import { connect } from 'react-redux';


function StaffChats(props) {

  // console.log(props)
  const tok = localStorage.getItem('token')
  const [allUsers, setAllUsers] = useState([])

  const getAllUsers = () => {
    axios({
      method: "POST",
      url: '/api/chat/get-all-chats-for-user',
      headers: {
        Authorization: `Bearer ${tok}`
      },
      data: {
        "per_page": 1000,
        "chat_module": "ticket"
      }
    }).then((res) => {
      console.log(res)
      props.setStaff(res.data.chats.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const onClick = (e) => {
    console.log('click ', e);
    // setCurrent(e.key);
  };

  useEffect(() => {
    getAllUsers()
  }, [])


  return (
    <div className='staffChats'>

      {
        props?.stafUser?.map((data, i) => {
          return <ChatOutline type={data.chat_type} id={data?.id} name={data?.chat_name} profilePic='' lastSeen='' lastMsg={data?.last_message} msgCount={data?.unread_messages} />
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  stafUser : state.chat.stafUser,
  customerUser : state.chat.customerUser,
  groupUser : state.chat.groupUser,
  activeChat : state.chat.activeChat,
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch({ type: 'INCREMENT' }),
  decrement: () => dispatch({ type: 'DECREMENT' }),
  setStaff: (data) => dispatch({ type: 'SET_STAFF', payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StaffChats);