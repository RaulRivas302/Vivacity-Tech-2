import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks.ts";
import { getPerson } from "../api/ApiService.ts";
import { setPerson } from "../features/person/personSlice.ts";
import profilePic from "../assets/user.png";

const ProfilePic: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false); // To handle loading state

  const handleClick = async () => {
    setIsLoading(true);
    const personData = await getPerson();
    dispatch(setPerson(personData));
    setIsLoading(false);
  };

  return (
    <div>
      <img src={profilePic} alt="Profile" onClick={handleClick} />
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default ProfilePic;
