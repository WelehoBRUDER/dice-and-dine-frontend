import {useEffect, useState} from "react";
import {useLanguage} from "../../context/LanguageContext";
import useRestaurantInfo from "../../hooks/useRestaurantInfo";
import LoadingWheel from "../../components/LoadingWheel";
import Button from "../../components/Button";
import Input from "../../components/Input";
const About = () => {
  const {lang, setCurrentPage, currentLanguage} = useLanguage();

  const {info, loading, updatePhone, updateEmail, updateOpenTimes} =
    useRestaurantInfo(currentLanguage);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingOpenTimes, setIsEditingOpenTimes] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [openTimes, setOpenTimes] = useState("");

  const handleEditPhone = () => {
    setIsEditingPhone(true);
  };

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };

  const handleEditOpenTimes = () => {
    setIsEditingOpenTimes(true);
  };

  const handleSavePhone = async (phone) => {
    try {
      const data = await updatePhone(phone);
      if (data) {
        setPhone(phone);
        setIsEditingPhone(false);
        info[0].phone = phone;
      }
    } catch (error) {
      console.error("Error updating phone:", error);
      return null;
    }
  };

  const handleSaveEmail = async (email) => {
    try {
      const data = await updateEmail(email);
      if (data) {
        setEmail(email);
        setIsEditingEmail(false);
        info[0].email = email;
      }
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleSaveOpenTimes = async (openTimes) => {
    try {
      const data = await updateOpenTimes(openTimes);
      if (data) {
        setOpenTimes(openTimes);
        setIsEditingOpenTimes(false);
        info[0].open_times = openTimes;
      }
    } catch (error) {
      console.error("Error updating open times:", error);
    }
  };

  useEffect(() => {
    setCurrentPage("editabout_page");

    if (info[0]) {
      setPhone(info[0].phone);
      setEmail(info[0].email);
      setOpenTimes(info[0].open_times);
    }
  }, [info]);

  if (loading) {
    return <LoadingWheel />;
  }

  return (
    <>
      <article>
        <title>{lang("editabout_page.title")}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <div className="flex-column">
        <h1>Edit Restaurant Information</h1>
        <p className="admin-description">
          {lang("editabout_page.description")}
        </p>

        <table className="delete-menu-item-table">
          <thead>
            <tr>
              <th>{lang("editabout_page.phone")}</th>
              <th>{lang("editabout_page.email")}</th>
              <th>{lang("editabout_page.opentimes")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {isEditingPhone ? (
                  <div className="flex-row">
                    <Input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      icon={null}
                      className="admin-input"
                    />
                    <Button
                      className="btn-smaller"
                      onClick={() => handleSavePhone(phone)}
                      title="Save Phone"
                    >
                      💾
                    </Button>
                  </div>
                ) : (
                  <>
                    {info[0].phone}{" "}
                    <Button
                      className="btn-smaller"
                      onClick={handleEditPhone}
                      title="Edit Phone"
                    >
                      ✏️
                    </Button>
                  </>
                )}
              </td>
              <td>
                {isEditingEmail ? (
                  <div className="flex-row">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon={null}
                    />
                    <Button
                      className="btn-smaller"
                      onClick={() => handleSaveEmail(email)}
                      title="Save Email"
                    >
                      💾
                    </Button>
                  </div>
                ) : (
                  <>
                    {info[0].email}{" "}
                    <Button
                      className="btn-smaller"
                      onClick={handleEditEmail}
                      title="Edit Email"
                    >
                      ✏️
                    </Button>
                  </>
                )}
              </td>
              <td>
                {isEditingOpenTimes ? (
                  <div className="flex-row">
                    <Input
                      type="text"
                      value={openTimes}
                      onChange={(e) => setOpenTimes(e.target.value)}
                      icon={null}
                    />
                    <Button
                      className="btn-smaller"
                      onClick={() => handleSaveOpenTimes(openTimes)}
                      title="Save Open Times"
                    >
                      💾
                    </Button>
                  </div>
                ) : (
                  <>
                    {info[0].open_times}{" "}
                    <Button
                      className="btn-smaller"
                      onClick={handleEditOpenTimes}
                      title="Edit Open Times"
                    >
                      ✏️
                    </Button>
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default About;
