

function Reviews({rev, user, setAllRes}){

    function handleDeleteClick(e){
        const jsonData = e.target.value;
  const review = JSON.parse(jsonData);
  const revId = review.id;

  
  
        const formData = {
        id : revId
    }
    console.log(formData)
  const configObj = {
      method: 'DELETE', 
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
  }

  fetch('/reviews/'+ revId, configObj)
  .then(res => res.json())
  .then((data)=> setAllRes(data) )
  alert("Your Review has been Deleted!")
    }

    const deleteButton = user.id === rev.user.id ? <button value={JSON.stringify(rev)} onClick={handleDeleteClick}>Delete Review</button> : null

    return (
        <div>
            <ol>Review: {rev.message}  <br></br>  Rating:{rev.score}</ol>
            {deleteButton}
        </div>
    )

}

export default Reviews;