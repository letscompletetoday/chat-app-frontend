import './App.css';
import Header from "./Header";
import SideBar from "./SideBar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Chat from "./Chat";
import {useState} from "react";
import Login from "./Login";
import {useStateValue} from "./StateProvider";


function App() {

    //Getting user from the state. Thanks to redux. See StateProvider.js, reducer.js, Login.js and index.js
    const [{ user }, dispatch] = useStateValue();
    return (
        //BEM naming convention
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
                                    <h1>Welcome</h1>
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
