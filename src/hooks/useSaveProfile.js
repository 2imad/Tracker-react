import { useContext } from "react";
import { Context as ProfileContext } from "../context/ProfileContext";
import { navigate } from "../navigationRef";
export default () => {
  const {
    state: { name },
    submitProfileName
  } = useContext(ProfileContext);

  const saveProfile = async () => {
    await submitProfileName(name);
    navigate("TrackList");
  };
  return [saveProfile];
};
