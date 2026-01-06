import { useMutation, useQueryClient } from "@tanstack/react-query";
import { testDrivePrompt } from "@/api/posts/testDrive";

export const useTestDrivePrompt = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ promtManage, channelId }) => testDrivePrompt({ promtManage, channelId }),

		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(["posts-by-channel", variables.channelId]);
		},
	});
};
