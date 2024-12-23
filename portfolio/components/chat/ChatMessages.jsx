import Image from "next/image";
import { TypewriterText } from "./TypewriterText";

export function ChatMessages({ message, setSelectedProject }) {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex items-start space-x-2 max-w-[70%] ${
          message.role === "user" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`p-2 rounded-full ${
            message.role === "user" ? "bg-primary" : "bg-secondary"
          } flex items-center justify-center overflow-hidden`}
        >
          {message.role === "user" ? (
            "👤"
          ) : (
            <Image
              src="/ceo.png"
              alt="ceo-no-bg"
              width={48}
              height={48}
              className="object-contain scale-[1.2] pt-1 transition-transform duration-200 group-hover:scale-[1.3]"
              quality={100}
              sizes="(max-width: 48px) 100vw, 48px"
              style={{
                objectFit: "cover",
                transform: "translateZ(0)",
              }}
              priority
            />
          )}
        </div>
        <div
          className={`rounded-lg p-3 ${
            message.role === "user"
              ? "bg-primary text-primary-foreground font-sans"
              : "bg-secondary text-secondary-foreground font-sans"
          }`}
        >
          {message.role === "assistant" ? (
            <TypewriterText
              content={message.content}
              onProjectClick={setSelectedProject}
            />
          ) : (
            <div className="whitespace-pre-wrap">{message.content}</div>
          )}
        </div>
      </div>
    </div>
  );
}
