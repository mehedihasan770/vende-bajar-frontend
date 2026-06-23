import React from 'react';

const GenerateNewCouponPage = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">Admin Module</span>
          </div>
          <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight">Generate New Coupon</h2>
          <p className="text-[12px] md:text-[13px] text-gray-500 mt-2 font-medium flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            Path: <code className="bg-gray-50 text-primary border border-gray-100 px-1.5 py-0.5 rounded font-mono text-[11px]">admin/coupons/create</code>
          </p>
        </div>
        <div className="shrink-0">
          <div className="px-3 py-1.5 bg-primary/5 text-primary text-[10px] font-black rounded-xl border border-primary/10 uppercase tracking-widest flex items-center gap-2 shadow-xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
            </span>
            Building
          </div>
        </div>
      </div>

      <div className="bg-linear-to-b from-white to-gray-50/50 border border-gray-100 rounded-[2rem] p-8 md:p-16 flex flex-col items-center justify-center text-center shadow-xs relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl"></div>

        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150"></div>
          <div className="relative w-20 h-20 bg-white shadow-xl shadow-primary/10 rounded-[2rem] flex items-center justify-center border border-gray-50">
            <svg className="w-10 h-10 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-black text-gray-900 mb-3 tracking-tight">Generate New Coupon</h3>
        <p className="text-gray-500 max-w-md text-[13px] md:text-sm leading-relaxed font-medium">
          We are currently engineering the <strong>Generate New Coupon</strong> interface. 
          Soon you will have complete control over this module with a high-performance experience.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-primary/30 animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Initializing</span>
        </div>
      </div>
    </div>
  );
}

export default GenerateNewCouponPage;