import React, {useState} from "react";
import "./ChatInput.css";
import {useStateValue} from "./StateProvider";
import socket from './socket'


function ChatInput({channelName, channelId}) {
    const [input, setInput] = useState("");
    const [{user}] = useStateValue();

    const sendMessage = (e) => {
        e.preventDefault();

        if (channelId) {
            socket.emit('message', {
                'message': input,
                'senderName': user.displayName,
                'channelId': channelId,
                'profileImage': user.photoURL
            });
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