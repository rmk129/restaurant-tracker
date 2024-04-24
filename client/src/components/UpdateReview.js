import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

export const UpdateReview = ({rev, setAllRes, setShowUpdateReview, allRes}) => {
    const history = useHistory();


  const formSchema = yup.object().shape({
    message: yup.string().required("Must enter a review").min(10).max(200),
    score: yup.number().required("Must enter score").max(10),
   
  });

  const formik = useFormik({
    initialValues: {
      message: "",
      score: "",
      user: rev.user,
      restaurant_id: rev.restaurant_id
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      // Convert the score to an integer using parseInt()
      values.score = parseInt(values.score);
  
      fetch("/reviews/" + rev.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((r) => {
        if (r.ok) {
          r.json().then((resInfo) => {
            console.log(allRes)
            console.log(resInfo);
            setShowUpdateReview(false)

            // Rest of your code...
          });
        }
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
      <label htmlFor="message">Message</label>
        <br />

        <input
          id="message"
          name="message"
          onChange={formik.handleChange}
          value={formik.values.message}
          placeholder={rev.message}
        />
        <p style={{ color: "red" }}> {formik.errors.message}</p>

        <label htmlFor="score">Score</label>
        <br />
        <input
          id="score"
          name="score"
          onChange={formik.handleChange}
          value={formik.values.score}
          placeholder={rev.score}
        />
        <p style={{ color: "red" }}> {formik.errors.score}</p>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};