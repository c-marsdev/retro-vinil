import { useEffect, useState } from "react";

const ListaPaises = () => {
  const [paises, setPaises] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const URL = "src/json/paises-del-mundo.json";

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.info(data);
        setPaises(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Error al cargar los paises");
        setCargando(false);
      });
  }, []);
  if (cargando) return "Cargando productos...";
  if (error) return <p>{error}</p>;
  return (
    <>
      {paises.map((pais) => (
        <select value={pais.shortName}>{pais.shortName}</select>
      ))}
    </>
  );
};
export default ListaPaises;
