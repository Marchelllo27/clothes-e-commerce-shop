import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <main className="flex flex-col w-full h-screen">
      <Header />
      {children}
      <Sidebar />
      <Footer />
    </main>
  );
};
export default Layout;
