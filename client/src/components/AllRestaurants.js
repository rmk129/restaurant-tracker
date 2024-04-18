

function AllRestaurants({allRes}){
    
    const resHeadings = allRes.map((res) => {
        console.log(res)
        return (
        <div key={res.id}>
        <li>{res.name} Cuisine:{res.cuisine}</li>
        {res.reviews.map((rev)=> 
        <ol key={rev.id}>Review: {rev.message}    Rating:{rev.score}</ol>
    )}
        
        </div>
    )
      });

      return (
        <div>
            {resHeadings}
        </div>
      )
    
    
}

export default AllRestaurants