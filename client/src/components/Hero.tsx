import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-linear-to-r from-blue-600 via-blue-500 to-indigo-600 text-white">
      <div className="page-shell grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-100">
            Welcome to ElectroHub
          </p>
          <h1 className="max-w-xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Everything you need, all in one place.
          </h1>
          <p className="mt-5 max-w-md text-base text-blue-100 sm:text-lg">
            Discover premium gadgets, tech essentials, and accessories at prices
            designed for modern living.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="rounded-full bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-slate-100"
            >
              Shop now
            </Link>
            <Link
              to="/categories"
              className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Browse categories
            </Link>
          </div>
        </div>

        <div className="rounded-4xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-sm">
          <div className="rounded-[1.5rem] bg-slate-950 p-6 text-slate-100">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-300">
              <span>Featured</span>
              <span>New arrivals</span>
            </div>
            <div className="mt-6 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 p-6">
              <p className="text-sm text-blue-100">Laptop</p>
              <h2 className="mt-2 text-3xl font-black">MacBook Air</h2>
              <p className="mt-4 text-xl font-semibold">₹99,999</p>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-xl bg-slate-900 p-3">
                <div className="text-lg font-bold">4.8</div>
                <div className="text-slate-400">Rating</div>
              </div>
              <div className="rounded-xl bg-slate-900 p-3">
                <div className="text-lg font-bold">24h</div>
                <div className="text-slate-400">Dispatch</div>
              </div>
              <div className="rounded-xl bg-slate-900 p-3">
                <div className="text-lg font-bold">2K+</div>
                <div className="text-slate-400">Orders</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
