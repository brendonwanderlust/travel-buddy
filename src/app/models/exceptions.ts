export class TravelBuddyError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, TravelBuddyError.prototype);
  }
}
