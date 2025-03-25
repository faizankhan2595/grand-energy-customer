import React, { useEffect } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

function CommentsReply({ index, editedLogs, remarksReply, setRemarksReply, id }) {

  return (
    <>
      <div style={{
        cursor: 'pointer',
      }}>
        {
          remarksReply[index] ?
            <div onClick={() => {
              setRemarksReply((prevState) => {
                prevState[index] = false;
                return [...prevState]
              })
            }} ><UpOutlined /> </div> : <div onClick={() => {
              setRemarksReply((prevState) => {
                prevState[index] = true;
                return [...prevState]
              })
            }} > <DownOutlined /></div>
        }

      </div>

    </>
  )
}

export default CommentsReply