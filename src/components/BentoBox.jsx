const titulos = [
  "NOVEDADES",
  "PROMO BLACK FRIDAY",
  "ENVIOS A TODO EL PAÍS",
  "ÚLTIMOS LANZAMIENTOS",
  "GÉNEROS",
  "RETROVIL",
  "BÚSQUEDA",
];

const colores = [
  "bg-primary-500 text-white font-archivo-black",
  "bg-secondary-400  text-white font-nunito",
  "bg-white text-black font-space-grotesk",
  "bg-gray-900 text-white font-archivo-black ",
  "bg-primary-500 text-white font-nunito ",
  "bg-secondary-500 text-black font-archivo-black",
  "bg-white border-2 border-gray-900 text-gray-900 font-space-grotesk",
];

const BentoBox = () => {
  return (
    <div className="m-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[192px] gap-2">
      {[...Array(7)].map((_, indice) => (
        <div
          key={indice}
          className={`row-span-1 rounded border-2 border-gray-900 p-4 flex items-center justify-center text-xl font-bold text-center ${
            indice === 3 || indice === 6 ? "sm:col-span-2 lg:col-span-2" : ""
          } ${colores[indice]}`}
        >
          {<h1 className="text-3xl max-md:text-2xl">{titulos[indice]}</h1>}
        </div>
      ))}
    </div>
  );
};
export default BentoBox;
