import LogoIcon from "@/src/icons/LogoIcon";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="">
      <div className="container">
        {/* <Link> */}
        <LogoIcon />
        {/* </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
