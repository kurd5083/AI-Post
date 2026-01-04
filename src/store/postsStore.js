import { create } from "zustand";

const generatePostId = () => Math.floor(Math.random() * 2_000_000_000);

const createEmptyPost = (index = 1) => ({
  postId: generatePostId(),
  serverPostId: null,
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

  setPosts: (updater) =>
    set(state => ({
      posts: typeof updater === "function" ? updater(state.posts) : updater
    })),

  setSelectedPost: (post) => set({ selectedPost: post }),

  addPost: () =>
    set(state => ({
      posts: [createEmptyPost(state.posts.length + 1), ...state.posts],
    })),

  removePost: (postId) =>
    set(state => {
      const filtered = state.posts.filter(p => p.postId !== postId);
      return {
        posts: filtered,
        selectedPost:
          state.selectedPost?.postId === postId ? filtered[0] || null : state.selectedPost,
      };
    }),

  updatePost: (postId, data) =>
    set(state => ({
      posts: state.posts.map(p =>
        p.postId === postId ? { ...p, ...data } : p
      ),
    })),

  addImages: (postId, images) =>
    set(state => ({
      posts: state.posts.map(p =>
        p.postId === postId
          ? { ...p, images: [...(p.images || []), ...images] }
          : p
      ),
    })),

  removeImage: (postId, index) =>
    set(state => ({
      posts: state.posts.map(p =>
        p.postId === postId
          ? { ...p, images: p.images.filter((_, i) => i !== index) }
          : p
      ),
    })),
}));
