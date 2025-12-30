type ButtonProps = React.ComponentPropsWithoutRef<"button">

export default function MenuButton({ onClick, children }: ButtonProps) {
  return (
    <button
      className="relative w-32 lg:w-50 h-auto py-1 text-lg cursor-pointer bg-black border-2 border-white"
      onClick={onClick}
    >
      {children}
    </button>
  )
}