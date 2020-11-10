import React, {useEffect, useState} from 'react';
import './SideBar.css'
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import SidebarOption from "./SideBarOption";
import {useStateValue} from "./StateProvider";
import requests from "./requests";
import axios from "./axios";


function SideBar(props) {

    const [channels, setChannels] = useState([])
    const [{ user }] = useStateValue();

    useEffect(() => {

        async function fetchChannels() {
            const channels = await axios.get(requests.fetchChannels)
            setChannels(channels.data);
            return channels
        }

        fetchChannels();
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <h2>Chat app</h2>
                    <h3>
                        <FiberManualRecordIcon/>
                        {user?.displayName}
                    </h3>
                </div>
            </div>

            {channels.map((channel) => (
                <SidebarOption title={channel.name} id={channel.id} />
            ))}

        </div>
    );
}

export default SideBar;