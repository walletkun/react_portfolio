import React from "react";
import Image from "next/image";

export function ChatLoadingIndicator() {
  return (
    <div className="flex justify-start mt-2">
      <div className="flex items-start space-x-2 max-w-[70%]">
        <div className="p-2 rounded-full object-contain bg-secondary">
           <Image
              src={"/ceo.png"}
              alt="ceo-no-bg"
              width={100}
              height={100}
              className="scale-[2.2] pt-1 transition-transform duration-200 group-hover:scale-[1.5]"
              priority={true}
            />
        </div>
        <div className="rounded-lg p-3 bg-secondary text-secondary-foreground">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        </div>
      </div>
    </div>
  );
}
