import React, {useEffect, useRef, useState} from 'react';
import './Chat.css'
import {useParams} from 'react-router-dom'
import Message from "./Message";
import ChatInput from "./ChatInput";
import requests from "./requests";
import axios from "./axios";
import socket from './socket'
import {useStateValue} from "./StateProvider";
const {ipcRenderer} = window.require('electron')

function Chat(props) {
    const {roomId} = useParams();
    const [roomDetails, setRoomDetails] = useState(null)
    const [channelMessages, setchannelMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView()
    }

    useEffect(() => {scrollToBottom()}, [channelMessages]);

    useEffect(() => {
        async function fetchChannelMessages() {
            const messages = await axios.get(requests.fetchMessagesOfRoom + roomId)
            setchannelMessages(messages.data);
            return messages
        }


        fetchChannelMessages();
    }, [roomId])

    useEffect(() => {
        socket.once('message', (newMessage) => {
            console.log("OUTER")
            if (newMessage?.senderName !== user?.displayName) {
                ipcRenderer.send('notify', {
                    title: user?.displayName,
                    message: "1 message"
                })
                console.log("INNER")
            }
            setchannelMessages([...channelMessages, newMessage])
        })
    }, [channelMessages])

    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__headerLeft">
                    <h4 className="chat__channelName">
                        <strong>#{roomDetails?.name}</strong>
                    </h4>
                </div>
            </div>

            <div className="chat__messages">
                {channelMessages.map(({message, timestamp, senderName, profileImage}) => (
                    <Message
                        message={message}
                        timestamp={timestamp}
                        senderName={senderName}
                        userImage={profileImage}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <ChatInput channelName={roomDetails?.name} channelId={roomId}/>

        </div>
    );
}

export default Chat;