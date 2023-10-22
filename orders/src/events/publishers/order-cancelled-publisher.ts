import { Publisher, OrderCancelledEvent, Subjects } from "@path_to_10e7/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
