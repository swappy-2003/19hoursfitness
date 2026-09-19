"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface VideoIntroContextValue {
  /** true while the cinematic intro overlay is active (mobile only) */
  introPlaying: boolean;
  /** Call to end the intro (skip or video ended) */
  completeIntro: () => void;
}

const VideoIntroContext = createContext<VideoIntroContextValue>({
  introPlaying: false,
  completeIntro: () => {},
});

const SESSION_KEY = "19hf_intro_seen";

export function VideoIntroProvider({ children }: { children: React.ReactNode }) {
  // Start as false; will be set to true on mount if conditions met
  const [introPlaying, setIntroPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const isMobile = window.innerWidth <= 800;
    const alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";

    if (isMobile && !alreadySeen) {
      setIntroPlaying(true);
    }
  }, []);

  const completeIntro = useCallback(() => {
    setIntroPlaying(false);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // sessionStorage unavailable (private browsing edge cases)
    }
  }, []);

  // Don't flash intro state before mount
  if (!mounted) {
    return (
      <VideoIntroContext.Provider value={{ introPlaying: false, completeIntro }}>
        {children}
      </VideoIntroContext.Provider>
    );
  }

  return (
    <VideoIntroContext.Provider value={{ introPlaying, completeIntro }}>
      {children}
    </VideoIntroContext.Provider>
  );
}

export function useVideoIntro() {
  return useContext(VideoIntroContext);
}
