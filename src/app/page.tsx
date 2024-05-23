import React from "react";
import AudioContextProvider from "../components/AudioContextProvider";
import FrequencyPlayer from "../components/FrequencyPlayer";

const frequencies = [
  { freq: 396, label: "396 Hz - Liberating Guilt and Fear" },
  { freq: 417, label: "417 Hz - Undoing Situations and Facilitating Change" },
  { freq: 528, label: "528 Hz - Transformation and Miracles (DNA Repair)" },
  { freq: 639, label: "639 Hz - Connecting/Relationships" },
  { freq: 741, label: "741 Hz - Awakening Intuition" },
  { freq: 852, label: "852 Hz - Returning to Spiritual Order" },
];

const Home: React.FC = () => {
  return (
    <AudioContextProvider>
      <div>
        <h1>Solfeggio Frequency Player</h1>
        {frequencies.map((freq) => (
          <FrequencyPlayer
            key={freq.freq}
            frequency={freq.freq}
            label={freq.label}
          />
        ))}
      </div>
    </AudioContextProvider>
  );
};

export default Home;
