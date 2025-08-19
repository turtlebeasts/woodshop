import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import useLenis from "./lib/uselenis.jsx";

export default function Layout({ children }) {
  useLenis({ anchor: true, headerOffset: 64 });
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
