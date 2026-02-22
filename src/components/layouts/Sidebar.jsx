const Sidebar = () => {
  return (
    <aside className="w-65 bg-white border-r border-slate-200 min-h-screen p-6">
      
      <h1 className="text-xl font-bold text-slate-800 mb-8">
        Applitrackr
      </h1>

      <nav className="space-y-2">
        <div className="px-3 py-2 rounded-md text-slate-500">
          Dashboard
        </div>

        <div className="px-3 py-2 rounded-md bg-slate-100 text-slate-800 font-medium">
          Applications
        </div>

        <div className="px-3 py-2 rounded-md text-slate-500">
          Follow-ups
        </div>

        <div className="px-3 py-2 rounded-md text-slate-500">
          Contacts
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar