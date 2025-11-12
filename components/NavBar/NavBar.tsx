"use client"
import Link from 'next/link'
import React from 'react'

interface Tprop {
  path: string;
  title: string;
}

const NavBar: React.FC<Tprop> = ({ path, title }) => {
  return (
    <div className="bg-white flex items-center">
      <div className="flex items-center">
        <ul className="flex items-center">
          <li className="fa" style={{ textShadow: "0 0 0 3px rgba(30, 58, 138, 0.2)", padding:"0 16px" }}>
            <Link href={path}>
              <span className="text-[18px] fa text-black">{title}</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
