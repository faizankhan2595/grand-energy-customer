import React from 'react'
import './Header.css'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import { Avatar, Button, Menu, Modal } from 'antd'
import { DeleteIcon } from 'assets/svg/ActionsSvg'
import Icon from '@ant-design/icons'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import { FolderOutlined } from '@ant-design/icons';
import { Successfully } from 'configs/svgIcons'
import SuccessSubmit from 'views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux';


function Header(props) {
    console.log(props)
    const tok = localStorage.getItem('token')

    const url = new URL(document.URL);
    const params = url.searchParams;
    const name = params.get('name')
    console.log(name)
    const param = useParams()
    console.log(param)

    const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const ShowDeleteModal = () => {
        setOpenDeleteModal(true);
        // console.log('first')
    };
    const handleOk = () => {
        // onDelete('123')
        console.log(props.id)
        axios({
            method: "POST",
            url: '/api/chat/delete-chat-for-one-user',
            headers: {
                Authorization: `Bearer ${tok}`
            },
            data: {
                "chat_id": props.id
            }
        }).then((res) => {
            console.log(res)
            props.setStaff(props.stafUser.filter((data) => data.id !== Number(props.id)))
            setOpenDeleteModal(false);
            setShowDeletedSuccess(true)
            setTimeout(() => {
                setShowDeletedSuccess(false)
            }, 3000);
        }).catch((err) => {
            console.log(err.message)
        })

    };
    const handleCancel = () => {
        setOpenDeleteModal(false);
        setShowDeletedSuccess(false)
    };

    return (
        <div className='chatRightHeader'>
            <div className="HeaderRight">
                {param.type === 'single' ? <Avatar size='large' src="http://enlink.themenate.net/assets/images/avatars/thumb-3.jpg" /> : <Avatar.Group
                    maxCount={4}
                    maxPopoverTrigger="click"
                    size="large"
                    maxStyle={{
                        color: '#f56a00',
                        backgroundColor: '#fde3cf',
                        cursor: 'pointer',
                    }}
                >
                    {props?.allChats?.map((data, i) => {
                        return <Avatar key={i} src={data?.profile_pic} />
                    })}
                </Avatar.Group>}
                {param.type === 'single' && <div className='HeaderRightDetails'>
                    <p className='HeaderName' >Jane Copper</p>
                    <p className='HeaderMsg' >johnsmith@gmail.com</p>
                </div>}
            </div>
            <EllipsisDropdown menu={
                <Menu>
                    <Menu.Item>
                        <span onClick={ShowDeleteModal} className="d-flex align-items-center">
                            <Icon className="mr-2" component={DeleteIcon} />
                            Delete
                        </span>
                    </Menu.Item>
                </Menu>
            } />
            <Modal
                visible={openDeleteModal}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                footer={[
                    <Button style={{ color: '#000B23' }} onClick={handleCancel} className='font-weight-bold'>No, Cancel</Button>,
                    <Button style={{ backgroundColor: '#F78DA7', color: '#F5F5F5' }} className='font-weight-bold' onClick={handleOk}>Yes, Confirm</Button>
                ]}
            >
                <div style={{ color: '#000B23' }} className="font-weight-bolder font-size-md">Sure you want to delete?</div>
                <p style={{ color: '#72849A' }} className="font-weight-normal font-size-sm">chat with {name} will deleted.</p>
            </Modal>
            <Modal centered visible={showDeletedSuccess} footer={[null]} onCancel={() => { setShowDeletedSuccess(false) }}>
                <SuccessSubmit icon={Successfully} title="Chat deleted successfully!" desc={`chat with ${param.type} name ${name} deleted.`} />
            </Modal>
        </div>
    )
}
const mapStateToProps = (state) => ({
    stafUser: state.chat.stafUser,
    customerUser: state.chat.customerUser,
    groupUser: state.chat.groupUser,
    activeChat: state.chat.activeChat,
});

const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    setStaff: (data) => dispatch({ type: 'SET_STAFF', payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header)