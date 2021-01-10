export class Item {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public address: number[],
    public reminder: string,
    public image: string
  ) {}
}
