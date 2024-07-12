import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Countries() {
  const [countryData, setCountry] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const getCountry = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountry(data);
      console.log(data);
    };

    getCountry();
  }, []);

  const handleLocationClick = (latlng) => {
    setSelectedLocation(latlng);
  };

  const closeMap = () => {
    setSelectedLocation(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const filteredCountries = countryData.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div
      className={`container mx-auto px-4 ${darkMode ? "dark" : ""} ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={`w-60 px-3 py-2 mt-8 ml-10 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            darkMode ? "text-white bg-gray-700" : "bg-white text-gray-800"
          }`}
        />
        <button onClick={toggleDarkMode} className="text-2xl mt-8 mr-10">
          <FontAwesomeIcon
            icon={darkMode ? faSun : faMoon}
            className={`${darkMode ? "text-yellow-500" : "text-gray-800"}`}
          />
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredCountries.map((country) => {
          const { name, flags, capital, cca3, borders, latlng } = country;
          return (
            <div
              key={cca3}
              className={`m-5 w-[320px] border border-gray-200 rounded-lg shadow ${
                darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
              } transition duration-300 transform hover:scale-105`}
            >
              <div>
                <a href="#">
                  <img
                    src={flags.png}
                    alt={`${name.common} flag`}
                    className="w-[320px] h-[200px] rounded-t-lg"
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5
                      className={`mb-2 text-2xl font-bold tracking-tight ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {name.common}
                    </h5>
                  </a>

                  <div className="mb-3">
                    {Array.isArray(borders) && borders.length > 0 ? (
                      borders.map((border, index) => (
                        <Link
                          key={index}
                          to={`/border/${border}`}
                          className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ${
                            darkMode
                              ? "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              : ""
                          } m-1`}
                        >
                          {border}
                        </Link>
                      ))
                    ) : (
                      <span
                        className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg ${
                          darkMode ? "dark:bg-blue-600" : ""
                        }`}
                      >
                        No borders
                      </span>
                    )}
                  </div>

                  <p
                    className={`mb-3 font-normal ${
                      darkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    Capital: {capital ? capital.join(", ") : "No capital"}
                  </p>
                  <p
                    className={`mb-3 font-normal ${
                      darkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    CCA3: {cca3}
                  </p>
                  <p
                    className={`mb-3 font-normal ${
                      darkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-red-500 mr-2 cursor-pointer"
                      onClick={() => handleLocationClick(latlng)}
                    />
                    Location:{" "}
                    {latlng ? `${latlng[0]}, ${latlng[1]}` : "No location data"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedLocation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-3/4 h-3/4">
            <button
              onClick={closeMap}
              className="absolute top-4 right-4 text-white bg-red-500 rounded-full px-2 py-1"
            >
              Close
            </button>
            <MapContainer
              center={selectedLocation}
              zoom={5}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={selectedLocation}>
                <Popup>
                  {selectedLocation[0]}, {selectedLocation[1]}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
}
