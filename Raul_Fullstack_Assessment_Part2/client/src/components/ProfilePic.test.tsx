import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ProfilePic from "../components/ProfilePic";
import { getPerson } from "../api/ApiService";
import { setPerson } from "../features/person/personSlice";

const mockStore = configureMockStore();

jest.mock("../api/ApiService");

describe("ProfilePic Component", () => {
  test("should render profile pic and handle click event", async () => {
    const personData = {
      id: 1,
      name: "John Doe",
      age: 30,
    };

    const store = mockStore({
      person: {
        person: null,
      },
    });

    getPerson.mockResolvedValue(personData);

    render(
      <Provider store={store}>
        <ProfilePic />
      </Provider>
    );

    const profilePicElement = screen.getByAltText("Profile");
    expect(profilePicElement).toBeInTheDocument();

    fireEvent.click(profilePicElement);

    expect(getPerson).toHaveBeenCalled();

    await screen.findByText("Loading...");

    const actions = store.getActions();
    expect(actions).toEqual([setPerson(personData)]);
  });
});
