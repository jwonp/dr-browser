import Header from "@/components/Header/Header";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <nav></nav>
      {children}
    </section>
  );
};

export default LoginLayout;
