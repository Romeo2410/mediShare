import { Routes, Route } from "react-router-dom";
import Index from "./Index";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DonorDashboard from "./pages/DonorDashboard";
import DonorProfile from "./pages/DonorProfile";
import NeedyDashboard from "./pages/NeedyDashboard";
import PublishMedicine from "./pages/PublishMedicine";
import ManageMedicines from "./pages/ManageMedicines";
import NeedyProfile from "./pages/NeedyProfile";
import FindMedicines from "./pages/FindMedicines";
import MedicineDetails from "./pages/MedicineDetails";
import MyRequests from "./pages/MyRequests";
import ManageRequests from "./pages/ManageRequests";
import RequestMedicine from "./pages/RequestMedicine";
import AdminLogin from "./pages/AdminLogin";
import AdminUsers from "./pages/AdminUsers";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/donor/dashboard" element={<DonorDashboard />}/>
      <Route path="/needy/dashboard" element={<NeedyDashboard />}/>
      <Route path="/donor/profile" element={<DonorProfile />}/>
      <Route path="/donor/publish-medicine" element={<PublishMedicine />}/>
      <Route path="/donor/manage-medicines" element={<ManageMedicines />}/>
      <Route path="/needy/profile" element={<NeedyProfile />}/>
      <Route path="/needy/find-medicines" element={<FindMedicines />}/>
      <Route path="/needy/medicine/:id" element={<MedicineDetails />}/>
      <Route path="/needy/requests" element={<MyRequests />}/>
      <Route path="/donor/requests" element={<ManageRequests />}/>
      <Route path="/needy/request-medicine" element={<RequestMedicine />}/>
      <Route path="/admin-login-xyz" element={<AdminLogin />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    );
};

export default App;