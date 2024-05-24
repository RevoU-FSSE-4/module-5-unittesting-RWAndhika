import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '.';

describe("Search Component", () => {
  test("renders search input and button correctly", () => {
    render(<Search search="" setSearch={() => {}} handleSearch={() => {}} />);
    expect(screen.getByPlaceholderText("Enter City Name")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  test("calls setSearch on input change", async  () => {
    const setSearch = jest.fn();
    render(<Search search="" setSearch={setSearch} handleSearch={() => {}} />);
    
    const inputElement = screen.getByPlaceholderText("Enter City Name");
    await userEvent.type(inputElement, "Bekasi");
    expect(setSearch).toHaveBeenCalledTimes(6); //it will be called 6 times onChange to input Bekasi
  });

  test("calls handleSearch on button click", async () => {
    const handleSearch = jest.fn();
    render(<Search search="" setSearch={() => {}} handleSearch={handleSearch} />);
    
    await userEvent.click(screen.getByText("Search"));
    expect(handleSearch).toHaveBeenCalled();
  });
});
