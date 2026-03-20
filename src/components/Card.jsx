import React from "react";

const Card = ({
  title,
  description,
  buttonText,
  onClick,
  image,
  children,
  variant = "default", // "default" | "profile"
}) => {
  // Profile-style card (with description, button, image)
  if (variant === "profile") {
    return (
      <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        {/* Left: Text */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
          {buttonText && (
            <button
              onClick={onClick}
              className="mt-4 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transition"
            >
              {buttonText}
            </button>
          )}
        </div>

        {/* Right: Image */}
        {image && (
          <div className="mt-4 md:mt-0 md:ml-6 w-28 h-28 flex justify-center items-center">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    );
  }

  // Default reusable card (title + children)
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full">
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      <div>{children}</div>
    </div>
  );
};

export default Card;
