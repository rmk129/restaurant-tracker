import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";
import { Locations } from "./Locations";
import AllRestaurants from "./AllRestaurants";
import { AddRestaurants } from "./AddRestaurant";
import UserState from "./UserState";



function App() {
  // const [user, setUser] = useState(null);
  const [allRes, setAllRes] = useState([])
  const [allLoc, setAllLoc] = useState([])

  // const {updatedUser} = UserState((state)=> state.updateUser)
  const {user, removeUser, setUser } = UserState()

  

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/all_restaurants").then((r) => {
      if (r.ok) {
        r.json().then((resInfo)=> setAllRes(resInfo));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/all_locations").then((r) => {
      if (r.ok) {
        r.json().then((locInfo)=> setAllLoc(locInfo));
      }
    });
  }, []);

 

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        {user ? (
          <Switch>
            <Route exact path="/">
              <Home user={user}/>
            </Route>
            <Route path="/allrestaurants">
              <AllRestaurants user={user} allRes={allRes} setAllRes={setAllRes}/>
            </Route>
            <Route path="/addrestaurants">
              <AddRestaurants setAllRes={setAllRes} allRes={allRes} allLoc={allLoc}/>
            </Route>
            <Route path="/locations">
              <Locations allLoc={allLoc}  setAllLoc={setAllLoc} />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/signup">
              <SignUp setUser={setUser} />
            </Route>
            <Route path="/login">
              <Login setUser={setUser} user={user} />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        )}
      </main>
    </>
  );
}

export default App;
