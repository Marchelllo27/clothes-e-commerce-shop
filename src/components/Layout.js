import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex flex-col w-full min-h-screen">{children}</main>
      <Sidebar />
      <Footer />
    </>
  );
};
export default Layout;
