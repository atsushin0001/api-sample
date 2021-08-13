type Props = {
  title: string;
  children: React.ReactNode;
};

const Layout = ({ title, children }: Props) => {
  return <div>{children}</div>;
};

export default Layout;
