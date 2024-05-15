import React from "react";
import { Link } from "react-router-dom";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <header>
      <div><h1>Restaurant Tracker</h1></div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        {user ? (
          <>
          <Link to="/allrestaurants">All Restaurants</Link>
          <Link to="/addrestaurants">Add Restaurant</Link>
          <Link to="/locations">Locations</Link>
          <button onClick={handleLogoutClick}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
