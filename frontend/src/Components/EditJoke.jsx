import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function EditJokeModal({ hideEditJoke, currentJoke }) {
  const [inputValue, setInputValue] = useState(currentJoke.joke);

  const { mutate, isLoading } = useMutation({
    mutationFn: (updatedJoke) =>
      axios.put(
        `http://localhost:5555/jokes/update-joke/${currentJoke.id}`,
        updatedJoke,
      ),
    onSuccess: (data) => console.log("updated!", data),
    onError: (err) => console.log("failed!", err),
  });

  const saveButton = () => {
    mutate({ jokes: inputValue });
    hideEditJoke(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm" />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg rounded-[2.25rem] bg-[#FFFDFB] p-8 md:p-10 border border-stone-100/80 shadow-[18px_18px_36px_rgba(180,165,150,0.35),-18px_-18px_36px_#FFFFFF,inset_3px_3px_6px_rgba(255,255,255,1),inset_-3px_-3px_6px_rgba(215,200,180,0.18)] z-10">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/50 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
            <span className="text-xs tracking-[0.22em] uppercase text-stone-400 font-bold">
              Edit Archive Entry
            </span>
          </div>
        </div>

        {/* Content & Form UI */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-medium text-stone-800 tracking-wide mb-1">
              Edit This Joke
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Modify the joke below and save your changes.
            </p>
          </div>

          {/* Inset Input Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 pl-1">
              Joke
            </label>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              className="w-full px-5 py-3.5 rounded-2xl bg-[#FAF6F0] text-stone-700 placeholder-stone-400 text-sm focus:outline-none shadow-[inset_4px_4px_8px_#E2D8CB,inset_-4px_-4px_8px_#FFFFFF]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200/50 mt-2">
            <button
              onClick={() => hideEditJoke(false)}
              type="button"
              className="cursor-pointer px-5 py-2.5 rounded-2xl bg-[#FFFDFB] text-stone-600 text-sm font-semibold transition-all duration-200 hover:text-stone-900 shadow-[5px_5px_12px_#E5DDD2,-5px_-5px_12px_#FFFFFF,inset_1px_1px_2px_rgba(255,255,255,1)]"
            >
              Cancel
            </button>

            <button
              onClick={saveButton}
              type="button"
              className="px-6 py-2.5 rounded-2xl bg-violet-100/90 text-violet-900 text-sm font-semibold transition-all duration-200 hover:bg-violet-200/80 shadow-[6px_6px_14px_#E0D5C7,-6px_-6px_14px_#FFFFFF,inset_2px_2px_4px_rgba(255,255,255,0.9),inset_-2px_-2px_4px_rgba(139,92,246,0.15)]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditJokeModal;
