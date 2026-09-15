import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, LogOut, User, Mail, UserRound, Users, UserCheck, UserX, Sparkles} from "lucide-react";

import api from "../data/api";

const AdminUsers = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin-login-xyz");
        return;
      }

      const response = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(response.data);

    } catch (error) {

      console.log(error);

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        localStorage.removeItem("adminToken");
        navigate("/admin-login-xyz");
      }

    } finally {

      setLoading(false);

    }

  };

  const changeStatus = async (id, currentStatus) => {

    try {

      const token = localStorage.getItem("adminToken");

      const newStatus = currentStatus === 1 ? 0 : 1;

      await api.put(
        `/admin/users/${id}/status`,
        {
          status: newStatus
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id
            ? { ...user, status: newStatus }
            : user
        )
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to update user status"
      );

    }

  };

  const handleLogout = () => {

    localStorage.removeItem("adminToken");

    navigate("/admin-login-xyz");

  };

  const activeUsers = users.filter(
    (user) => user.status === 1
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === 0
  ).length;

  const donorUsers = users.filter(
    (user) => user.usertype === "Donor"
  ).length;

  const needyUsers = users.filter(
    (user) => user.usertype === "Needy"
  ).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50">

      {/* Navbar */}

      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">

        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4">

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-indigo-600 text-white flex items-center justify-center shadow-sm">

                <ShieldCheck className="w-5 h-5" />

              </div>

              <div>

                <h1 className="text-lg md:text-xl font-black bg-linear-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
                  MediShare Admin
                </h1>

                <p className="hidden sm:block text-xs text-gray-500 font-medium">
                  User Management
                </p>

              </div>

            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 md:px-4 py-2.5 rounded-xl bg-rose-50 text-rose-600 font-semibold border border-rose-100 hover:bg-rose-500 hover:text-white transition-all duration-300"
            >

              <LogOut className="w-4 h-4" />

              <span className="hidden sm:inline">
                Logout
              </span>

            </button>

          </div>

        </div>

      </nav>

      {/* Content */}

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">

        {/* Page Header */}

        <div className="mb-7">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100">

            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />

            <span className="text-xs font-bold text-indigo-600">
              ADMIN CONTROL CENTER
            </span>

          </div>

          <div className="flex items-center gap-3 mt-3">

            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-emerald-500 to-indigo-600 text-white flex items-center justify-center shadow-md">

              <Users className="w-5 h-5" />

            </div>

            <div>

              <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                Manage Users
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                View and manage all registered MediShare users.
              </p>

            </div>

          </div>

        </div>

        {/* Statistics */}

        {!loading && users.length > 0 && (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-7">

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    Total Users
                  </p>

                  <p className="text-2xl font-black text-gray-900 mt-1">
                    {users.length}
                  </p>

                </div>

                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    Active
                  </p>

                  <p className="text-2xl font-black text-emerald-600 mt-1">
                    {activeUsers}
                  </p>

                </div>

                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    Inactive
                  </p>

                  <p className="text-2xl font-black text-rose-600 mt-1">
                    {inactiveUsers}
                  </p>

                </div>

                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <UserX className="w-5 h-5" />
                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    Donors
                  </p>

                  <p className="text-2xl font-black text-cyan-600 mt-1">
                    {donorUsers}
                  </p>

                </div>

                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  <UserRound className="w-5 h-5" />
                </div>

              </div>

            </div>
            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    Needy
                  </p>

                  <p className="text-2xl font-black text-violet-600 mt-1">
                    {needyUsers}
                  </p>

                </div>

                <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">

                  <UserRound className="w-5 h-5" />

                </div>

              </div>

            </div>

          </div>

        )}

        {/* Loading */}

        {loading ? (

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">

            <div className="w-10 h-10 mx-auto rounded-full border-4 border-indigo-100 border-t-indigo-500 animate-spin"></div>

            <p className="text-gray-500 font-medium mt-4">
              Loading users...
            </p>

          </div>

        ) : users.length === 0 ? (

          /* No Users */

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">

              <Users className="w-8 h-8" />

            </div>

            <h2 className="text-xl font-black text-gray-900 mt-5">
              No Users Found
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              There are currently no registered users.
            </p>

          </div>

        ) : (

          /* User Cards */

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {users.map((user) => (

              <div
                key={user._id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-lg transition-shadow duration-200"
              >

                {/* User Header */}

                <div className="flex items-center gap-4 mb-5">

                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                      user.usertype === "Donor"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-violet-50 text-violet-600"
                    }`}
                  >

                    <User className="w-7 h-7" />

                  </div>

                  <div className="min-w-0">

                    <h3 className="text-lg font-black text-gray-900 truncate">
                      {user.name}
                    </h3>

                    <p className="text-xs text-gray-400 font-medium mt-0.5">
                      MediShare User
                    </p>

                  </div>

                </div>

                {/* Email */}

                <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-gray-50">

                  <div className="w-8 h-8 rounded-lg bg-white text-indigo-500 flex items-center justify-center shrink-0 shadow-sm">

                    <Mail className="w-4 h-4" />

                  </div>

                  <div className="min-w-0">

                    <p className="text-xs text-gray-400 font-medium">
                      Email
                    </p>

                    <p className="text-sm text-gray-700 font-semibold break-all">
                      {user.email}
                    </p>

                  </div>

                </div>

                {/* User Type */}

                <div className="flex items-center justify-between py-3 border-b border-gray-100">

                  <div className="flex items-center gap-2">

                    <UserRound className="w-4 h-4 text-gray-400" />

                    <span className="text-sm text-gray-500">
                      User Type
                    </span>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      user.usertype === "Donor"
                        ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                        : "bg-violet-50 border-violet-100 text-violet-700"
                    }`}
                  >
                    {user.usertype}
                  </span>

                </div>

                {/* Status */}

                <div className="flex items-center justify-between py-4">

                  <span className="text-sm text-gray-500">
                    Account Status
                  </span>

                  {user.status === 1 ? (

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold">

                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>

                      Active

                    </span>

                  ) : (

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold">

                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>

                      Inactive

                    </span>

                  )}

                </div>

                {/* Action */}

                <button
                  onClick={() =>
                    changeStatus(
                      user._id,
                      user.status
                    )
                  }
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white font-bold transition-all duration-300 ${
                    user.status === 1
                      ? "bg-linear-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600"
                      : "bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                  }`}
                >

                  {user.status === 1 ? (
                    <>
                      <UserX className="w-4 h-4" />
                      Deactivate User
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      Activate User
                    </>
                  )}

                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminUsers;