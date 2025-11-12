import React, { useState } from "react";
import { Drawer, Button, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const items = [
    { key: "home", label: <a href="/">خانه</a> },
    { key: "mobile", label: <a href="/mobail">موبایل</a> },
    { key: "laptop", label: <a href="/laptop">لپ‌تاپ</a> },
    { key: "console", label: <a href="/console">کنسول</a> },
    { key: "login", label: <a href="/login">ورود</a> },
  ];

  return (
    <div className="flex items-center">
      <Button type="text" onClick={() => setOpen(true)} aria-label="Open menu">
        <MenuOutlined style={{ fontSize: 22, color: "#fff" }} />
      </Button>
      <Drawer
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
        style={{}}
        styles={{ body: { padding: 0 } }}
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">منو</h3>
        </div>
        <Menu
          mode="inline"
          items={items}
          onClick={() => setOpen(false)}
          style={{ borderRight: "none" }}
        />
      </Drawer>
    </div>
  );
}
