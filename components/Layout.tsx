type Props = {
  title: string;
  children: React.ReactNode;
};

const Layout = ({ title, children }: Props) => {
  return <div className="layout">{children}</div>;
};

export default Layout;
