import { Publisher, Subjects, TicketCreatedEvent } from "@path_to_10e7/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
