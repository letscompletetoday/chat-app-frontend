import React, {useEffect, useRef, useState} from 'react';
import './Chat.css'
import {useParams} from 'react-router-dom'
import Message from "./Message";
import ChatInput from "./ChatInput";
import requests from "./requests";
import axios from "./axios";
import socket from './socket'

function Chat(props) {
    const {roomId} = useParams();
    const [roomDetails, setRoomDetails] = useState(null)
    const [channelMessages, setchannelMessages] = useState([]);

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView()
    }

    useEffect(() => {
        socket.onopen = function(event) {
            console.log('WebSocket is connected.');

            const msg = {
                command: 'subscribe',
                identifier: JSON.stringify({
                    channel: 'MessageChannel'
                }),
            };

            socket.send(JSON.stringify(msg));
        };
    }, []);

    useEffect(() => {scrollToBottom()}, [channelMessages]);

    useEffect(() => {
        async function fetchChannelMessages() {
            const messages = await axios.get(requests.fetchMessagesOfRoom + roomId)
            setchannelMessages(messages.data.messages);
            return messages
        }

        fetchChannelMessages();
    }, [roomId])

    useEffect(() => {
        // socket.on('message', (newMessage) => {
        //     console.log('RECEIVED');
        //     setchannelMessages([...channelMessages, newMessage])
        // })
        socket.onmessage =  function(e) {

            if (e.data.type !== 'ping' && JSON.parse(e.data).message != null) {
                setchannelMessages([...channelMessages, JSON.parse(e.data).message.message]);
            }
        }
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
                {channelMessages.map(({message, created_at, sender_name, profile_image}) => (
                    <Message
                        message={message}
                        timestamp={created_at}
                        senderName={sender_name}
                        userImage={profile_image}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <ChatInput channelName={roomDetails?.name} channelId={roomId}/>

        </div>
    );
}

export default Chat;
