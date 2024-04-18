

function AllRestaurants({allRes}){
    const userHeadings = allRes.map((user) => {
        return (
        <div>
        <li key={user.id}>{user.name} Cuisine:{user.cuisine}</li>
        
        </div>
    )
      });

      return (
        <div>
            {userHeadings}
        </div>
      )
    
    
}

export default AllRestaurants