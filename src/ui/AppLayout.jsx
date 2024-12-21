import Navbar from "./NavBar";

function AppLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

export default AppLayout;
