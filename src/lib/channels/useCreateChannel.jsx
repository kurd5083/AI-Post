import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChannel } from "@/api/channels/createChannel";

export const useCreateChannel = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (channelData) => createChannel(channelData),
		onSuccess: (data) => {
			queryClient.invalidateQueries(["channelsGroupedByFolders"]);
			console.log("Канал успешно создан:", data);
		},
		onError: (error) => {
			console.error("Ошибка создания канала:", error.message);
		},
	});
};
