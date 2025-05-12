import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../api/queries";
import { useNavigate } from "react-router-dom";
import { Country } from "../types";

const Countries = () => {
   const { loading, error, data } = useQuery(GET_COUNTRIES);
   const navigate = useNavigate();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  
  if (data) {
     return (
        <div className="countries">
            {data.countries.map((country: Country) => (
               <div key={country.id} className="country-card" onClick={() => navigate(`/country/${country.code}`)}>
                  <div className="country-card-content">
                     <p>{country.name}</p>
                     <p>{country.emoji}</p>
                  </div>
               </div>
            ))}
        </div>
     );
  }
};

export default Countries;