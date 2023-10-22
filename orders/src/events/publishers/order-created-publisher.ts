import { Publisher, OrderCreatedEvent, Subjects } from "@path_to_10e7/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
