import Image from "next/image";


export function ChatMessages({ message, renderMessage }) {
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
          }`}
        >
          {message.role === "user" ? (
            "👤"
          ) : (
            <Image
              src={"/ceo.png"}
              alt="ceo-no-bg"
              width={100}
              height={100}
              className="scale-[2.2] pt-1 transition-transform duration-200 group-hover:scale-[1.5]"
              priority={true}
            />
          )}
        </div>
        <div
          className={`rounded-lg p-3 ${
            message.role === "user"
              ? "bg-primary text-primary-foreground font-sans "
              : "bg-secondary text-secondary-foreground font-sans"
          }`}
        >
          {renderMessage(message)}
        </div>
      </div>
    </div>
  );
}
