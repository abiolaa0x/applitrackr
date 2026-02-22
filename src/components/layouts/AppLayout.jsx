import Sidebar from "./Sidebar"

const AppLayout = ({ children }) => {
  return (
    <div className="flex bg-slate-50 min-h-screen antialiased">
      <Sidebar />

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}

export default AppLayout