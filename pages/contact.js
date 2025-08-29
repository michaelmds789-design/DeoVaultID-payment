export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-purple-400">Contact DeoVault29</h1>
        <p className="mt-2 text-gray-300">Hubungi saya melalui:</p>
        <ul className="mt-4 space-y-3 text-gray-300">
          <li>📧 Email: deovault29@mail.com</li>
          <li>📱 WhatsApp: +62 81234567890</li>
          <li>🌐 Instagram: @deovault29</li>
        </ul>
        <a href="/" className="mt-6 inline-block bg-gradient-to-r from-purple-600 to-blue-600 py-2 px-6 rounded-xl">Back to Home</a>
      </div>
    </div>
  );
    }
