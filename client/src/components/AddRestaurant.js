
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
export const AddRestaurants = ({allRes, setAllRes}) => {
  


  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name").max(20),
    cuisine: yup.string().required("Must enter cusine").max(15),
    //how to validate cuisine list?
    //come back to this
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      cuisine: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/all_restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), //what is this?
      }).then(
        
        }
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
      <label htmlFor="name">Name</label>
        <br />

        <input
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>

        <label htmlFor="cuisine">Cuisine</label>
        <br />
        <input
          id="cuisine"
          name="cuisine"
          onChange={formik.handleChange}
          value={formik.values.cuisine}
        />
        <p style={{ color: "red" }}> {formik.errors.cuisine}</p>
        
        <button type="submit">Submit</button>
      </form>
      <table style={{ padding: "15px" }}>
        <tbody>
          <tr>
            <th>name</th>
            <th>cuisine</th>
          </tr>
          {/* {customers === "undefined" ? (
            <p>Loading</p>
          ) : (
            customers.map((customer, i) => (
              <>
                <tr key={i}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.age}</td>
                </tr>
              </>
            ))
          )} */}
        </tbody>
      </table>
    </div>
  );
};
