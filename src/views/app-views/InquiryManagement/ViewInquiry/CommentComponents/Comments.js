import React, { useEffect, useState } from 'react'
import { Button, Card, Divider, Input, message, Upload } from 'antd'
import axios from 'axios'
import moment from 'moment';
// import CommentsReply from './CommentsReply'
// import CommentsReplyContainer from './CommentsReplyContainer'
// import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
// import Dragger from 'antd/lib/upload/Dragger'

function Comments({ id, remarksArray, setRemarksArray, getRemarks, 
    remarksModal, setRemarksModal, remarksReply, setRemarksReply, 
    remarksReplying, setRemarksReplying, updateInquiry, commentsLength 
}) {
    const BASE_URL = '';
    const [remarkReply, setRemarkReply] = useState('')
    // const [remarksArrayFinal, setRemarksArrayFinal] = useState(remarksArray)
    const customer_id = localStorage.getItem("customer_id");
    const customer_name = localStorage.getItem("customer_name");

    // const handleChange = (info) => {
    //     console.log(info)
    //     setImageUrl([info.fileList[info.fileList.length-1]])
    // }

    // const handlePreview = (file) => {
    //     if (file.originFileObj) {
    //         const fileUrl = URL.createObjectURL(file.originFileObj);
    //         window.open(fileUrl, '_blank');
    //     } else {
    //         window.open(file.url, '_blank');
    //     }

    // };



    const postRemarks = async () => {
        if (remarkReply.trim() === '') {
            message.error('Please enter comment')
            return
        }

        try {
            updateInquiry([
                ...remarksArray,
                {
                    id: commentsLength+1,
                    createdAt: moment().format('DD MMM YYYY hh:mm a'),
                    content: remarkReply,
                    parent_id: remarksReplying,
                    editedLogs: [],
                    user: {
                        id: customer_id,
                        name: customer_name,
                    }
                },
            ]);
            setRemarksModal(false) 
            setRemarkReply('')
        } catch (err) {
          message.error("Error while posting remarks");
        }
    }


    return (
        <div>
            <h3>Reply</h3>
            <Divider />

            <div className='mb-3'>
                <div className='mb-2'>Add Reply</div>
                <Input.TextArea value={remarkReply} onChange={(e) => {
                    setRemarkReply(e.target.value)
                }} style={{
                    resize: 'none'
                }} rows={4} />
            </div>
        
            <div style={{
                textAlign: 'right',
                marginTop: '10px'
            }}>
                <Button onClick={() => {
                    postRemarks()
                }} type="primary">Save</Button>
            </div>
        </div>
    )
}

export default Comments


