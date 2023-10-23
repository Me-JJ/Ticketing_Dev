import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  //create an instance of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  //save the ticket to the DB
  await ticket.save();

  //fetch the ticket twice
  const firstIns = await Ticket.findById(ticket.id);
  const secondIns = await Ticket.findById(ticket.id);

  //make two separate changes to the tickets we fetched
  firstIns!.set({ price: 10 });
  secondIns!.set({ price: 15 });
  // save the first fetched ticket
  await firstIns!.save();
  //save the second fetched ticket and expect an error
  try {
    await secondIns!.save();
  } catch (err) {
    return;
  }

  throw new Error("Should not reach this point!");
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "123",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
  await ticket.save();
  expect(ticket.version).toEqual(3);
});
