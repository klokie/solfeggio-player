"use client";

import React from "react";
import { useAudioContext } from "./AudioContextProvider";

interface FrequencyPlayerProps {
  frequency: number;
  label: string;
}

const FrequencyPlayer: React.FC<FrequencyPlayerProps> = ({
  frequency,
  label,
}) => {
  const { audioContext } = useAudioContext();

  const playFrequency = () => {
    if (audioContext) {
      const oscillator = audioContext.createOscillator();
      oscillator.frequency.value = frequency;
      oscillator.connect(audioContext.destination);
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 10000); // stop after 10 seconds
    }
  };

  return <button onClick={playFrequency}>Play {label}</button>;
};

export default FrequencyPlayer;
