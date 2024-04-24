import React, { useState } from "react";
import { UpdateReview } from "./UpdateReview";

function Reviews({ rev, user, setAllRes, allRes }) {
  const [showUpdateReview, setShowUpdateReview] = useState(false);

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

    function handleUpdateClick() {
        setShowUpdateReview(true);
    }

    const deleteButton = user.id === rev.user.id ? <button value={JSON.stringify(rev)} onClick={handleDeleteClick}>Delete Review</button> : null
    const updateButton = user.id === rev.user.id ? <button value={JSON.stringify(rev)} onClick={handleUpdateClick}>Update Review</button> : null
    const colorStyle = user.id === rev.user.id ? { color: 'red' } : null;
    return (
        <div>
          <ol style={colorStyle} >
            Review: {rev.message} <br />
            Rating: {rev.score}
          </ol>
          {deleteButton}
          {updateButton}
          {showUpdateReview && <UpdateReview rev={rev} setAllRes={setAllRes} setShowUpdateReview={setShowUpdateReview} allRes={allRes} />}
        </div>
      );

}

export default Reviews;