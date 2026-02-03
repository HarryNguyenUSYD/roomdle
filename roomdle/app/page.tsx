import FurnitureBar from "@/components/layout/furniture-bar/FurnitureBar";
import Gameboard from "@/components/layout/gameboard/Gameboard";
import HistoryButton from "@/components/layout/history/HistoryButton";
import SettingsButton from "@/components/layout/settings/SettingsButton";
import StatisticsButton from "@/components/layout/statistics/StatisticsButton";
import StreakStat from "@/components/layout/streak-stat/StreakStat";
import SubmitButton from "@/components/layout/submit/SubmitButton";
import Title from "@/components/layout/title/Title";

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

function HomeDesktop() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#03091b] gap-20">
      <div className="w-full h-auto flex flex-row justify-center items-center gap-20">
        <div className="w-full h-full flex flex-col justify-center items-end gap-20">
          <Title />
          <StatisticsButton />
          <SettingsButton />
        </div>
        <Gameboard />
        <div className="w-full h-full flex flex-col justify-center items-start gap-20">
          <StreakStat />
          <HistoryButton />
          <SubmitButton />
        </div>
      </div>
      <FurnitureBar />
    </div>
  )
}

function HomeMobile() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#03091b] gap-5">
      <Title />
      <Gameboard />
      <StreakStat />
      <div className="w-full h-auto flex flex-row justify-center items-center gap-10">
        <div className="w-full h-full flex flex-col justify-center items-end gap-5">
          <StatisticsButton />
          <SettingsButton />
        </div>
        <div className="w-full h-full flex flex-col justify-center items-start gap-5">
          <HistoryButton />
          <SubmitButton />
        </div>
      </div>
      <FurnitureBar />
    </div>
  )
}