import { Navbar } from "@/components/Navbar"
import { PromptInputWithActions } from "@/components/PromptInputWithActions"
import TextContainer from "@/components/TextContainer"
import gsap from "gsap"
import { useEffect } from "react"

function Home() {
    useEffect(() => {
        gsap.fromTo("#Input",{
            opacity:0,
            y:100
        },{
            opacity:1,
            y:0,
            duration:1,
        })
    })
    return (
        <div className="min-h-screen bg-[#15042e] px-2 overflow-hidden">
            <Navbar/>
            <TextContainer />
            <div className="flex justify-center min-h-[80vh] items-end">
   
                <div id="Input" className="md:w-2/3 w-full h-fit flex justify-center items-end ">
            <PromptInputWithActions />
                </div>
            </div>

        </div>
    )
}

export default Home