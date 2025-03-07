"use client"

import { useCallback, useEffect, useState } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"

export function AnimatedBackground({ title, subtitle }) {
 
  const [theme, setTheme] = useState("light")
  
  useEffect(() => {
   
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    
 
    const hasDarkClass = document.documentElement.classList.contains('dark')
    
    setTheme(isDarkMode || hasDarkClass ? "dark" : "light")
 
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      setTheme(e.matches ? "dark" : "light")
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container) => {
    // You can add any initialization code here
  }, [])


  const particleColor = theme === "dark" ? "#6366f1" : "#6366f1" // Primary color
  const linkColor = theme === "dark" ? "#818cf8" : "#818cf8" // Lighter primary

  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-base-200 relative overflow-hidden">
      <Particles
        id="tsparticles"
        className="absolute inset-0"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: particleColor,
            },
            links: {
              color: linkColor,
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
      
   
      <div className="max-w-md text-center z-10 p-12">
        <div className="mb-8">

        </div>
        <h2 className="text-6xl font-bold mb-4 text-base-content tracking-tighter">{title}</h2>
        <p className="text-base-content/70 text-lg">{subtitle}</p>
      </div>
      
     
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-primary/10 blur-2xl"></div>
    </div>
  )
}

export default AnimatedBackground;
