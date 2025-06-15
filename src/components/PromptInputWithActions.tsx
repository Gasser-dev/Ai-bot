"use client"

import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input"
import { Button } from "@/components/ui/button"
import { ArrowUp, Paperclip, Square, X } from "lucide-react"
import { useRef, useState, type FormEvent } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { submit_hide_text, set_message, set_Loading } from "@/redux/submitPromptSlice"
import type { RootState } from "@/redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export function PromptInputWithActions() {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const uploadInputRef = useRef<HTMLInputElement>(null)
  const isloggedIn = useAppSelector((state: RootState) => state.userSlice.loggedIn)
  const navigate = useNavigate()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
  if ( files.length === 0 && isloggedIn === false) {
    navigate("/login");
    return;
  }

  try {
    // Start loading state
    setIsLoading(true);
    dispatch(submit_hide_text(true));
    dispatch(set_message(input));
    dispatch(set_Loading(true));

    // Simulate async operation (replace with actual API call if needed)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form and loading states
    setInput("");
    setFiles([]);
  } catch (error) {
    console.error("Submission error:", error);
    toast.error("Failed to submit");
  } finally {
    // Ensure loading states are always reset
    setIsLoading(false);
    dispatch(set_Loading(false));
  }
};

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    if (uploadInputRef?.current) {
      uploadInputRef.current.value = ""
    }
  }

  const dispatch = useAppDispatch()

  return (
    <PromptInput
      value={input}
      onValueChange={setInput}
      isLoading={isLoading}
      className="w-full max-w-full h-24 md:h-32 bg-[#724fa1] border-0"
    >
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="bg-secondary flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
            >
              <Paperclip className="size-4" />
              <span className="max-w-[120px] truncate">{file.name}</span>
              <button
                onClick={() => handleRemoveFile(index)}
                className="hover:bg-secondary/50 rounded-full p-1"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <PromptInputTextarea placeholder="Ask me anything..." />

      <PromptInputActions className="flex items-center justify-between gap-2 pt-2">
        <PromptInputAction tooltip="Attach files">
          <label
            htmlFor="file-upload"
            className="hover:bg-secondary-foreground/10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-2xl"
          >
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <Paperclip className="text-primary size-5" />
          </label>
        </PromptInputAction>

        <PromptInputAction
          tooltip={isLoading ? "Stop generation" : "Send message"}
        >
          <Button
            variant="default"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <Square className="size-5 fill-current" />
            ) : (
              <ArrowUp className="size-5" />
            )}
          </Button>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
  )
}
