import { Link } from "react-router-dom";

function ServiceCard({ title, image, link, bgColor = "bg-white" }) {
  return (
    <Link
      to={link}
      className={`
        group relative block rounded-2xl overflow-hidden
        shadow-md 
        transition-all duration-500 ease-out
        hover:-translate-y-2 hover:shadow-2xl
      
        ${bgColor}
      `}
    >
      {/* Image */}
      <div className="relative  h-60 sm:h-30 md:h-72 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="
            w-full
            h-full
        
            transition-transform duration-700 ease-out
            group-hover:scale-110
          "
        />

        {/* Overlay */}
        <div
          className="
            absolute inset-0
            bg-black/10
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
          "
        />
      </div>

      {/* Title */}
      <div className="p-4 relative z-10">
        <h3 className="text-lg font-bold text-center text-gray-800 group-hover:text-amber-400">
          {title}
        </h3>
      </div>
    </Link>
  );
}

export default ServiceCard;