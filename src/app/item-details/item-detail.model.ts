export class Item {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public address: number[],
    public reminder: string,
    public image: string,
    public inBin: boolean
  ) {}
}
