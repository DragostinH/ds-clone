import { useParams } from "next/navigation";
import { useMemo } from "react";

const useChannels = () => {
  const params = useParams();

  const channelId = useMemo(() => {
    if (!params?.channelId) {
      return "";
    }

    return params.channelId as string;
  }, [params?.channelId]);

  const isOpen = useMemo(() => !!channelId, [channelId]);

  return useMemo(() => {
    return {
      channelId,
      isOpen,
    };
  }, [channelId, isOpen]);
};


export default useChannels
