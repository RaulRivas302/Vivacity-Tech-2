import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store.ts";
import { updatePerson } from "../api/ApiService.ts";
import { setPerson } from "../features/person/personSlice.ts";
import { Person } from "../types/Person.ts";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const PersonDetails: React.FC = () => {
  const person = useSelector((state: RootState) => state.person.person);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [editedPerson, setEditedPerson] = useState<Person | null>(null);

  React.useEffect(() => {
    if (person) {
      setEditedPerson({ ...person });
    }
  }, [person]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPerson((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    if (editedPerson && person?.id !== undefined) {
      const updatedPerson = await updatePerson(person.id, editedPerson);
      dispatch(setPerson(updatedPerson));
      setEditing(false);
    }
  };

  if (!person) {
    return null;
  }

  return (
    <div>
      <h1>ID: {person.id}</h1>
      {editing ? (
        <>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue="Small"
            variant="filled"
            size="small"
            name="name"
            value={editedPerson?.name || ""}
            onChange={handleInputChange}
          />
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue="Small"
            variant="filled"
            size="small"
            type="number"
            name="age"
            value={editedPerson?.age || ""}
            onChange={handleInputChange}
          />
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <h2>{person.name}</h2>
          <p>age: {person.age}</p>
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}
    </div>
  );
};

export default PersonDetails;
