import React, { useState } from "react";
import { useNavigate } from "react-router";

const BookingSidebar = ({ price }) => {
  // We use the 'price' to show the user what they are paying
  const [roomsCount, setRoomsCount] = useState(1);

  // This "uses" the price variable, which will remove the ESLint error
  const calculateSubtotal = () => {
    return (parseFloat(price) * roomsCount).toFixed(2);
  };
  const navigate = useNavigate();
  const handleBooking = () => {
    navigate("/checkout", {
      state: {
        basePrice: price,
        totalPrice: calculateSubtotal(),
        rooms: roomsCount,
      },
    });
  };

  return (
    <div className="bg-[#f8f6f3] sticky top-24 border border-stone-200 shadow-sm">
      <div className="bg-[#1e2d35] text-white p-6">
        <h3 className="text-xl font-serif uppercase tracking-widest text-center">
          Book Your Room
        </h3>
      </div>

      <div className="p-8 space-y-6">
        {/* Date Inputs */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-stone-400 mb-2 block font-bold">
              Check - In*
            </label>
            <input
              type="date"
              className="w-full bg-white border border-stone-200 p-3 text-sm outline-none focus:border-[#b1a494]"
              defaultValue="2026-03-08"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-stone-400 mb-2 block font-bold">
              Check - Out
            </label>
            <input
              type="date"
              className="w-full bg-white border border-stone-200 p-3 text-sm outline-none focus:border-[#b1a494]"
              defaultValue="2026-03-09"
            />
          </div>
        </div>

        {/* Room Selection */}
        <div>
          <label className="text-[10px] uppercase tracking-widest text-stone-400 mb-2 block font-bold">
            Rooms
          </label>
          <select
            className="w-full bg-white border border-stone-200 p-3 text-[11px] uppercase tracking-widest outline-none"
            onChange={(e) => setRoomsCount(parseInt(e.target.value))}
          >
            <option value="1">01 Room</option>
            <option value="2">02 Rooms</option>
            <option value="3">03 Rooms</option>
          </select>
        </div>

        {/* Pricing Breakdown (Using the 'price' prop here) */}
        <div className="pt-4 border-t border-stone-200">
          <div className="flex justify-between text-[11px] uppercase tracking-widest text-stone-500 mb-2">
            <span>Base Price:</span>
            <span>${price} / night</span>
          </div>
          <div className="flex justify-between text-sm font-serif text-[#1e2d35] font-bold">
            <span>Estimated Total:</span>
            <span>${calculateSubtotal()}</span>
          </div>
        </div>

        <button
          onClick={handleBooking}
          className="w-full py-5 bg-[#b1a494] text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#1e2d35] transition-all duration-300"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BookingSidebar;
