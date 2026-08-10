const Header = () => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="hidden md:flex h-16 bg-white shadow px-6 items-center justify-between">

      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          {today}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          M
        </div>

        <div>
          <p className="font-semibold">
            Admin
          </p>

          <p className="text-sm text-gray-500">
            MDSS
          </p>
        </div>

      </div>

    </header>
  );
};

export default Header;