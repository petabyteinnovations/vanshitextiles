import Image from "next/image";
import React from "react";
import logo from "../images/logo.png";
export default function Logo() {
  return (
    <section>
      <Image
        src={logo}
        width={80}
        height={80}
        priority="eager"
        className="w-full h-full"
        alt="logo"
      />
    </section>
  );
}
