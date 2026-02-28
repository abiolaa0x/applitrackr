import Sidebar from "./Sidebar";

const AppLayout = ({ children, hideSidebar = false }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      {!hideSidebar && (
          <Sidebar />
      )}

      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default AppLayout;
