import { ReactNode } from "react";

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return <div className="h-full flex items-center justify-center">{children}</div>;
};

export default LoginLayout;
