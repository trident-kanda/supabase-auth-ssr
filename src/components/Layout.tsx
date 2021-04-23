import { ReactNode, VFC } from "react";

const Layout: VFC<{ children: ReactNode }> = (props) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
