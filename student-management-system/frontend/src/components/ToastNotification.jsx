import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

export default function ToastNotification({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-slide-up bg-white/95 text-slate-800 border-slate-200">
      {isSuccess && (
        <div className="p-1 rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      )}
      {isError && (
        <div className="p-1 rounded-full bg-rose-100 text-rose-600">
          <AlertCircle className="w-5 h-5" />
        </div>
      )}
      {!isSuccess && !isError && (
        <div className="p-1 rounded-full bg-blue-100 text-blue-600">
          <Info className="w-5 h-5" />
        </div>
      )}

      <div className="text-sm font-medium pr-2">
        {toast.message}
      </div>

      <button
        onClick={onClose}
        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
