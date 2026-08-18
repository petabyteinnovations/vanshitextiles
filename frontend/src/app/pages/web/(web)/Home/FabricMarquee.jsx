"use client";

import { apiurl } from "@/app/common/apiurl";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

export default function FabricMarquee() {
  const [fabrics, setfabrics] = useState([]);

  let viewdata = () => {
    try {
      apiurl.get("/web/view-marquee").then((res) => {
        console.log(res.data.Data);
        setfabrics(res.data.Data.viewmarquees);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    viewdata();
  }, []);

  return (
    <section className="overflow-hidden bg-[#0A2342] border-y border-[#0A2342]">
      <Marquee speed={45} gradient={false} autoFill pauseOnHover>
        {Array.isArray(fabrics) &&
          fabrics?.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="px-14 py-4 text-[13px] md:text-[15px] font-bold tracking-[1.8px] uppercase text-white whitespace-nowrap">
                {item.Marquee_Text}
              </span>

              <span className="text-[#9ec9ff] text-xl font-light">★</span>
            </div>
          ))}
      </Marquee>
    </section>
  );
}
