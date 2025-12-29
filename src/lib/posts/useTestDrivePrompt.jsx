import { useMutation, useQueryClient } from "@tanstack/react-query";
import { testDrivePrompt } from "@/api/posts/testDrive";

export const useTestDrivePrompt = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ topic, promtManage, channelId }) => testDrivePrompt({ topic, promtManage, channelId }),

		onSuccess: (data, variables) => {
			console.log("Test-drive успешно выполнен:", data);
			queryClient.invalidateQueries(["posts-by-channel", variables.channelId]);
		},
	});
};
