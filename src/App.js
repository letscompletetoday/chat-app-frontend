import './App.css';
import Header from "./Header";
import SideBar from "./SideBar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";
import {useStateValue} from "./StateProvider";
import {actionTypes} from "./reducer";


function App() {

    const checkIfNewUser = (user) => {
        if (!user) {
            //First see if user is in local storage
            if (localStorage.getItem('user')) {  //if present in local storage
                //update user object
                dispatch({
                    type: actionTypes.SET_USER,
                    user: JSON.parse(localStorage.getItem('user')),
                });
                return true;
            } else {
                //goes to authentication
                return false;
            }
        }
        return true;
    }

    const [{user}, dispatch] = useStateValue();
    return (
        <div className="App">
            <Router>
                {!checkIfNewUser(user) ? (
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
                                    <h1 className="default__message">Click on a channel to view/start the conversation</h1>
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
