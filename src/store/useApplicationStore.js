import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useApplicationStore = create(
  persist(
    (set, get) => ({
      applications: [],

      // create application
      addApplication: (application) =>
        set((state) => ({
          applications: [
            ...state.applications,
            {
              id: uuidv4(),
              company: application.company,
              role: application.role,
              status: application.status,
              appliedDate: application.appliedDate,
              jobType: application.jobType || "full-time",
              jobUrl: application.jobUrl || "",
              updates: [],
            },
          ],
        })),

      // update application
      updateApplication: (id, updatedFields) =>
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, ...updatedFields } : app,
          ),
        })),

      // delete application
      deleteApplication: (id) =>
        set((state) => ({
          applications: state.applications.filter((app) => app.id !== id),
        })),

      // get single application
      getApplicationById: (id) =>
        get().applications.find((app) => app.id === id),

      // add update (activity log entry)
      addUpdate: (applicationId, text) =>
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === applicationId ?
              {
                ...app,
                updates: [
                  {
                    id: uuidv4(),
                    text,
                    createdAt: new Date().toISOString(),
                  },
                  ...app.updates, // newest first
                ],
              }
            : app,
          ),
        })),
    }),
    {
      name: "job-applications-storage",
    },
  ),
);
