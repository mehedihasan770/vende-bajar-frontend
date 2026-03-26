const DashboardRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased">
      {children}
    </section>
  );
};

export default DashboardRootLayout;