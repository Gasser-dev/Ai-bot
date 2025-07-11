import { Navbar } from "@/components/Navbar"
import { PromptInputWithActions } from "@/components/PromptInputWithActions"
import TextContainer from "@/components/TextContainer"
import type { RootState } from "@/redux"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import { ChatBubbleVariants } from "../ChatBubbleLayout"
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "../ui/chat-bubble"
import { rdx_login } from "@/redux/userSlice"

function Home() {
    const non_visible = useAppSelector((state: RootState) => state.submitPrompt.hide_text)
    const messages = useAppSelector((state: RootState) => state.submitPrompt.message)
    const res = useAppSelector((state: RootState) => state.submitPrompt.isloading)
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null);
    const handleRefresh = () => {
      if (localStorage.user) {
          dispatch(rdx_login(true))
      }
    };
    handleRefresh()
    useEffect(() => {
        gsap.fromTo("#Input", {
            opacity: 0,
            y: 100
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
        })
    }, [])
    useEffect(() => {
        setIsLoading(res)
    }, [res])
    useEffect(() => {
      if (messagesEndRef.current) {
        (messagesEndRef.current as unknown as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      }
    }, [ChatBubbleVariants]);




    return (
<div className="min-h-screen max-h-screen bg-[#15042e] px-2 overflow-hidden flex flex-col">
  <Navbar />
  {!non_visible && <TextContainer />}
  
  {/* Main content area */}
  <div className="flex-1 flex flex-col max-h-full gap-3 items-center justify-end-safe w-full">
    {/* Scrollable chat container */}
    <div className="flex-1 w-full min-h-0 items-end flex justify-center">
{
non_visible &&
<div className="md:w-2/3 w-full flex flex-col overflow-y-auto scrollbar-hide h-[calc(100vh-19rem)] md:h-[calc(100vh-18rem)]">
      <ChatBubble variant="sent">
          <ChatBubbleAvatar fallback="US" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop" />
          <ChatBubbleMessage variant="sent">
            {messages}
          </ChatBubbleMessage>
        </ChatBubble>
        {
            isLoading
            ?
            <ChatBubble variant="received">
            <ChatBubbleAvatar fallback="AI" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop" />
            <ChatBubbleMessage isLoading={isLoading} />
          </ChatBubble>
            :
            <ChatBubble variant="received">
            <ChatBubbleAvatar fallback="AI" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"  />
            <ChatBubbleMessage>
              {
                !isLoading && "Sure, I'd be happy to help!"
              }
            </ChatBubbleMessage>
          </ChatBubble>
        }
        <div ref={messagesEndRef} />
      </div>}
    </div>
    
    {/* Fixed input section */}
    <div id="Input" className="md:w-2/3 w-full h-full flex justify-center items-end pb-4">
      <PromptInputWithActions />
    </div>
  </div>
</div>
    )
}

export default Home