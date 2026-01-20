import { useState } from "react";
import { useCreatePost } from "@/lib/posts/useCreatePost";
import { useUpdatePost } from "@/lib/posts/useUpdatePost";
import { useSendPostToChannel } from "@/lib/posts/useSendPostToChannel";
import { useAddPostImages } from "@/lib/posts/useAddPostImages";
import { useNotificationStore } from "@/store/notificationStore";
import { usePostsStore } from "@/store/postsStore";

export const usePostActions = () => {
  const { addNotification } = useNotificationStore();
  const { posts, removePost, updatePost, addImages } = usePostsStore();

  const [savingPosts, setSavingPosts] = useState({});
  const [publishingPosts, setPublishingPosts] = useState({});

  const { mutate: createPostMutation } = useCreatePost();
  const { mutate: updatePostMutation } = useUpdatePost();
  const { mutate: sendPost } = useSendPostToChannel();
  const { mutate: addImagesToPost } = useAddPostImages();

  const savePost = (post, channelId) => {
    if (!post.title || !post.summary) {
      return addNotification("Пост должен иметь заголовок и текст", "info");
    }

    setSavingPosts(prev => ({ ...prev, [post.postId]: true }));

    const payload = {
      title: post.title,
      text: post.text,
      summary: post.summary,
      images: post.images.filter(img => typeof img === "string"),
      channelId,
      publishedAt: new Date().toISOString(),
    };

    const handleSettled = () =>
      setSavingPosts(prev => ({ ...prev, [post.postId]: false }));

    if (!post.serverId) {
      createPostMutation(payload, {
        onSuccess: (createdPost) => {
          const localFiles = post.images.filter(img => img instanceof File);
          if (localFiles.length) {
            addImagesToPost({ postId: createdPost.id, images: localFiles });
          }
          removePost(post.postId);
          addNotification("Пост успешно сохранен", "success");
        },
        onError: (err) => addNotification(err.message || "Ошибка сохранения поста", "error"),
        onSettled: handleSettled,
      });
    } else {
      updatePostMutation({ postId: post.serverId, postData: payload }, {
        onSuccess: () => {
          removePost(post.postId);
          addNotification("Пост успешно обновлен", "update");
        },
        onError: (err) => addNotification(err.message || "Ошибка обновления поста", "error"),
        onSettled: handleSettled,
      });
    }
  };

  const publishPost = (post, channelId, telegramId) => {
    if (!post.summary) return addNotification("Нельзя публиковать пустой пост", "info");

    setPublishingPosts(prev => ({ ...prev, [post.postId]: true }));

    const publish = (serverPostId) => {
      sendPost({ postId: serverPostId, channelId, channelTelegramId: telegramId }, {
        onSuccess: () => {
          removePost(post.postId);
          addNotification("Пост успешно опубликован", "success");
        },
        onError: (err) => addNotification(err.message || "Ошибка публикации поста", "error"),
        onSettled: () =>
          setPublishingPosts(prev => ({ ...prev, [post.postId]: false })),
      });
    };

    if (!post.serverId) {
      savePost(post, channelId);
    } else {
      publish(post.serverId);
    }
  };

  return {
    savingPosts,
    publishingPosts,
    savePost,
    publishPost,
    addImages,
    updatePost,
  };
};
