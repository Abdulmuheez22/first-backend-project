import React, { useState } from "react";
import axios from "axios";
import PremiumLoader from "./PremiumLoader";
import AddJokeModalUI from "./CreateJoke";
import { useQuery, useMutation } from "@tanstack/react-query";
import EditJokeModal from "./EditJoke";

function JokesAppClayCream() {
  const [showEditModal, setShowEditModal] = useState(false);

  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/jokes`;


  const [copied, setCopied] = useState(false);

  const copyCurrentJoke = async () => {
    await navigator.clipboard.writeText(data.jokes[jokeIndex].joke);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const [jokeIndex, setJokeIndex] = useState(0);
  const [showEdit, setshowEdit] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jokes"],
    queryFn: () =>
      axios.get(url).then((res) => res.data),
  });

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => axios.delete(url + "/delete-joke/" + id),
    onSuccess: (data) => console.log("deleted!", data),
    onError: (err) => console.log("failed!", err),
  });

  // const deleteJoke = () => {
  //   mutate();
  // };
  // console.log(jokes[0])
  isError && console.log("404");
  if (isLoading) {
    return <PremiumLoader />;
  } else {
    return (
      <div className="min-h-screen bg-[#FBF9F5] text-stone-700 p-6 md:p-12 font-sans flex flex-col items-center justify-between relative overflow-hidden">
        {showEdit && <AddJokeModalUI hidecreatejoke={setshowEdit} />}
        {showEditModal && (
          <EditJokeModal
            hideEditJoke={setShowEditModal}
            currentJoke={data.jokes[jokeIndex]}
          />
        )}
        {/* Background ambient glow effects */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

        {/* Top Floating Badge */}
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#FFFDFB]/90 border border-violet-100/60 text-stone-700 text-sm tracking-wide shadow-[8px_8px_18px_#E6DDD1,-8px_-8px_18px_#FFFFFF,inset_1px_1px_2px_rgba(255,255,255,1)] backdrop-blur-md">
          <div className="w-2.5 h-2.5 rounded-full bg-red-300 shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
          <span className="font-medium text-stone-600">
            Entry saved to personal archive
          </span>
        </div>

        <div className="w-full max-w-3xl flex flex-col gap-10 relative z-10 my-auto">
          {/* Header Section */}
          <header className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs tracking-[0.22em] uppercase text-stone-400 font-bold">
                  The Wit Archive
                </span>
              </div>

              <button
                onClick={() => setshowEdit(!showEdit)}
                className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-violet-100/80 text-violet-900 text-sm font-semibold transition-all duration-200 hover:bg-violet-100 hover:scale-[1.02] active:scale-[0.98] shadow-[6px_6px_14px_#E0D5C7,-6px_-6px_14px_#FFFFFF,inset_2px_2px_4px_rgba(255,255,255,0.9),inset_-2px_-2px_4px_rgba(139,92,246,0.15)]"
              >
                <svg
                  className="w-4 h-4 stroke-violet-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span>Add Entry</span>
              </button>
            </div>

            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-stone-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <input
                type="text"
                readOnly
                placeholder="Search archive by keyword or topic..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FAF6F0] text-stone-700 placeholder-stone-400 text-sm focus:outline-none shadow-[inset_4px_4px_8px_#E2D8CB,inset_-4px_-4px_8px_#FFFFFF]"
              />
            </div>
          </header>

          {/* Main Content Card */}
          <main className="relative p-8 md:p-12 rounded-[2.25rem] bg-[#FFFDFB] border border-stone-100/80 shadow-[18px_18px_36px_#E2DAD0,-18px_-18px_36px_#FFFFFF,inset_3px_3px_6px_rgba(255,255,255,1),inset_-3px_-3px_6px_rgba(215,200,180,0.18)]">
            <div className="flex items-center justify-between pb-6 border-b border-stone-200/50 mb-8">
              <span className="px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-sky-800 bg-sky-50 shadow-[inset_2px_2px_4px_#bae6fd,inset_-2px_-2px_4px_#ffffff]">
                Observational
              </span>
              <span className="text-xs text-stone-400 font-mono tracking-wider">
                REF: #0482
              </span>
            </div>

            <article className="my-4">
              <p className="text-lg md:text-xl text-stone-800 font-medium leading-relaxed tracking-wide">
                {data.jokes[jokeIndex].joke}
              </p>
            </article>

            {/* Navigation Controls (Moved Up into Main Card) */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-stone-200/50">
              <button
                onClick={() => {
                  if (jokeIndex <= 0) {
                    setJokeIndex(data.jokes.length - 1);
                  } else {
                    setJokeIndex(jokeIndex - 1);
                  }
                }}
                className="cursor-pointer flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#FFFDFB] text-stone-700 text-sm font-semibold transition-all duration-200 hover:text-stone-900 active:scale-95 shadow-[7px_7px_16px_#E2DAD0,-7px_-7px_16px_#FFFFFF,inset_2px_2px_4px_rgba(255,255,255,1)]"
              >
                <svg
                  className="w-4 h-4 stroke-stone-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                <span>Previous</span>
              </button>

              <span className="text-xs text-stone-400 tracking-widest font-mono font-medium">
                {data.jokes[jokeIndex].id} / {data.jokes.length}
              </span>
              <button
                onClick={() => {
                  if (jokeIndex == data.jokes.length - 1) {
                    setJokeIndex(0);
                  } else {
                    setJokeIndex(jokeIndex + 1);
                  }
                }}
                className="cursor-pointer flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#FFFDFB] text-stone-700 text-sm font-semibold transition-all duration-200 hover:text-stone-900 active:scale-95 shadow-[7px_7px_16px_#E2DAD0,-7px_-7px_16px_#FFFFFF,inset_2px_2px_4px_rgba(255,255,255,1)]"
              >
                <span>Next</span>
                <svg
                  className="w-4 h-4 stroke-stone-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </main>

          {/* Entry Actions (Moved Down to Outer Footer) */}
          <footer className="flex items-center justify-between px-2">
            <button
              onClick={copyCurrentJoke}
              className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFFDFB] text-stone-600 text-xs font-semibold tracking-wide transition-all duration-200 hover:text-stone-900 active:scale-95 shadow-[5px_5px_12px_#E5DDD2,-5px_-5px_12px_#FFFFFF,inset_1px_1px_2px_rgba(255,255,255,1)]"
            >
              <svg
                className="w-3.5 h-3.5 stroke-sky-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0-10.628a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm0 10.628a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                />
              </svg>
              <span>{copied ? "Copied!" : "Share"}</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FFFDFB] text-stone-600 text-xs font-semibold transition-all duration-200 hover:text-stone-900 active:scale-95 shadow-[5px_5px_12px_#E5DDD2,-5px_-5px_12px_#FFFFFF,inset_1px_1px_2px_rgba(255,255,255,1)]"
              >
                <svg
                  className="w-3.5 h-3.5 stroke-violet-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                  />
                </svg>
                <span>Edit</span>
              </button>

              <button
                onClick={() => mutate(data.jokes[jokeIndex].id)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FFFDFB] text-stone-600 text-xs font-semibold transition-all duration-200 hover:text-rose-600 active:scale-95 shadow-[5px_5px_12px_#E5DDD2,-5px_-5px_12px_#FFFFFF,inset_1px_1px_2px_rgba(255,255,255,1)]"
              >
                <svg
                  className="w-3.5 h-3.5 stroke-rose-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                <span>Delete</span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default JokesAppClayCream;
