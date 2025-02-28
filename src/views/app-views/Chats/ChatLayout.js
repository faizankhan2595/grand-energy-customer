import React from 'react'
import Message from "assets/svg/Message.svg";
import PageHeading from 'components/shared-components/PageHeading/PageHeading';
import ChatLeft from './ChatLeft/ChatLeft';
import ChatRight from './ChatRight/ChatRight';
import './ChatLayout.css'

function ChatLayout() {
    return (
        <div>
            <div>
                <PageHeading
                    icon={Message}
                    title="Chats"
                />
            </div>
            <div className='chatLayout'>
                <div className='chatLayoutLeft' >
                    <ChatLeft/>
                </div>
                <div className='chatLayoutRight' >
                    <ChatRight/>
                </div>
            </div>
        </div>
    )
}

export default ChatLayout