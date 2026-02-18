import { Link } from "react-router-dom";

function ServiceCard({ title, image, link }) {
  return (
    <Link
      to={link}
      className=" W-20
        group relative block rounded-2xl overflow-hidden
        bg-white shadow-md
        transition-all duration-500 ease-out
        hover:-translate-y-2 hover:shadow-2xl 
      "
    >
      {/* Image */}
      <div className="relative h-100  overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="
            w-full h-full object-cover
            transition-transform duration-700 ease-out
            group-hover:scale-110
          "
        />

        {/* Gradient overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t from-black/40 via-black/10 to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
          "
        />
      </div>

      {/* Title */}
      <div className="p-4 relative z-10">
        <h3
          className="
            text-lg font-bold text-gray-800 text-center
            transition-colors duration-300
            group-hover:text-amber-400
          "
        >
          {title}
        </h3>
      </div>

      {/* Shine effect */}
      <span
        className="
          pointer-events-none
          absolute -inset-full
          bg-gradient-to-r from-transparent via-white/40 to-transparent
          rotate-12
          opacity-0
          group-hover:opacity-100
          group-hover:animate-shine
        "
      />
    </Link>
  );
}

export default ServiceCard;
