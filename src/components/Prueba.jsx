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
    extras: "[]",
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
    // opinion: "",
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
        errorDeCarga.numCatalogo = "El número es obligatorio";
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
        errorDeCarga.cdadDiscos = "La cdad de Discos es obligatoria";
      }
      // listCanciones:
      if (!producto.listCanciones.trim()) {
        errorDeCarga.listCanciones = "La lista de Canciones son obligatorias";
      }
      // duracionTotal:
      if (!producto.duracionTotal.trim()) {
        errorDeCarga.duracionTotal = "La duración Total es obligatoria";
      }
      // condicionVinil:
      if (!producto.condicionVinil.trim()) {
        errorDeCarga.condicionVinil = "La condición del Vinilo es obligatoria";
      }
      // conticionFunda:
      if (!producto.conticionFunda.trim()) {
        errorDeCarga.conticionFunda = "La contición de la Funda es obligatoria";
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
        errorDeCarga.tipoEdicion = "El tipoEdicion es obligatoria";
      }
      // edicionEspecial:
      if (!producto.edicionEspecial.trim()) {
        errorDeCarga.edicionEspecial = "LA edición Especial es obligatoria";
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
        extras: [],
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
        opinion: "",
        estado: "",
        genero: [],
        origen: "",
        pais: [],
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
    <div>
      <form
        onSubmit={handleSubmint}
        className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200"
      >
        <div className="p-6">
          <header className="mb-4 text-center">
            <h3 className="text-xl font-medium text-slate-700">
              Agregar Producto
            </h3>
          </header>
          <div className="flex flex-col space-y-8">
            {/* Campo Nombre */}
            <div>
              <label>Titulo: *</label>
              <input
                type="text"
                name="titulo"
                value={producto.titulo}
                onChange={handleChange}
                disabled={cargando}
                placeholder={"Ingrese el título del albúm"}
                aria-invalid={!!errores.titulo}
              />
              {errores.titulo && (
                <p className="text-sm text-red-500">{errores.titulo}</p>
              )}
            </div>
            {/* Campo Artista */}
            <div>
              <label>Artista: *</label>
              <input
                type="text"
                name="artista"
                value={producto.artista}
                onChange={handleChange}
                disabled={cargando}
                placeholder="Ingrese el nombre del artista"
                aria-invalid={!!errores.artista}
              />
              {errores.artista && (
                <p className="text-sm text-red-500">{errores.artista}</p>
              )}
            </div>
            {/* Campo Año de Lanzamiento */}
            <div>
              <label>Año de Lanzamiento: *</label>
              <input
                type="number"
                name="anioLanzamiento"
                value={producto.anioLanzamiento}
                onChange={handleChange}
                disabled={cargando}
                placeholder="Ej: 19XX"
                aria-invalid={!!errores.anioLanzamiento}
              />
              {errores.anioLanzamiento && (
                <p className="text-sm text-red-500">
                  {errores.anioLanzamiento}
                </p>
              )}
            </div>
            {/* Campo N° Catálogo */}
            <div>
              <label>N° Catálogo: *</label>
              <input
                type="text"
                name="numCatalogo"
                value={producto.numCatalogo}
                onChange={handleChange}
                disabled={cargando}
                placeholder="Ingrese el número del catálogo"
                aria-invalid={!!errores.numCatalogo}
              />
              {errores.numCatalogo && (
                <p className="text-sm text-red-500">{errores.numCatalogo}</p>
              )}
            </div>
            {/* Campo Formato */}
            <div>
              <label>Formato: *</label>
              <input
                type="text"
                name="formato"
                value={producto.formato}
                onChange={handleChange}
                disabled={cargando}
                placeholder="Ingrese el nombre del formato"
                aria-invalid={!!errores.formato}
              />
              {errores.formato && (
                <p className="text-sm text-red-500">{errores.formato}</p>
              )}
            </div>
            {/* Campo Velocidad */}
            <div>
              <label>Velocidad: *</label>

              <select
                name="velocidad"
                value={producto.velocidad}
                onValueChange={selectChange("velocidad")}
                disabled={cargando}
                aria-invalid={!!errores.velocidad}
                placeholder="Tipo de velocidad"
              >
                <option value="ninguno">Ninguno</option>
                <option value="33 RPM">33 RPM</option>
                <option value="45 RPM">45 RPM</option>
                <option value="78 RPM">78 RPM</option>
              </select>

              {errores.velocidad && (
                <p className="text-sm text-red-500">{errores.velocidad}</p>
              )}
            </div>
            {/* Campo Avatar URL
      <div style={{ marginBottom: "15px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "5px",
            fontWeight: "bold",
          }}
        >
          Imagen (URL):
        </label>
        <input
          type="text"
          name="avatar"
          value={producto.avatar}
          onChange={handleChange}
          disabled={cargando}
          placeholder="https://ejemplo.com/avatar.jpg"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div> */}
            {/* Campo Cantidad de Discos */}
            <div>
              <label>Cantidad de Discos: *</label>
              <input
                type="number"
                name="cdadDiscos"
                value={producto.cdadDiscos}
                onChange={handleChange}
                disabled={cargando}
                placeholder="Ingrese la cantidad de discos"
                aria-invalid={!!errores.cdadDiscos}
              />
              {errores.cdadDiscos && (
                <p className="text-sm text-red-500">{errores.cdadDiscos}</p>
              )}
            </div>
            {/* Campo Edición de Albúm*/}
            <div>
              <label>Edición de Albúm: *</label>
              <select
                name="edicion"
                value={producto.edicion}
                onValueChange={selectChange("edicion")}
                disabled={cargando}
                aria-invalid={!!errores.edicion}
                placeholder="Tipo de edición"
              >
                <option value="ninguno">Ninguno</option>
                <option value="simple">Simple Albúm</option>
                <option value="doble">Doble Albúm</option>
                <option value="doble">Triple Albúm</option>
                <option value="boxSet">Box Albúm</option>
              </select>

              {errores.edicion && (
                <p className="text-sm text-red-500">{errores.edicion}</p>
              )}
            </div>
            {/* Campo Edición Especial */}
            <div>
              <label>Edición Especial: *</label>
              <select
                name="edicionEspecial"
                value={producto.edicionEspecial}
                onValueChange={selectChange("edicionEspecial")}
                disabled={cargando}
                aria-invalid={!!errores.edicionEspecial}
                placeholder="Tipo de edición"
              >
                <option value="ninguno">Ninguno</option>
                <option value="reedicion">Reedición</option>
                <option value="edicionLimitada">Edición Limitada</option>
                <option value="viniloColoreado">Vinilo Cooreado</option>
                <option value="vinilotransparente">Vinilo Transparente</option>
                <option value="edicionRemasterizada">
                  Edición Remasterizada
                </option>
                <option value="edicionAniversario">Edición Aniversarion</option>
                <option value="colecciones">Colecciones</option>
              </select>
              {errores.edicionEspecial && (
                <p className="text-sm text-red-500">
                  {errores.edicionEspecial}
                </p>
              )}
            </div>
            {/* Campo Duración total */}
            <div>
              <label>Duración total: *</label>
              <input
                type="text"
                name="duracionTotal"
                value={producto.duracionTotal}
                onChange={handleChange}
                disabled={cargando}
                placeholder={"Ingrese la duración total del albúm"}
                aria-invalid={!!errores.duracionTotal}
              />
              {errores.duracionTotal && (
                <p className="text-sm text-red-500">{errores.duracionTotal}</p>
              )}
            </div>
            {/* Campo Condición del Vinilo */}
            <div>
              <label>Condición del Vinilo: *</label>
              <select
                name="condicionVinil"
                value={producto.condicionVinil}
                onValueChange={selectChange("condicionVinil")}
                disabled={cargando}
                aria-invalid={!!errores.condicionVinil}
                placeholder="Tipo de condición"
              >
                <option value="ninguno">Ninguno</option>
                <option value="mint">Mint</option>
                <option value="nearMint">Near Mint</option>
                <option value="veryGood">Very Good</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>

              {errores.condicionVinil && (
                <p className="text-sm text-red-500">{errores.condicionVinil}</p>
              )}
            </div>
            {/* Campo Condición de la  Funda */}
            <div>
              <label>Condición de la Funda: *</label>
              <select
                name="condicionFunda"
                value={producto.condicionFunda}
                onValueChange={selectChange("condicionFunda")}
                disabled={cargando}
                aria-invalid={!!errores.condicionFunda}
                placeholder="Tipo de condición"
              >
                <option value="ninguno">Ninguno</option>
                <option value="mint">Mint</option>
                <option value="nearMint">Near Mint</option>
                <option value="veryGood">Very Good</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
              {errores.condicionFunda && (
                <p className="text-sm text-red-500">{errores.condicionFunda}</p>
              )}
            </div>
            {/* Campo de  Extras */}
            <div>
              <label>Extras: *</label>
              <select
                name="extras"
                value={producto.extras}
                onChange={selectChange("extras")}
                disabled={cargando}
                aria-invalid={!!errores.extras}
                placeholder="Tipo de extras"
              >
                <option value="ninguno">Ninguno</option>
                <option value="poster">Póster</option>
                <option value="stickerOriginal">Sticker Original</option>
                <option value="cajaEspecial">Caja Especial</option>
                <option value="slipmart">Slipmart</option>
              </select>

              {errores.extras && (
                <p className="text-sm text-red-500">{errores.extras}</p>
              )}
            </div>
            {/* Género */}
            <div>
              <label>Género: *</label>
              <select
                name="genero"
                value={producto.genero}
                onValueChange={selectChange("genero")}
                disabled={cargando}
                aria-invalid={!!errores.genero}
                placeholder="Tipo de género"
              >
                <option value="ninguno">Ninguno</option>
                <option value="rock">Rock</option>
                <option value="setc">etc</option>
              </select>

              {errores.genero && (
                <p className="text-sm text-red-500">{errores.genero}</p>
              )}
            </div>
            {/* Campo de  Estado */}
            <div>
              <label>Estado: *</label>
              <select
                name="estado"
                value={producto.estado}
                onValueChange={selectChange("estado")}
                disabled={cargando}
                aria-invalid={!!errores.estado}
                placeholder="Tipo de estado"
              >
                <option value="ninguno">Ninguno</option>
                <option value="nuevo">Nuevo</option>
                <option value="usado">Usado</option>
              </select>

              {errores.estado && (
                <p className="text-sm text-red-500">{errores.estado}</p>
              )}
            </div>
            {/* Campo de  Origen */}
            <div>
              <label>Origen: *</label>
              <select
                name="origen"
                value={producto.origen}
                onValueChange={selectChange("origen")}
                disabled={cargando}
                aria-invalid={!!errores.origen}
                placeholder="Tipo de origen"
              >
                <option value="ninguno">Ninguno</option>
                <option value="nacional">Nacional</option>
                <option value="importado">Importado</option>
              </select>

              {errores.origen && (
                <p className="text-sm text-red-500">{errores.origen}</p>
              )}
            </div>
            {/* Campo País */}
            <div className="m-2 relative my-6">
              <input
                name="pais"
                value={producto.pais}
                onChange={handleChange}
                disabled={cargando}
                aria-invalid={!!errores.pais}
                placeholder="Tipo de país"
                className="peer relative h-12 w-full border-b border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-rose-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label
                htmlFor="precio"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-rose-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                País: *
              </label>
              <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-slate-400 transition peer-invalid:text-pink-500">
                <span>
                  {errores.pais && (
                    <span className="text-sm">{errores.pais}</span>
                  )}
                </span>
              </small>
            </div>
            {/* Campo Precio */}
            <div className="m-2 relative my-6">
              <label
                htmlFor="precio"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-rose-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Precio: *
              </label>
              <input
                type="text"
                name="precio"
                value={producto.precio}
                onChange={handleChange}
                disabled={cargando}
                placeholder="Ej: 40.000 o 40.000,50"
                inputMode="decimal"
                aria-invalid={!!errores.precio}
                className="peer relative h-10 w-full border-b border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-rose-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <div className="text-xs text-cyan-500 mt-2">
                Formato argentino: punto para miles, sin decimales.
              </div>
              {errores.precio && (
                <p className="text-sm text-red-500">{errores.precio}</p>
              )}
            </div>
            {/* Campo de  Moneda */}
            <div>
              <label>Moneda: *</label>
              <select
                name="moneda"
                value={producto.moneda}
                onValueChange={selectChange("moneda")}
                disabled={cargando}
                aria-invalid={!!errores.moneda}
                placeholder="Tipo de moneda"
              >
                <option value="ninguno">Ninguno</option>
                <option value="ars">ARS</option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
              </select>

              {errores.moneda && (
                <p className="text-sm text-red-500">{errores.moneda}</p>
              )}
            </div>
            {/* Campo Stock */}
            <div>
              <label>Stock: *</label>
              <input
                type="number"
                name="anioLanzamiento"
                value={producto.stock}
                onChange={handleChange}
                disabled={cargando}
                placeholder="Ej: 19XX"
                aria-invalid={!!errores.stock}
              />
              {errores.stock && (
                <p className="text-sm text-red-500">{errores.stock}</p>
              )}
            </div>
            {/* Campo Lista de Canciones */}
            <div>
              <label>Lista de Canciones: *</label>
              <textarea
                name="listCanciones"
                value={producto.listCanciones}
                onChange={handleChange}
                rows="4"
                disabled={cargando}
                maxLength="200"
                placeholder="Mínimo 10 caracteres, máximo 200 caracteres"
                aria-invalid={!!errores.listCanciones}
              />
              <div
                style={{
                  fontSize: "12px",
                  color: producto.descripcion.length > 200 ? "red" : "#666",
                  marginTop: "5px",
                }}
              >
                {producto.descripcion.length}/200 caracteres
              </div>
              {errores.descripcion && (
                <p className="text-sm text-red-500">{errores.descripcion}</p>
              )}
            </div>
            {/* Campo País */}
            <div className="m-2 relative my-6">
              <input
                id="pais"
                name="pais"
                value={producto.pais}
                onChange={handleChange}
                disabled={cargando}
                aria-invalid={!!errores.pais}
                placeholder="Tipo de país"
                className={`peer relative h-12 w-full border-b px-4 text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white
      {${
        errores.pais
          ? "border-pink-500 text-pink-500 focus:border-pink-500"
          : "border-slate-200 focus:border-rose-500"
      }}
      disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
              />
              {errores.pais && (
                <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-pink-500">
                  <span>{errores.pais}</span>
                </small>
              )}

              <label
                htmlFor="pais"
                className={`absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs transition-all
      before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
      peer-focus:-top-2 peer-focus:text-xs
      ${
        errores.pais
          ? "text-pink-500 peer-focus:text-pink-500"
          : "text-slate-400 peer-focus:text-rose-500"
      }
      peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent`}
              >
                País: *
              </label>
            </div>
            {/* Campo Descripción */}
            <div>
              <label>Descripción: *</label>
              <textarea
                name="descripcion"
                value={producto.descripcion}
                onChange={handleChange}
                rows="4"
                disabled={cargando}
                maxLength="200"
                placeholder="Mínimo 10 caracteres, máximo 200 caracteres"
                aria-invalid={!!errores.descripcion}
                className={`${
                  errores.descripcion
                    ? "border-pink-500 text-pink-500 focus:border-pink-500"
                    : "border-slate-200 focus:border-rose-500"
                }`}
              />
              <div
                style={{
                  fontSize: "12px",
                  color: producto.descripcion.length > 200 ? "red" : "#666",
                  marginTop: "5px",
                }}
              >
                {producto.descripcion.length}/200 caracteres
              </div>

              {errores.descripcion && (
                <small className="text-pink-500 peer-focus:text-pink-500">
                  {errores.descripcion}
                </small>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end p-6 ">
          <button
            className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
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
            {cargando ? "Agregando..." : "Agregar Producto"}
          </button>
        </div>

        <p>(*) Campos obligatorios</p>
      </form>
    </div>
  );
};
import React, { useState } from "react";

export default function FormElementsInputPlainLgHelperText() {
  const [state, setState] = useState({
    "id-l04": "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  return (
    <>
      {/*    <!-- Component: Plain large input with helper text --> */}
      <div className="relative my-6">
        <input
          id="titulo"
          type="text"
          name="titulo"
          placeholder="Título"
          value={producto.titulo}
          className="peer relative h-12 w-full border-b border-slate-200 px-4 font-space-grotesk text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          onChange={handleChange}
          disabled={cargando}
          aria-invalid={!!errores.titulo}
        />
        <label
          htmlFor="titulo"
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs  text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          Título <small className="text-pink-500">*</small>
        </label>
        <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-slate-400 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
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
      {/*    <!-- End Plain large input with helper text --> */}
    </>
  );
}
import React, { useState } from "react"

export default function NavbarTopBar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false)

  return (
    <>
      {/*<!-- Component: Navbar with Topbar --> */}
      {/*<!-- Top bar --> */}
      <div className="border-b border-slate-200 bg-slate-100">
        <div className="mx-auto grid w-full max-w-full grid-cols-4 gap-6 px-6 py-2 text-sm text-slate-500 md:grid-cols-8 lg:max-w-5xl lg:grid-cols-12 xl:max-w-7xl 2xl:max-w-[96rem]">
          <div className="col-span-2 items-center md:col-span-4 lg:col-span-6">
            <a
              href="javascript:void(0)"
              className="flex items-center gap-2 transition-colors duration-300 hover:text-emerald-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                role="graphics-symbol"
                aria-labelledby="title-tb00 desc-tb00"
              >
                <title id="title-tb00">Icon title</title>
                <desc id="desc-tb00">
                  A more detailed description of the icon
                </desc>
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clipRule="evenodd"
                />
              </svg>
              +306750009800
            </a>
          </div>
          <div className="col-span-2 items-center justify-end gap-6 md:col-span-4 lg:col-span-6">
            <div className="flex items-center justify-end gap-4">
              <a
                href="javascript:void(0)"
                className="transition-colors duration-300 hover:text-emerald-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 48"
                  height="16"
                  width="16"
                  role="graphics-symbol"
                  aria-labelledby="title-tb01 desc-tb01"
                >
                  <title id="title-tb01">Icon title</title>
                  <desc id="desc-tb01">
                    A more detailed description of the icon
                  </desc>
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M37.2491 3.30238C37.0498 2.18649 36.0513 1.49746 34.9878 1.50395C32.2606 1.5206 29.7927 1.60328 27.6333 1.96988C25.4705 2.33708 23.584 2.99414 22.038 4.18283C18.9929 6.52415 17.4377 10.7872 17.3724 18.3217H11.9552C10.9254 18.3217 9.94522 18.9739 9.74313 20.0674C9.51312 21.312 9.33088 23.311 9.75643 25.8014C9.95527 26.9651 10.9939 27.7324 12.1233 27.7324H17.3703V44.3867C17.3703 45.2169 17.8349 46.0595 18.7834 46.2403C19.5015 46.3773 20.6304 46.5002 22.375 46.5002C24.1168 46.5002 25.347 46.3777 26.1718 46.2437C27.2507 46.0684 27.8777 45.1191 27.8777 44.1186V27.7324H34.9316C36.0256 27.7324 37.0562 27.009 37.2608 25.8665C37.6736 23.5618 37.4742 21.4753 37.2437 20.1563C37.0465 19.0284 36.0444 18.3217 34.9653 18.3217H27.8795C27.8917 16.7111 27.9661 15.4564 28.1447 14.4728C28.341 13.3921 28.6547 12.6875 29.1044 12.2048C29.5502 11.7263 30.1817 11.4104 31.1284 11.2121C32.0832 11.0121 33.3126 10.9408 34.9123 10.9193C36.0128 10.9045 37.0511 10.1718 37.2541 9.01765C37.6718 6.64193 37.4794 4.59202 37.2491 3.30238Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="javascript:void(0)"
                className="transition-colors duration-300 hover:text-emerald-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 48"
                  height="16"
                  width="16"
                  role="graphics-symbol"
                  aria-labelledby="title-tb02 desc-tb02"
                >
                  <title id="title-tb02">Icon title</title>
                  <desc id="desc-tb02">
                    A more detailed description of the icon
                  </desc>
                  <path
                    fill="currentColor"
                    d="M34.7229 4.69819C36.9179 5.13151 38.8231 6.226 39.9574 7.46121L44.8741 7.22772C46.162 7.16656 46.9576 8.61264 46.216 9.66758L42.8041 14.5217C43.7777 35.6815 22.2547 49.0961 4.54954 41.2208C3.75067 40.8654 3.58181 40.0439 3.74682 39.4029C3.91015 38.7685 4.4337 38.1304 5.23631 38.0329C7.74782 37.7279 10.886 36.8951 13.5309 34.8102C11.3351 34.4801 8.87383 33.2203 6.77118 31.5522C4.25179 29.5535 2.11595 26.8651 1.53319 24.2321C1.41942 23.7181 1.60805 23.2504 1.94754 22.9478C2.27981 22.6517 2.75116 22.5146 3.22643 22.6022C4.4998 22.8369 6.44397 23.1705 7.93366 23.3225C7.82715 23.2095 7.71399 23.0872 7.59534 22.9561C6.83881 22.1198 5.85466 20.9171 4.947 19.4528C3.13974 16.5372 1.58717 12.5021 2.86967 8.24191C3.04524 7.65872 3.52191 7.3215 4.02883 7.2399C4.52724 7.15967 5.07712 7.31911 5.46709 7.72851C7.80814 10.1862 13.7896 15.4057 22.914 16.1638C22.5823 14.0277 22.368 9.45707 27.2507 6.17582C29.7236 4.51405 32.4029 4.2402 34.7229 4.69819Z"
                  />
                </svg>
              </a>
              <a
                href="javascript:void(0)"
                className="transition-colors duration-300 hover:text-emerald-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 48"
                  height="16"
                  width="16"
                  role="graphics-symbol"
                  aria-labelledby="title-tb03 desc-tb03"
                >
                  <title id="title-tb03">Icon title</title>
                  <desc id="desc-tb03">
                    A more detailed description of the icon
                  </desc>
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M18.9563 7.52344C18.7526 6.91526 18.1767 6.49018 17.5166 6.51256C13.7277 6.64105 10.4346 7.72034 9.03159 8.24815C8.46409 8.46164 7.98142 8.84195 7.6475 9.35489C6.13235 11.6824 1.35143 20.1396 1.5015 33.9816C1.51112 34.8687 1.87868 35.7421 2.60293 36.3174C4.05518 37.4709 7.22566 39.6169 12.2716 41.1548C13.1338 41.4176 14.1343 41.1791 14.6848 40.3722C15.3668 39.3727 15.9633 38.1197 16.3718 37.1704C16.4818 36.9145 16.7753 36.775 17.0546 36.8566C18.8459 37.3799 21.1512 37.7795 24.0128 37.7795C26.865 37.7795 29.1613 37.3825 30.9459 36.8617C31.2254 36.7802 31.5188 36.9197 31.6289 37.1755C32.0373 38.1241 32.6329 39.3744 33.3137 40.3722C33.8643 41.1791 34.8647 41.4176 35.727 41.1548C40.7729 39.6169 43.9433 37.4709 45.3956 36.3174C46.1198 35.7421 46.4874 34.8687 46.497 33.9816C46.6459 20.2518 41.9432 11.8198 40.3884 9.41269C40.0295 8.85716 39.4986 8.45634 38.8845 8.24366C37.3835 7.72379 33.9285 6.65561 30.4846 6.51532C29.821 6.48828 29.2456 6.91631 29.0422 7.52344L28.5352 9.03687C28.4493 9.293 28.1503 9.47311 27.8343 9.41471C27.0144 9.26322 25.7164 9.09373 24.0128 9.09373C22.2989 9.09373 20.9871 9.26529 20.1611 9.41734C19.8471 9.47513 19.5502 9.29611 19.4648 9.04103L18.9563 7.52344ZM21 25C21 27.7614 18.9853 30 16.5 30C14.0147 30 12 27.7614 12 25C12 22.2386 14.0147 20 16.5 20C18.9853 20 21 22.2386 21 25ZM31.5 30C29.0147 30 27 27.7614 27 25C27 22.2386 29.0147 20 31.5 20C33.9853 20 36 22.2386 36 25C36 27.7614 33.9853 30 31.5 30Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/*<!-- Header --> */}
      <header className=" relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}
            <a
              id="WindUI"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
              href="javascript:void(0)"
            >
              <svg
                width="300"
                height="300"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 bg-emerald-500"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M88.1121 88.1134L150.026 150.027L150.027 150.027L150.027 150.027L150.028 150.027L150.027 150.026L88.1133 88.1122L88.1121 88.1134ZM273.878 273.877C272.038 274.974 196.128 319.957 165.52 289.349L88.1124 211.942L26.1434 273.911C26.1434 273.911 -20.3337 196.504 10.651 165.519L88.1121 88.1134L26.1417 26.1433C26.1417 26.1433 69.6778 0.00338007 104.519 0H0V300H300V0H104.533C116.144 0.00112664 126.789 2.90631 134.534 10.651L211.941 88.1123L273.877 26.177C274.974 28.0159 319.957 103.926 289.349 134.535L211.942 211.942L273.878 273.877ZM273.878 273.877L273.912 273.857V273.911L273.878 273.877ZM273.877 26.177L273.911 26.1429H273.857C273.857 26.1429 273.863 26.1544 273.877 26.177Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 0H300V300H0V0ZM150.026 150.025C121.715 99.731 88.1131 88.1122 88.1131 88.1122L10.6508 165.519C10.6508 165.519 26.143 150.027 150.026 150.027H150.027C150.026 150.027 150.026 150.027 150.026 150.027L150.026 150.027C99.731 178.339 88.1124 211.941 88.1124 211.941L165.52 289.348C165.52 289.348 150.032 273.86 150.027 150.027H150.029C178.341 200.323 211.944 211.942 211.944 211.942L289.352 134.535C289.352 134.535 273.864 150.023 150.027 150.027V150.027L150.027 150.027C200.322 121.715 211.941 88.1125 211.941 88.1125L134.534 10.651C134.534 10.651 150.026 26.1431 150.026 150.025ZM150.027 150.027L150.026 150.027C150.026 150.026 150.026 150.026 150.026 150.025C150.026 150.025 150.027 150.026 150.027 150.027ZM150.027 150.027L150.027 150.026L150.027 150.027C150.027 150.027 150.027 150.027 150.027 150.027L150.027 150.027ZM150.027 150.027C150.027 150.027 150.027 150.027 150.027 150.027H150.027L150.027 150.027Z"
                  fill="rgba(255,255,255,.2)"
                />
              </svg>
              Brand
            </a>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
                ${
                  isToggleOpen
                    ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                    : ""
                }
              `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
            {/*      <!-- Navigation links --> */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Shop</span>
                </a>
              </li>
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-current="page"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 text-emerald-500 transition-colors duration-300 hover:text-emerald-600 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Account</span>
                </a>
              </li>
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Wishlist</span>
                </a>
              </li>
            </ul>
            {/*      <!-- Actions --> */}
            <div className="ml-auto flex items-center justify-end px-6 lg:ml-0 lg:flex-1 lg:p-0">
              <a
                href="#"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-lg text-emerald-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-labelledby="title description"
                  role="graphics-symbol"
                >
                  <title id="title">Cart Icon</title>
                  <desc id="description">Cart icon with items</desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <span className="absolute -right-1.5 -top-1.5 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 px-1.5 text-sm text-white">
                  2<span className="sr-only"> new emails </span>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </header>
      {/*<!-- End Navbar with Topbar--> */}
    </>
  )
}



import React, { useState } from "react"

export default function NavbarBasic() {
  const [isToggleOpen, setIsToggleOpen] = useState(false)

  return (
    <>
      {/*<!-- Component: Basic Navbar --> */}
      <header className=" relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}
            <a
              id="WindUI"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
              href="javascript:void(0)"
            >
              <svg
                width="300"
                height="300"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 bg-emerald-500"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M88.1121 88.1134L150.026 150.027L150.027 150.027L150.027 150.027L150.028 150.027L150.027 150.026L88.1133 88.1122L88.1121 88.1134ZM273.878 273.877C272.038 274.974 196.128 319.957 165.52 289.349L88.1124 211.942L26.1434 273.911C26.1434 273.911 -20.3337 196.504 10.651 165.519L88.1121 88.1134L26.1417 26.1433C26.1417 26.1433 69.6778 0.00338007 104.519 0H0V300H300V0H104.533C116.144 0.00112664 126.789 2.90631 134.534 10.651L211.941 88.1123L273.877 26.177C274.974 28.0159 319.957 103.926 289.349 134.535L211.942 211.942L273.878 273.877ZM273.878 273.877L273.912 273.857V273.911L273.878 273.877ZM273.877 26.177L273.911 26.1429H273.857C273.857 26.1429 273.863 26.1544 273.877 26.177Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 0H300V300H0V0ZM150.026 150.025C121.715 99.731 88.1131 88.1122 88.1131 88.1122L10.6508 165.519C10.6508 165.519 26.143 150.027 150.026 150.027H150.027C150.026 150.027 150.026 150.027 150.026 150.027L150.026 150.027C99.731 178.339 88.1124 211.941 88.1124 211.941L165.52 289.348C165.52 289.348 150.032 273.86 150.027 150.027H150.029C178.341 200.323 211.944 211.942 211.944 211.942L289.352 134.535C289.352 134.535 273.864 150.023 150.027 150.027V150.027L150.027 150.027C200.322 121.715 211.941 88.1125 211.941 88.1125L134.534 10.651C134.534 10.651 150.026 26.1431 150.026 150.025ZM150.027 150.027L150.026 150.027C150.026 150.026 150.026 150.026 150.026 150.025C150.026 150.025 150.027 150.026 150.027 150.027ZM150.027 150.027L150.027 150.026L150.027 150.027C150.027 150.027 150.027 150.027 150.027 150.027L150.027 150.027ZM150.027 150.027C150.027 150.027 150.027 150.027 150.027 150.027H150.027L150.027 150.027Z"
                  fill="rgba(255,255,255,.2)"
                />
              </svg>
              Brand
            </a>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
                ${
                  isToggleOpen
                    ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                    : ""
                }
              `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
            {/*      <!-- Navigation links --> */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Home</span>
                </a>
              </li>
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-current="page"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 text-emerald-500 transition-colors duration-300 hover:text-emerald-600 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Features</span>
                </a>
              </li>
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Pricing</span>
                </a>
              </li>
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>About</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {/*<!-- End Basic Navbar--> */}
    </>
  )
}
