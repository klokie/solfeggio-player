"use client";

import React, { createContext, useContext, useRef } from "react";

interface IAudioContext {
  audioContext: AudioContext | null;
}

const AudioContextState = createContext<IAudioContext>({ audioContext: null });

export const useAudioContext = () => useContext(AudioContextState);

const AudioContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const audioRef = useRef<AudioContext | null>(null);

  if (!audioRef.current && typeof window !== "undefined") {
    audioRef.current = new AudioContext();
  }

  return (
    <AudioContextState.Provider value={{ audioContext: audioRef.current }}>
      {children}
    </AudioContextState.Provider>
  );
};

export default AudioContextProvider;
