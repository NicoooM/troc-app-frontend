import ProfilLayout from "@/src/account/components/profil-layout/ProfilLayout";
import LogoIcon from "@/src/app/icons/LogoIcon";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useEffect } from "react";
import { setUser } from "@/src/redux/slices/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);

  return (
    <ProfilLayout>
      <nav className="">
        <div className="container">
          <LogoIcon />
        </div>
      </nav>
    </ProfilLayout>
  );
};

export default Header;
