import { useState } from "react";

import ListaPaises from "./ListaPaises";

const FormularioProducto = () => {
  // Estados del componente
  const [producto, setProducto] = useState({
    // artMod: "",
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
    conticionFunda: "",
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
    opinion: "",
    estado: "",
    genero: "",
    origen: "",
    pais: "",
  });
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

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

  // ValidarFormulario
  const validarFormulario = () => {
    const errorDeCarga = {};

    // titulo
    if (!producto.titulo.trim()) {
      errorDeCarga.titulo = "El título es obligatorio.";
      console.info(producto.titulo);

      //artista
      if (!producto.artista.trim()) {
        errorDeCarga.artista = "El artista es obligatorio";
      }
      //anio de lanzamiento
      if (!producto.anioLanzamiento.trim()) {
        errorDeCarga.anioLanzamiento = "El año de lanzamiento es obligatorio";
      }
      producto.anioLanzamiento === 0
        ? "Desconocido"
        : parseInt(producto.anioLanzamiento.trim());

      // numCatalogo:
      if (!producto.numCatalogo.trim()) {
        errorDeCarga.numCatalogo = "La identificación es obligatoria";
      }
      // formato:
      if (!producto.formato.trim()) {
        errorDeCarga.formato = "El formato es obligatorio";
      }
      // velocidad:
      if (!producto.velocidad.trim()) {
        errorDeCarga.velocidad = "El tipo de velocidad es obligatorio";
      }
      // edición:
      if (!producto.edición) {
        errorDeCarga.edición = "Adición es obligatoria";
      }
      // cdadDiscos:
      if (!producto.cdadDiscos.trim()) {
        errorDeCarga.cdadDiscos = "La cdad de discos es obligatoria";
      }
      // listCanciones:
      if (!producto.listCanciones.trim()) {
        errorDeCarga.listCanciones = "La lista de canciones son obligatorias";
      }
      // duracionTotal:
      if (!producto.duracionTotal.trim()) {
        errorDeCarga.duracionTotal = "La duración total es obligatoria";
      }
      // condicionVinil:
      if (!producto.condicionVinil.trim()) {
        errorDeCarga.condicionVinil = "La condición del Vinilo es obligatoria";
      }
      // conticionFunda:
      if (!producto.conticionFunda.trim()) {
        errorDeCarga.conticionFunda = "La contición de la funda es obligatoria";
      }
      // extras:
      if (!producto.extras) {
        errorDeCarga.extras = "Los extras son obligatorios  ";
      }

      // moneda:
      if (!producto.moneda.trim()) {
        errorDeCarga.moneda = "La moneda es obligatoria";
      }
      // fotos:
      if (!producto.fotos) {
        errorDeCarga.fotos = "las fotos son obligatorias";
      }

      // tipoEdicion:
      if (!producto.tipoEdicion) {
        errorDeCarga.tipoEdicion = "El tipo edicion es obligatoria";
      }
      // edicionEspecial:
      if (!producto.edicionEspecial.trim()) {
        errorDeCarga.edicionEspecial = "LA edición especial es obligatoria";
      }
      // stock:
      if (!producto.stock.trim()) {
        errorDeCarga.stock = "El stock es obligatorio";
      }
      // opinion:
      if (!producto.opinion.trim()) {
        errorDeCarga.opinion = "La opinion es obligatoria";
      }
      // estado:
      if (!producto.estado.trim()) {
        errorDeCarga.estado = "El estado es obligatorio";
      }
      // genero:
      if (!producto.genero) {
        errorDeCarga.genero = "El genero es obligatorio";
      }
      // origen:
      if (!producto.origen.trim()) {
        errorDeCarga.origen = "El origen es obligatorio";
      }
      // pais:
      if (!producto.pais) {
        errorDeCarga.pais = "El país es obligatorio";
      }

      // precio
      if (!producto.precio.trim()) {
        errorDeCarga.precio = "El precio es obligatorio.";
      } else {
        const precioLimpio = producto.precio
          .replace(/\./g, "")
          .replace(",", ".");
        const precioNumerico = parseFloat(precioLimpio);

        if (!/^[\d.,]+$/.test(producto.precio.replace(/\./g, ""))) {
          errorDeCarga.precio = "Solo números, puntos o comas.";
        } else if (isNaN(precioNumerico)) {
          errorDeCarga.precio = "Precio no válido.";
        } else if (precioNumerico <= 0) {
          errorDeCarga.precio = "Debe ser mayor a 0.";
        }
      }

      // descripción
      if (!producto.descripcion.trim()) {
        errorDeCarga.descripcion = "La descripción es obligatoria.";
      } else if (producto.descripcion.length < 10) {
        errorDeCarga.descripcion = "Mínimo 10 caracteres.";
      } else if (producto.descripcion.length > 200) {
        errorDeCarga.descripcion = "Máximo 200 caracteres.";
      }

      setErrores(errorDeCarga);
      return Object.keys(errorDeCarga).length === 0;
    }
  };
  // AgregarProducto
  const agregarProducto = async (producto) => {
    try {
      const productoEnviar = {
        ...producto,
        precio: producto.precio.replace(",", "."), // control
      };

      const URL =
        "https://69174d4aa7a34288a2804bba.mockapi.io/api-retrovil/v1/producto";
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoEnviar),
      });

      if (!res.ok) throw new Error("Error al agregar el producto.");

      const data = await res.json();
      alert("Producto agregado correctamente");
      return data;
    } catch (error) {
      alert("Hubo un problema al agregar el producto.");
      throw error;
    }
  };

  // Manejar el envio del formulario
  const handleSubmint = async (e) => {
    e.preventDefault();

    // Validar antes de enviar
    if (!validarFormulario()) return;

    setCargando(true);
    try {
      await agregarProducto(producto);

      // Limpiar formulario después del éxito
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
        conticionFunda: "",
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
        tipoEdicion: "",
        edicionEspecial: "",
        stock: "",
        // opinion: "",
        estado: "",
        genero: "",
        origen: "",
        pais: "",
      });
      setErrores({});
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setCargando(false);
    }
  };

  console.log(producto);
  return (
    <div className="container  sm:px-2  sm:m-auto ">
      <div className="w-full grid grid-cols-4 gap-6 md:grid-cols-8  lg:grid-cols-12">
        <div className="col-span-4 md:col-span-1 lg:col-span-3 bg-pink-400"></div>
        <div className="col-span-4 md:col-span-8 lg:col-span-6 my-4 mx-0">
          <form
            onSubmit={handleSubmint}
            className="overflow-hidden rounded border-2 lg:w-full border-gray-700 bg-white text-gray-900 shadow-md shadow-slate-200"
          >
            <div className="p-6">
              <header className="mb-4 text-center">
                <h3 className="font-archivo-black text-xl font-medium  text-slate-700">
                  Agregar Producto
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
                      <span className="text-pink-500">
                        {errores.anioLanzamiento}
                      </span>
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
                      <span className="text-pink-500">
                        {errores.numCatalogo}
                      </span>
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
                        <option value="" disabled selected></option>
                        <option value="LP 12">LP 12" (álbum estándar)</option>
                        <option value="EP 10">EP 10" (extended play)</option>
                        <option value="Single 7">Single 7" (sencillo)</option>
                        <option value="Picture disc">
                          Picture disc (vinilo con imagen)
                        </option>
                      </select>
                      <label
                        for="formato"
                        className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                      >
                        Formato
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
                          <span className="text-pink-500">
                            {errores.formato}
                          </span>
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
                        <option value="" disabled selected></option>
                        <option value="33 RPM">33 RPM</option>
                        <option value="45 RPM">45 RPM</option>
                        <option value="78 RPM">78 RPM</option>
                      </select>
                      <label
                        for="velocidad"
                        className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                      >
                        Velocidad
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
                          <span className="text-pink-500">
                            {errores.velocidad}
                          </span>
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
                      <span className="text-pink-500">
                        {errores.cdadDiscos}
                      </span>
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
                        <option value="" disabled selected></option>
                        <option value="simple">Simple Albúm</option>
                        <option value="doble">Doble Albúm</option>
                        <option value="doble">Triple Albúm</option>
                        <option value="boxSet">Box Albúm</option>
                      </select>
                      <label
                        for="edicion"
                        className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                      >
                        Edición
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
                          <span className="text-pink-500">
                            {errores.edicion}
                          </span>
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
                        <option value="" disabled selected></option>
                        <option value="ninguno">Ninguno</option>
                        <option value="reedicion">Reedición</option>
                        <option value="edicionLimitada">
                          Edición Limitada
                        </option>
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
                        for="edicionEspecial"
                        className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                      >
                        Edición Especial
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
                      <span className="text-pink-500">
                        {errores.duracionTotal}
                      </span>
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
                        <option value="" disabled selected></option>
                        <option value="mint">Mint</option>
                        <option value="nearMint">Near Mint</option>
                        <option value="veryGood">Very Good</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Poor</option>
                      </select>
                      <label
                        for="condicionVinil"
                        className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                      >
                        Vinilo
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
                        <option value="" disabled selected></option>
                        <option value="mint">Mint</option>
                        <option value="nearMint">Near Mint</option>
                        <option value="veryGood">Very Good</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Poor</option>
                      </select>
                      <label
                        for="condicionFunda"
                        className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                      >
                        Funda
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
                        <option value="" disabled selected></option>
                        <option value="ninguno">Ninguno</option>
                        <option value="poster">Póster</option>
                        <option value="stickerOriginal">
                          Sticker Original
                        </option>
                        <option value="cajaEspecial">Caja Especial</option>
                        <option value="slipmart">Slipmart</option>
                        <option value="varios">Varios</option>
                      </select>
                      <label
                        for="extras"
                        className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                      >
                        Extras
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
                          <span className="text-pink-500">
                            {errores.extras}
                          </span>
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
                        <option value="" disabled selected></option>
                        <option value="nuevo">Nuevo</option>
                        <option value="usado">Usado</option>
                      </select>
                      <label
                        for="estado"
                        className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                      >
                        Estado
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
                          <span className="text-pink-500">
                            {errores.estado}
                          </span>
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
                        <option value="" disabled selected></option>
                        <option value="nuevo">Nacional</option>
                        <option value="usado">Internacional</option>
                      </select>
                      <label
                        for="origen"
                        className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                      >
                        Origen
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
                          <span className="text-pink-500">
                            {errores.origen}
                          </span>
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
                        <option value="" disabled selected></option>
                        <option value="ARS">ARS</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                      <label
                        for="moneda"
                        className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base font-space-grotesk text-gray-900 font-medium transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs 
                     valid:text-shadow-emerald-500 peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                      >
                        Moneda
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
                          <span className="text-pink-500">
                            {errores.moneda}
                          </span>
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
                              Formato argentino: punto para miles, sin
                              decimales.
                            </span>
                            <span>Ej: 40.000 o 40.000,50</span>
                          </div>
                        ) : (
                          <span className="text-pink-500">
                            {errores.precio}
                          </span>
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
                <div class="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 mt-2 pt-2">
                  <div class="col-span-4 md:col-span-8 lg:col-span-12">
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
                        for="listCanciones"
                        className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs font-space-grotesk font-medium text-gray-900 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
                      >
                        Lista de canciones{" "}
                        <small className="text-pink-500">*</small>
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
                  <div class="col-span-4 md:col-span-8 lg:col-span-12 mt-4 pt-4">
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
                        for="descripcion"
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
                          <span className="text-pink-500">
                            {errores.descripcion}
                          </span>
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
                className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-public-sans font-semibold tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-gray-900 shadow-gray-300 hover:bg-primary-500 hover:shadow-sm hover:shadow-primary-200 focus:bg-primary-500 focus:shadow-sm focus:shadow-primary-200 focus:border-gray-900 focus:border-1 focus:text-gray-900 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300 disabled:shadow-none"
                type="submit"
                disabled={cargando}
                // style={{
                //   width: "100%",
                //   padding: "12px",
                //   backgroundColor: cargando ? "#ccc" : "darkolivegreen",
                //   color: "white",
                //   border: "none",
                //   borderRadius: "4px",
                //   fontSize: "16px",
                //   cursor: cargando ? "not-allowed" : "pointer",
                // }}
              >
                {cargando ? "Agregando..." : "Agregar"}
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-4 md:col-span-1 lg:col-span-3 bg-primary-500"></div>
      </div>
    </div>
  );
};

export default FormularioProducto;
