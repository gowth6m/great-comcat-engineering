import "./App.css";
import { Footer } from "./components/footer/Footer";
import AnimatedRoutes from "./components/misc/AnimatedRoutes";
import { NavBar } from "./components/navigation/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <AnimatedRoutes />
      <Footer />
    </>
  );
}

export default App;
