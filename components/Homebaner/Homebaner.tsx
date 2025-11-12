"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMediaQuery } from "react-responsive";

function Homebaner() {
  const isMobail = useMediaQuery({ maxWidth: 1199 });
  return (
    <div style={{marginBottom:"30px"}}>
      {isMobail ? null : (
        <Link href="mobail" className="text-black">
          <Image
            width={1200}
            height={400}
            className="w-full h-auto"
            src="https://www.technolife.com/image/banner_SlideBanner_FdinDt_c85f0007-5dc4-4bb9-8d8b-039acca7310a.gif"
            alt=""
          />
        </Link>
      )}
    </div>
  );
}

export default Homebaner;
