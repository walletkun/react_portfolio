import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessages";

const MotionDiv = motion.div;

export function ChatWindow({
  input,
  setInput,
  isExpanded,
  setIsExpanded,
  messages,
  isLoading,
  error,
  handleSubmit,
  scrollAreaRef,
  renderMessage,
}) {
  return (
    <MotionDiv
      initial={{ y: "100%" }}
      animate={{ y: isExpanded ? 0 : "calc(100% - 56px)" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed bottom-0 right-0 w-full md:w-96 bg-card shadow-lg rounded-t-lg overflow-hidden z-30"
    >
      <div
        className="p-4 border-b border-border flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-lg font-semibold">Chat with AI Assistant</h2>
        <MessageCircle className="h-6 w-6" />
      </div>
      <AnimatePresence>
        {isExpanded && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-[calc(70vh-56px)]"
          >
            <ScrollArea className="h-full p-4 space-y-4" ref={scrollAreaRef}>
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message}
                  renderMessage={renderMessage}
                />
              ))}
            </ScrollArea>
          </MotionDiv>
        )}
      </AnimatePresence>
      <ChatInput
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        error={error}
        handleSubmit={handleSubmit}
      />
    </MotionDiv>
  );
}
