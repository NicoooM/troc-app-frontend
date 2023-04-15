import Chat from "../chat/Chat";
import Footer from "../footer/Footer";
import Header from "../header/Header";

import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store/store";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <>
      {user && user.email && <Chat />}
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
