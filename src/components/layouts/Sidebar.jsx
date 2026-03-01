import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Applications", path: "/applications" },
  { name: "Follow-ups", path: "/follow-ups" },
  { name: "Contacts", path: "/contacts" },
];

const Sidebar = () => {
  return (
    <aside className="w-76 bg-white border-r border-slate-200 min-h-screen p-6">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-slate-800 mb-10">applitrackr.</h1>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `
              block px-4 py-2 rounded-lg text-sm transition-all duration-200
              ${
                isActive ?
                  "bg-slate-100 text-slate-900 font-medium border border-slate-200"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              }
              `
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;