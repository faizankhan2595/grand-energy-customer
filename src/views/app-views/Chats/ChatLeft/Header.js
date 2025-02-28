import React from 'react'
import './Header.css'
import { Avatar, Button, Dropdown, Menu } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

// const items = [
//     {
//         label: (),
//         key: '1',
//     },
//     {
//         label: '2nd menu item',
//         key: '2',
//     },
//     {
//         label: '3rd menu item',
//         key: '3',
//     },
// ];

function Header(props) {

    console.log(props)
    const tok = localStorage.getItem('token')  
    const [allUsersAdd, setallUsersAdd] = useState([])

    const history = useHistory()

    const addToChats = (id) =>{
        let chatName = "SUPPORT - TE!5"
        axios({
            method:"POST",
            url:'/api/chat/create-or-get-chat',
            headers:{
                Authorization: `Bearer ${tok}`
            },
            data:{
                "user_ids": [id],
                "chat_name": chatName,
                "chat_type": "group",
                "chat_module": "ticket",
            }
        }).then((res)=>{
            console.log(res)
            props.setStaff([ {"user_ids": [id],
            "chat_name": chatName,
            "chat_type": "group",
            "chat_module": "ticket",},...props.stafUser])
            history.push(`/app/chats/initial/group?id=${res.data.chat_id}&name=${chatName}`)
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    const getAllUsers = () =>{
        axios({
            method:"POST",
            url:'/api/chat/get-all-users',
            headers:{
                Authorization: `Bearer ${tok}`
            },
            data:{"per_page":1000}
        }).then((res)=>{
            console.log(res)
            setallUsersAdd(res.data.users.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const onClick = (e) => {
        console.log('click ', e);
        addToChats(e.key)
    };

    useEffect(() => {
      getAllUsers()
    }, [])

    

    return (
        <div className='ChatLeftHeader'>
            <span className='chatLeftInbox'>Inbox</span>
            <div className='chatLeftIcons'>

                <Dropdown  overlayStyle={{maxHeight:"30%"}} trigger={['click']} placement='bottomCenter' overlay={
                    <Menu onClick={onClick}>
                        {
                            allUsersAdd.map((data,i)=>{
                                return <Menu.Item key={data?.id}>
                                <div className='d-flex align-items-center'>
                                    <Avatar size='small' src={data?.profile_pic} />
                                    <span className='ml-2 font-weight-semibold font-size-normal'>{data?.name}</span>
                                </div>
                            </Menu.Item>
                            })
                        }
                        {/* <Menu.Item key={1}>
                            <div className='d-flex align-items-center'>
                                <Avatar size='small' src="http://enlink.themenate.net/assets/images/avatars/thumb-3.jpg" />
                                <span className='ml-2 font-weight-semibold font-size-normal'>Jane Smith</span>
                            </div>
                        </Menu.Item>
                        <Menu.Item key={2}>
                            <div className='d-flex align-items-center'>
                                <Avatar size='small' src="http://enlink.themenate.net/assets/images/avatars/thumb-3.jpg" />
                                <span className='ml-2 font-weight-semibold font-size-normal'>Wade Warren</span>
                            </div>
                        </Menu.Item>
                        <Menu.Item key={3}>
                            <div className='d-flex align-items-center'>
                                <Avatar size='small' src="http://enlink.themenate.net/assets/images/avatars/thumb-3.jpg" />
                                <span className='ml-2 font-weight-semibold font-size-normal'>Robert Fox</span>
                            </div>
                        </Menu.Item> */}
                    </Menu>
                } >
                    <Button onClick={addToChats} icon={<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 12.9474H13.5V18.6316H11.5V12.9474H5.5V11.0526H11.5V5.36841H13.5V11.0526H19.5V12.9474Z" fill="#475569" />
                    </svg>} className='chatLeftPlusIcon'> </Button>
                </Dropdown>
                {/* <Button icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6821 11.7458C9.66576 12.5361 8.38866 13.0067 7.00167 13.0067C3.68704 13.0067 1 10.3189 1 7.00335C1 3.68779 3.68704 1 7.00167 1C10.3163 1 13.0033 3.68779 13.0033 7.00335C13.0033 8.39059 12.533 9.66794 11.743 10.6845L14.7799 13.7186C15.0731 14.0115 15.0734 14.4867 14.7806 14.7799C14.4878 15.0731 14.0128 15.0734 13.7196 14.7805L10.6821 11.7458ZM11.5029 7.00335C11.5029 9.49002 9.48765 11.5059 7.00167 11.5059C4.5157 11.5059 2.50042 9.49002 2.50042 7.00335C2.50042 4.51668 4.5157 2.50084 7.00167 2.50084C9.48765 2.50084 11.5029 4.51668 11.5029 7.00335Z" fill="#475569" />
                </svg>} className='chatLeftSearchIcon'></Button> */}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header)