import { useState, useRef } from "react";
import { useGame } from "../hooks/useGame";

export const UI = () => {
  const startGame = useGame((state) => state.startGame);
  const balloonsHit = useGame((state) => state.balloonsHit);
  const targetHit = useGame((state) => state.targetHit);
  const throws = useGame((state) => state.throws);
  const firstGame = useGame((state) => state.firstGame);

  // 🎵 Manage music state and audio element reference
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // 🔁 Toggle music playback on button click
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause(); // Pause the music
      setIsPlaying(false);
    } else {
      audioRef.current.play(); // Start playing the music
      setIsPlaying(true);
    }
  };

  return (
    <section className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
      {/* 🔊 Hidden audio element for background music */}
      <audio ref={audioRef} src="/s.mp3" loop preload="auto" />

      {/* 🎵 Music Toggle Button (Top-left corner) */}
      <div className="absolute top-20 left-15 pointer-events-auto">
        <button
          onClick={toggleMusic}
          className="border border-white text-white px-4 py-2 rounded bg-transparent hover:bg-white/10 transition duration-200"
        >
          {isPlaying ? "Pause" : "Start Music"}
        </button>
      </div>

      {/* 📍 Rotated footer text (left side) */}
      <div className="absolute left-4 md:left-15 -translate-x-1/2 -rotate-90 flex items-center gap-4 animation-delay-1500 animate-fade-in-down opacity-0">
        <div className="w-20 h-px bg-white/60"></div>
        <p className="text-white/60 text-xs">by unfor dev</p>
      </div>

      {/* 🕹️ Start Game Section (center) */}
      <div
        className={`p-4 flex flex-col items-center gap-2 md:gap-4 mt-[50vh] animate-fade-in-up opacity-0 animation-delay-1000`}
      >
        {throws === 0 && (
          <>
            <h1 className="bold text-white/80 text-4xl md:text-5xl font-extrabold text-center">
              Throw your axe to break the curse!
            </h1>

            <button
              className="bg-white/80 text-black font-bold px-4 py-2 rounded-lg shadow-md hover:bg-white/100 transition duration-200 pointer-events-auto cursor-pointer"
              onClick={startGame}
            >
              Start Game
            </button>
          </>
        )}
      </div>

      {/* 📊 Score and Emoji Display (top-right) */}
      <div className="absolute right-4 top-4 flex flex-col items-end justify-center gap-4">
        <div className="flex flex-col items-center gap-2 saturate-0">
          <p className="">
            {/* 🪓 Axe throw counter */}
            {Array(throws)
              .fill(0)
              .map((_, index) => (
                <span key={index} className="text-white text-6xl">
                  🪓
                </span>
              ))}
          </p>
        </div>

        {!firstGame && (
          <>
            {/* 🏆 Score details */}
            <div className="text-right">
              <p className="text-sm font-medium text-white">SCORE</p>
              <p className="text-6xl text-white font-bold">
                {balloonsHit * 5 + targetHit * 50}
              </p>
            </div>

            {/* 🎈 Balloon and 🎯 Target hit counters */}
            <p className="text-3xl text-white font-bold">🎈 {balloonsHit}</p>
            <p className="text-3xl text-white font-bold">🎯 {targetHit}</p>
          </>
        )}
      </div>
    </section>
  );
};
