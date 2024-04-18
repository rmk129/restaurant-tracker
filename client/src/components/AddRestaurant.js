
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
export const AddRestaurants = ({allRes}) => {
  const [customers, setCustomers] = useState([{}]);
  const [refreshPage, setRefreshPage] = useState(false);
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

//   useEffect(() => {
//     console.log("FETCH! ");
//     fetch("/customers")
//       .then((res) => res.json())
//       .then((data) => {
//         setCustomers(data);
//         console.log(data);
//       });
//   }, [refreshPage]);
  //what is this?

  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name").max(20),
    cuisine: yup.string().required("Must enter cusine").max(15),
    //how to validate cuisine list?
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
        body: JSON.stringify(values, null, 2), //what is this?
      }).then((res) => {
        if (res.status == 200) {
          setRefreshPage(!refreshPage);
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
