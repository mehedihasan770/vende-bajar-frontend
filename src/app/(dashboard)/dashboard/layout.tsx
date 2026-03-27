import Navbar from "@/components/shared/dashboard/Navbar";

const DashboardRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Navbar/>
      {children}
    </section>
  );
};

export default DashboardRootLayout;