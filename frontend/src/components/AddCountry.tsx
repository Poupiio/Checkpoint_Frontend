import { useMutation, useQuery } from "@apollo/client";
import { GET_CONTINENTS, GET_COUNTRIES } from "../api/queries";
import { Continent, formInput } from "../types";
import { CREATE_COUNTRY } from "../api/mutations";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddCountry = () => {
   const navigate = useNavigate();
   const { loading, error, data: continentData } = useQuery(GET_CONTINENTS);
   const [createCountry] = useMutation(CREATE_COUNTRY, {
      refetchQueries: [GET_COUNTRIES], // Rafraîchit la liste des annonces après la mutation
   });
   
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<formInput>();
   const onSubmit: SubmitHandler<formInput> = async (formData) => {
      try {
         console.log("data", formData);
         console.log(typeof formData.continent);
         
         
         const dataForBackend = {
            ...formData,
            continent: { id: Number(formData.continent) }
         };
         await createCountry({
            variables: { data: dataForBackend }
         });
         navigate("/");
         
      } catch (err) {
         console.error("An error occured", errors, err);
      }
   }
   
   if (loading) return <p>Chargement...</p>;
   if (error) return <p>Erreur : {error.message}</p>;
   
   return (
      <form className="add-country-form" onSubmit={handleSubmit(onSubmit)}>
         <div className="input-container">
            <label htmlFor="name">Name</label>
               <input type="text" {...register("name", { required: true })} />
            
         </div>
         <div className="input-container">
            <label htmlFor="emoji">Emoji</label>
               <input type="text" {...register("emoji", { required: true })} />
         </div>
         <div className="input-container">
            <label htmlFor="code">Code</label>
               <input type="text" {...register("code", { required: true })} />
         </div>
         <div className="input-container">
            <label htmlFor="continent">Continent</label>
               <select {...register("continent", { required: false })} id="continent">
                  {continentData?.continents?.map((continent: Continent) => (
                     <option key={continent.id} value={continent.id}>
                        {continent.name}
                     </option>
                  ))}
               </select>
         </div>
         <button className="submit-btn" type="submit">Add</button>
      </form>
   );
};

export default AddCountry;