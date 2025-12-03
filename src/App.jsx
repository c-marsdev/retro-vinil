import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Servicios from "./pages/Servicios";
import ProductoDetalle from "./components/ProductoDetalle";
import CartProvider from "./context/CartContext";
import AuthProvider from "./context/AuthContext.jsx";
import IniciarSesion from "./pages/IniciarSesion";
import RutaProtegida from "./pages/RutaProtegida";
import Pagar from "./pages/Pagar";
import FormularioProducto from "./components/FormularioProducto.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { ProductosProvider } from "./context/ProductosContext.jsx";
import Carrito from "./pages/Carrito.jsx";
import PreguntasFrecuentes from "./pages/PreguntasFrecuentes.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <ProductosProvider>
            <div className="items-center justify-center">
              <Header />
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/productos/:id" element={<ProductoDetalle />} />
                <Route path="/iniciar-sesion" element={<IniciarSesion />} />
                <Route
                  path="/preguntas-frecuentes"
                  element={<PreguntasFrecuentes />}
                />
                <Route
                  path="/pagar"
                  element={
                    <RutaProtegida>
                      <Pagar />
                    </RutaProtegida>
                  }
                />
                <Route
                  path="/carrito"
                  element={
                    <RutaProtegida>
                      <Carrito />
                    </RutaProtegida>
                  }
                />
                <Route
                  path="/formulario-producto"
                  element={
                    <RutaProtegida>
                      <FormularioProducto />
                    </RutaProtegida>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <RutaProtegida soloAdmin={true}>
                      <Dashboard />
                    </RutaProtegida>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Footer />
            </div>
          </ProductosProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
