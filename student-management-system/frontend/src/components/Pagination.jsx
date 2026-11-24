import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ 
  currentPage, 
  totalPages, 
  totalElements, 
  pageSize, 
  onPageChange, 
  onPageSizeChange 
}) {
  if (totalElements === 0) return null;

  const startIdx = currentPage * pageSize + 1;
  const endIdx = Math.min((currentPage + 1) * pageSize, totalElements);

  // Generate page numbers
  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-white border-t border-slate-200/80">
      {/* Left: Summary & Page Size */}
      <div className="flex items-center gap-4 text-xs text-slate-500">
        <span>
          Showing <strong className="font-semibold text-slate-700">{startIdx}</strong> to{' '}
          <strong className="font-semibold text-slate-700">{endIdx}</strong> of{' '}
          <strong className="font-semibold text-slate-700">{totalElements}</strong> students
        </span>

        <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-2 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-slate-50 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* Right: Page Navigation Buttons */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((p) => {
          // Show first, last, and current +/- 1
          if (
            p === 0 || 
            p === totalPages - 1 || 
            Math.abs(p - currentPage) <= 1
          ) {
            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`
                  w-8 h-8 rounded-lg text-xs font-semibold transition-all
                  ${p === currentPage 
                    ? 'bg-indigo-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                  }
                `}
              >
                {p + 1}
              </button>
            );
          } else if (
            p === 1 || 
            p === totalPages - 2
          ) {
            return <span key={p} className="px-1 text-slate-400 text-xs">...</span>;
          }
          return null;
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
