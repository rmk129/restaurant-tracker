import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

export const AddRestaurants = ({ allRes, setAllRes, allLoc }) => {
  const history = useHistory();
  const allLocations = allLoc

  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name").max(20),
    cuisine: yup.string().required("Must enter cuisine").max(15),
    location: yup.string().required("Must select a location"),
  });

  return (
    <div>
      <h1>Add Restaurant</h1>
      <Formik
        initialValues={{
          name: "",
          cuisine: "",
          location:"",
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          fetch("/all_restaurants", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((r) => {
              if (r.ok) {
                return r.json();
              }
              throw new Error("Network response was not ok.");
            })
            .then((resInfo) => {
              console.log(resInfo)
              setAllRes([...allRes, resInfo]);
              console.log(allRes)
              history.push("/allrestaurants");
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <br />
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" style={{ color: "red" }} />
            </div>
            <div>
              <label htmlFor="cuisine">Cuisine</label>
              <br />
              <Field type="text" id="cuisine" name="cuisine" />
              <ErrorMessage name="cuisine" component="div" style={{ color: "red" }} />
            </div>
            <div>
              <label htmlFor="location">Location</label>
              <br />
              <Field as="select" id="location" name="location">
                <option value="">Select Location</option>
                {allLocations &&
                  allLocations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.location}
                    </option>
                  ))}
              </Field>
              <ErrorMessage name="location" component="div" style={{ color: "red" }} />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};