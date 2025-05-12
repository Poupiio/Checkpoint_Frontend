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
            <div className="country-card">
               <p>{data.country.emoji}</p>
               <p className="country-name">Name: {data.country.name} ({data.country.code})</p>
               <p>Continent : {data.country?.continent ? (data.country?.continent.name) : "Not specified"}</p>
            </div>
         </div>
      );
   }
};

export default Country;