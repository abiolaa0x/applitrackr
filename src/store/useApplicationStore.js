import { create } from "zustand";
import {v4 as uuidv4} from "uuid"

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem("applications");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const saveToStorage = (applications) => {
  localStorage.setItem("applications", JSON.stringify(applications));
};

export const useApplicationStore = create((set, get) => ({
  applications: loadFromStorage(),

  addApplication: (data) => {
    const newApplication = {
      id: uuidv4(),
      role: data.role,
      company: data.company,
      appliedDate: data.appliedDate,
      link: data.link || "",
      status: data.status || "applied",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedApps = [...get().applications, newApplication];

    saveToStorage(updatedApps);

    set({ applications: updatedApps });
  },

  updateApplication: (id, updates) => {
    const updatedApps = get().applications.map((app) =>
      app.id === id ?
        {
          ...app,
          ...updates,
          updatedAt: new Date().toISOString(),
        }
      : app,
    );

    saveToStorage(updatedApps);

    set({ applications: updatedApps });
  },

  deleteApplication: (id) => {
    const updatedApps = get().applications.filter((app) => app.id !== id);

    saveToStorage(updatedApps);

    set({ applications: updatedApps });
  },

  getApplicationById: (id) => {
    return get().applications.find((app) => app.id === id);
  },

}));
