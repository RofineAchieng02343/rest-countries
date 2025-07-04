import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import countriesData from "./data/data.json";
import CountryDetails from "./CountryDetails/CountryDetails";

function Home({ theme }: { theme: string }) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const filteredCountries = countriesData.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRegion = region ? country.region === region : true;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className={`${theme} bg-gray-100 dark:bg-gray-900 min-h-screen px-6 py-10`}>
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          🌍 Country Explorer
        </h1>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm dark:bg-gray-800 dark:text-white"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full md:w-1/4 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredCountries.map((country) => (
          <Link
            key={country.alpha3Code}
            to={`/country/${country.name}`}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 overflow-hidden"
          >
            <img
              src={country.flags.png}
              alt={country.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{country.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                <strong>Capital:</strong> {country.capital}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                <strong>Region:</strong> {country.region}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                <strong>Population:</strong> {country.population.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Set body class on load
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <Routes>
        <Route path="/" element={<Home theme={darkMode ? "dark" : ""} />} />
        <Route path="/country/:name" element={<CountryDetails />} />
      </Routes>
    </>
  );
}

export default App;
