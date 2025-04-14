import React, { useState } from "react";

const CustomDropdown = ({ label, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null); // store entire option object

  const handleSelect = (option) => {
    setSelected(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm text-left text-gray-800 focus:outline-none focus:ring-3 focus:ring-[#8B5E3C]"
      >
        {selected?.label || label}
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((opt, index) => (
            <li
              key={index}
              onClick={() => handleSelect(opt)}
              className="px-4 py-2 hover:bg-[#8B5E3C] hover:text-white cursor-pointer rounded-md m-1 transition duration-150 ease-in-out"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Filter = ({ artists, onArtistChange, onTagChange, onSortChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mt-12 mx-4 p-4">
      <CustomDropdown
        label="Filter by Artist"
        options={[
          { label: "All Artists", value: "" },
          ...artists.map((a) => ({ label: a, value: a })),
        ]}
        onChange={onArtistChange}
      />

      <input
        type="text"
        placeholder="Filter by Tag (e.g., modern)"
        onChange={(e) => onTagChange(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-3 focus:ring-[#8B5E3C] text-gray-800"
      />

      <CustomDropdown
        label="Sort by"
        options={[
          { label: "Default", value: "" },
          { label: "Price: Low to High", value: "price_asc" },
          { label: "Price: High to Low", value: "price_desc" },
        ]}
        onChange={onSortChange}
      />
    </div>
  );
};

export default Filter;
