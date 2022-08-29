export default class Err extends Error {
  constructor(
    public code: number,
    message: string,
  ) {
    super(message);
  }
}
