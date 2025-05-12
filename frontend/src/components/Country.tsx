import { useParams } from "react-router-dom";
import { GET_COUNTRY } from "../api/queries";
import { useQuery } from "@apollo/client";

const Country = () => {
   const { code } = useParams<{ code: string }>();

   const { loading, error, data } = useQuery(GET_COUNTRY, {
      variables: { code },
   });

   if (loading) return <p>Chargement...</p>;
   if (error) return <p>Erreur : {error.message}</p>;
   
   if (data) {
      return (
         <div className="country-details">
            <div className="country-card-content">
               <p>{data.country.name}</p>
               <p>{data.country.emoji}</p>
               <p>Continent : {data.country?.continent ? (data.country?.continent.name) : "Non renseigné"}</p>
            </div>
         </div>
      );
   }
};

export default Country;