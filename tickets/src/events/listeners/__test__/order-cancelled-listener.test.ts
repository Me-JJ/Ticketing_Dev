import mongoose from "mongoose";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { OrderCancelledEvent } from "@path_to_10e7/common";

const setup = async () => {
  //create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();
  //create and save a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 99,
    userId: "asdf",
  });
  ticket.set({ orderId });

  await ticket.save();

  //create a fake data object
  const data: OrderCancelledEvent["data"] = {
    version: 0,
    id: orderId,
    ticket: {
      id: ticket.id,
    },
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it("updates the ticket , publishes an event and ack the message", async () => {
  const { listener, data, msg, ticket } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
