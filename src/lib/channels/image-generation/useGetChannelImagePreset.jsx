import { useQuery } from '@tanstack/react-query';
import { getChannelImagePreset } from '@/api/channels/image-generation/getChannelImagePreset';

export const useGetChannelImagePreset = (channelId) => {
  const { data: imageChannelPreset } = useQuery({
    queryKey: ['channel-image-preset', channelId],
    queryFn: () => getChannelImagePreset(channelId),
    enabled: !!channelId,
  });

  return { imageChannelPreset };
};