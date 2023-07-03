import {BsSearch} from "react-icons/bs"
export default function InpitSearch({press,change,state}){
  return (
      <div className="w-[90%] mx-auto flex font-inter items-center text-sm relative text-white md:text-xl md:my-5">
        <input type="teks" className="outline-none bg-second tracking-wide text-white p-2 md:p-4 w-[100%] rounded peer" onChange={change} onKeyPress={press}/>
        <span className={`absolute left-2 md:left-4 peer-focus:hidden ${state.length !== 0 && "hidden"} flex gap-2 md:gap-4 items-center text-slate-200`}><BsSearch/>Search post</span>
      </div>
   )
}