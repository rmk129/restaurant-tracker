import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

export const AddReview = ({user, res}) => {
    const history = useHistory();


  const formSchema = yup.object().shape({
    message: yup.string().required("Must enter a review").max(30),
    score: yup.string().required("Must enter score").max(),
   
  });

  const formik = useFormik({
    initialValues: {
      message: "",
      score: "",
      user: user,
      restaurant_id: res.id
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
        console.log('fetch')
      fetch("/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), //what is this?
      }).then((r) => {
        if (r.ok) {
          r.json().then((resInfo)=> {console.log(resInfo)
            // setAllRes([...allRes, resInfo]);
            // history.push("/allrestaurants")
        });
        }
      });
    },
  }
);

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
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>

        <label htmlFor="score">Score</label>
        <br />
        <input
          id="score"
          name="score"
          onChange={formik.handleChange}
          value={formik.values.score}
        />
        <p style={{ color: "red" }}> {formik.errors.cuisine}</p>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};