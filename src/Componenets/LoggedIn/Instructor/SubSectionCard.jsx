import { useState } from "react"
import cross from "../../../assets/cross.png"
import videoIcon from "../../../assets/video.png"
import { createSubsection, updateSubsection } from "../../../services/ApiInstance";
import { toast } from "react-toastify";

function Card({activeSection ,activeSubsection , setSubsection ,setActive , section , setSections}){


    const [Data ,setData] = useState({title:"" , description:""  , videoFile: null , Hour:"" , Min:"" , Sec:"" });
    const sectionID = section._id;
     const [loading , setLoading] = useState(false);
function buildTimeString(hour, minute, second) {
  const h = Number(hour || 0);
  const m = Number(minute || 0);
  const s = Number(second || 0);

  let parts = [];

  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}min`);
  if (s > 0) parts.push(`${s}sec`);

  return parts.join(" ") || "0sec";
}


async function UpdateSubSection(event) {
   event.preventDefault();
    if(loading)
        return;

    setLoading(true);

  try{
      const Time = buildTimeString(Data.Hour , Data.Min , Data.Sec);
            const payload = {
      ...Data,
      timeDuration:Time,
      subsectionId:activeSubsection
    };

    const result  = await updateSubsection(payload);

    if(result.data.success){
     
      setSections(prev =>
  prev.map(sec =>
    sec._id === sectionID
      ? {
          ...sec,
          subSection: sec.subSection.map(sub =>
            sub._id === activeSubsection
              ? {
                  ...sub,
                  title: result.data.updatedSubSection.title,

                }
              : sub
          ),
        }
      : sec
  )
);
toast.success("Subsection Updated Successfully")
    }
    setSubsection("");
     setActive("");
     setData({title:"" , description:""  , videoFile: null , Hour:"" , Min:"" , Sec:"" });
  }
  catch(error){
      console.log(error);
                   
                   
                     const errorMessage =
                       error?.response?.data?.message || "Something went wrong!";
                   
                     toast.error(errorMessage);
  }
  finally{
    setLoading(false)
    }
  
  
}



function changeHandler(event){
    const{name , value , type, checked } = event.target;
    setData(prev=>{
      return{
        ...prev,
        [name]: type==="checkbox"?checked:value
      }
    })
  }

  function videoHandler(e){
     const file  = e.target.files[0];

    setData(prev => ({
          ...prev,
          videoFile: file
        }));
  }

  async function subsectionCreate(event) {
    event.preventDefault();
    if(loading)
        return;

    setLoading(true);

    try{
        const Time = buildTimeString(Data.Hour , Data.Min , Data.Sec);
            const payload = {
      ...Data,
      timeDuration:Time,
      sectionId:sectionID
    };
        const result = await createSubsection(payload);
        if(result.data.success){
                 setSections(prev =>
        prev.map(sec =>
          sec._id === sectionID
            ? { ...sec, subSection: [...sec.subSection, {_id:result.data.subsection._id,
              title: result.data.subsection.title
            }] }
            : sec
        )
      );

      setActive("");
      setData({title:"" , description:""  , videoFile: null , Hour:"" , Min:"" , Sec:"" });

        }
    }
    catch(error){
            console.log(error);
                   
                   
                     const errorMessage =
                       error?.response?.data?.message || "Something went wrong!";
                   
                     toast.error(errorMessage);
    }
    finally{
    setLoading(false)
    }
  }



    return (
      <div className={`${activeSection === sectionID ? "flex" : "hidden"} fixed inset-0 items-center justify-center z-50 bg-black/70 backdrop-blur-md p-4`}>
        <div className="w-full max-w-md bg-gradient-to-br from-[#0c0a24] to-[#120e36] border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="w-full px-6 py-4 flex justify-between items-center bg-gray-950/40 border-b border-gray-800">
            <h1 className="text-white text-base font-bold">
              {activeSubsection ? "Edit Lecture Details" : "Upload New Lecture"}
            </h1>
            <button
              onClick={() => {
                setActive("");
              }}
              className="text-gray-400 hover:text-white transition duration-200 p-1.5 rounded-full hover:bg-gray-800 cursor-pointer"
            >
              <img className="w-4 h-4 invert" src={cross} alt="close" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 overflow-y-auto max-h-[80vh]">
            <form onSubmit={activeSubsection ? UpdateSubSection : subsectionCreate} className="flex flex-col gap-y-4">
              
              {/* File Dropzone */}
              <div className="flex flex-col gap-y-1.5 items-start w-full">
                <label className="text-xs font-semibold text-gray-400">Lecture Video <span className="text-red-500">*</span></label>
                <input onChange={videoHandler} accept="video/*" type="file" name="videoFile" id={sectionID} hidden />
                <label
                  className="bg-gray-950/50 hover:bg-gray-950/80 rounded-2xl border-2 border-dashed border-gray-800 hover:border-yellow-400/50 px-4 py-6 flex justify-center items-center w-full transition-all duration-300 cursor-pointer"
                  htmlFor={sectionID}
                >
                  {Data.videoFile === null ? (
                    <div className="flex flex-col justify-center gap-y-2 items-center text-center">
                      <img className="invert w-6 h-6 opacity-75" src={videoIcon} alt="video" />
                      <p className="text-xs text-gray-300">
                        Drag & Drop or <span className="text-yellow-400 font-bold">Browse</span> video
                      </p>
                      <h1 className="text-gray-500 text-[10px]">Aspect Ratio - 16:9 • Max 6MB</h1>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-2">
                      <div className="bg-green-500/20 text-green-400 p-2.5 rounded-full mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <p className="text-white text-xs font-bold truncate max-w-[250px]">{Data.videoFile.name}</p>
                      <p className="text-gray-500 text-[10px] mt-0.5">{(Data.videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                      <span className="text-[10px] text-yellow-400 underline mt-2">Change File</span>
                    </div>
                  )}
                </label>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-y-1.5 items-start w-full">
                <label className="text-xs font-semibold text-gray-400" htmlFor="title">Lecture Title <span className="text-red-500">*</span></label>
                <input
                  onChange={changeHandler}
                  className="w-full px-3 py-2 bg-gray-950/40 rounded-xl text-white text-sm border border-gray-800 focus:border-yellow-400 outline-none transition-colors duration-200"
                  type="text"
                  name="title"
                  placeholder="Enter Lecture Title"
                  value={Data.title}
                />
              </div>

              {/* Timing */}
              <div className="flex flex-col gap-y-1.5 w-full items-start">
                <label className="text-xs font-semibold text-gray-400">Video Playback Time (HH:MM:SS) <span className="text-red-500">*</span></label>
                <div className="w-full flex flex-row justify-between gap-x-3">
                  <input
                    onChange={changeHandler}
                    className="px-3 py-2 text-sm rounded-xl text-white bg-gray-950/40 border border-gray-800 focus:border-yellow-400 outline-none w-1/3 text-center transition-colors duration-200"
                    type="number"
                    placeholder="HH"
                    name="Hour"
                    value={Data.Hour}
                  />
                  <input
                    onChange={changeHandler}
                    className="px-3 py-2 text-sm rounded-xl text-white bg-gray-950/40 border border-gray-800 focus:border-yellow-400 outline-none w-1/3 text-center transition-colors duration-200"
                    type="number"
                    placeholder="MM"
                    name="Min"
                    value={Data.Min}
                  />
                  <input
                    onChange={changeHandler}
                    className="px-3 py-2 text-sm rounded-xl text-white bg-gray-950/40 border border-gray-800 focus:border-yellow-400 outline-none w-1/3 text-center transition-colors duration-200"
                    type="number"
                    placeholder="SS"
                    name="Sec"
                    value={Data.Sec}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="w-full flex flex-col gap-y-1.5 items-start">
                <label className="text-xs font-semibold text-gray-400" htmlFor="description">Lecture Description <span className="text-red-500">*</span></label>
                <textarea
                  onChange={changeHandler}
                  name="description"
                  rows={3}
                  className="px-3 py-2 text-sm rounded-xl w-full text-white bg-gray-950/40 border border-gray-800 focus:border-yellow-400 outline-none transition-colors duration-200 resize-none"
                  id="description"
                  placeholder="Enter Description of Video Lecture"
                  value={Data.description}
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-end items-center mt-4 gap-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setActive("");
                  }}
                  className="text-xs font-bold text-gray-400 hover:text-white px-4 py-2.5 rounded-xl bg-gray-950/60 border border-gray-850 hover:bg-gray-900 transition duration-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="text-xs font-bold text-black bg-yellow-400 hover:bg-yellow-300 rounded-xl px-5 py-2.5 cursor-pointer transition duration-300 hover:scale-95 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Lecture"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Card;