import { render, screen, within } from "@testing-library/react";
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

test("filter and search work together and show the empty state", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("radio", { name: "Done" }));
  const doneCount = screen.getAllByRole("listitem").length;
  expect(doneCount).toBeLessThan(10);

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
  const dialog = screen.getByRole("dialog", { name: "Add book" });

  await user.click(within(dialog).getByRole("button", { name: "Save" }));
  expect(within(dialog).getByText("Please enter a title.")).toBeInTheDocument();
  expect(within(dialog).getByText("Please enter an author.")).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(10);

  await user.type(within(dialog).getByLabelText("Title"), "Emma");
  await user.type(within(dialog).getByLabelText("Author"), "Jane Austen");
  await user.click(within(dialog).getByRole("button", { name: "Save" }));

  expect(screen.getAllByRole("listitem")).toHaveLength(11);
  expect(screen.getByRole("heading", { name: "Emma" })).toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("Book added");
});

test("deletes a book after confirmation", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "Delete Dune" }));
  const dialog = screen.getByRole("dialog", { name: "Delete book?" });
  await user.click(within(dialog).getByRole("button", { name: "Delete" }));

  expect(screen.getAllByRole("listitem")).toHaveLength(9);
  expect(screen.queryByRole("heading", { name: "Dune" })).not.toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("Book deleted");
});
