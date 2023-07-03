export default function Button({children,variant="bg-second",size="h-8",event}){
  
  return <button onClick={event} className={`${variant} ${size} md:h-12 flex items-center justify-center w-[47%] text-sm md:text-xl rounded-lg font-inter hover:scale-95 ease-in-out gap-1 duration-200`}>{children}</button>
}