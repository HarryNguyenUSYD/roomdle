import HomeDesktop from "@/components/layout/page/HomeDesktop";
import HomeMobile from "@/components/layout/page/HomeMobile";

export default function Home() {
  return (
    <>
      <div className="hidden lg:block">
        <HomeDesktop />
      </div>

      <div className="block lg:hidden">
        <HomeMobile />
      </div>
    </>
  )
}