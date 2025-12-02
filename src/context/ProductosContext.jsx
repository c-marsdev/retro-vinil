import { useEffect, useState } from "react";
import { ProductosContext } from "./AppContextProductos";
import Cargando from "../components/Cargando";
import { useNavigate } from "react-router-dom";

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const URL =
    "https://69174d4aa7a34288a2804bba.mockapi.io/api-retrovil/v1/producto";

  //Cargar los productos
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargando(true);
        setError(null);

        const res = await fetch(URL);

        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        const data = await res.json();

        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setError(error.message || "Error al cargar los productos");
      } finally {
        setCargando(false);
        setError(null);
      }
    };
    cargarProductos();
  }, []);

  const agregarProducto = async (nuevoProducto) => {
    console.log("entro");
    try {
      setCargando(true);
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });

      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

      const data = await res.json();

      setProductos((prev) => [...prev, data]);

      console.log("Producto agregado: ", data);
      return data;
    } catch (error) {
      console.error("Error al agregar producto:", error);
      setError(error.message || "Error al agregar");
    } finally {
      setCargando(false);
    }
  };

  const editarProducto = async (productoEditar) => {
    console.log(`producto editar id: ${productoEditar.id}`);

    try {
      setCargando(true);
      setError(null);
      const res = await fetch(`${URL}/${productoEditar.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoEditar),
      });

      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

      const data = await res.json();
      setProductos((prev) =>
        prev.map((producto) =>
          producto.id === productoEditar.id ? data : producto
        )
      );
      return data;
    } catch (error) {
      console.error("Error al editar producto:", error);
      setError(error.message || "Error al editar el producto");
    } finally {
      setCargando(false);
    }
  };

  //Funcion para eliminar producto de la API
  const eliminarProducto = async (id) => {
    try {
      setCargando(true);
      setError(null);

      const respuesta = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) throw new Error("Error al eliminar");

      // Filtra y crea un nuevo array sin el producto eliminado
      setProductos(productos.filter((p) => p.id !== id));
      alert("Producto eliminado correctamente.");

      navigate("/productos");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error(error.message);
      setError(error.message || "Error al eliminar el producto");
      throw error;
    } finally {
      setCargando(false);
    }
  };
  if (cargando)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Cargando />
      </div>
    );

  return (
    <ProductosContext.Provider
      value={{
        productos,
        cargando,
        error,
        agregarProducto,
        editarProducto,
        eliminarProducto,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
