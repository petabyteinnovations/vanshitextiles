"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { ArrowRight, Truck } from "lucide-react";

import { apiurl } from "@/app/common/apiurl";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/* -------------------------------------------------------------------------- */
/*                          Layout constants (desktop)                        */
/* -------------------------------------------------------------------------- */

const CARD_WIDTH = 460;
const CARD_GAP = 140;
const SLOT_WIDTH = CARD_WIDTH + CARD_GAP;
const TRACK_PADDING_X = 120;
const WAVE_PEAK_Y = 120;
const WAVE_TROUGH_Y = 340;
const PATH_HEIGHT = 460;
const ICON_SIZE = 80;

const NAVBAR_HEIGHT = 90;

// Controls how "slow" the horizontal scroll feels.
// 1 = 1px of vertical scroll moves the track 1px horizontally (fastest).
// Raise this (e.g. 1.5, 2, 2.5) to require more scrolling to cover the
// same horizontal distance — i.e. a slower, more gradual scroll feel.
const SCROLL_SPEED_MULTIPLIER = 5;

/* -------------------------------------------------------------------------- */
/*                            Main Component                                  */
/* -------------------------------------------------------------------------- */

export default function ManufacturingProcess() {
  const [steps, setsteps] = useState(null);
  const [imgurl, setimgurl] = useState("");

  /* ------------------------------------------------------------------------ */
  /*                                  Refs                                    */
  /* ------------------------------------------------------------------------ */

  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);

  const pathRef = useRef(null);
  const dotRef = useRef(null);

  const cardsRef = useRef([]);
  const iconsRef = useRef([]);
  const descRefs = useRef([]);

  cardsRef.current = [];
  iconsRef.current = [];
  descRefs.current = [];

  const addCard = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const addIcon = (el) => {
    if (el && !iconsRef.current.includes(el)) {
      iconsRef.current.push(el);
    }
  };

  const addDesc = (el) => {
    if (el && !descRefs.current.includes(el)) {
      descRefs.current.push(el);
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                       Fetch Manufacturing API                            */
  /* ------------------------------------------------------------------------ */

  const fetchManufacturingData = async () => {
    try {
      apiurl
        .get("/web/view-manufacturing-cards")
        .then((res) => {
          setsteps(res.data.Data.viewimages);
          setimgurl(res.data.Data.imageurl);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Manufacturing Process API Error:", error);
    }
  };

  useEffect(() => {
    fetchManufacturingData();
  }, []);

  /* ------------------------------------------------------------------------ */
  /*                            Wave path state                               */
  /* ------------------------------------------------------------------------ */

  const [pathD, setPathD] = useState("");
  const [wavePoints, setWavePoints] = useState([]);
  const [trackWidth, setTrackWidth] = useState(0);

  /* ------------------------------------------------------------------------ */
  /*                            Helper Functions                              */
  /* ------------------------------------------------------------------------ */

  const isEven = (index) => index % 2 === 0;

  const buildWavePoints = (count) =>
    Array.from({ length: count }, (_, i) => {
      const x = TRACK_PADDING_X + i * SLOT_WIDTH + CARD_WIDTH / 2;
      const y = isEven(i) ? WAVE_TROUGH_Y : WAVE_PEAK_Y;

      return { x, y };
    });

  const buildWavePath = (points) => {
    if (!points.length) return "";

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midX = (prev.x + curr.x) / 2;

      d += ` C ${midX} ${prev.y} ${midX} ${curr.y} ${curr.x} ${curr.y}`;
    }

    return d;
  };

  /* ------------------------------------------------------------------------ */
  /*                    Measure track + build wave path                       */
  /* ------------------------------------------------------------------------ */

  useLayoutEffect(() => {
    if (!steps?.length) return;

    const computedWidth =
      TRACK_PADDING_X * 2 + steps.length * SLOT_WIDTH - CARD_GAP;

    const points = buildWavePoints(steps.length);

    setTrackWidth(computedWidth);
    setWavePoints(points);
    setPathD(buildWavePath(points));
    // Rebuild whenever the actual step data changes (not just its length),
    // otherwise swapping in new data of the same length won't refresh anything.
  }, [steps]);

  /* ------------------------------------------------------------------------ */
  /*                            GSAP Animation                                 */
  /* ------------------------------------------------------------------------ */

  useLayoutEffect(() => {
    if (!sectionRef.current || !steps?.length || !trackWidth || !pathD) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ===================== Desktop: horizontal scroll ===================== */

      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;

        if (!track) return;

        // Actual pixels the track needs to move — unchanged, or the cards
        // would overshoot and leave blank space at the end.
        const getTrackTravelDistance = () =>
          Math.max(track.scrollWidth - window.innerWidth, 0);

        // How much vertical scroll it takes to cover that travel distance —
        // this is what controls the "speed" feel. Bigger = slower.
        const getScrollDistance = () =>
          getTrackTravelDistance() * SCROLL_SPEED_MULTIPLIER;

        /* --------- Move the track horizontally as the page scrolls --------- */

        const trackTween = gsap.to(track, {
          x: () => -getTrackTravelDistance(),
          ease: "none",

          scrollTrigger: {
            id: "horizontal-track",
            trigger: stageRef.current,
            start: "top top",
            end: () => "+=" + getScrollDistance(),
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        /* --------------------- Draw the wave path in sync --------------------- */

        if (pathRef.current) {
          const length = pathRef.current.getTotalLength();

          gsap.set(pathRef.current, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });

          gsap.to(pathRef.current, {
            strokeDashoffset: 0,
            ease: "none",

            scrollTrigger: {
              trigger: stageRef.current,
              start: "top top",
              end: () => "+=" + getScrollDistance(),
              scrub: 1,
            },
          });
        }

        /* ------------------------- Moving dot on the path ------------------------- */

        if (dotRef.current && pathRef.current) {
          const totalLength = pathRef.current.getTotalLength();

          const OVERLAP_RADIUS = 90;
          const ACTIVE_RADIUS = 140;

          let lastActiveIndex = -1;

          gsap.set(dotRef.current, {
            xPercent: -50,
            yPercent: -50,
          });

          gsap.to(dotRef.current, {
            ease: "none",

            motionPath: {
              path: pathRef.current,
              align: pathRef.current,
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
            },

            scrollTrigger: {
              trigger: stageRef.current,
              start: "top top",
              end: () => "+=" + getScrollDistance(),
              scrub: 1,

              onUpdate: (self) => {
                const truckPoint = pathRef.current.getPointAtLength(
                  self.progress * totalLength,
                );

                const overlapping = wavePoints.some(
                  (point) => Math.abs(point.x - truckPoint.x) < OVERLAP_RADIUS,
                );

                gsap.to(dotRef.current, {
                  opacity: overlapping ? 0 : 1,
                  duration: 0.2,
                  overwrite: "auto",
                });

                let closestIndex = -1;
                let closestDist = Infinity;

                wavePoints.forEach((point, i) => {
                  const dist = Math.abs(point.x - truckPoint.x);

                  if (dist < ACTIVE_RADIUS && dist < closestDist) {
                    closestDist = dist;
                    closestIndex = i;
                  }
                });

                if (closestIndex === lastActiveIndex) return;

                lastActiveIndex = closestIndex;

                descRefs.current.forEach((el, i) => {
                  if (!el) return;

                  if (i === closestIndex) {
                    gsap.to(el, {
                      opacity: 1,
                      duration: 0.3,
                      overwrite: "auto",
                    });
                  } else {
                    gsap.set(el, {
                      clearProps: "opacity",
                    });
                  }
                });
              },
            },
          });
        }

        /* --------------- Cards + icons reveal as they scroll into view --------------- */

        cardsRef.current.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 60,
            scale: 0.96,
            duration: 0.8,
            ease: "power3.out",

            scrollTrigger: {
              trigger: card,
              containerAnimation: trackTween,
              start: "left 85%",
              toggleActions: "play none none reverse",
            },
          });
        });

        iconsRef.current.forEach((icon) => {
          gsap.from(icon, {
            opacity: 0,
            scale: 0.5,
            rotation: -20,
            duration: 0.7,
            ease: "back.out(1.7)",

            scrollTrigger: {
              trigger: icon,
              containerAnimation: trackTween,
              start: "left 85%",
              toggleActions: "play none none reverse",
            },
          });

          gsap.to(icon, {
            y: -10,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut",
          });
        });

        return () => {
          trackTween.kill();
        };
      });

      /* ========================= Mobile: vertical reveal ========================= */

      mm.add("(max-width: 1023px)", () => {
        cardsRef.current.forEach((card, index) => {
          gsap.from(card, {
            opacity: 0,
            y: 60,
            duration: 0.8,
            delay: index * 0.05,
            ease: "power3.out",

            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });

        iconsRef.current.forEach((icon) => {
          gsap.from(icon, {
            opacity: 0,
            scale: 0.5,
            rotation: -20,
            duration: 0.7,
            ease: "back.out(1.7)",

            scrollTrigger: {
              trigger: icon,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      /* ---------------------------------------------------------------------- */
      /*                              Resize listener                           */
      /* ---------------------------------------------------------------------- */

      const onResize = () => ScrollTrigger.refresh();

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        mm.revert();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [steps, trackWidth, pathD, wavePoints]);

  /* ------------------------------------------------------------------------ */
  /*                              Main JSX                                    */
  /* ------------------------------------------------------------------------ */

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-hidden bg-[#FCFCFC] py-24 lg:py-0"
    >
      {/* -------------------------------------------------------------------- */}
      {/*                         Background Effects                            */}
      {/* -------------------------------------------------------------------- */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-112.5 w-112.5 rounded-full bg-blue-100/30 blur-[160px]" />

        <div className="absolute -right-40 bottom-0 h-125 w-125 rounded-full bg-blue-100/30 blur-[180px]" />

        <div className="absolute left-1/2 top-1/2 h-162.5 w-162.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50/40 blur-[220px]" />
      </div>

      {/* -------------------------------------------------------------------- */}
      {/*                         Header                                         */}
      {/* -------------------------------------------------------------------- */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-0 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[3px] text-[#D4AF37]">
            Manufacturing Process
          </span>

          <h2 className="mt-8 text-4xl font-light leading-tight text-[#1A1A1A] md:text-5xl lg:text-6xl">
            Our Manufacturing Journey
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-500">
            From premium raw materials to final delivery, every stage is
            executed with precision and strict quality standards.
          </p>

          <div className="mt-10">
            <Link
              href={"/contact"}
              className="inline-flex items-center gap-3 rounded-4xl bg-[#0A2342] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#D4AF37]"
            >
              Explore Process
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/*                    Desktop: pinned horizontal scroll stage             */}
      {/* -------------------------------------------------------------------- */}

      <div ref={stageRef} className="relative hidden h-screen lg:block">
        <div
          ref={trackRef}
          className="absolute left-0 flex items-center will-change-transform"
          style={{
            width: trackWidth || "max-content",
            top: `calc(10% + ${NAVBAR_HEIGHT / 2}px)`,
            transform: "translateY(-50%)",
          }}
        >
          {/* Wave path */}

          <svg
            className="pointer-events-none absolute left-0 top-0 overflow-visible"
            width={trackWidth}
            height={PATH_HEIGHT}
            viewBox={`0 0 ${trackWidth} ${PATH_HEIGHT}`}
            preserveAspectRatio="none"
          >
            <path
              d={pathD}
              fill="none"
              stroke="#ECECEC"
              strokeWidth="5"
              strokeLinecap="round"
            />

            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="#0A2342"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>

          {/* Moving truck */}

          <div ref={dotRef} className="absolute left-0 top-0 z-10">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-white shadow-2xl">
              <span className="absolute h-16 w-16 rounded-full bg-[#0A2342]/20 blur-xl" />

              <Truck size={22} className="relative text-[#0A2342]" />
            </div>
          </div>

          {/* Each step */}

          {Array.isArray(wavePoints) &&
            wavePoints?.map((point, index) => {
              const item = steps[index];
              const isPeak = !isEven(index);

              return (
                <div
                  key={item?._id || index}
                  ref={addCard}
                  className="group absolute z-20"
                  style={{
                    left: point.x,
                    top: point.y,
                    transform: `translate(-50%, ${-ICON_SIZE / 2}px)`,
                  }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div ref={addIcon}>
                      <ImageBubble
                        src={
                          item?.Manufacturing_Process_Image && imgurl
                            ? `${imgurl}/${item.Manufacturing_Process_Image}`
                            : null
                        }
                        alt={
                          item?.Manufacturing_Process_Main_Heading ||
                          "Process step"
                        }
                      />
                    </div>

                    <span className="text-xs font-semibold uppercase tracking-[3px] text-[#0A2342]">
                      Step {index + 1}
                    </span>

                    <h3 className="max-w-70 text-center text-2xl font-bold leading-tight text-[#1A1A1A]">
                      {item?.Manufacturing_Process_Main_Heading}
                    </h3>
                  </div>

                  {/* Description */}

                  <div
                    ref={addDesc}
                    className="pointer-events-none absolute left-1/2 z-30 w-[320px] -translate-x-1/2 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={
                      isPeak
                        ? {
                            top: "100%",
                            marginTop: 24,
                          }
                        : {
                            bottom: "100%",
                            marginBottom: 24,
                          }
                    }
                  >
                    <p className="leading-7 text-slate-500">
                      {item?.Manufacturing_Process_Description}
                    </p>
                  </div>
                </div>
              );
            })}

          {/* Invisible spacer */}

          <div className="shrink-0" style={{ width: trackWidth }} />
        </div>

        {/* Scroll hint */}

        <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[3px] text-slate-400">
          Scroll to explore →
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/*                       Mobile: vertical fallback layout                */}
      {/* -------------------------------------------------------------------- */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:hidden">
        <div className="relative mt-16">
          <div className="absolute bottom-0 left-7 top-0 w-0.75 rounded-full bg-blue-200" />

          <div className="relative space-y-16">
            {Array.isArray(steps) &&
              steps?.map((item, index) => {
                return (
                  <div
                    key={item?._id || index}
                    ref={addCard}
                    className="relative pl-20"
                  >
                    <div
                      ref={addIcon}
                      className="absolute left-0 top-0 flex flex-col items-center gap-2"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-blue-100 bg-white shadow-lg">
                        {item?.Manufacturing_Process_Image && imgurl ? (
                          <Image
                            src={`${imgurl}/${item.Manufacturing_Process_Image}`}
                            width={100}
                            height={100}
                            alt={
                              item?.Manufacturing_Process_Main_Heading ||
                              "Process step"
                            }
                            className="h-full w-full rounded-xl object-cover"
                          />
                        ) : null}
                      </div>

                      <span className="text-[10px] font-semibold uppercase tracking-[2px] text-[#0A2342]">
                        Step {index + 1}
                      </span>
                    </div>

                    <h3 className="mt-3 text-2xl font-bold leading-tight text-[#1A1A1A]">
                      {item?.Manufacturing_Process_Main_Heading}
                    </h3>

                    <p className="mt-5 leading-7 text-slate-500">
                      {item?.Manufacturing_Process_Description}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Small subcomponents                            */
/* -------------------------------------------------------------------------- */
function ImageBubble({ src, alt }) {
  return (
    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_20px_45px_rgba(0,0,0,.08)]">
      {src ? (
        <Image
          src={src}
          width={50}
          height={50}
          alt={alt || "Manufacturing Process"}
          className="h-12.5 w-12.5 object-contain"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(12%) sepia(30%) saturate(1138%) hue-rotate(173deg) brightness(91%) contrast(96%)",
          }}
          unoptimized
        />
      ) : (
        <div className="h-full w-full animate-pulse bg-slate-100" />
      )}
    </div>
  );
}
