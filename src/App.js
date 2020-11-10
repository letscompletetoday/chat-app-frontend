import './App.css';
import Header from "./Header";
import SideBar from "./SideBar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";
import {useStateValue} from "./StateProvider";


function App() {

    const [{user}, dispatch] = useStateValue();
    return (
        <div className="App">
            <Router>
                {!user ? (
                    <h1><Login/></h1>
                ) : (
                    <>
                        {/*Header*/}
                        <Header/>

                        {/*Sidebar*/}
                        <div className="app__body">
                            <SideBar/>
                            {/*Reach router -> Chat screen */}
                            <Switch>
                                <Route path="/room/:roomId">
                                    <Chat/>
                                </Route>
                                <Route path="/">
                                    <h1>Click on a channel to view/start the conversation</h1>
                                </Route>
                            </Switch>
                        </div>
                    </>

                )}


            </Router>
        </div>
    );
}

export default App;
