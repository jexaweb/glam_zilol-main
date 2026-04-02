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
      {/* IMAGE */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover
          transition-transform duration-700 ease-out
          group-hover:scale-110"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500" />
      </div>

      {/* TITLE */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-center text-gray-800 group-hover:text-amber-500 transition">
          {title}
        </h3>
      </div>
    </Link>
  );
}

export default ServiceCard;