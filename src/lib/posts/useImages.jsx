export const useImages = (postsStore, addNotification, addImagesToPost) => {
  const handleAddImages = (postId, files) => {
    const post = postsStore.posts.find(p => p.postId === postId);
    if (!post) return;
    const fileArray = Array.from(files);
    postsStore.addImages(postId, fileArray);

    if (post.serverId) {
      addImagesToPost({ postId: post.serverId, images: fileArray }, {
        onSuccess: () => addNotification("Изображения успешно загружены на сервер", "success"),
        onError: (err) => addNotification(err.message || "Ошибка загрузки изображений на сервер", "error"),
      });
    }
  };

  return { handleAddImages };
};
