import ChatSkeleton from "@/components/chat-interface/chat-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatPageLoading() {
  const skeletonCount = 8;

  return (
    <div className="w-full h-screen flex justify-center items-start pt-4">
      <div className="grid grid-rows-6 gap-y-4">
        {Array.from({ length: skeletonCount }, (_, index) => (
          <ChatSkeleton key={index} />
        ))}
      </div>
      <div className="fixed bottom-4 left-[10rem] right-0 mx-auto w-full max-w-xl">
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="w-8 h-8 rounded-md" />
          <Skeleton className="h-12 rounded-xl px-4 py-2 md:w-[30rem]" />
        </div>
      </div>
    </div>
  );
}
