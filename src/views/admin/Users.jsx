import {useState, useEffect, use} from "react";
import {useUser} from "../../hooks/userHooks";
import Button from "../../components/Button";
import {useLanguage} from "../../context/LanguageContext";

const Users = () => {
  const {getAllUsers} = useUser();
  const [users, setUsers] = useState([]);
  const {lang, setCurrentPage} = useLanguage();

  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      if (!users) {
        console.error("No users found");
        return;
      }
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (userId) => {
    console.log(
      "So you want to delete user with ID:" + userId + "? Not happening."
    );
  };

  const handleEdit = async (userId) => {
    console.log(
      "So you want to edit user with ID:" + userId + "? Not happening."
    );
  };

  useEffect(() => {
    fetchUsers();
    setCurrentPage("users_page");
  }, []);

  return (
    <>
      <article>
        <title>{lang("users_page.title")}</title>
        <meta name="description" content={lang("users_page.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <div className="flex-column">
        <h1>{lang("users_page.title")}</h1>
        <p>
          <strong>
            🚧 Project deadline hit before this feature did. Coming soon --- or
            not!
          </strong>
        </p>

        <p>{lang("users_page.description")}</p>

        <table>
          <thead>
            <tr>
              <th>{lang("users_page.id")}</th>
              <th>{lang("users_page.username")}</th>
              <th>{lang("users_page.email")}</th>
              <th>{lang("users_page.user_type")}</th>
              <th>{lang("users_page.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" style={{textAlign: "center", padding: "1rem"}}>
                  {lang("users_page.nousers")}
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.user_type}</td>
                  <td>
                    <Button
                      className="btn-smaller"
                      onClick={() => handleEdit(user.id)}
                      title="Edit"
                    >
                      ✏️
                    </Button>{" "}
                    <Button
                      className="btn-smaller"
                      onClick={() => handleDelete(user.id)}
                      title="Delete"
                    >
                      🗑️
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
