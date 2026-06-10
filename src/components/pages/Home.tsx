import { Navbar } from "@/components/Navbar"
import { PromptInputWithActions } from "@/components/PromptInputWithActions"
import TextContainer from "@/components/TextContainer"
import type { RootState } from "@/redux"
import { useAppSelector } from "@/redux/hooks"
import gsap from "gsap"
import { memo, useEffect, useRef, useState } from "react"
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "../ui/chat-bubble"

interface ChatMessage {
  role: 'user' | 'bot'
  text: string
}

const ChatMessageItem = memo(({ message, isLoading }: { 
  message: ChatMessage
  isLoading: boolean 
}) => {
  if (message.role === 'user') {
    return (
      <ChatBubble variant="sent">
        <ChatBubbleAvatar fallback="US" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop" />
        <ChatBubbleMessage variant="sent">
          {message.text}
        </ChatBubbleMessage>
      </ChatBubble>
    )
  }

  if (message.role === 'bot') {
    if (isLoading && message.text === '') {
      return (
        <ChatBubble variant="received">
          <ChatBubbleAvatar fallback="AI" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop" />
          <ChatBubbleMessage isLoading={true} />
        </ChatBubble>
      )
    }

    return (
      <ChatBubble variant="received">
        <ChatBubbleAvatar fallback="AI" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop" />
        <ChatBubbleMessage className="max-w-2/3">
          {message.text}
        </ChatBubbleMessage>
      </ChatBubble>
    )
  }

  return null
})

ChatMessageItem.displayName = 'ChatMessageItem'

function Home() {
  const res = useAppSelector((state: RootState) => state.submitPrompt.isloading)
  const chatHistory = useAppSelector((state: RootState) => state.submitPrompt.chatHistory) as ChatMessage[]
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

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
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatHistory.length])

  return (
    <div className="min-h-screen max-h-screen bg-[#15042e] px-2 overflow-hidden flex flex-col">
      <Navbar />
      {chatHistory.length === 0 && <TextContainer />}
      
      <div className="flex-1 flex flex-col max-h-full gap-3 items-center justify-end-safe w-full">
        <div className="flex-1 w-full md:p-10 md:pb-0 md:pt-0">
          {chatHistory.length > 0 &&
            <div className="w-full p-4 flex flex-col overflow-y-auto scrollbar-hide h-[calc(100vh-19rem)] md:h-[calc(100vh-21rem)]">

              {chatHistory.map((message, index) => (
                <ChatMessageItem 
                  key={`${message.role}-${index}-${message.text?.slice(0, 20)}`}
                  message={message} 
                  isLoading={isLoading && index === chatHistory.length - 1 && message.role === 'bot'}
                />
              ))}
                            {isLoading &&
              <ChatBubble variant="received">
          <ChatBubbleAvatar fallback="AI" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop" />
          <ChatBubbleMessage isLoading={true} />
        </ChatBubble>
        }
              <div ref={messagesEndRef} />
            </div>
          }
        </div>
        
        <div id="Input" className="md:w-2/3 w-full h-full flex justify-center items-end pb-4">
          <PromptInputWithActions />
        </div>
      </div>
    </div>
  )
}

export default Home