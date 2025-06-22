import { Link, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";

const modules = [
  {
    name: "Yashika",
    path: "/yashika",
    url: "https://assessment-wine-five.vercel.app/",
    color: "from-pink-500 to-yellow-500",
  },
  {
    name: "Sourav",
    path: "/sourav",
    url: "https://candidate-00-x-talentezee-campaign.vercel.app/",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Abhijaiswal",
    path: "/abhijaiswal",
    url: "https://talent-ezee.vercel.app/",
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Irfan",
    path: "/irfan",
    url: "https://talentezee-client.vercel.app/",
    color: "from-green-500 to-lime-500",
  },
];

const ModuleFrame = ({ url }) => (
  <iframe
    src={url}
    title="Module"
    className="w-full h-[70vh] rounded-2xl border-2 border-gray-200 shadow-xl transition-all duration-300 bg-white"
    allow="clipboard-write; fullscreen"
  />
);

function ModuleNav() {
  const location = useLocation();
  return (
    <nav className="flex flex-wrap gap-6 mb-12 justify-center">
      {modules.map((mod) => (
        <Link
          key={mod.name}
          to={mod.path}
          className={`min-w-[120px] px-6 py-3 rounded-xl font-bold text-lg bg-gradient-to-r ${mod.color} text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 ${location.pathname === mod.path
            ? "ring-4 ring-offset-2 ring-blue-400 scale-105"
            : ""
            }`}
          style={{ letterSpacing: "0.03em" }}
        >
          {mod.name}
        </Link>
      ))}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 p-0">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 text-center pt-12">
            <Link to={"/"}><h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg mb-3 tracking-tight">
              TalentEzee Modules
            </h1></Link>
            <p className="text-xl text-gray-700 font-medium mb-2">
              Explore different modules by clicking the buttons below.
            </p>
            <div className="flex justify-center mt-4">
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-200 to-purple-200 text-blue-700 font-semibold shadow">
                Assessment Platform
              </span>
            </div>
          </header>
          <ModuleNav />
          <div className="rounded-3xl bg-white/90 shadow-2xl p-8 min-h-[400px]">
            <Routes>
              {modules.map((mod) => (
                <Route key={mod.name} path={mod.path} element={<ModuleFrame url={mod.url} />} />
              ))}
              <Route
                path="/"
                element={
                  <div className="flex flex-col items-center justify-center h-[40vh] gap-6">
                    <span className="text-8xl mb-2 animate-bounce">🚀</span>
                    <p className="text-3xl font-bold mb-1 text-gray-800">Welcome to TalentEzee!</p>
                    <p className="text-lg text-gray-600">Select a module to get started.</p>
                  </div>
                }
              />
            </Routes>
          </div>
          <footer className="mt-12 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TalentEzee. All rights reserved.
          </footer>
          <div className="w-full flex justify-center items-center py-6">
            <a href='https://www.linkedin.com/in/om-kadu-53305425a/' target='_blank'><span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-bold text-sm">
              Made with love <span style={{ color: 'red' }}>❤️</span> by OK
            </span></a>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;