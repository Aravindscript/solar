import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

import moon from "./assets/moon.png";
import earth from "./assets/earth.png";
import astronaut from "./assets/astronaut.png";
import jupiter from "./assets/jupiter.png";
import blackholeImage from "./assets/blackhole.png";
import spaceAudio from "./assets/space-audio.mp3";
import space from "./assets/space1.jpg";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const stageRef = useRef(null);
  const moonRef = useRef(null);
  const ringsRef = useRef(null);
  const starsRef = useRef(null);
  const earthRef = useRef(null);
  const astronautRef = useRef(null);
  const jupiterRef = useRef(null);
  const novaRef = useRef(null);
  const blackholeRef = useRef(null);
  const audioRef = useRef(null);

  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(stageRef);

      const scenes = {
        intro: q(".intro"),
        moon: q(".moon-scene"),
        galaxy: q(".galaxy-scene"),
        solar: q(".solar-scene"),
        nova: q(".nova-scene"),
        hole: q(".hole-scene"),
        ending: q(".ending-scene"),
      };

      gsap.set(Object.values(scenes).flat(), {
        autoAlpha: 0,
      });

      gsap.set(scenes.intro, { autoAlpha: 1 });

      gsap.set(moonRef.current, {
        scale: 0.8,
        z: 0,
        force3D: true,
      });

      gsap.set(ringsRef.current, {
        scale: 0.75,
        rotation: 0,
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".space-scroll",
          start: "top top",
          end: "+=6600",
          scrub: 1.5,
          pin: stageRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Galaxy photo moves gently with scroll.
      tl.to(
        ".galaxy-photo-bg",
        {
          scale: 1.12,
          yPercent: -2,
          duration: 33,
        },
        0
      );

      // 00–04: Opening Moon
      tl.to(
        ringsRef.current,
        {
          scale: 1,
          rotation: 20,
          duration: 2,
        },
        0
      );

      tl.to(
        moonRef.current,
        {
          scale: 1.05,
          duration: 3,
        },
        0
      );

      tl.to(
        ".intro-title",
        {
          y: -25,
          opacity: 0.3,
          duration: 2,
        },
        1
      );

      // 04–08: Moon close-up
      tl.to(scenes.intro, { autoAlpha: 0, duration: 0.7 }, 3.5);
      tl.to(scenes.moon, { autoAlpha: 1, duration: 0.8 }, 3.5);

      tl.to(
        moonRef.current,
        {
          scale: 3.8,
          z: 100,
          duration: 4,
        },
        4
      );

      tl.to(
        ringsRef.current,
        {
          scale: 2.6,
          rotation: 75,
          opacity: 0,
          duration: 3.5,
        },
        4
      );

      // 08–14: Earth and galaxy
      tl.to(scenes.moon, { autoAlpha: 0, duration: 0.8 }, 7.2);
      tl.to(scenes.galaxy, { autoAlpha: 1, duration: 1 }, 7.2);

      // Keep the starfield steady to avoid shaking.
      tl.fromTo(
        starsRef.current,
        { scale: 1, rotation: 0 },
        { scale: 1.04, rotation: 0.5, duration: 6 },
        8
      );

      tl.fromTo(
        ".galaxy-copy",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 2 },
        9
      );

      tl.fromTo(
        earthRef.current,
        { x: -320, y: 80, scale: 0.2, opacity: 0 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 3 },
        9
      );

      tl.to(
        earthRef.current,
        {
          x: 280,
          y: -100,
          scale: 0.55,
          duration: 3,
        },
        11
      );

      // 14–18: Supernova
      tl.to(scenes.galaxy, { autoAlpha: 0, duration: 0.8 }, 13.3);
      tl.to(scenes.nova, { autoAlpha: 1, duration: 0.8 }, 13.3);

      tl.fromTo(
        novaRef.current,
        { scale: 0.05, opacity: 0 },
        { scale: 1.3, opacity: 1, duration: 2 },
        14
      );

      tl.to(
        novaRef.current,
        {
          scale: 2.1,
          rotation: 70,
          opacity: 0.3,
          duration: 2,
        },
        16
      );

      // 18–23: Solar system and Jupiter
      tl.to(scenes.nova, { autoAlpha: 0, duration: 0.8 }, 17.5);
      tl.to(scenes.solar, { autoAlpha: 1, duration: 0.8 }, 17.5);

      tl.fromTo(
        jupiterRef.current,
        { x: 350, y: 100, scale: 0.1, rotation: -90 },
        { x: 0, y: 0, scale: 1, rotation: 0, duration: 3 },
        18
      );

      tl.to(
        ".solar-orbit",
        {
          rotation: 35,
          scale: 1.08,
          duration: 4,
        },
        18
      );

      tl.to(
        jupiterRef.current,
        {
          x: -240,
          y: -70,
          scale: 0.6,
          rotation: 30,
          duration: 2,
        },
        21
      );

      // 23–27: Black hole
      tl.to(scenes.solar, { autoAlpha: 0, duration: 0.8 }, 22.3);
      tl.to(scenes.hole, { autoAlpha: 1, duration: 0.8 }, 22.3);

      tl.fromTo(
        blackholeRef.current,
        { scale: 0.15, rotation: -15 },
        { scale: 1.1, rotation: 15, duration: 3 },
        23
      );

      tl.fromTo(
        ".hole-copy",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 },
        24
      );

      tl.to(
        blackholeRef.current,
        {
          scale: 1.8,
          rotation: 25,
          duration: 1.5,
        },
        25.5
      );

      // 27–33: Return to the Moon
      tl.to(scenes.hole, { autoAlpha: 0, duration: 0.8 }, 26.5);
      tl.to(scenes.ending, { autoAlpha: 1, duration: 1 }, 26.5);

      tl.fromTo(
        ".ending-moon",
        { scale: 0.05, rotation: -30 },
        { scale: 1, rotation: 0, duration: 3 },
        27
      );

      tl.fromTo(
        ".ending-rings",
        { scale: 0.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 3 },
        28
      );

      tl.fromTo(
        ".ending-copy",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 2 },
        30
      );

      // Gentle star twinkle. No large container shaking.
    gsap.to(".star", {
  x: (i) => (i % 2 === 0 ? 100 : -100),
  y: (i) => (i % 3 === 0 ? -160 : 160),
  opacity: 0.3,
  duration: (i) => 2 + (i % 5),
  repeat: -1,
  yoyo: true,
  stagger: {
    each: 0.015,
    from: "random",
  },
  ease: "sine.inOut",
});

      // Smooth astronaut floating
      gsap.to(".floating-astronaut", {
        y: -12,
        rotation: 2,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Shooting stars keep travelling in the background.
      gsap.to(".shooting-star", {
        x: -380,
        y: 280,
        opacity: 0,
        duration: 2.5,
        repeat: -1,
        stagger: {
          each: 0.45,
        },
        ease: "power1.in",
      });
    }, stageRef);

    return () => ctx.revert();
  }, []);

  const toggleSound = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setSoundOn(true);
      } else {
        audio.pause();
        setSoundOn(false);
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
      setSoundOn(false);
    }
  };

  return (
    <main className="space-scroll">
      <section className="space-stage" ref={stageRef}>
        {/* Galaxy photo background */}
        <div
          className="galaxy-photo-bg"
          style={{ backgroundImage: `url(${space})` }}
        />

        {/* Extra galaxy glow */}
        <div className="galaxy-glow" />

        {/* Starfield */}
        <div className="space-stars" ref={starsRef}>
          {Array.from({ length: 350 }, (_, i) => (
            <span
              className="star"
              key={i}
              style={{
                left: `${(i * 37 + 7) % 100}%`,
                top: `${(i * 61 + 11) % 100}%`,
                "--size": `${1 + (i % 3)}px`,
                "--delay": `${(i % 8) * -0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Shooting stars */}
        <div className="shooting-stars">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              className="shooting-star"
              key={i}
              style={{
                top: `${(i * 23) % 85}%`,
                left: `${(i * 31) % 100}%`,
                animationDelay: `${(i % 6) * -0.8}s`,
              }}
            />
          ))}
        </div>

        {/* Moving asteroids */}
        <div className="asteroid-field">
          {Array.from({ length: 18 }, (_, i) => (
            <span
              className="asteroid"
              key={i}
              style={{
                left: `${(i * 29 + 9) % 100}%`,
                top: `${(i * 37 + 13) % 100}%`,
                animationDelay: `${i * -0.8}s`,
                animationDuration: `${7 + (i % 6)}s`,
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <header className="space-nav">
          <span>ASTRA / EXPLORATION</span>
          <span>SCROLL TO EXPLORE ↓</span>
          <button onClick={toggleSound} className="sound-button">
            {soundOn ? "SOUND ON ♫" : "PLAY SOUND ♫"}
          </button>
        </header>

        {/* Opening Moon */}
        <section className="scene intro">
          <div className="intro-title">
            <span className="eyebrow">A JOURNEY THROUGH SPACE</span>
            <h1>Beyond The Moon</h1>
            <p>Scroll to travel beyond the familiar.</p>
          </div>

          <div className="moon-rings" ref={ringsRef}>
            <i />
            <i />
            <i />
          </div>

          <img
            className="moon-image"
            ref={moonRef}
            src={moon}
            alt="Moon"
          />

          <span className="scroll-hint">SCROLL TO BEGIN</span>
        </section>

        {/* Moon close-up */}
        <section className="scene moon-scene">
          <img className="moon-close" src={moon} alt="Moon surface" />

          <div className="scene-copy lunar-copy">
            <span className="eyebrow">01 / OUR NEIGHBOUR</span>
            <h2>The Moon</h2>
            <p>
              A silent world of ancient craters, floating between Earth
              and the endless darkness beyond.
            </p>
          </div>
        </section>

        {/* Earth and astronaut */}
        <section className="scene galaxy-scene">
          <div className="nebula nebula-blue" />
          <div className="nebula nebula-purple" />

          <img
            ref={earthRef}
            className="earth-image"
            src={earth}
            alt="Earth"
          />

          <div className="scene-copy galaxy-copy">
            <span className="eyebrow">02 / OUR HOME</span>
            <h2>One Small World</h2>
            <p>
              From orbit, Earth becomes a blue light in an ocean of stars.
              Every journey begins somewhere.
            </p>
          </div>

          <img
            className="floating-astronaut"
            ref={astronautRef}
            src={astronaut}
            alt="Astronaut floating in space"
          />
        </section>

        {/* Supernova */}
        <section className="scene nova-scene">
          <div className="supernova" ref={novaRef}>
            <div className="nova-core" />
            <div className="nova-ring ring-one" />
            <div className="nova-ring ring-two" />
            <div className="nova-ring ring-three" />
          </div>

          <div className="scene-copy">
            <span className="eyebrow">03 / STELLAR EVOLUTION</span>
            <h2>Born From Stars</h2>
            <p>
              When massive stars reach their final chapter, they can
              erupt in brilliant supernova explosions.
            </p>
          </div>
        </section>

        {/* Solar System */}
        <section className="scene solar-scene">
          <div className="solar-orbit">
            <i className="orbit orbit-a" />
            <i className="orbit orbit-b" />
            <i className="orbit orbit-c" />
          </div>

          <div className="sun">
            <div className="sun-glow" />
          </div>

          <div className="planet-path path-one">
            <span className="orbit-planet planet-one" />
          </div>

          <div className="planet-path path-two">
            <span className="orbit-planet planet-two" />
          </div>

          <div className="planet-path path-three">
            <span className="orbit-planet planet-three" />
          </div>

          <img
            ref={jupiterRef}
            className="jupiter-image"
            src={jupiter}
            alt="Jupiter"
          />

          <div className="scene-copy">
            <span className="eyebrow">04 / GIANT WORLDS</span>
            <h2>Beyond Our Orbit</h2>
            <p>
              Giant planets reveal worlds of storms, clouds and
              extraordinary planetary systems.
            </p>
          </div>
        </section>

        {/* Black Hole */}
        <section className="scene hole-scene">
          <img
            className="black-hole-image"
            ref={blackholeRef}
            src={blackholeImage}
            alt="Black hole"
          />

          <div className="scene-copy hole-copy">
            <span className="eyebrow">05 / EXTREME GRAVITY</span>
            <h2>Into The Unknown</h2>
            <p>
              A black hole bends spacetime so intensely that beyond
              its event horizon, not even light can escape.
            </p>
          </div>
        </section>

        {/* Return to Moon */}
        <section className="scene ending-scene">
          <div className="ending-rings">
            <i />
            <i />
            <i />
          </div>

          <img
            className="ending-moon"
            src={moon}
            alt="Moon in deep space"
          />

          <div className="ending-copy">
            <span className="eyebrow">THE JOURNEY CONTINUES</span>
            <h2>Beyond The Moon</h2>
            <p>Scroll back to retrace the journey.</p>
          </div>
        </section>

        <div className="timeline-label">
          33 SECONDS / INFINITE SPACE
        </div>
      </section>

      <audio ref={audioRef} src={spaceAudio} loop preload="auto" />
    </main>
  );
}

export default App;