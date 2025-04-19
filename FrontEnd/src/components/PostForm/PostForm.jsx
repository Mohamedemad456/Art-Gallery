import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import styles from "./PostForm.module.css";
const PostForm = () => {
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const maxLength = 300;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleFileErase = () => {
    setFileName("");
    document.getElementById("fileInput").value = null;
  };

  return (
    <div className={`text-gray-800 ${styles.fadeIn} mb-5`}>
      <div className="text-center font-bold text-2xl m-5">New Post</div>

      <div className="editor mx-auto w-10/12 flex flex-col border border-gray-300 p-4 shadow-lg max-w-3xl">
        {/* Input Fields in Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Artist Name"
            className="bg-gray-100 border border-gray-300 p-2 outline-none"
          />
          <input
            type="text"
            placeholder="Title"
            className="bg-gray-100 border border-gray-300 p-2 outline-none"
          />
        </div>

        {/* Description Textarea */}
        <div className="relative">
          <textarea
            className="bg-gray-100 sec p-3 h-48 border border-gray-300 outline-none resize-none w-full"
            spellCheck="false"
            placeholder="Describe everything about this post here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={maxLength}
          ></textarea>
          <div className="absolute bottom-2 right-3 text-xs text-gray-400 font-semibold">
            {description.length}/{maxLength}
          </div>
        </div>

        {/* Price Input */}
        <input
          type="number"
          placeholder="Initial Price ($)"
          className="bg-gray-100 border border-gray-300 p-2 outline-none mb-4"
          min={10}
        />

        {/* Date Inputs in Row */}
        <div className="flex gap-4 mb-4">
          <input
            type="datetime-local"
            className="bg-gray-100 border border-gray-300 p-2 outline-none w-full"
          />
          <input
            type="datetime-local"
            className="bg-gray-100 border border-gray-300 p-2 outline-none w-full"
          />
        </div>

        {/* Category Select */}
        <select className="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none">
          <option value="">Select Category</option>
          <option value="Portrait">Portrait</option>
          <option value="Landscape">Landscape</option>
        </select>

        {/* Tags Input */}
        <input
          type="text"
          placeholder="Tags (e.g., modern, oil painting, vibrant)"
          className="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
        />

        {/* Icons & File Upload */}
        <div className="flex text-gray-500 items-center gap-2 mb-4">
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />
          <label htmlFor="fileInput">
            <FontAwesomeIcon
              icon={faPaperclip}
              className="cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7 w-7"
            />
          </label>
        </div>

        {/* File Display */}
        {fileName && (
          <div className="flex items-center text-sm text-gray-600 ml-1 mb-4">
            <span className="font-medium mr-2">Selected file:</span>
            <span className="truncate max-w-xs">{fileName}</span>
            <button
              onClick={handleFileErase}
              className="ml-2 text-red-500 hover:text-red-700"
              title="Remove file"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end mt-4">
          <button className="border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 mr-2 hover:bg-gray-200 rounded-md transition-colors duration-300">
            <NavLink to="/gallery">Cancel</NavLink>
          </button>
          <button className="p-1 px-4 font-semibold cursor-pointer text-white bg-[#3D2B1F] hover:bg-[#C08B6F] rounded-md transition-colors duration-300">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
