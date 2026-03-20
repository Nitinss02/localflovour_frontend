const ImageCard = ({ image, title, isExpanded, onMouseEnter, onMouseLeave }) => {
    return (
        <div
            className={`
        relative overflow-hidden rounded-xl shadow-2xl cursor-pointer w-full 
        ${isExpanded ? 'md:flex-[4] min-w-full md:min-w-[300px]' : 'md:flex-[1] min-w-full md:min-w-[100px]'} 
        h-[200px] sm:h-[300px] md:h-[400px] mx-0 md:mx-2  transition-all duration-700 ease-in-out 
        transform hover:shadow-2xl 
        bg-gray-200
      `}

            onClick={isExpanded ? () => { } : onMouseEnter}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {/* Image */}
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
            />

            {/* Title/Overlay */}
            <div
                className={`
          absolute bottom-0 left-0 right-0 
          p-3 sm:p-4 text-white
          transition-all duration-700
          ${isExpanded
                        ? 'bg-black bg-opacity-70 opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-full bg-black bg-opacity-0'
                    }
        `}
            >
                <h3 className="text-lg sm:text-2xl font-bold">{title}</h3>
            </div>
        </div>
    );
};

export default ImageCard;