import React, {useEffect, useState} from 'react';
import './SideBar.css'
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOption from "./SideBarOption";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import AddIcon from "@material-ui/icons/Add";
import db from "./firebase"
import { useStateValue } from "./StateProvider";



function SideBar(props) {

    const [channels, setChannels] = useState([])
    const [{ user }] = useStateValue();

    useEffect(() => {
        //Run this code ONCE (cos empty brackets) when the side bar component loads
        db.collection('rooms').onSnapshot(snapshot => (
            setChannels(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name
                }))
            )
        ))
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <h2>Clever Programmer</h2>
                    <h3>
                        <FiberManualRecordIcon/>
                        {user?.displayName}
                    </h3>
                </div>
                <CreateIcon/>
            </div>

            <SidebarOption Icon={InsertCommentIcon} title="Threads"/>
            <SidebarOption Icon={InboxIcon} title="Mentions & reactions "/>
            <SidebarOption Icon={DraftsIcon} title="Saved items"/>
            <SidebarOption Icon={BookmarkBorderIcon} title="Send items"/>
            <SidebarOption Icon={PeopleAltIcon} title="People"/>
            <SidebarOption Icon={AppsIcon} title="Apps"/>
            <SidebarOption Icon={FileCopyIcon} title="threads"/>
            <SidebarOption Icon={ExpandMoreIcon} title="File browsers"/>
            <hr/>
            <SidebarOption Icon={ExpandLessIcon} title="Channels"/>
            <hr/>
            <SidebarOption Icon={AddIcon} title="Add channel" addChannelOption/>

            {/*Connect to db and list all the channels*/}
            {/*We are going to iterate the channels and give SidebarOption to it*/}
            {channels.map((channel) => (
                <SidebarOption title={channel.name} id={channel.id} />
            ))}

        </div>
    );
}

export default SideBar;