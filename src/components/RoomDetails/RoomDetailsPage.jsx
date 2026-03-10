import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingSidebar from './BookingSidebar';
import apiClient from '../../services/Api-Client';

const RoomDetailsPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch individual room details
    apiClient.get(`/rooms/${id}/`)
      .then((res) => {
        setRoom(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center font-serif">Loading Suite...</div>;
  if (!room) return <div>Room not found</div>;

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* 1. Header Section (Matching your 4th screenshot) */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-b border-stone-100">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-tight text-[#1e2d35] mb-6">
              {room.room_type} Room
            </h1>
            <div className="flex flex-wrap gap-8 text-stone-500 text-[11px] uppercase tracking-widest">
              <span>📏 40 m²</span>
              <span>🛏️ {room.capacity > 2 ? '2 Beds' : '1 Bed'}</span>
              <span>👥 {room.capacity} Guests</span>
              <span>🚿 2 Baths</span>
              <span>🌆 Dramatic Views</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-4xl font-serif text-[#1e2d35]">${room.price_per_night}</span>
            <span className="text-stone-400 text-xs uppercase tracking-widest ml-2">/ Per Night</span>
          </div>
        </div>
      </div>

      {/* 2. Image Gallery (Horizontal Scroll/Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-8">
        <img src={room.image || "https://images.unsplash.com/photo-1590490360182-c33d57733427"} className="w-full h-80 object-cover" alt="view 1" />
        <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a" className="w-full h-80 object-cover" alt="view 2" />
        <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a" className="w-full h-80 object-cover" alt="view 3" />
      </div>

      {/* 3. Content & Sidebar Split */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-16">
        {/* Left Side: Description & Tabs */}
        <div className="lg:w-2/3">
          <p className="text-stone-600 leading-relaxed mb-10 font-light">
            {room.description}. Our {room.room_type} rooms are designed in a European boutique style. 
            While sitting on lounge chairs of the south-facing balcony, you can enjoy stunning views 
            and fresh air. Each room provides access to The Lounge where you may enjoy light snacks.
          </p>

          {/* Pricing/Rules Tabs (Matching your 3rd screenshot) */}
          <div className="border border-stone-200 p-8">
            <div className="flex gap-8 border-b border-stone-100 mb-8 pb-4">
              <button className="text-[10px] uppercase tracking-[0.3em] font-bold border-b-2 border-[#1e2d35] pb-4">Price</button>
              <button className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Room Rules</button>
            </div>
            <div className="grid md:grid-cols-2 gap-y-4 text-xs text-stone-500 leading-loose">
              <p>Price: ${room.price_per_night} / night</p>
              <p>Security Deposit: $60</p>
              <p>Not Incl: $6 Registration Fee</p>
              <p>Included: 10% Value Added Tax</p>
            </div>
          </div>
        </div>

        {/* Right Side: Sticky Booking Sidebar */}
        <div className="lg:w-1/3">
          <BookingSidebar price={room.price_per_night} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;