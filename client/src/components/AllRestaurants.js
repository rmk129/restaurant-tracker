import { AddReview } from "./AddReview";

function AllRestaurants({allRes, user}){
    
    const resHeadings = allRes.map((res) => {
        return (
        <div key={res.id}>
        <li>{res.name} Cuisine:{res.cuisine}</li>
        {res.reviews.map((rev)=> 
        <ol key={rev.id}>Review: {rev.message}  <br></br>  Rating:{rev.score}</ol>
    )}
        <AddReview user={user} res={res}/>
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