import { Card } from 'antd'
import moment from 'moment'
import React from 'react'

function CommentsReplyContainer({ index, editedLogs, remarksReply, setRemarksReply, id }) {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '20px'
        }}> {
                remarksReply[index] ? <>{editedLogs.map((item, index) => {
                    return (
                        <>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}>
                                <div style={{
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    color: 'black'
                                }}>{item.user?.name}</div>
                                <div style={{
                                    fontSize: '12px',
                                    color: 'gray'
                                }}>{moment(item.createdAt).format('DD MMM YYYY hh:mm a')}</div>
                            </div>
                            <div className='ml-2'>{item.comment}</div>
                        </>
                    )
                })
                }</> : <></>
            }
        </div>
    )
}

export default CommentsReplyContainer

