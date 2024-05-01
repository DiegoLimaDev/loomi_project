export class RandomPercentage {
  static generatePercentage(): boolean {
    const number = Math.random();

    if (number > 0.1) return true;

    return false;
  }
}
