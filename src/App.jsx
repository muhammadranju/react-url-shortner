import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [pathname]);

  return (
    <div className="absolute top-0 z-[-2]   w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <Header />
      <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        <div className="min-h-[calc(100vh-128px)] py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
