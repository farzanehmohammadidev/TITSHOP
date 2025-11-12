import Image from "next/image";
import Link from "next/link";
import Homebaner from "@/components/Homebaner/Homebaner"
export default async function Home() {
  const tab = [
    {
      id: 1,
      path: "HomeAppliances",
      img: "https://www.technolife.com/image/banner_CenterTripletBanners_1ushkB_7c709c6e-7800-421c-8eb8-7e373dfaf395.png",
    },
    {
      id: 2,
      path: "mobail",
      img: "https://www.technolife.com/image/banner_CenterTripletBanners_vzxsOg_688078d7-b840-45b9-a0b4-a35c2c0dc4c5.png",
    },
    {
      id: 3,
      path: "taghizat",
      img: "https://www.technolife.com/image/banner_CenterTripletBanners_sUHQ2j_1d6aacbe-e546-44b6-8d18-7ab993ae132c.png",
    },
  ];

  return (
    <>
      <div>
       <Homebaner />
      </div>
<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
  {tab.map((item: any) => (
    <div key={item.id} className="w-full">
      <Link href={item.path}>
        <Image
          src={item.img}
          width={1200}
          height={400}
          className="w-full h-auto rounded-lg"
          alt={item.title || ""}
        />
      </Link>
    </div>
  ))}
</div>
      <div></div>
    </>
  );
}
