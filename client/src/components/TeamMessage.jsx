import React from 'react';
import { MessageTeam, useMessageContext } from 'stream-chat-react';
/** 
    *!Mesaj içeriğinin görüntülenmesi  
    */
const TeamMessage = () => {
    const { handleOpenThread, message } = useMessageContext();

    return (
        <MessageTeam
            message={{ ...message, user: {}}}
            // handleOpenThread={}
        />
    )
}

export default TeamMessage
