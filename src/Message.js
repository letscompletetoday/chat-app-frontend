import React from 'react';
import "./Message.css"

function Message({message, timestamp, senderName, userImage}) {
    return (
        <div className="message">
            <img src={userImage} alt=""/>
            <div className="message__info">
                <h4>
                    {senderName}<span className="message__timestamp">{timestamp}</span>
                </h4>
                <p>{message}</p>
            </div>


        </div>
    );
}

export default Message;