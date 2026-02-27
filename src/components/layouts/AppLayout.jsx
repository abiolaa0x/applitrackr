import Sidebar from "./Sidebar";

const AppLayout = ({ children, hideSidebar = false }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      {!hideSidebar && (
        // <div className="w-8 border-r border-slate-200 bg-white">
          <Sidebar />
        // </div>
      )}

      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default AppLayout;
