import { create } from "zustand";

const generatePostId = () => Math.floor(Math.random() * 2_000_000_000);

const createEmptyPost = (index = 1) => ({
  postId: generatePostId(),
  placeholder: `Пост ${index}`,
  title: "",
  progress: "0 / 1024",
  text: "",
  summary: "",
  time: "00:00",
  images: [],
});

export const usePostsStore = create((set, get) => ({
  posts: [createEmptyPost(1)],
  selectedPost: null,

  postProgress: {},
  imageProgress: {},
  channelMap: {},

  setPostProgress: (postId, value) =>
    set((state) => ({
      postProgress: { ...state.postProgress, [postId]: value },
    })),

  setImageProgress: (postId, value) =>
    set((state) => ({
      imageProgress: { ...state.imageProgress, [postId]: value },
    })),

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
    set((state) => ({
      posts: typeof updater === "function" ? updater(state.posts) : updater,
    })),

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
        selectedPost:
          state.selectedPost?.postId === postId ? filtered[0] || null : state.selectedPost,
      };
    }),

  updatePost: (postId, data) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.postId === postId ? { ...p, ...data } : p)),
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
        p.postId === postId
          ? { ...p, images: p.images.filter((_, i) => i !== index) }
          : p
      ),
    })),

  setPostChannel: (postId, channelId) =>
    set((state) => ({
      channelMap: { ...state.channelMap, [postId]: channelId },
    })),

  getPostChannel: (postId) => get().channelMap[postId] || null,
}));
