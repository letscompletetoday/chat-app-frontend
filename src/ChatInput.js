import React, { useState } from "react";
import db from "./firebase";
import "./ChatInput.css";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

function ChatInput({ channelName, channelId }) {
    const [input, setInput] = useState("");
    const [{ user }] = useStateValue();

    const sendMessage = (e) => {
        e.preventDefault();

        if (channelId) {
            //Post the message to db
            //.add is the save/post to db
            db.collection("rooms").doc(channelId).collection("messages").add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(), //Timestamp should always be server timestamp, so that wherever the geographical location is, it will be consistent
                user: user.displayName,
                userImage: user.photoURL,
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