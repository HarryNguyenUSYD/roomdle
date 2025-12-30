import Image from "next/image";

export default function Title() {
  return (
    <div className="w-[35vw] lg:w-[15vw] h-[15vh] flex flex-col">
      <Image
        src={"/roomdle-logo.png"}
        width={1330}
        height={650}
        alt="Roomdle Logo"
        className="w-full h-full object-contain"
      />
    </div>
  )
}
