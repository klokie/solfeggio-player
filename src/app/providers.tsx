"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, type ReactNode } from "react";

export const PostHogProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    const dnt = navigator.doNotTrack === "1" || (window as any).doNotTrack === "1";
    const local = /^(localhost|127\.|192\.168\.|0\.0\.0\.0)/.test(location.hostname);
    if (dnt || local) return;

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
};
