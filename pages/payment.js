export default function Payment() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Payment DeoVault29
        </h1>
        <p className="mt-2 text-gray-300">Silakan pilih metode pembayaran</p>

        {/* Dana */}
        <div className="mt-6 bg-gray-700 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-blue-400">Dana</h2>
          <img
            src="/qr-dana.png"
            alt="QR Dana"
            className="w-48 h-48 mx-auto mt-3 rounded-lg shadow-lg"
          />
          <p className="text-sm text-gray-400 mt-2">Scan QR untuk membayar via Dana</p>
        </div>

        {/* Gopay */}
        <div className="mt-6 bg-gray-700 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-green-400">GoPay</h2>
          <img
            src="/qr-gopay.png"
            alt="QR GoPay"
            className="w-48 h-48 mx-auto mt-3 rounded-lg shadow-lg"
          />
          <p className="text-sm text-gray-400 mt-2">Scan QR untuk membayar via GoPay</p>
        </div>

        <a
          href="/"
          className="mt-6 inline-block bg-gradient-to-r from-purple-600 to-blue-600 py-2 px-6 rounded-xl font-medium hover:opacity-90"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
