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
         const dataForBackend = {
            ...formData,
            continent: Number(formData.continent)
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
      <div className="add-country-form">
         <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Name
               <input type="text" {...register("name", { required: true })} />
            </label>
            <label htmlFor="emoji">Emoji
               <input type="text" {...register("emoji", { required: true })} />
            </label>
            <label htmlFor="code">Code
               <input type="text" {...register("code", { required: true })} />
            </label>
            <label htmlFor="continent">Continent
               <select {...register("continent")}>
                  {continentData?.continents?.map((continent: Continent) => (
                     <option key={continent.id} value={continent.id}>
                        {continent.name}
                     </option>
                  ))}
               </select>
            </label>
            <button className="submit-btn" type="submit">Add</button>
         </form>
      </div>
   );
};

export default AddCountry;