"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export function AnimatedBackground({ title, subtitle }) {
  // eslint-disable-next-line no-unused-vars
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const hasDarkClass = document.documentElement.classList.contains("dark");
    setTheme(isDarkMode || hasDarkClass ? "dark" : "light");

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = useMemo(() => ({
    particles: {
      number: {
        value: 10,
        density: { enable: true, value_area: 1200 },
      },
      shape: {
        type: ["image"],
        image: [
          {
            src: "/cit-u.png", 
            height: 30,
            width: 30,
          },
        ],
      },
      move: {
        enable: true,
        speed: 1,
        out_mode: "out",
      },
      size: {
        value: 40,
        random: false,
        anim: {
          enable: true,
          speed: 4,
          size_min: 20,
          sync: false,
        },
      },
      opacity: {
        value: 0.4,
      },
    },
    retina_detect: true,
  }), []);

  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-base-200 relative overflow-hidden">
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />

      <div className="max-w-md text-center z-10 p-12">
        <h2 className="text-6xl font-bold mb-4 text-base-content tracking-tighter">
          Join <i className="text-7xl font-serif">{title}</i>
        </h2>
        <p className="text-base-content/70 text-lg">{subtitle}</p>
      </div>

      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-primary/10 blur-2xl"></div>
    </div>
  );
}

export default AnimatedBackground;
