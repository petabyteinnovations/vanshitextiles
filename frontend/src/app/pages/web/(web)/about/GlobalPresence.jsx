"use client";

/**
 * Requires: npm install react-simple-maps d3-geo
 * (uses the open world-atlas TopoJSON dataset for real country borders —
 *  loaded from a CDN at runtime, no local data file needed)
 */

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { geoEquirectangular } from "d3-geo";
import { Globe2 } from "lucide-react";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const DEFAULT_DATA = {
  subtitle: "Global Presence",
  title: "Delivering Premium Textile Solutions Worldwide",
  description:
    "Our export network serves businesses across multiple continents with dependable logistics and uncompromising quality.",
  mapBadge: "Worldwide Network",
  mapTitle: "Worldwide Export Network",
  mapDescription: "Tap a point on the map to see how we serve that region.",
  regions: [
    {
      name: "North America",
      desc: "OEM & retail supply",
      detail:
        "Serving major retail chains and OEM partners with consistent, on-schedule bulk shipments.",
      coords: [-98.5795, 39.8283],
    },
    {
      name: "Europe",
      desc: "Hospitality & home textiles",
      detail:
        "Premium hotel linen and home-textile collections supplied to distributors across the EU.",
      coords: [10.4515, 51.1657],
    },
    {
      name: "Middle East",
      desc: "Luxury hotel textiles",
      detail:
        "High-end hospitality groups trust us for luxury bed linen, towels, and custom uniforms.",
      coords: [45.0792, 23.8859],
    },
    {
      name: "Asia Pacific",
      desc: "Wholesale distribution",
      detail:
        "Large-volume wholesale supply with flexible MOQs for distributors across the region.",
      coords: [113.9213, 0.7893],
    },
    {
      name: "Africa",
      desc: "Institutional supply",
      detail:
        "Reliable institutional and healthcare textile supply, tailored to regional standards.",
      coords: [21.0937, 7.1881],
    },
    {
      name: "Australia",
      desc: "Retail & hospitality",
      detail:
        "Retail-ready and hospitality-grade textiles shipped with dependable freight partners.",
      coords: [133.7751, -25.2744],
    },
  ],
};

/* Russia is the manufacturing hub — every region connects back to it */
const HUB = { name: "Russia", coords: [90.0, 61.524] };

/* Continent name labels — shown as a background layer on the map,
   separate from the interactive business-region markers below. */
const CONTINENTS = [
  { name: "North America", coords: [-100, 48] },
  { name: "South America", coords: [-60, -18] },
  { name: "Europe", coords: [15, 54] },
  { name: "Africa", coords: [20, 5] },
  { name: "Asia", coords: [95, 48] },
  { name: "Australia", coords: [134, -26] },
];

/* Map canvas size — kept in sync with the ComposableMap width/height below
   AND with the manual d3 projection used to draw the curved connector lines,
   so the arcs line up exactly with the country borders and markers. */
const MAP_WIDTH = 980;
const MAP_HEIGHT = 480;
const MAP_SCALE = 155;
const MAP_CENTER = [10, 15];

/* This mirrors the projection react-simple-maps builds internally from the
   projection="geoEquirectangular" + projectionConfig props on ComposableMap,
   so coordinates projected here land in the same pixel space as the map. */
const mapProjection = geoEquirectangular()
  .scale(MAP_SCALE)
  .center(MAP_CENTER)
  .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);

/* Builds a smooth upward-bowing quadratic-bezier arc between two [lng,lat]
   points, instead of a straight line — gives the classic "flight path" look. */
function getCurvedPath(fromCoords, toCoords) {
  const [x1, y1] = mapProjection(fromCoords);
  const [x2, y2] = mapProjection(toCoords);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const bend = Math.min(dist * 0.28, 90);
  return `M ${x1} ${y1} Q ${mx} ${my - bend} ${x2} ${y2}`;
}

/* ==========================================================
        INTERACTIVE WORLD MAP — real country geography (flat projection)
========================================================== */

