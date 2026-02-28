const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal Panel */}
      <div className="relative bg-white w-full max-w-3xl mx-4 rounded-lg shadow-lg border border-slate-200">
        {children}
      </div>
    </div>
  );
};

export default Modal;
