export default function MySupport() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-400">MySupport</h1>
        <p className="mt-2 text-gray-300">Dukung DeoVault29 untuk terus berkembang</p>
        <div className="mt-4 space-y-3">
          <a href="/payment" className="block bg-gradient-to-r from-green-500 to-blue-500 py-2 rounded-xl">Donasi via Dana/Gopay</a>
          <a href="https://github.com/deovault29" className="block bg-gradient-to-r from-purple-500 to-pink-500 py-2 rounded-xl">Follow GitHub</a>
        </div>
        <a href="/" className="mt-6 inline-block bg-gradient-to-r from-purple-600 to-blue-600 py-2 px-6 rounded-xl">Back to Home</a>
      </div>
    </div>
  );
    }
