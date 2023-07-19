import Link from "next/link";
import { useRouter } from "next/router";
import { isSinglePageActive } from "../../../../utils/daynamicNavigation";
import { signOutUser } from "../../../../utils/auth";

const MyAccount = ({ user }) => {
  const profileMenuItems = [
    { id: 1, name: "My Profile", ruterPath: "/my-profile" },
    { id: 2, name: " My Message", ruterPath: "/my-message" },
    { id: 3, name: " My Favourite", ruterPath: "/my-favourites" },
    { id: 4, name: " My Package", ruterPath: "/my-package" },
  ];
  const route = useRouter();

  const handleSignOut = () => {
    signOutUser()
      .then((res) => route.replace("/"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="user_set_header">
        <img
          className="float-start"
          src={user?.image || "/assets/images/team/e1.png"}
          alt="e1.png"
        />
        <p>
          {user?.name || "sample name"} <br />
          <span className="address">{user?.email || "sample@gmail.com"}</span>
        </p>
      </div>
      {/* End user_set_header */}

      <div className="user_setting_content">
        {profileMenuItems.map((item) => (
          <Link href={item.ruterPath} key={item.id}>
            <a
              className="dropdown-item"
              style={
                isSinglePageActive(`${item.ruterPath}`, route.pathname)
                  ? { color: "#ff5a5f" }
                  : undefined
              }
            >
              {item.name}
            </a>
          </Link>
        ))}
        <a className="dropdown-item cursor-pointer" onClick={handleSignOut}>
          Log Out
        </a>
      </div>
    </>
  );
};

export default MyAccount;
