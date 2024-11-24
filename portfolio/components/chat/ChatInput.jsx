import {Button} from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { ChatLoadingIndicator } from "@/components/chat/ChatLoadingIndicator";



export function ChatInput({ input, setInput, isLoading, error, handleSubmit }) {
  return (
    <div className="p-4 border-t border-border">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about projects, education, interests, or 'about me'..."
          className="flex-grow"
          disabled={isLoading}
        />
        <Button type="submit" size="icon">
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      {isLoading && <ChatLoadingIndicator />}
    </div>
  );
}