function WorldMap({ regions, activeRegion, onSelect }) {
  return (
    <div className="relative w-full aspect-980/480 overflow-hidden rounded-2xl border border-[#0A2342]/10 bg-[#F7F5EF] p-2 shadow-[0_15px_45px_rgba(15,23,42,.06)] sm:rounded-3xl sm:p-6">
      {/* Keyframes for the flowing dashed connector lines */}
      <ComposableMap
        projection="geoEquirectangular"
        projectionConfig={{ scale: MAP_SCALE, center: MAP_CENTER }}
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name;
              const isHub = countryName === HUB.name;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHub ? "#0A2342" : "rgba(10,35,66,0.07)"}
                  stroke="rgba(10,35,66,0.25)"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: "none", transition: "fill 250ms" },
                    hover: {
                      outline: "none",
                      fill: isHub ? "#0A2342" : "rgba(212,175,55,0.35)",
                      cursor: "default",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Continent markers — clickable, same selection pattern as regions
            (skip any continent whose name duplicates a region below,
            e.g. Australia, to avoid rendering/selecting the same point twice) */}
        {CONTINENTS.filter(
          (c) => !regions.some((r) => r.name === c.name),
        ).map((c) => {
          const isActive = c.name === activeRegion;
          return (
            <Marker
              key={c.name}
              coordinates={c.coords}
              onClick={() => onSelect(c.name)}
              style={{ cursor: "pointer" }}
            >
              <circle
                r={isActive ? 6 : 3.5}
                fill={isActive ? "#D4AF37" : "#0A2342"}
                opacity={isActive ? 1 : 0.35}
                stroke="#FFFFFF"
                strokeWidth={isActive ? 1.5 : 1}
                style={{ transition: "all 250ms" }}
              />
              {isActive && (
                <circle r={6} fill="none" stroke="#D4AF37" opacity={0.6}>
                  <animate
                    attributeName="r"
                    values="6;14;6"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0;0.6"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <text
                textAnchor="middle"
                y={-12}
                style={{
                  fill: isActive ? "#D4AF37" : "#0A2342",
                  opacity: isActive ? 1 : 0.85,
                  fontSize: isActive ? 15 : 14,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                  paintOrder: "stroke",
                  stroke: "#FFFFFF",
                  strokeWidth: 3,
                  strokeLinejoin: "round",
                  pointerEvents: "none",
                }}
              >
                {c.name}
              </text>
            </Marker>
          );
        })}

        {/* Curved connection arcs — hub (Russia) to every region */}
        {regions.map((item) => {
          const isActive = item.name === activeRegion;
          return (
            <path
              key={item.name}
              d={getCurvedPath(HUB.coords, item.coords)}
              fill="none"
              stroke="#D4AF37"
              strokeWidth={isActive ? 2.5 : 1.4}
              strokeDasharray="6 6"
              strokeLinecap="round"
              className="flow-line"
              style={{
                opacity: isActive ? 1 : 0.4,
                transition: "opacity 250ms, stroke-width 250ms",
              }}
            />
          );
        })}

        {/* Curved connection arcs — hub (Russia) to every continent
            (skip any continent already connected via a matching region
            line above, e.g. Australia, to avoid a duplicate overlapping arc) */}
        {CONTINENTS.filter(
          (c) => !regions.some((r) => r.name === c.name),
        ).map((c) => {
          const isActive = c.name === activeRegion;
          return (
            <path
              key={c.name}
              d={getCurvedPath(HUB.coords, c.coords)}
              fill="none"
              stroke={isActive ? "#D4AF37" : "#0A2342"}
              strokeWidth={isActive ? 2.2 : 1}
              strokeDasharray="4 6"
              strokeLinecap="round"
              className="flow-line"
              style={{
                opacity: isActive ? 1 : 0.35,
                transition: "opacity 250ms, stroke-width 250ms",
              }}
            />
          );
        })}

        {/* Hub marker */}
        <Marker coordinates={HUB.coords}>
          <circle r={9} fill="none" stroke="#D4AF37" opacity={0.6}>
            <animate
              attributeName="r"
              values="9;22;9"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;0;0.6"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r={6} fill="#D4AF37" stroke="#0A2342" strokeWidth={1.5} />
          <text
            textAnchor="middle"
            y={-16}
            style={{
              fill: "#0A2342",
              fontSize: 13,
              fontWeight: 700,
              paintOrder: "stroke",
              stroke: "#FFFFFF",
              strokeWidth: 3,
              strokeLinejoin: "round",
            }}
          >
            Russia · HQ
          </text>
        </Marker>

        {/* Region markers */}
        {regions.map((item) => {
          const isActive = item.name === activeRegion;
          return (
            <Marker
              key={item.name}
              coordinates={item.coords}
              onClick={() => onSelect(item.name)}
              style={{ cursor: "pointer" }}
            >
              <circle
                r={isActive ? 7 : 4.5}
                fill={isActive ? "#D4AF37" : "#0A2342"}
                opacity={isActive ? 1 : 0.55}
                stroke="#FFFFFF"
                strokeWidth={isActive ? 1.5 : 1}
                style={{ transition: "all 250ms" }}
              />
              {isActive && (
                <circle r={7} fill="none" stroke="#D4AF37" opacity={0.6}>
                  <animate
                    attributeName="r"
                    values="7;16;7"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0;0.6"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <text
                textAnchor="middle"
                y={-12}
                style={{
                  fill: isActive ? "#D4AF37" : "#0A2342", fontSize: isActive ? 12 : 10.5, fontWeight: isActive ? 700 : 600, opacity: 1, paintOrder: "stroke", stroke: "#FFFFFF", strokeWidth: 3, strokeLinejoin: "round", pointerEvents: "none",
                }}
              >
                {item.name}
              </text>
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
}

/* ==========================================================
                    COMPONENT
========================================================== */

export default function GlobalPresence({ data }) {
  const content = { ...DEFAULT_DATA, ...data };
  const { subtitle, title, description, mapBadge, mapTitle, mapDescription, regions } =
    content;
  const [activeRegion, setActiveRegion] = useState(regions[0]?.name);

  return (
    <section className="relative overflow-hidden bg-white py-16 text-[#0A2342] sm:py-24 lg:py-28">
      {/* Background Texture */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-52 top-0 h-105 w-105 rounded-full bg-[#D4AF37]/10 blur-[140px]" />
        <div className="absolute -right-52 bottom-0 h-105 w-105 rounded-full bg-[#0A2342]/5 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full  px-3 py-1.5 text-xs font-semibold uppercase tracking-[2px] text-[#D4AF37] sm:px-4 sm:py-2 sm:text-sm sm:tracking-[3px]">
            {subtitle}
          </span>

          <h2 className="mt-4 font-serif text-3xl leading-tight text-[#0A2342] sm:mt-6 sm:text-4xl lg:text-5xl">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#0A2342]/70 sm:mt-6 sm:text-lg">
            {description}
          </p>
        </div>

        {/* ============================================================
              INTERACTIVE WORLD MAP
        ============================================================ */}

        <div className="mt-10 sm:mt-16 lg:mt-20">
          <WorldMap
            regions={regions}
            activeRegion={activeRegion}
            onSelect={setActiveRegion}
          />

          {/* Region chips — mirror of the map markers, easier to tap on mobile */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3">
            {regions.map((item) => {
              const isActive = item.name === activeRegion;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveRegion(item.name)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${isActive
                      ? "border-[#D4AF37] bg-[#D4AF37] text-[#0A2342]"
                      : "border-[#0A2342]/15 bg-white text-[#0A2342] hover:border-[#D4AF37]/50"
                    }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Continent chips — mirror of the continent map markers
              (skip any continent already shown above as a region chip,
              e.g. Australia, so it isn't rendered twice) */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-5 sm:gap-3">
            {CONTINENTS.filter(
              (c) => !regions.some((r) => r.name === c.name),
            ).map((c) => {
              const isActive = c.name === activeRegion;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setActiveRegion(c.name)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[1px] transition-all duration-300 sm:text-xs ${isActive
                      ? "border-[#D4AF37] bg-[#D4AF37] text-[#0A2342]"
                      : "border-[#0A2342]/15 bg-white text-[#0A2342] hover:border-[#D4AF37]/50"
                    }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}