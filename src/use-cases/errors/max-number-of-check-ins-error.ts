export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super('Max number os check-ins reached.')
  }
}
