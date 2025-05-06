import {useState, useEffect} from "react";
import useUserData from "../../hooks/useUserData";
import ProfilePicture from "../ProfilePicture";

export const ForumUserInfo = ({item}) => {
  const [user, setUser] = useState(null);
  const {getUserById} = useUserData();

  const updateUserInfo = async () => {
    const _user = await getUserById(item.by_user_id);
    if (_user) {
      setUser(_user);
    }
  };

  useEffect(() => {
    if (!user) {
      updateUserInfo();
    }
  }, [item]);
  return (
    <>
      {user && (
        <div className="user-info flex-row">
          <ProfilePicture
            imageUrl={user?.profile_image}
            altText={user?.name}
            className="profile-pic"
          />
          <div className="user-name flex-column">
            <p>{user?.name}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ForumUserInfo;
