import React, { useEffect } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

function CommentsReplyLabel({ index, editedLogs, labelRemarksReply, setLabelRemarksReply, id }) {

    return (
        <>
            <div style={{
                cursor: 'pointer',
            }}>
                {
                    labelRemarksReply[index] ?
                        <div onClick={() => {
                            setLabelRemarksReply((prevState) => {
                                prevState[index] = false;
                                return [...prevState]
                            })
                        }} ><UpOutlined /> </div> : <div onClick={() => {
                            setLabelRemarksReply((prevState) => {
                                prevState[index] = true;
                                return [...prevState]
                            })
                        }} > <DownOutlined /></div>
                }

            </div>

        </>
    )
}

export default CommentsReplyLabel