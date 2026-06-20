import graph from "../../../assets/graph.png"
import people from "../../../assets/people.png"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

function Card({setId, Data, Id, index = 0 }){
    const navigate = useNavigate()

    return(
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          whileHover={{ scale: 0.95 }}
          onClick={() => {
            setId(Data.id)
            navigate(`/Catalogue/Course/${Data.id}`)
          }}
          className={`w-[350px] h-[250px] flex flex-col justify-between items-center py-5 transition duration-300 cursor-pointer ${
            Data.id === Id
              ? "bg-white shadow-[12px_12px_0px_0px_rgba(255,225,0,1)]"
              : "bg-gray-900 hover:shadow-[8px_8px_0px_0px_rgba(255,225,0,0.5)]"
          }`}
        >
        <div className="px-5">
          <h1 className={`text-xl font-bold ${Data.id === Id ? "text-black" : "text-white"}`}>{Data.title}</h1>
          <p className="text-sm font-semibold text-gray-500 line-clamp-3">{Data.description}</p>
        </div>
          <div className="flex flex-col w-full">
            <hr />
            <div className="flex flex-row px-5 justify-between items-center">
           <div className={`flex flex-row gap-x-1 ${Data.id === Id ? "" : "invert"}`}>
            <img className="object-contain w-[15px]" src={people} alt="" />
            <p className="text-blue-400 text-md">
                {Data.students || 0} Students
            </p>
           </div>
            
            <div className={`flex flex-row gap-x-1 ${Data.id === Id ? "" : "invert"}`}>
                <img className="object-contain w-[15px]" src={graph} alt="" />
                <p className="text-blue-500 text-md">
                Rs. {Data.price ?? 0}
            </p>
            </div>
            </div>
          </div>

        </motion.div>
    )
}

export default Card
