import React, { useState, useEffect } from 'react';
import RoomCard from './roomCard';
import apiClient from '../../services/Api-Client';


const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  // State to track if we show everything or just the first 3
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    apiClient.get("/rooms/")
      .then((res) => {
        console.log(res.data)
        setRooms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="py-20 text-center font-serif animate-pulse">Loading Collection...</div>;

  // Logic: If showAll is false, we slice the array to only 3 items
  const visibleRooms = showAll ? rooms : rooms.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* The Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {visibleRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

      {/* View All Button - Only shows if there are more than 3 rooms */}
      {rooms.length > 3 && (
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="group flex flex-col items-center gap-2 transition-all"
          >
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#1e2d35] font-bold">
              {showAll ? "Show Less" : "View All Rooms"}
            </span>
            <div className="w-10 h-[1px] bg-[#b1a494] group-hover:w-20 transition-all duration-500"></div>
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomList;