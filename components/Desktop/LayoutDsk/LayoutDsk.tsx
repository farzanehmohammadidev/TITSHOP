"use client";
import { CiLogin , CiLogout } from "react-icons/ci";
import React, { useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Breadcrumb, Layout } from "antd";
import { FaUserPlus } from "react-icons/fa6";
import HamburgerMenu from "@/components/phone/HamburgerMenu";
import NavBar from "@/components/NavBar/NavBar";
import styles from "@/LayoutDesk.module.css";
import { FaShoppingBag } from "react-icons/fa";
import IsLoginContext from "@/context/IsLogin/isLogin";
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
  const { islog, setIslog } = useContext(IsLoginContext);
  const routeName = usePathname();
console.log(islog);
useEffect(() => {
  async function checkLogin() {
    const res = await fetch("/api/getToken", { cache: "no-store" });
    const data = await res.json();
    setIslog(data.isLoggedIn);
  }
  checkLogin();
  console.log(islog);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routeAdd =
    routeName === "/" ? [""] : routeName.split("/").filter(Boolean);
  async function deleteCookieHandler() {
    await fetch("/api/Logout", { method: "POST" });
    setIslog(false)
  }
console.log(islog);

  return (
    <Layout className={styles.layoutWrapper}>
      {isMobile ? (
        <div className={styles.mobileHeader}>
          <HamburgerMenu />
          <Link href={`/shop`}>
            <FaShoppingBag size="20" style={{ color: "#fff" }} />
          </Link>
        </div>
      ) : (
        <div className={styles.desktopHeader}>
          <div className={styles.desktopHeaderInner}>
            {mainMenuItems.map((item) => (
              <div key={item.id}>
                <NavBar {...item} />
              </div>
            ))}
            <span className="text-2xl">
              {islog ? (
                <CiLogout onClick={deleteCookieHandler}>خروج</CiLogout>
              ) : (
                <Link href="/auth/log">
                  <CiLogin />
                </Link>
              )}
            </span>
            <span>
              <Link href="/auth/register">
                <span className="text-2xl">
                  <FaUserPlus color="black" />
                </span>
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
