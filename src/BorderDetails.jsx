import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CountryContext from './CountryContext';

export default function BorderDetails() {
  const { code } = useParams();
  const { countryData, fetchCountryData } = useContext(CountryContext);

  useEffect(() => {
    fetchCountryData(code);
  }, [code, fetchCountryData]);

  if (!countryData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const { name, flags, capital, region, population, borders } = countryData;

  return (
    <div className="borderDetails bg-gray-100 p-8 rounded-lg shadow-md mx-auto max-w-lg mt-[32px] border-2 border-gray-300">
      <img src={flags.png} alt={`${name.common} flag`} className="w-full rounded-md mb-4 border-2 border-gray-300" />
      <h1 className="text-3xl font-bold mb-2">{name.common}</h1>
      <p className="text-gray-700 mb-2">Capital: {capital ? capital.join(", ") : "No capital"}</p>
      <p className="text-gray-700 mb-2">Region: {region}</p>
      <p className="text-gray-700 mb-2">Population: {population}</p>
      
      {borders && borders.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">Borders:</h2>
          <div className="flex flex-wrap gap-2">
            {borders.map(borderCode => (
              <button 
                key={borderCode} 
                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700"
                onClick={() => fetchCountryData(borderCode)}
              >
                {borderCode}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
