"use client";
import React from "react";
import dynamic from "next/dynamic";

let AboutHero = dynamic(() => import("./AboutHero"), {
  ssr: false,
});

let OurStory = dynamic(() => import("./OurStory"), {
  ssr: false,
});
let MissionVision = dynamic(() => import("./MissionVision"), {
  ssr: false,
});
let CoreValues = dynamic(() => import("./CoreValues"), {
  ssr: false,
});
let IndustriesWeServe = dynamic(() => import("./IndustriesWeServe"), {
  ssr: false,
});
let GlobalPresence = dynamic(() => import("./GlobalPresence"), {
  ssr: false,
});
let Achievements = dynamic(() => import("./Achievements"), {
  ssr: false,
});
let CounterSection = dynamic(() => import("./CounterSection"), {
  ssr: false,
});
let TeamMembers = dynamic(() => import("./TeamMembers"), {
  ssr: false,
});

export default function page() {
  return (
    <div>
      <AboutHero />
      <CounterSection />
      <OurStory />
      <MissionVision />
      <CoreValues />
      <IndustriesWeServe />
      <TeamMembers />
      <GlobalPresence />
      <Achievements />
    </div>
  );
}
