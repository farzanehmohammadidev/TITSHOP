import React, { useState } from 'react'
import { Drawer, Button, Menu } from 'antd'
import { FaShoppingBag } from "react-icons/fa";

export default function ShopCard() {
  const [open, setOpen] = useState(false)
  const items = [
    { key: 'mobile', label: <a href="/mobile">موبایل</a> },
    { key: 'laptop', label: <a href="/laptop">لپ‌تاپ</a> },
    { key: 'console', label: <a href="/console">کنسول</a> },
    { key: 'login', label: <a href="/login">ورود</a> },
    { key: 'home', label: <a href="/">خانه</a> }
  ]

  return (
    <div className="flex items-center">
      <Button type="text" onClick={() => setOpen(true)} aria-label="Open menu">
        <FaShoppingBag style={{ fontSize: 22, color:"#fff" }} />
      </Button>
      <Drawer placement="left" onClose={() => setOpen(false)} open={open} bodyStyle={{ padding: 0 }}>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">سبد خرید</h3>
        </div>
        <Menu mode="inline" items={items} onClick={() => setOpen(false)} style={{ borderRight: 'none' }} />
      </Drawer>
    </div>
  )
}
