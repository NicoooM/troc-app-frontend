import {
  getTokenFromCookie,
  removeAuthorization,
} from "@/src/utils/authorizations";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "@/src/redux/slices/userSlice";
import { useEffect } from "react";
import { getMe } from "@/src/services/user.service";
import { RootState } from "@/src/redux/store/store";
import { useRouter } from "next/router";

type Props = {
  needAuth?: boolean;
  children: React.ReactNode;
};

const ProfileLayout = ({ needAuth, children }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (!user || !user.id) {
      const token = getTokenFromCookie();
      if (!token && needAuth) {
        router.push("/compte/connexion");
      }
      if (token) {
        getMe()
          .then((user) => {
            dispatch(setUser(user));
          })
          .catch(() => {
            removeAuthorization();
            dispatch(clearUser());
            if (needAuth) {
              router.push("/compte/connexion");
            }
          });
      }
    }
  }, []);

  return <>{children}</>;
};

export default ProfileLayout;
