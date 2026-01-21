import { create } from "zustand";
import { useNotificationStore } from "@/store/notificationStore";
import { generateSimpleImage } from "@/api/channels/image-generation/generateSimpleImage";
import { generatePost } from "@/api/posts/generatePost";

const generatePostId = () => Math.floor(Math.random() * 2_000_000_000);

const MAX_CHARS = 1024;

const createEmptyPost = (index = 1) => ({
  postId: generatePostId(),
  placeholder: `Пост ${index}`,
  title: "",
  progress: `0 / ${MAX_CHARS}`,
  text: "",
  summary: "",
  time: null,
  images: [],
  url: ""
});

export const usePostsStore = create((set, get) => ({
  posts: [createEmptyPost(1)],
  selectedPost: null,

  postProgress: {},
  imageProgress: {},
  channelMap: {},

  setPostProgress: (postId, value) =>
    set((state) => ({ postProgress: { ...state.postProgress, [postId]: value } })),
  setImageProgress: (postId, value) =>
    set((state) => ({ imageProgress: { ...state.imageProgress, [postId]: value } })),
  resetPostProgress: (postId) =>
    set((state) => {
      const next = { ...state.postProgress };
      delete next[postId];
      return { postProgress: next };
    }),
  resetImageProgress: (postId) =>
    set((state) => {
      const next = { ...state.imageProgress };
      delete next[postId];
      return { imageProgress: next };
    }),
  setPosts: (updater) =>
    set((state) => ({ posts: typeof updater === "function" ? updater(state.posts) : updater })),
  setSelectedPost: (post) => set({ selectedPost: post }),
  addPost: (post) =>
    set((state) => {
      const newPost = post || createEmptyPost(state.posts.length + 1);
      return {
        posts: [newPost, ...state.posts],
        channelMap: { ...state.channelMap, [newPost.postId]: null },
      };
    }),
  removePost: (postId) =>
    set((state) => {
      const filtered = state.posts.filter((p) => p.postId !== postId);
      const nextChannelMap = { ...state.channelMap };
      delete nextChannelMap[postId];

      return {
        posts: filtered,
        channelMap: nextChannelMap,
        selectedPost: state.selectedPost?.postId === postId ? filtered[0] || null : state.selectedPost,
      };
    }),
  updatePost: (postId, data) =>
    set((state) => ({
      posts: state.posts.map((p) => {
        if (p.postId !== postId) return p;

        const merged = { ...p, ...data };

        if (merged.text != null) {
          const clean = merged.text.replace(/<[^>]*>/g, "");
          const sliced = clean.slice(0, MAX_CHARS);
          if (clean.length > MAX_CHARS) {
            merged.text = sliced;
            merged.summary = sliced;
          }
          merged.progress = `${sliced.length} / ${MAX_CHARS}`;
        }

        return merged;
      }),
    })),

  addImages: (postId, images) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.postId === postId ? { ...p, images: [...(p.images || []), ...images] } : p
      ),
    })),
  removeImage: (postId, index) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.postId === postId ? { ...p, images: p.images.filter((_, i) => i !== index) } : p
      ),
    })),
  setPostChannel: (postId, channelId) =>
    set((state) => ({ channelMap: { ...state.channelMap, [postId]: channelId } })),
  getPostChannel: (postId) => get().channelMap[postId] || null,

  setPostTime: (postId, time) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.postId === postId ? { ...p, time } : p
      ),
    })),

  getPostTime: (postId) => {
    const post = get().posts.find((p) => p.postId === postId);
    return post?.time || "00:00";
  },

  generatePostWithAI: async (postId, channelId) => {
    const notify = useNotificationStore.getState().addNotification;
    const post = get().posts.find((p) => p.postId === postId);
    if (!post) return notify("Пост не найден", "error");
    if (!channelId) return notify("Выберите канал", "info");

    get().setPostProgress(postId, 0);
    const interval = setInterval(() => {
      const current = get().postProgress[postId] ?? 0;
      get().setPostProgress(postId, Math.min(current + Math.floor(Math.random() * 10), 90));
    }, 500);

    try {
      const data = await generatePost(channelId);

      clearInterval(interval);

      get().setPostProgress(postId, 100);
      get().updatePost(postId, {
        title: data.title || "",
        text: data.summary || "",
        summary: data.summary || "",
        url: data.url || "",
        images: data.images || [],
      });
      setTimeout(() => get().resetPostProgress(postId), 1000);
      notify(data?.message || "Пост сгенерирован успешно", data?.error ? "error" : "success");
    } catch (err) {
      clearInterval(interval);
      get().setPostProgress(postId, 0);
      get().resetPostProgress(postId);
      notify(err?.message || "Ошибка генерации поста", "error");
    }
  },

  generateImageWithAI: async (postId, prompt) => {
    const notify = useNotificationStore.getState().addNotification;
    const post = get().posts.find((p) => p.postId === postId);
    if (!post) return;
    if (!prompt) return notify("Для генерации изображения нужен текст", "info");

    get().setImageProgress(postId, 0);
    const interval = setInterval(() => {
      const current = get().imageProgress[postId] ?? 0;
      get().setImageProgress(postId, Math.min(current + Math.floor(Math.random() * 10), 90));
    }, 500);

    try {
      const data = await generateSimpleImage(prompt);
      if (!data?.imageUrls?.length) return notify("Не удалось получить изображение", "error");

      clearInterval(interval);
      
      get().setImageProgress(postId, 100);
      setTimeout(() => get().resetImageProgress(postId), 1000);
      get().updatePost(postId, { images: [...(post.images || []), data.imageUrls[0]] });
      notify("Изображение успешно сгенерировано", "success");
    } catch (err) {
      clearInterval(interval);
      get().setImageProgress(postId, 0);
      notify(err.message || "Ошибка генерации изображения", "error");
    }
  },
}));
