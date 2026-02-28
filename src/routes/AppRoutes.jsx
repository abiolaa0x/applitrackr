import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
// import Dashboard from "../pages/Dashboard";
import Applications from "../pages/Applications";
import ApplicationDetails from "../pages/ApplicationDetails";
// import FollowUps from "../pages/FollowUps";
// import Contacts from "../pages/Contacts";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      <Route path="/applications" element={<Applications />} />
      <Route path="/applications/:id" element={<ApplicationDetails />} />
      {/* <Route path="/follow-ups" element={<FollowUps />} /> */}
      {/* <Route path="/contacts" element={<Contacts />} /> */}
    </Routes>
  );
}

export default AppRoutes;
