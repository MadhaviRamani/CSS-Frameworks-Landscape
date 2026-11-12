import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";

import App from "./App";

test("shows the heading and all seed books", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: "Reading List" })
  ).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(10);
});

test("the toggle switches between light and dark mode", async () => {
  const user = userEvent.setup();
  render(<App />);
  const toggle = screen.getByRole("button", { name: "Dark mode" });

  expect(document.documentElement).toHaveAttribute("data-bs-theme", "light");
  await user.click(toggle);
  expect(document.documentElement).toHaveAttribute("data-bs-theme", "dark");
  expect(toggle).toHaveAttribute("aria-pressed", "true");
  await user.click(toggle);
  expect(document.documentElement).toHaveAttribute("data-bs-theme", "light");
});

test("filter and search work together and show the empty state", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("radio", { name: "Done" }));
  expect(screen.getAllByRole("listitem").length).toBeLessThan(10);

  await user.type(screen.getByLabelText("Search by title"), "dune");
  expect(screen.getAllByRole("listitem")).toHaveLength(1);

  await user.type(screen.getByLabelText("Search by title"), "xyz");
  expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  expect(screen.getByText("No books found")).toBeInTheDocument();
});

test("does not save without title and author, then adds a book", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: /add book/i }));
  const dialog = await screen.findByRole("dialog", { name: "Add book" });

  await user.click(within(dialog).getByRole("button", { name: "Save" }));
  expect(within(dialog).getByText("Please enter a title.")).toBeInTheDocument();
  expect(within(dialog).getByText("Please enter an author.")).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(10);

  await user.type(within(dialog).getByLabelText("Title"), "Emma");
  await user.type(within(dialog).getByLabelText("Author"), "Jane Austen");
  await user.click(within(dialog).getByRole("button", { name: "Save" }));

  await waitFor(() =>
    expect(screen.getAllByRole("listitem")).toHaveLength(11)
  );
  expect(screen.getByRole("heading", { name: "Emma" })).toBeInTheDocument();
  expect(await screen.findByRole("alert")).toHaveTextContent("Book added");
});

test("deletes a book after confirmation", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "Delete Dune" }));
  const dialog = await screen.findByRole("dialog", { name: "Delete book?" });
  await user.click(within(dialog).getByRole("button", { name: "Delete" }));

  await waitFor(() =>
    expect(screen.getAllByRole("listitem")).toHaveLength(9)
  );
  expect(
    screen.queryByRole("heading", { name: "Dune" })
  ).not.toBeInTheDocument();
  expect(await screen.findByRole("alert")).toHaveTextContent("Book deleted");
});
