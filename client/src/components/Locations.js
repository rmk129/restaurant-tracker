import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";


export const Locations = ({allLoc, setAllLoc}) => {

    const history = useHistory();

  const formSchema = yup.object().shape({
    location: yup.string().required("Must enter a location").min(5).max(20),
   
   
  });

  const formik = useFormik({
    initialValues: {
      location:"",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      
      fetch("/all_locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((r) => {
        if (r.ok) {
          r.json().then((locInfo) => {
            setAllLoc([...allLoc, locInfo]);
            history.push("/addrestaurants");
            // Rest of your code...
            console.log(allLoc)
          });
        }
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
       <h2>Add Location!</h2> 
      <label htmlFor="location">Location</label>
        <br />

        <input
          id="location"
          name="location"
          onChange={formik.handleChange}
          value={formik.values.location}
        />
        <p style={{ color: "red" }}> {formik.errors.message}</p>

        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};