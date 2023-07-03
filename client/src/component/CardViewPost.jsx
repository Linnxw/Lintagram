export default function CardViewPost({event,image}){
  return (
    <div className="w-44 h-44 md:w-72 md:h-72 overflow-hidden" onClick={()=>event(image)}>
       <img className="w-full object-center" src={image}/>
    </div>
    )
}