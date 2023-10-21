import { Publisher, Subjects, TicketUpdatedEvent } from "@path_to_10e7/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
