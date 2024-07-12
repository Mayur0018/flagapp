import { createContext,useState } from "react";

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [countryData, setCountryData] = useState(null);

  
  const fetchCountryData = async (code) => {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await response.json();
    setCountryData(data[0]);
  };

  return (
    <CountryContext.Provider value={{ countryData, fetchCountryData }}>
      {children}
    </CountryContext.Provider>
  );
};

export default CountryContext;
