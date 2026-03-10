import React from "react";
import { useNavigate } from 'react-router-dom';


const RoomCard = ({ room }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    // This matches the path we just created: /room/ID
    navigate(`/room/${room.id}`);
  };
  return (
    <div className="group cursor-pointer" onClick={handleCardClick}>
      <div className="relative overflow-hidden aspect-[4/5] mb-6">
        <img
          src={
            room.image ||
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80"
          }
          alt={room.room_type}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Price Tag Overlay */}
        <div className="absolute bottom-0 left-0 bg-white px-6 py-3">
          <span className="text-xs font-sans text-stone-400 uppercase tracking-widest">
            From
          </span>
          <p className="text-lg font-serif text-[#1e2d35]">
            ${room.price_per_night} / night
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-serif uppercase tracking-tight text-[#1e2d35]">
            {room.room_type}
          </h3>
          <span className="text-[10px] text-stone-400 uppercase tracking-[0.2em]">
            Room {room.room_number}
          </span>
        </div>
        <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed font-light">
          {room.description}
        </p>

        {/* Amenities Icons (Small) */}
        <div className="flex gap-4 pt-4 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all">
          {/* You can map actual amenity icons here */}
          <span className="text-[10px] uppercase tracking-widest border-b border-stone-200">
            WiFi
          </span>
          <span className="text-[10px] uppercase tracking-widest border-b border-stone-200">
            Pool Access
          </span>
          <span className="text-[10px] uppercase tracking-widest border-b border-stone-200">
            Breakfast
          </span>
        </div>

        <button className="w-full mt-6 py-4 bg-[#1e2d35] text-white text-[10px] uppercase tracking-[0.3em] hover:bg-[#b1a494] transition-colors">
          Book This Room
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
