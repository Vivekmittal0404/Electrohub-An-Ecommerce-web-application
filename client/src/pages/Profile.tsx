import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="page-shell text-center text-slate-600">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="section-label">Account</p>
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>

        <div className="mt-6 space-y-4 text-slate-700">
          <div>
            <p className="text-sm text-slate-500">Name</p>
            <p className="font-semibold text-slate-900">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="font-semibold text-slate-900">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Role</p>
            <p className="font-semibold text-slate-900 capitalize">
              {user.role}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-8 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-blue-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
