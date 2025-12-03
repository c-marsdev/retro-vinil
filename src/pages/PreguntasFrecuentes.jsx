const PreguntasFrecuentes = () => {
  return (
    <div>
      <h1 className="w-screen text-center font-archivo-black font-extrabold text-3xl max-[395px]:text-xl m-4 p-2">
        Preguntas frecuentes
      </h1>
      <div className="flex justify-center">
        <section className="w-5/6 divide-y rounded divide-slate-200 mx-4">
          <details className="p-4 group" open>
            <summary className="font-space-grotesk text-xl font-semibold relative cursor-pointer list-none pr-8 text-gray-900 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
              ¿Qué significan los distintos tipos de formato?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-ac01 desc-ac01"
              >
                <title id="title-ac01">Open icon</title>
                <desc id="desc-ac01">
                  icon that represents the state of the summary
                </desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <p className="mt-4 font-nunito text-lg text-gray-500">
              * LP 12": Álbum estándar
              <br />* EP 10": Extended Play (más corto que un álbum, más largo
              que un single)
              <br /> * Single 7": Sencillo
              <br />* Picture Disc: Vinilo con imagen impresa
            </p>
          </details>
          <details className="p-4 group">
            <summary className="font-space-grotesk text-xl font-semibold relative cursor-pointer list-none pr-8  text-gray-900 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
              ¿Qué significan los distintos tipos de velocidad?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-ac02 desc-ac02"
              >
                <title id="title-ac02">Open icon</title>
                <desc id="desc-ac02">
                  icon that represents the state of the summary
                </desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <p className="mt-4 font-nunito text-lg text-gray-500">
              * 33 RPM: Para álbumes largos
              <br />* 45 RPM: Para singles y EPs
              <br />* 78 RPM: Ediciones antiguas
            </p>
          </details>
          <details className="p-4 group">
            <summary className="font-space-grotesk text-xl font-semibold relative cursor-pointer list-none pr-8 text-gray-900 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
              ¿Qué significan las distintas condiciones del vinilo?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-ac03 desc-ac03"
              >
                <title id="title-ac03">Open icon</title>
                <desc id="desc-ac03">
                  icon that represents the state of the summary
                </desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <p className="mt-4 font-nunito text-lg text-gray-500">
              * Mint: Nuevo, sin uso
              <br />* Near Mint: Casi nuevo, apenas usado
              <br />* Very Good: Muy buen estado, con leves marcas
              <br />* Good: Estado aceptable, con desgaste visible
              <br />* Fair: Condiciones regulares, puede tener saltos
              <br />* Poor: Mal estado, rayado o dañado
            </p>
          </details>
          <details className="p-4 group">
            <summary className="font-space-grotesk text-xl font-semibold relative cursor-pointer list-none pr-8 text-gray-900 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
              ¿Qué significan las distintas condiciones de la funda?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-ac04 desc-ac04"
              >
                <title id="title-ac04">Open icon</title>
                <desc id="desc-ac04">
                  icon that represents the state of the summary
                </desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <p className="mt-4 font-nunito text-lg text-gray-500">
              * Mint: Como nueva
              <br />* Near Mint: Casi nueva, mínimos detalles
              <br />* Very Good: Buen estado, desgaste leve en bordes
              <br />* Good: Desgaste visible, marcas de uso
              <br />* Fair: Carátula dañada, manchas o cortes
              <br />* Poor: Muy deteriorada
            </p>
          </details>
          <details className="p-4 group">
            <summary className="font-space-grotesk text-xl font-semibold relative cursor-pointer list-none pr-8  text-gray-900 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
              ¿Cuáles son las formas de pago?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-ac02 desc-ac02"
              >
                <title id="title-ac02">Open icon</title>
                <desc id="desc-ac02">
                  icon that represents the state of the summary
                </desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <p className="mt-4 font-nunito text-lg text-gray-500">
              * Visa
              <br />* Mastercard
              <br />* Naranja
              <br />* MecadoPago
              <br />* Pago Facil
              <br />* Efectivo
              <br />* Transferencia
            </p>
          </details>
          <details className="p-4 group">
            <summary className="font-space-grotesk text-xl font-semibold relative cursor-pointer list-none pr-8  text-gray-900 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
              ¿Cuál es el costo de envío?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-ac02 desc-ac02"
              >
                <title id="title-ac02">Open icon</title>
                <desc id="desc-ac02">
                  icon that represents the state of the summary
                </desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <p className="mt-4 font-nunito text-lg text-gray-500">
              * El costo de envío será mostrado en base al total de la compra y
              ubicación, en el checkout, en el momento previo a la compra.
            </p>
          </details>
          <details className="p-4 group">
            <summary className="font-space-grotesk text-xl font-semibold relative cursor-pointer list-none pr-8  text-gray-900 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
              ¿Cómo se realizan los envíos?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-ac02 desc-ac02"
              >
                <title id="title-ac02">Open icon</title>
                <desc id="desc-ac02">
                  icon that represents the state of the summary
                </desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <p className="mt-4 font-nunito text-lg text-gray-500">
              * Trabajamos con: Correo Argentino
            </p>
          </details>
          <details className="p-4 group">
            <summary className="font-space-grotesk text-xl font-semibold relative cursor-pointer list-none pr-8  text-gray-900 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
              ¿Dónde puedo recibir mi pedido?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-ac02 desc-ac02"
              >
                <title id="title-ac02">Open icon</title>
                <desc id="desc-ac02">
                  icon that represents the state of the summary
                </desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <p className="mt-4 font-nunito text-lg text-gray-500">
              Realizamos envíos a todo el país.
            </p>
          </details>
          <details className="p-4 group">
            <summary className="font-space-grotesk text-xl font-semibold relative cursor-pointer list-none pr-8  text-gray-900 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
              ¿Cuánto tarda en llegar el pedido?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-ac02 desc-ac02"
              >
                <title id="title-ac02">Open icon</title>
                <desc id="desc-ac02">
                  icon that represents the state of the summary
                </desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <p className="mt-4 font-nunito text-lg text-gray-500">
              * El tiempo de entrega dependerá del tipo de envío seleccionado.
              En general, la demora es de entre 3 y 7 días hábiles luego de
              acreditado el pago.
            </p>
          </details>
          <details className="p-4 group">
            <summary className="font-space-grotesk text-xl font-semibold relative cursor-pointer list-none pr-8  text-gray-900 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
              ¿Cuál es el plazo para realizar un cambio?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-ac02 desc-ac02"
              >
                <title id="title-ac02">Open icon</title>
                <desc id="desc-ac02">
                  icon that represents the state of the summary
                </desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <p className="mt-4 font-nunito text-lg text-gray-500">
              * Podés solicitar un cambio dentro de los 15 días luego de
              realizada la compra.
            </p>
          </details>
        </section>
      </div>
    </div>
  );
};
export default PreguntasFrecuentes;
