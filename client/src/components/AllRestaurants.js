import { AddReview } from "./AddReview";
import Reviews from "./Reviews";

function AllRestaurants({allRes, user, setAllRes}){
    
    const resHeadings = allRes.map((res) => {
        return (
        <div key={res.id}>
        <li>{res.name} / Cuisine:{res.cuisine} / Location: {res.location.location}</li>
        {res.reviews.map((rev)=> 
         <Reviews key={rev.id}  rev={rev} user={user} setAllRes={setAllRes} allRes={allRes} />   
    )}
        <AddReview user={user} res={res} setAllRes={setAllRes} />
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