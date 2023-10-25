import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@path_to_10e7/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
