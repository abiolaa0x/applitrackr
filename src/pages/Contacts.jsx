import AppLayout from "../components/layouts/AppLayout";

const Contacts = () => {
  return (
    <AppLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <span className="text-2xl">👥</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Contacts
          </h1>

          {/* Subtitle */}
          <p className="text-slate-500 text-base leading-relaxed mb-6">
            Manage recruiters, hiring managers, and networking contacts
            connected to your applications.
          </p>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
            🚀 Coming Soon
          </div>

          {/* Optional subtle hint */}
          <p className="text-xs text-slate-400 mt-6">
            This feature will allow you to track conversations,
            emails, and relationships in one place.
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Contacts;