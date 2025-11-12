"use client";

import React from "react";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Breadcrumb, Layout } from "antd";
import { CiLogin } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa6";
import HamburgerMenu from "@/components/phone/HamburgerMenu";
import NavBar from "@/components/NavBar/NavBar";
import styles from "@/LayoutDesk.module.css";
import { FaShoppingBag } from "react-icons/fa";

const { Content, Footer } = Layout;

interface MainMenuItem {
  path: string;
  title: string;
  id: number;
}

const mainMenuItems: MainMenuItem[] = [
  { id: 1, path: "/", title: "خانه" },
  { id: 2, path: "/mobail", title: "موبایل" },
  { id: 3, path: "/laptop", title: "لپ تاپ" },
  { id: 4, path: "/console", title: "کنسول بازی" },
  { id: 5, path: "/shop", title: "سبد خرید" },
];

const LayoutDesk: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 1199 });
  const routeName = usePathname();
  const routeAdd = routeName === "/" ? [""] : routeName.split("/").filter(Boolean);

  return (
    <Layout className={styles.layoutWrapper}>
      {isMobile ? (
        <div className={styles.mobileHeader}>
          <HamburgerMenu />
         <Link href={`/shop`}> <FaShoppingBag size="20" style={{ color:"#fff" }} /></Link>
        </div>
      ) : (
        <div className={styles.desktopHeader}>
          <div className={styles.desktopHeaderInner}>
            {mainMenuItems.map((item) => (
              <div key={item.id}>
                <NavBar {...item} />
              </div>
            ))}

            <span >
              <Link  href="/auth/log">
                <span className="text-2xl"><CiLogin color="black"  /></span>
              </Link>
            </span>

            <span>
              <Link href="/auth/register">
                <span className="text-2xl"><FaUserPlus color="black"/></span>
              </Link>
            </span>
          </div>
        </div>
      )}

      <div className={styles.breadcrumbWrapper}>
        <Breadcrumb
          style={{ margin: "10px 0" }}
          items={routeAdd.map((routItem) => {
            const path = "/" + routItem;
            const menu = mainMenuItems.find((m) => m.path === path);
            return {
              title: <Link href={path}>{menu ? menu.title : routItem}</Link>,
            };
          })}
        />

        <Layout className={styles.contentWrapper}>
          <Content>{children}</Content>
        </Layout>
      </div>

      <Footer className={styles.footer}>
       {new Date().getFullYear()} Created by Netx.js UED
      </Footer>
    </Layout>
  );
};

export default LayoutDesk;
