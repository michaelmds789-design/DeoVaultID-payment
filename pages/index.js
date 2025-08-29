export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl max-w-md">
        <img
          src="/profile.jpg"
          alt="Profile"
          className="w-28 h-28 mx-auto rounded-full border-4 border-purple-500 shadow-lg"
        />
        <h1 className="text-2xl font-bold mt-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Hello, have a nice day!
        </h1>
        <p className="mt-2 text-gray-300">
          Selamat datang di website <span className="font-semibold">DeoVault29</span>
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Payment, portfolio, dan pusat informasi DeoVault29.
        </p>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <a href="/payment" className="bg-gradient-to-r from-purple-600 to-blue-600 py-2 rounded-xl font-medium hover:opacity-90">Payment</a>
          <a href="/produk" className="bg-gradient-to-r from-purple-600 to-blue-600 py-2 rounded-xl font-medium hover:opacity-90">Produk</a>
          <a href="/support" className="bg-gradient-to-r from-purple-600 to-blue-600 py-2 rounded-xl font-medium hover:opacity-90">MySupport</a>
        </div>

        <a href="/contact" className="mt-4 block bg-gradient-to-r from-purple-600 to-blue-600 py-2 rounded-xl font-medium hover:opacity-90">
          Contact
        </a>

        <p className="text-xs text-gray-500 mt-6">© 2025 DeoVault29</p>
      </div>
    </div>
  );
    }
