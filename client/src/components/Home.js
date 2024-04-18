function Home({ user }) {
  
    if (user) {
      return (
      <div>
      <h1>Welcome, {user.username}!</h1>
      <h2> This is your Restaurant Tracker! Here, you will be able to view all restaurants in the app and curate 
          your dinner plans according to previous restaurants you've been to as well as find new restaurants!
      </h2>
      <h3>-You can Add new Restaurants</h3>
      <h3>-You can add Reviews for restuarants you've been to</h3>
      <h3>-Using this information, you can filter through restaurants you've been to the ones you haven't</h3>
      </div>
      )
    } else {
      return (
      <div>
        <h1>Please Login or Sign Up</h1>
        <h2> This is your Restaurant Tracker! Here, you will be able to view all restaurants in the app and curate 
          your dinner plans according to previous restaurants you've been to as well as find new restaurants!
      </h2>
      <h3>-You can Add new Restaurants</h3>
      <h3>-You can add Reviews for restuarants you've been to</h3>
      <h3>-Using this information, you can filter through restaurants you've been to the ones you haven't</h3>
      </div>
      )
    }
  }
  
  export default Home;