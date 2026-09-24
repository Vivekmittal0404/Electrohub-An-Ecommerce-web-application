import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page-shell">
      <div className="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="section-label">404</p>
        <h1 className="text-4xl font-black text-slate-900">Page not found</h1>
        <p className="mt-3 text-slate-600">
          The page you’re looking for does not exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
