import { useMutation } from "@tanstack/react-query";
import { testDrivePrompt } from "@/api/posts/testDrive";

export const useTestDrivePrompt = () => {
  return useMutation({
    mutationFn: testDrivePrompt,
  });
};