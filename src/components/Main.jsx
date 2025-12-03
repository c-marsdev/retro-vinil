import Productos from "./Productos.jsx";

const Main = () => {
  return (
    <div className=" flex flex-col h-auto w-screen">
      <div className="flex flex-col  md:flex-row  md:flex-wrap items-center justify-center sm:items-center md:items-start gap-2">
        <Productos />
      </div>
    </div>
  );
};
export default Main;
