type MenuProps = {
  handleSetInactive: () => void,
  children: React.ReactNode
}

export default function Menu({ handleSetInactive, children }: MenuProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
      <div
        className="absolute w-full h-full bg-black opacity-30"
        onClick={handleSetInactive}
      ></div>
      <div
        className="relative w-[75vw] h-[60vh] lg:w-[30vw] lg:h-[50vh] px-30 py-5 lg:px-20 lg:py-10 z-10
          bg-black overflow-y-auto">
        <button
          className="absolute top-5 right-5 size-20 cursor-pointer text-2xl lg:text-5xl z-10"
          onClick={handleSetInactive}
        >X</button>
        <div className="w-full h-auto flex flex-col justify-start items-center text-center gap-5">
          {children}
        </div>
      </div>
    </div>
  )
}