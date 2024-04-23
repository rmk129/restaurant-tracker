import { AddReview } from "./AddReview";
import Reviews from "./Reviews";

function AllRestaurants({allRes, user, setAllRes}){
    
    const resHeadings = allRes.map((res) => {
        return (
        <div key={res.id}>
        <li>{res.name} Cuisine:{res.cuisine}</li>
        {res.reviews.map((rev)=> 
        // <ol key={rev.id}>Review: {rev.message}  <br></br>  Rating:{rev.score}</ol>
         <Reviews key={rev.id}  rev={rev} user={user} setAllRes={setAllRes} />   
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