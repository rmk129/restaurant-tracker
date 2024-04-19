import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";
import AllRestaurants from "./AllRestaurants";
import { AddRestaurants } from "./AddRestaurant";

function App() {
  const [user, setUser] = useState(null);
  const [allRes, setAllRes] = useState([])

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
              <AllRestaurants user={user} allRes={allRes}/>
            </Route>
            <Route path="/addrestaurants">
              <AddRestaurants setAllRes={setAllRes} allRes={allRes}/>
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/signup">
              <SignUp setUser={setUser} />
            </Route>
            <Route path="/login">
              <Login setUser={setUser} />
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
