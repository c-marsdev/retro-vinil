import { useState } from "react";
import Cargando from "./Cargando";
import { useProductosContext } from "../context/AppContextProductos";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FormularioProducto = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { agregarProducto, editarProducto } = useProductosContext();
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  // Obtener el producto pasado por el state
  const productoSeleccionado = location.state?.producto;

  // Determina el modo
  const modo = productoSeleccionado ? "editar" : "agregar";

  // Estados del componente
  const [producto, setProducto] = useState({
    titulo: "",
    artista: "",
    anioLanzamiento: "",
    numCatalogo: "",
    formato: "",
    velocidad: "",
    edicion: "",
    cdadDiscos: "",
    listCanciones: "",
    duracionTotal: "",
    condicionVinil: "",
    condicionFunda: "",
    extras: "",
    precio: "",
    moneda: "",
    formasPago: [
      "Visa",
      "Mastercard",
      "Naranja",
      "MecadoPago",
      "Pago Facil",
      "Efectivo",
      "Transferencia",
    ],
    envio: ["Correo Argentino", "Local"],
    foto: "",
    descripcion: "",
    edicionEspecial: "",
    stock: "",
    estado: "",
    genero: "",
    origen: "",
    pais: "",
  });

  // Cargar datos del producto si está en modo editar
  useEffect(() => {
    if (modo === "editar" && productoSeleccionado) {
      setProducto({
        id: productoSeleccionado.id || "",
        titulo: productoSeleccionado.titulo || "",
        artista: productoSeleccionado.artista || "",
        anioLanzamiento: productoSeleccionado.anioLanzamiento || "",
        numCatalogo: productoSeleccionado.numCatalogo || "",
        formato: productoSeleccionado.formato || "",
        velocidad: productoSeleccionado.velocidad || "",
        edicion: productoSeleccionado.edicion || "",
        cdadDiscos: productoSeleccionado.cdadDiscos || "",
        listCanciones: productoSeleccionado.listCanciones || "",
        duracionTotal: productoSeleccionado.duracionTotal || "",
        condicionVinil: productoSeleccionado.condicionVinil || "",
        condicionFunda: productoSeleccionado.condicionFunda || "",
        extras: productoSeleccionado.extras || "",
        precio: productoSeleccionado.precio || "",
        moneda: productoSeleccionado.moneda || "",
        formasPago: [
          "Visa",
          "Mastercard",
          "Naranja",
          "MecadoPago",
          "Pago Facil",
          "Efectivo",
          "Transferencia",
        ],
        envio: ["Correo Argentino", "Local"],
        foto: productoSeleccionado.foto || "",
        descripcion: productoSeleccionado.descripcion || "",
        edicionEspecial: productoSeleccionado.edicionEspecial || "",
        stock: productoSeleccionado.stock || "",
        estado: productoSeleccionado.estado || "",
        genero: productoSeleccionado.genero || "",
        origen: productoSeleccionado.origen || "",
        pais: productoSeleccionado.pais || "",
      });
    }
  }, [modo, productoSeleccionado]);
  // Manejar los cambios de los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar longitud name
    if (name && 3 > value.length > 200) return;

    setProducto((productos) => ({ ...productos, [name]: value }));

    // Limpia el error del campo si existe
    if (errores[name]) {
      setErrores((productos) => ({ ...productos, [name]: "" }));
    }
  };

  const selectChange = (name) => (e) => {
    let value;
    if (e.target.multiple) {
      value = Array.from(e.target.selectOptions, (opc) => opc.value);
    } else {
      value = e.target.value;
    }
    handleChange({ target: { name, value } });
  };

  // Validar el Formulario
  const validarFormulario = () => {
    const errorDeCarga = {};

    // título
    if (!producto.titulo) {
      errorDeCarga.titulo = "El título es obligatorio.";
    }

    // artista
    if (!producto.artista) {
      errorDeCarga.artista = "El artista es obligatorio.";
    }

    // año de lanzamiento
    if (!producto.anioLanzamiento) {
      errorDeCarga.anioLanzamiento = "El año de lanzamiento es obligatorio.";
    }

    // numCatalogo
    if (!producto.numCatalogo) {
      errorDeCarga.numCatalogo = "La identificación es obligatoria.";
    }

    // formato
    if (!producto.formato) {
      errorDeCarga.formato = "El formato es obligatorio.";
    }

    // velocidad
    if (!producto.velocidad) {
      errorDeCarga.velocidad = "La velocidad es obligatoria.";
    }

    // edición
    if (!producto.edicion) {
      errorDeCarga.edicion = "La edición es obligatoria.";
    }

    // cantidad de discos
    if (!producto.cdadDiscos) {
      errorDeCarga.cdadDiscos = "La cantidad de discos es obligatoria.";
    }

    // lista de canciones
    if (!producto.listCanciones) {
      errorDeCarga.listCanciones = "La lista de canciones es obligatoria.";
    }

    // duración total
    if (!producto.duracionTotal) {
      errorDeCarga.duracionTotal = "La duración total es obligatoria.";
    }

    // condición vinilo
    if (!producto.condicionVinil) {
      errorDeCarga.condicionVinil = "La condición del vinilo es obligatoria.";
    }

    // condición funda
    if (!producto.condicionFunda) {
      errorDeCarga.condicionFunda = "La condición de la funda es obligatoria.";
    }

    // extras
    if (!producto.extras) {
      errorDeCarga.extras = "Los extras son obligatorios.";
    }

    // moneda
    if (!producto.moneda) {
      errorDeCarga.moneda = "La moneda es obligatoria.";
    }

    // foto
    if (!producto.foto) {
      errorDeCarga.foto = "Las fotos son obligatorias.";
    }

    // edición especial
    if (!producto.edicionEspecial) {
      errorDeCarga.edicionEspecial = "La edición especial es obligatoria.";
    }

    // stock
    if (!producto.stock) {
      errorDeCarga.stock = "El stock es obligatorio.";
    }

    // estado
    if (!producto.estado) {
      errorDeCarga.estado = "El estado es obligatorio.";
    }

    // género
    if (!producto.genero) {
      errorDeCarga.genero = "El género es obligatorio.";
    }

    // origen
    if (!producto.origen) {
      errorDeCarga.origen = "El origen es obligatorio.";
    }

    // país
    if (!producto.pais) {
      errorDeCarga.pais = "El país es obligatorio.";
    }

    // precio
    if (producto.precio === undefined || producto.precio === null) {
      errorDeCarga.precio = "El precio es obligatorio.";
    } else {
      const precioStr = producto.precio.toString(); // fuerza a string
      const precioLimpio = precioStr.replace(/\./g, "").replace(",", ".");
      const precioNumerico = parseFloat(precioLimpio);

      if (!/^[\d.,]+$/.test(precioStr.replace(/\./g, ""))) {
        errorDeCarga.precio = "Solo números, puntos o comas.";
      } else if (isNaN(precioNumerico)) {
        errorDeCarga.precio = "Precio no válido.";
      } else if (precioNumerico <= 0) {
        errorDeCarga.precio = "Debe ser mayor a 0.";
      }
    }

    // descripción
    if (!producto.descripcion) {
      errorDeCarga.descripcion = "La descripción es obligatoria.";
    } else if (producto.descripcion.length < 10) {
      errorDeCarga.descripcion = "Mínimo 10 caracteres.";
    } else if (producto.descripcion.length > 200) {
      errorDeCarga.descripcion = "Máximo 200 caracteres.";
    }

    // guardar errores y devolver resultado
    setErrores(errorDeCarga);
    return Object.keys(errorDeCarga).length === 0;
  };

  // Manejar el envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("entro");

    // Validar antes de enviar
    if (!validarFormulario()) {
      console.log(!!validarFormulario());
      return;
    }

    try {
      const productoEnviar = {
        ...producto,
        precio: producto.precio.toString().replace(",", "."),
      };

      if (modo === "agregar") {
        // Usar el contexto para agregar producto
        const nuevoProducto = await agregarProducto(productoEnviar);
        alert(
          `Producto "${nuevoProducto.titulo}" agregado correctamente con ID: ${nuevoProducto.id}`
        );
        console.log(nuevoProducto);
        // Limpiar formulario después del envío
        setProducto({
          titulo: "",
          artista: "",
          anioLanzamiento: "",
          numCatalogo: "",
          formato: "",
          velocidad: "",
          edicion: "",
          cdadDiscos: "",
          listCanciones: "",
          duracionTotal: "",
          condicionVinil: "",
          condicionFunda: "",
          extras: "",
          precio: "",
          moneda: "",
          formasPago: [
            "Visa",
            "Mastercard",
            "Naranja",
            "MecadoPago",
            "Pago Facil",
            "Efectivo",
            "Transferencia",
          ],
          envio: ["Correo Argentino", "Local"],
          fotos: [],
          descripcion: "",
          edicionEspecial: "",
          stock: "",
          estado: "",
          genero: "",
          pais: "",
        });
        setCargando(false);

        setTimeout(() => {
          navigate("/productos");
        }, 100);
      } else {
        console.log("entro editar producto");
        // Usar el contexto para editar producto
        await editarProducto(productoEnviar);
        alert("Producto actualizado correctamente");
        setErrores({});
        setTimeout(() => {
          navigate("/productos");
        }, 100);
      }
    } catch (error) {
      alert(
        `Hubo un problema al ${
          modo === "editar" ? "actualizar" : "agregar"
        } el producto`
      );
      console.error("Error:", error);
    } finally {
      setCargando(false);
    }
  };

  const cancelarEdicion = () => {
    if (modo === "editar") {
      alert("Edición cancelada");
      navigate("/productos");
    }
  };
  console.log(producto);
  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded border-2 lg:w-full border-gray-700 bg-white text-gray-900 shadow-md shadow-slate-200"
    >
      <div className="p-6">
        <header className="mb-4 text-center">
          <h3 className="font-archivo-black text-xl font-medium  text-slate-700">
            {modo === "editar" ? "Editar" : "Agregar"} Producto
          </h3>
        </header>

        <div className="flex flex-col space-y-8">
          {/*Titulo Albúm */}
          <div className="relative my-6">
            <input
              id="titulo"
              type="text"
              name="titulo"
              placeholder="Título"
              pattern=".{3,}"
              value={producto.titulo}
              className="peer relative h-12 w-full border-b-2 border-gray-700 px-4 font-space-grotesk text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500  focus:border-emerald-500  valid:text-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
              onChange={handleChange}
              disabled={cargando}
              aria-invalid={!!errores.titulo}
            />
            <label
              htmlFor="titulo"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs font-space-grotesk font-medium text-gray-900 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
            >
              Título <small className="text-pink-500">*</small>
            </label>
            <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
              {!errores.titulo ? (
                <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                  Ingrese el título del albúm
                </span>
              ) : (
                <span className="text-pink-500">{errores.titulo}</span>
              )}
              <span className="text-slate-500">1/10</span>
            </small>
          </div>

          {/*Artista*/}
          <div className="relative my-6">
            <input
              id="artista"
              type="text"
              name="artista"
              placeholder="Artista"
              pattern=".{3,}"
              value={producto.artista}
              className="peer relative h-12 w-full border-b-2 border-gray-700 px-4 font-space-grotesk text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 valid:text-emerald-500  focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
              onChange={handleChange}
              disabled={cargando}
              aria-invalid={!!errores.artista}
            />
            <label
              htmlFor="artista"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs font-space-grotesk font-medium text-gray-900 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
            >
              Artista <small className="text-pink-500">*</small>
            </label>
            <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
              {!errores.artista ? (
                <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                  Ingrese el nombre del artista/s
                </span>
              ) : (
                <span className="text-pink-500">{errores.artista}</span>
              )}
              <span className="text-slate-500">1/10</span>
            </small>
          </div>

          {/*Año de Lanzamiento */}
          <div className="relative my-6">
            <input
              id="anioLanzamiento"
              type="number"
              name="anioLanzamiento"
              placeholder="Año"
              pattern=".{3,}"
              value={producto.anioLanzamiento}
              className="peer relative h-12 w-full border-b-2 border-gray-700 px-4 font-space-grotesk text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 valid:text-emerald-500  focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
              onChange={handleChange}
              disabled={cargando}
              aria-invalid={!!errores.anioLanzamiento}
            />
            <label
              htmlFor="anioLanzamiento"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs font-space-grotesk font-medium text-gray-900 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
            >
              Año <small className="text-pink-500">*</small>
            </label>
            <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
              {!errores.anioLanzamiento ? (
                <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                  Ingrese el año de lanzamiento
                </span>
              ) : (
                <span className="text-pink-500">{errores.anioLanzamiento}</span>
              )}
              <span className="text-slate-500">1/10</span>
            </small>
          </div>
          {/* Género */}
          <div className="relative my-6">
            <input
              id="genero"
              type="text"
              name="genero"
              placeholder="Título"
              pattern=".{3,}"
              value={producto.genero}
              className="peer relative h-12 w-full border-b-2 border-gray-700 px-4 font-space-grotesk text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 valid:text-emerald-500  focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
              onChange={handleChange}
              disabled={cargando}
              aria-invalid={!!errores.genero}
            />
            <label
              htmlFor="genero"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs font-space-grotesk font-medium text-gray-900 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
            >
              Género <small className="text-pink-500">*</small>
            </label>
            <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
              {!errores.genero ? (
                <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                  Ingrese el identificador
                </span>
              ) : (
                <span className="text-pink-500">{errores.genero}</span>
              )}
              <span className="text-slate-500">1/10</span>
            </small>
          </div>
          {/* N° Catálogo */}
          <div className="relative my-6">
            <input
              id="numCatalogo"
              type="text"
              name="numCatalogo"
              placeholder="Título"
              pattern=".{3,}"
              value={producto.numCatalogo}
              className="peer relative h-12 w-full border-b-2 border-gray-700 px-4 font-space-grotesk text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 valid:text-emerald-500  focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
              onChange={handleChange}
              disabled={cargando}
              aria-invalid={!!errores.numCatalogo}
            />
            <label
              htmlFor="numCatalogo"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs font-space-grotesk font-medium text-gray-900 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
            >
              Catálogo <small className="text-pink-500">*</small>
            </label>
            <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
              {!errores.numCatalogo ? (
                <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                  Ingrese el identificador
                </span>
              ) : (
                <span className="text-pink-500">{errores.numCatalogo}</span>
              )}
              <span className="text-slate-500">1/10</span>
            </small>
          </div>

          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-6 ">
              {/*Formato */}
              <div className="relative my-6 md:w-60">
                <select
                  id="formato"
                  name="formato"
                  value={producto.formato}
                  onChange={selectChange("formato")}
                  disabled={cargando}
                  aria-invalid={!!errores.formato}
                  required
                  className="peer relative h-12 font-medium w-full appearance-none border-b-2 border-gray-700 bg-white px-4 font-space-grotesk text-slate-500 outline-none transition-all autofill:bg-white 
                    focus:border-emerald-500 focus-visible:outline-none
                    focus:focus-visible:outline-none  valid:text-emerald-500 
                     peer-valid:text-shadow-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
                >
                  <option value="" disabled>
                    Selecciona un formato...
                  </option>
                  <option value="LP 12">LP 12" (álbum estándar)</option>
                  <option value="EP 10">EP 10" (extended play)</option>
                  <option value="Single 7">Single 7" (sencillo)</option>
                  <option value="Picture disc">
                    Picture disc (vinilo con imagen)
                  </option>
                </select>
                <label
                  htmlFor="formato"
                  className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                >
                  {producto.formato === ""
                    ? "Selecciona un formato..."
                    : "Formato"}
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute top-3.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-labelledby="title-08 description-08"
                  role="graphics-symbol"
                >
                  <title id="title-08">Arrow Icon</title>
                  <desc id="description-08">
                    Arrow icon of the select list.
                  </desc>
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
                  {!errores.formato ? (
                    <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                      Elija un tipo de formato
                    </span>
                  ) : (
                    <span className="text-pink-500">{errores.formato}</span>
                  )}
                  <span className="text-slate-500">1/10</span>
                </small>
              </div>
            </div>
            <div className="col-span-4 lg:col-span-6">
              {" "}
              {/*Velocidad*/}
              <div className="relative my-6 md:w-60">
                <select
                  id="velocidad"
                  name="velocidad"
                  value={producto.velocidad}
                  onChange={selectChange("velocidad")}
                  disabled={cargando}
                  aria-invalid={!!errores.velocidad}
                  required
                  className="peer relative h-12 font-medium w-full appearance-none border-b-2 border-gray-700 bg-white px-4 font-space-grotesk text-slate-500 outline-none transition-all autofill:bg-white 
                    focus:border-emerald-500 focus-visible:outline-none
                    focus:focus-visible:outline-none  valid:text-emerald-500 
                     peer-valid:text-shadow-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
                >
                  <option value="" disabled>
                    Selecciona una velocidad...
                  </option>
                  <option value="33 RPM">33 RPM</option>
                  <option value="45 RPM">45 RPM</option>
                  <option value="78 RPM">78 RPM</option>
                </select>
                <label
                  htmlFor="velocidad"
                  className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                >
                  {producto.velocidad === ""
                    ? "Selecciona una velocidad..."
                    : "Velocidad"}
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute top-3.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-labelledby="title-08 description-08"
                  role="graphics-symbol"
                >
                  <title id="title-08">Arrow Icon</title>
                  <desc id="description-08">
                    Arrow icon of the select list.
                  </desc>
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
                  {!errores.velocidad ? (
                    <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                      Elija un tipo de velocidad
                    </span>
                  ) : (
                    <span className="text-pink-500">{errores.velocidad}</span>
                  )}
                  <span className="text-slate-500">1/10</span>
                </small>
              </div>
            </div>
          </div>

          {/*Cantidad de Discos*/}
          <div className="relative my-6">
            <input
              id="cdadDiscos"
              type="number"
              name="cdadDiscos"
              placeholder="Año"
              pattern=".{3,}"
              value={producto.cdadDiscos}
              className="peer relative h-12 w-full border-b-2 border-gray-700 px-4 font-space-grotesk text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 valid:text-emerald-500  focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
              onChange={handleChange}
              disabled={cargando}
              aria-invalid={!!errores.cdadDiscos}
            />
            <label
              htmlFor="cdadDiscos"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs font-space-grotesk font-medium text-gray-900 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
            >
              Cantidad <small className="text-pink-500">*</small>
            </label>
            <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
              {!errores.cdadDiscos ? (
                <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                  Ingrese la cantidad de discos
                </span>
              ) : (
                <span className="text-pink-500">{errores.cdadDiscos}</span>
              )}
              <span className="text-slate-500">1/10</span>
            </small>
          </div>

          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-6">
              {/*Edición*/}
              <div className="relative my-6 md:w-60">
                <select
                  id="edicion"
                  name="edicion"
                  value={producto.edicion}
                  onChange={selectChange("edicion")}
                  disabled={cargando}
                  aria-invalid={!!errores.edicion}
                  required
                  className="peer relative h-12 font-medium w-full appearance-none border-b-2 border-gray-700 bg-white px-4 font-space-grotesk text-slate-500 outline-none transition-all autofill:bg-white 
                    focus:border-emerald-500 focus-visible:outline-none
                    focus:focus-visible:outline-none  valid:text-emerald-500 
                     peer-valid:text-shadow-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
                >
                  <option value="" disabled>
                    Selecciona una Edición...
                  </option>
                  <option value="simple">Simple Albúm</option>
                  <option value="doble">Doble Albúm</option>
                  <option value="doble">Triple Albúm</option>
                  <option value="boxSet">Box Albúm</option>
                </select>
                <label
                  htmlFor="edicion"
                  className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                >
                  {producto.edicion === ""
                    ? "Selecciona una edición"
                    : "Edición"}
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute top-3.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-labelledby="title-08 description-08"
                  role="graphics-symbol"
                >
                  <title id="title-08">Arrow Icon</title>
                  <desc id="description-08">
                    Arrow icon of the select list.
                  </desc>
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
                  {!errores.edicion ? (
                    <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                      Elija un tipo de edición
                    </span>
                  ) : (
                    <span className="text-pink-500">{errores.edicion}</span>
                  )}
                  <span className="text-slate-500">1/10</span>
                </small>
              </div>
            </div>
            <div className="col-span-4 lg:col-span-6">
              {/*Edición Especial*/}
              <div className="relative my-6 md:w-60">
                <select
                  id="edicionEspecial"
                  name="edicionEspecial"
                  value={producto.edicionEspecial}
                  onChange={selectChange("edicionEspecial")}
                  disabled={cargando}
                  aria-invalid={!!errores.edicionEspecial}
                  required
                  className="peer relative h-12 font-medium w-full appearance-none border-b-2 border-gray-700 bg-white px-4 font-space-grotesk text-slate-500 outline-none transition-all autofill:bg-white 
                    focus:border-emerald-500 focus-visible:outline-none
                    focus:focus-visible:outline-none  valid:text-emerald-500 
                     peer-valid:text-shadow-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
                >
                  <option value="" disabled>
                    Selecciona una edición especial...
                  </option>
                  <option value="ninguno">Ninguno</option>
                  <option value="reedicion">Reedición</option>
                  <option value="edicionLimitada">Edición Limitada</option>
                  <option value="viniloColoreado">Vinilo Cooreado</option>
                  <option value="vinilotransparente">
                    Vinilo Transparente
                  </option>
                  <option value="edicionRemasterizada">
                    Edición Remasterizada
                  </option>
                  <option value="edicionAniversario">
                    Edición Aniversarion
                  </option>
                  <option value="colecciones">Colecciones</option>
                </select>
                <label
                  htmlFor="edicionEspecial"
                  className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                >
                  {producto.edicionEspecial === ""
                    ? "Selecciona una edición especial"
                    : "Edición Especial"}
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute top-3.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-labelledby="title-08 description-08"
                  role="graphics-symbol"
                >
                  <title id="title-08">Arrow Icon</title>
                  <desc id="description-08">
                    Arrow icon of the select list.
                  </desc>
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
                  {!errores.edicionEspecial ? (
                    <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                      Elija un tipo de edición especial
                    </span>
                  ) : (
                    <span className="text-pink-500">
                      {errores.edicionEspecial}
                    </span>
                  )}
                  <span className="text-slate-500">1/10</span>
                </small>
              </div>
            </div>
          </div>

          {/*Duración Total*/}
          <div className="relative my-6">
            <input
              id="duracionTotal"
              type="text"
              name="duracionTotal"
              placeholder="duracionTotal"
              pattern=".{3,}"
              value={producto.duracionTotal}
              className="peer relative h-12 w-full border-b-2 border-gray-700 px-4 font-space-grotesk text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 valid:text-emerald-500  focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
              onChange={handleChange}
              disabled={cargando}
              aria-invalid={!!errores.duracionTotal}
            />
            <label
              htmlFor="duracionTotal"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs font-space-grotesk font-medium text-gray-900 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
            >
              Duración Total <small className="text-pink-500">*</small>
            </label>
            <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
              {!errores.duracionTotal ? (
                <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                  Ingrese la duracion total
                </span>
              ) : (
                <span className="text-pink-500">{errores.duracionTotal}</span>
              )}
              <span className="text-slate-500">1/10</span>
            </small>
          </div>
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-6">
              {/*Condición del Vinilo*/}
              <div className="relative my-6 md:w-60">
                <select
                  id="condicionVinil"
                  name="condicionVinil"
                  value={producto.condicionVinil}
                  onChange={selectChange("condicionVinil")}
                  disabled={cargando}
                  aria-invalid={!!errores.condicionVinil}
                  required
                  className="peer relative h-12 font-medium w-full appearance-none border-b-2 border-gray-700 bg-white px-4 font-space-grotesk text-slate-500 outline-none transition-all autofill:bg-white 
                    focus:border-emerald-500 focus-visible:outline-none
                    focus:focus-visible:outline-none  valid:text-emerald-500 
                     peer-valid:text-shadow-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
                >
                  <option value="" disabled>
                    Selecciona la condicón del vinilo...
                  </option>
                  <option value="mint">Mint</option>
                  <option value="nearMint">Near Mint</option>
                  <option value="veryGood">Very Good</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
                <label
                  htmlFor="condicionVinil"
                  className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                >
                  {producto.condicionVinil === ""
                    ? "Selecciona la condicón del vinilo"
                    : "Vinilo"}
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute top-3.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-labelledby="title-08 description-08"
                  role="graphics-symbol"
                >
                  <title id="title-08">Arrow Icon</title>
                  <desc id="description-08">
                    Arrow icon of the select list.
                  </desc>
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
                  {!errores.condicionVinil ? (
                    <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                      Elija la condición del vinilo
                    </span>
                  ) : (
                    <span className="text-pink-500">
                      {errores.condicionVinil}
                    </span>
                  )}
                  <span className="text-slate-500">1/10</span>
                </small>
              </div>
            </div>
            <div className="col-span-4 lg:col-span-6 px-0 mx-0 w-full ">
              {/*Condición de la Funda*/}
              <div className="relative my-6 md:w-60">
                <select
                  id="condicionFunda"
                  name="condicionFunda"
                  value={producto.condicionFunda}
                  onChange={selectChange("condicionFunda")}
                  disabled={cargando}
                  aria-invalid={!!errores.condicionFunda}
                  required
                  className="peer relative h-12 font-medium w-full appearance-none border-b-2 border-gray-700 bg-white px-4 font-space-grotesk text-slate-500 outline-none transition-all autofill:bg-white 
                    focus:border-emerald-500 focus-visible:outline-none
                    focus:focus-visible:outline-none  valid:text-emerald-500 
                     peer-valid:text-shadow-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
                >
                  <option value="" disabled>
                    Selecciona la condición de la funda...
                  </option>
                  <option value="mint">Mint</option>
                  <option value="nearMint">Near Mint</option>
                  <option value="veryGood">Very Good</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
                <label
                  htmlFor="condicionFunda"
                  className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                >
                  {producto.condicionFunda === ""
                    ? "Selecciona la condición de la funda"
                    : "Funda"}
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute top-3.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-labelledby="title-08 description-08"
                  role="graphics-symbol"
                >
                  <title id="title-08">Arrow Icon</title>
                  <desc id="description-08">
                    Arrow icon of the select list.
                  </desc>
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
                  {!errores.condicionFunda ? (
                    <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                      Elija la condición de la funda
                    </span>
                  ) : (
                    <span className="text-pink-500">
                      {errores.condicionFunda}
                    </span>
                  )}
                  <span className="text-slate-500">1/10</span>
                </small>
              </div>
            </div>
          </div>
          {/*Foto Albúm */}
          <div className="relative my-6">
            <input
              id="foto"
              type="text"
              name="foto"
              placeholder="Foto"
              pattern=".{3,}"
              value={producto.foto}
              className="peer relative h-12 w-full border-b-2 border-gray-700 px-4 font-space-grotesk text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500  focus:border-emerald-500  valid:text-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
              onChange={handleChange}
              disabled={cargando}
              aria-invalid={!!errores.foto}
            />
            <label
              htmlFor="foto"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs font-space-grotesk font-medium text-gray-900 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
            >
              Foto <small className="text-pink-500">*</small>
            </label>
            <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
              {!errores.foto ? (
                <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                  Ingrese la URL de la foto
                </span>
              ) : (
                <span className="text-pink-500">{errores.foto}</span>
              )}
              <span className="text-slate-500">1/10</span>
            </small>
          </div>

          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-6">
              {/*Extras*/}
              <div className="relative my-6 md:w-60">
                <select
                  id="extras"
                  name="extras"
                  value={producto.extras}
                  onChange={selectChange("extras")}
                  disabled={cargando}
                  aria-invalid={!!errores.extras}
                  required
                  className="peer relative h-12 font-medium w-full appearance-none border-b-2 border-gray-700 bg-white px-4 font-space-grotesk text-slate-500 outline-none transition-all autofill:bg-white 
                    focus:border-emerald-500 focus-visible:outline-none
                    focus:focus-visible:outline-none  valid:text-emerald-500 
                     peer-valid:text-shadow-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
                >
                  <option value="" disabled>
                    Selecciona el/los extra/s...
                  </option>
                  <option value="ninguno">Ninguno</option>
                  <option value="poster">Póster</option>
                  <option value="stickerOriginal">Sticker Original</option>
                  <option value="cajaEspecial">Caja Especial</option>
                  <option value="slipmart">Slipmart</option>
                  <option value="varios">Varios</option>
                </select>
                <label
                  htmlFor="extras"
                  className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                >
                  {producto.extras === ""
                    ? "Selecciona el/los extra/s"
                    : "Extras"}
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute top-3.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-labelledby="title-08 description-08"
                  role="graphics-symbol"
                >
                  <title id="title-08">Arrow Icon</title>
                  <desc id="description-08">
                    Arrow icon of the select list.
                  </desc>
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
                  {!errores.extras ? (
                    <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                      Elija un extra (si lo tiene)
                    </span>
                  ) : (
                    <span className="text-pink-500">{errores.extras}</span>
                  )}
                  <span className="text-slate-500">1/10</span>
                </small>
              </div>
            </div>
            <div className="col-span-4 lg:col-span-6">
              {" "}
              {/*Estado*/}
              <div className="relative my-6 md:w-60">
                <select
                  id="estado"
                  name="estado"
                  value={producto.estado}
                  onChange={selectChange("estado")}
                  disabled={cargando}
                  aria-invalid={!!errores.estado}
                  required
                  className="peer relative h-12 font-medium w-full appearance-none border-b-2 border-gray-700 bg-white px-4 font-space-grotesk text-slate-500 outline-none transition-all autofill:bg-white 
                    focus:border-emerald-500 focus-visible:outline-none
                    focus:focus-visible:outline-none  valid:text-emerald-500 
                     peer-valid:text-shadow-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
                >
                  <option value="" disabled>
                    Selecciona el estado...
                  </option>
                  <option value="nuevo">Nuevo</option>
                  <option value="usado">Usado</option>
                </select>
                <label
                  htmlFor="estado"
                  className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                >
                  {producto.estado === "" ? "Selecciona el estado" : "Estado"}
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute top-3.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-labelledby="title-08 description-08"
                  role="graphics-symbol"
                >
                  <title id="title-08">Arrow Icon</title>
                  <desc id="description-08">
                    Arrow icon of the select list.
                  </desc>
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
                  {!errores.estado ? (
                    <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                      Estado en que se encuentra
                    </span>
                  ) : (
                    <span className="text-pink-500">{errores.estado}</span>
                  )}
                  <span className="text-slate-500">1/10</span>
                </small>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-6">
              {/*Origen*/}
              <div className="relative my-6 md:w-60">
                <select
                  id="origen"
                  name="origen"
                  value={producto.origen}
                  onChange={selectChange("origen")}
                  disabled={cargando}
                  aria-invalid={!!errores.origen}
                  required
                  className="peer relative h-12 font-medium w-full appearance-none border-b-2 border-gray-700 bg-white px-4 font-space-grotesk text-slate-500 outline-none transition-all autofill:bg-white 
                    focus:border-emerald-500 focus-visible:outline-none
                    focus:focus-visible:outline-none  valid:text-emerald-500 
                     peer-valid:text-shadow-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
                >
                  <option value="" disabled>
                    Selecciona el origen...
                  </option>
                  <option value="nuevo">Nacional</option>
                  <option value="usado">Internacional</option>
                </select>
                <label
                  htmlFor="origen"
                  className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                >
                  {producto.origen === "" ? "Selecciona el origen" : "Origen"}
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute top-3.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-labelledby="title-08 description-08"
                  role="graphics-symbol"
                >
                  <title id="title-08">Arrow Icon</title>
                  <desc id="description-08">
                    Arrow icon of the select list.
                  </desc>
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
                  {!errores.origen ? (
                    <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                      Origen del Albúm
                    </span>
                  ) : (
                    <span className="text-pink-500">{errores.origen}</span>
                  )}
                  <span className="text-slate-500">1/10</span>
                </small>
              </div>
            </div>
            <div className="col-span-4 lg:col-span-6">
              {/* País */}
              <div className="relative my-6">
                <input
                  id="pais"
                  type="text"
                  name="pais"
                  placeholder="Título"
                  pattern=".{3,}"
                  value={producto.pais}
                  className="peer relative h-12 w-full border-b-2 border-gray-700 px-4 font-space-grotesk text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 valid:text-emerald-500  focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
                  onChange={handleChange}
                  disabled={cargando}
                  aria-invalid={!!errores.pais}
                />
                <label
                  htmlFor="pais"
                  className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs font-space-grotesk font-medium text-gray-900 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                >
                  País <small className="text-pink-500">*</small>
                </label>
                <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
                  {!errores.pais ? (
                    <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                      Ingrese el país de origen
                    </span>
                  ) : (
                    <span className="text-pink-500">{errores.pais}</span>
                  )}
                  <span className="text-slate-500">1/10</span>
                </small>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-6">
              {/*Moneda*/}
              <div className="relative my-6 md:w-60">
                <select
                  id="moneda"
                  name="moneda"
                  value={producto.moneda}
                  onChange={selectChange("moneda")}
                  disabled={cargando}
                  aria-invalid={!!errores.moneda}
                  required
                  className="peer relative h-12 font-medium w-full appearance-none border-b-2 border-gray-700 bg-white px-4 font-space-grotesk text-slate-500 outline-none transition-all autofill:bg-white 
                    focus:border-emerald-500 focus-visible:outline-none
                    focus:focus-visible:outline-none  valid:text-emerald-500 
                     peer-valid:text-shadow-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
                >
                  <option value="" disabled>
                    Selecciona una moneda...
                  </option>
                  <option value="ARS">ARS</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
                <label
                  htmlFor="moneda"
                  className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                >
                  {producto.moneda === "" ? "Selecciona una moneda" : "Moneda"}
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute top-3.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-labelledby="title-08 description-08"
                  role="graphics-symbol"
                >
                  <title id="title-08">Arrow Icon</title>
                  <desc id="description-08">
                    Arrow icon of the select list.
                  </desc>
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
                  {!errores.moneda ? (
                    <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                      Ingrese el tipo de moneda
                    </span>
                  ) : (
                    <span className="text-pink-500">{errores.moneda}</span>
                  )}
                  <span className="text-slate-500">1/10</span>
                </small>
              </div>
            </div>
            <div className="col-span-4 lg:col-span-6">
              {/*Precio */}
              <div className="relative my-6">
                <input
                  id="precio"
                  type="number"
                  name="precio"
                  placeholder="Año"
                  inputMode="decimal"
                  pattern=".{4,}"
                  value={producto.precio}
                  className="peer relative h-12 w-full border-b-2 border-gray-700 px-4 font-space-grotesk text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 valid:text-emerald-500  focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
                  onChange={handleChange}
                  disabled={cargando}
                  aria-invalid={!!errores.precio}
                />
                <label
                  htmlFor="precio"
                  className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs font-space-grotesk font-medium text-gray-900 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                >
                  Precio <small className="text-pink-500">*</small>
                </label>
                <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
                  {!errores.precio ? (
                    <div className="flex flex-col">
                      <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                        Ingrese su precio
                      </span>
                      <span className="peer text-primary-400">
                        Formato argentino: punto para miles, sin decimales.
                      </span>
                      <span>Ej: 40.000 o 40.000,50</span>
                    </div>
                  ) : (
                    <span className="text-pink-500">{errores.precio}</span>
                  )}
                  <span className="text-slate-500">1/10</span>
                </small>
              </div>
            </div>
          </div>
          {/*Stock*/}
          <div className="relative my-6">
            <input
              id="stock"
              type="number"
              name="stock"
              placeholder="Año"
              pattern=".{3,}"
              value={producto.stock}
              className="peer relative h-12 w-full border-b-2 border-gray-700 px-4 font-space-grotesk text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 valid:text-emerald-500  focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
              onChange={handleChange}
              disabled={cargando}
              aria-invalid={!!errores.stock}
            />
            <label
              htmlFor="stock"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs font-space-grotesk font-medium text-gray-900 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
            >
              Stock <small className="text-pink-500">*</small>
            </label>
            <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
              {!errores.stock ? (
                <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                  Ingrese el stock disponible
                </span>
              ) : (
                <span className="text-pink-500">{errores.stock}</span>
              )}
              <span className="text-slate-500">1/10</span>
            </small>
          </div>
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 mt-2 pt-2">
            <div className="col-span-4 md:col-span-8 lg:col-span-12">
              {/*Lista de canciones */}
              <div className="relative m-2">
                <textarea
                  id="listCanciones"
                  type="text"
                  name="listCanciones"
                  value={producto.listCanciones}
                  onChange={handleChange}
                  rows="3"
                  maxLength="200"
                  placeholder="Mínimo 10 caracteres, máximo 200 caracteres"
                  aria-invalid={!!errores.listCanciones}
                  className="peer relative w-full border-b-2 border-gray-700 p-4 font-space-grotesk text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
                ></textarea>
                <label
                  htmlFor="listCanciones"
                  className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs font-space-grotesk font-medium text-gray-900 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                >
                  Lista de canciones <small className="text-pink-500">*</small>
                </label>
                <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
                  {!errores.listCanciones ? (
                    <div className="flex flex-col">
                      <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                        Ingrese la lista de canciones
                      </span>
                      <span className="peer text-primary-400">
                        Mínimo 10 caracteres, máximo 200 caracteres
                      </span>
                      <span>Ej: 1 - Nombre duración </span>
                    </div>
                  ) : (
                    <span className="text-pink-500">
                      {errores.listCanciones}
                    </span>
                  )}
                  <span className="text-slate-500">1/10</span>
                </small>
              </div>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-12 mt-4 pt-4">
              {/*Descripción */}
              <div className="relative">
                <textarea
                  id="descripcion"
                  type="text"
                  name="descripcion"
                  value={producto.descripcion}
                  onChange={handleChange}
                  rows="3"
                  maxLength="200"
                  placeholder="Mínimo 10 caracteres, máximo 200 caracteres"
                  aria-invalid={!!errores.descripcion}
                  className="peer relative w-full border-b-2 border-gray-700 p-4 font-space-grotesk text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
                ></textarea>
                <label
                  htmlFor="descripcion"
                  className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs font-space-grotesk font-medium text-gray-900 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                >
                  Descripción <small className="text-pink-500">*</small>
                </label>
                <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
                  {!errores.descripcion ? (
                    <div className="flex flex-col">
                      <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                        Ingrese una descripción
                      </span>
                      <span className="peer text-primary-400">
                        Mínimo 10 caracteres, máximo 200 caracteres
                      </span>
                      <span>Ej: 1 - Nombre duración </span>
                    </div>
                  ) : (
                    <span className="text-pink-500">{errores.descripcion}</span>
                  )}
                  <span className="text-slate-500">1/10</span>
                </small>
              </div>
            </div>
          </div>

          {/*fin */}
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        <span className="text-pink-500">(*) </span> Campos obligatorios
      </div>
      {/*Boton */}
      <div className="flex justify-center p-6 ">
        <button
          className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-space-grotesk font-semibold tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-gray-900 shadow-gray-300 hover:bg-primary-500 hover:shadow-sm hover:shadow-primary-200 focus:bg-primary-500 focus:shadow-sm focus:shadow-primary-200 focus:border-gray-900 focus:border-1 focus:text-gray-900 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300 disabled:shadow-none"
          type="submit"
          disabled={cargando}
        >
          {cargando
            ? modo === "editar"
              ? "Actualizando..."
              : "Agregando..."
            : modo === "editar"
            ? "Confirmar Cambios"
            : "Agregar"}
        </button>
        <button
          type="button"
          onClick={cancelarEdicion}
          className="inline-flex items-center mx-4 justify-center h-10 gap-2 px-5 text-sm font-space-grotesk font-semibold tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-gray-900 shadow-gray-300 hover:bg-secondary-500 hover:shadow-sm hover:shadow-primary-200 focus:bg-secondary-500 focus:shadow-sm focus:shadow-secondary-200 focus:border-gray-900 focus:border-1 focus:text-gray-900 disabled:cursor-not-allowed disabled:border-secondary-300 disabled:bg-secondary-300 disabled:shadow-none"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormularioProducto;
