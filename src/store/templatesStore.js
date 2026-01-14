import { create } from "zustand";

export const useTemplatesStore = create((set, get) => ({
  templates: [],
  activeFilter: "all",
  categories: [],
  editingTemplate: null,

  setTemplates: (templates) => set({ templates }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setCategories: (categories) => set({ categories }),
  setEditingTemplate: (template) => set({ editingTemplate: template }),
  clearEditingTemplate: () => set({ editingTemplate: null }),

  addTemplate: (template) => set({ templates: [template, ...get().templates] }),

  updateTemplate: (updated) =>
    set({
      templates: get().templates.map((t) =>
        t.id === updated.id ? { ...updated } : t
      ),
    }),

  removeTemplate: (id) =>
    set({ templates: get().templates.filter((t) => t.id !== id) }),
}));