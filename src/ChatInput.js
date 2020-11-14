import React, {useState} from "react";
import "./ChatInput.css";
import {useStateValue} from "./StateProvider";
import socket from './socket'


function ChatInput({channelName, channelId}) {
    const [input, setInput] = useState("");
    const [{user}] = useStateValue();

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("OUT");
        if (channelId) {
            console.log("IN")
            var msg = {
                command: 'message',
                identifier: JSON.stringify({
                    id: channelId,
                    channel: 'MessageChannel',
                }),
                data:JSON.stringify({
                    message: {  'message': input,
                        'sender_name': user.displayName,
                        'channel_id': channelId,
                        'profile_image': user.photoURL},
                    action: 'send_message'
                }),
            };
            // socket.emit('message', {
            //     'message': input,
            //     'senderName': user.displayName,
            //     'channelId': channelId,
            //     'profileImage': user.photoURL
            // });
            socket.send(
                JSON.stringify(msg));
            console.log("SOcket: " + socket);
        }

        setInput("");
    };

    return (
        <div className="chatInput">
            <form>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message # ${channelName?.toLowerCase()}`}
                />
                <button type="submit" onClick={sendMessage}>
                    SEND
                </button>
            </form>
        </div>
    );
}

export default ChatInput;
