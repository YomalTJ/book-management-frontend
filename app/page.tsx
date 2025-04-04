import Link from "next/link";
import { FaBook, FaSignInAlt, FaUserPlus } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <FaBook className="text-6xl text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Book Manager
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A simple and elegant solution to manage your book collection. Add,
          view, edit, and delete books with ease.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/auth/login"
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FaSignInAlt className="mr-2" />
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            <FaUserPlus className="mr-2" />
            Register
          </Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Easy Management
          </h2>
          <p className="text-gray-600">
            Add, view, edit, and delete books in your collection with an
            intuitive user interface.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Secure Access
          </h2>
          <p className="text-gray-600">
            Your book collection is secure with our authentication system
            powered by Keycloak.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Responsive Design
          </h2>
          <p className="text-gray-600">
            Access your book collection from any device with our responsive
            design.
          </p>
        </div>
      </div>
    </div>
  );
}
