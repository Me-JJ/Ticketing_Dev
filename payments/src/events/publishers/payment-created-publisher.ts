import { PaymentCreatedEvent, Publisher, Subjects } from "@path_to_10e7/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
