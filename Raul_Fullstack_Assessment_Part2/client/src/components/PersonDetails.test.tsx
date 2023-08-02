import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import PersonDetails from "../components/PersonDetails";
import { updatePerson } from "../api/ApiService";
import { setPerson } from "../features/person/personSlice";

const mockStore = configureMockStore();

jest.mock("../api/ApiService");

describe("PersonDetails Component", () => {
  test("should render person details and handle editing", () => {
    const person = {
      id: 1,
      name: "John Doe",
      age: 30,
    };

    const store = mockStore({
      person: {
        person: person,
      },
    });

    render(
      <Provider store={store}>
        <PersonDetails />
      </Provider>
    );

    const idElement = screen.getByText("ID: 1");
    const nameElement = screen.getByText("John Doe");
    const ageElement = screen.getByText("age: 30");
    const editButton = screen.getByText("Edit");

    expect(idElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(ageElement).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    const nameInput = screen.getByLabelText("Name");
    const ageInput = screen.getByLabelText("Age");
    const saveButton = screen.getByText("Save");

    expect(nameInput).toBeInTheDocument();
    expect(ageInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: "Updated Name" } });
    fireEvent.change(ageInput, { target: { value: "31" } });

    fireEvent.click(saveButton);

    const updatedNameElement = screen.getByText("Updated Name");
    const updatedAgeElement = screen.getByText("age: 31");

    expect(updatedNameElement).toBeInTheDocument();
    expect(updatedAgeElement).toBeInTheDocument();

    expect(updatePerson).toHaveBeenCalledWith(1, {
      name: "Updated Name",
      age: 31,
    });

    const actions = store.getActions();
    expect(actions).toEqual([
      setPerson({ id: 1, name: "Updated Name", age: 31 }),
    ]);
  });
});
