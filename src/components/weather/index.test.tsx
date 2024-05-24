import { render, screen, waitFor } from '@testing-library/react';
import fetchMock from "jest-fetch-mock";
import userEvent from "@testing-library/user-event";
import Weather from '.';


describe("Weather Component", () => {
    fetchMock.enableMocks();
    
    beforeEach(() => { 
        fetchMock.resetMocks();
    })

    test("renders Weather component correctly", () => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText("Enter City Name");
        const buttonElement = screen.getByText("Search");
        expect(inputElement).toBeTruthy();
        expect(buttonElement).toBeTruthy();
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    test("renders if loading true before there are any datas", () => {
        render(<Weather />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    test("fetches API by useEffect that fetchWeatherData of Jakarta", async () => {
        render(<Weather />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
        await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(
            expect.stringContaining("q=Jakarta")
        ));
        //check renders of humidity text and wind speed text while loading is false or there are any data
        expect(screen.getByText("Humidity")).toBeTruthy();
        expect(screen.getByText("Wind Speed")).toBeInTheDocument();
    });

    test("fetches weather data when search button is clicked with input", async () => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText("Enter City Name");
        const buttonElement = screen.getByText("Search");
        await userEvent.type(inputElement, "Bekasi");
        await userEvent.click(buttonElement);

        await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(
            expect.stringContaining("q=Bekasi")
        ));
    });
});