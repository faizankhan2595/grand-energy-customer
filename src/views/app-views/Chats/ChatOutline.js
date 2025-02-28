import React, { useEffect, useState } from 'react'
import './ChatOutline.css'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'


function ChatOutline({ type, id, name, lastMsg, lastSeen, msgCount, profilePic }) {
    

    return (
        <Link to={`/app/chats/initial/${type}?id=${id}&name=${name}`} className="ChatOutline">
            {type !== "group" ? <div className="ChatOutlineLeft">
                <Avatar size='medium' src={profilePic} />

                <div className='ChatOutlineLeftDetails'>
                    <p className='ChatOutlineName' >{name}</p>
                    <p className='ChatOutlineMsg' >{String(lastMsg).length > 35 ? lastMsg.slice(0, 33) + '...' : lastMsg}</p>
                </div>
            </div> :
                <div className={`ChatOutlineLeft${type}`}>
                    <div>
                        <Avatar.Group
                            maxCount={2}
                            maxPopoverTrigger="click"
                            size="medium"
                            maxStyle={{
                                color: '#f56a00',
                                backgroundColor: '#fde3cf',
                                cursor: 'pointer',
                            }}
                        >
                            <Avatar src="http://enlink.themenate.net/assets/images/avatars/thumb-3.jpg" />
                            <Avatar src="http://enlink.themenate.net/assets/images/avatars/thumb-3.jpg" />
                            <Avatar src="http://enlink.themenate.net/assets/images/avatars/thumb-3.jpg" />
                        </Avatar.Group>
                        <p className='ChatOutlineNamegroup' >{name}</p>
                    </div>
                </div>
            }
            <div className='ChatOutlineRight'>
                <span className='ChatOutlineTime' >{lastSeen}</span>
                <span className='ChatOutlineMsgCount' >{msgCount == 0 ? "" : msgCount}</span>
            </div>
        </Link>
    )
}

export default ChatOutline