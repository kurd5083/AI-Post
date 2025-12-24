import { useQuery } from '@tanstack/react-query';
import { getChannelImagePreset } from '@/api/channels/image-generation/getChannelImagePreset';

export const useChannelImagePreset = (channelId) => {
  const { data: imageChannelPresets } = useQuery({
    queryKey: ['channel-image-preset', channelId],
    queryFn: () => getChannelImagePreset(channelId),
    enabled: !!channelId,
  });

  return { imageChannelPresets };
};