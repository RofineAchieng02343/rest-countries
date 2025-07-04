// CountryDetails.tsx
import { useParams, useNavigate } from "react-router-dom";
import countriesData from "../data/data.json";

function CountryDetails() {
  const { name } = useParams();
  const navigate = useNavigate();

  const country = countriesData.find(
    (c) => c.name.toLowerCase() === name?.toLowerCase()
  );

  if (!country) return <p className="p-6">Country not found.</p>;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-5 py-2 bg-white dark:bg-gray-800 border dark:border-gray-600 shadow rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition"
      >
        ← Back
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        <img
          src={country.flags.png}
          alt={country.name}
          className="w-full lg:w-1/2 rounded-xl shadow"
        />

        <div>
          <h2 className="text-3xl font-bold mb-4">{country.name}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <p><strong>Native Name:</strong> {country.nativeName}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Subregion:</strong> {country.subregion}</p>
            <p><strong>Capital:</strong> {country.capital}</p>
            <p><strong>Top Level Domain:</strong> {country.topLevelDomain.join(", ")}</p>
            <p><strong>Currencies:</strong>{" "}{country.currencies?.map(c => c.name).join(", ") || "N/A"}</p>
            <p><strong>Languages:</strong> {country.languages.map(l => l.name).join(", ")}</p>
            <p><strong>Borders:</strong> {country.borders?.join(", ") || "None"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
