import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({ field, form }) {
  const [hover, setHover] = useState(null);
  const value = field.value;

  const handleClick = (rating) => {
    form.setFieldValue(field.name, rating);
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={24}
          className={`cursor-pointer transition-colors ${
            star <= (hover || value) ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
        />
      ))}
    </div>
  );
}
