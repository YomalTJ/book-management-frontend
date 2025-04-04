import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Book Management App. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
