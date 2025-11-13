import React, { useState } from 'react'
import { Drawer, Button, Menu } from 'antd'
import { FaShoppingBag } from "react-icons/fa";
import Link from 'next/link';

export default function ShopCard() {
  const [open, setOpen] = useState(false)
  const items = [
    { key: 'mobile', label: <Link href="/mobile">موبایل</Link> },
    { key: 'laptop', label: <Link href="/laptop">لپ‌تاپ</Link> },
    { key: 'console', label: <Link href="/console">کنسول</Link> },
    { key: 'login', label: <Link href="/login">ورود</Link> },
    { key: 'home', label: <Link href="/">خانه</Link> }
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
