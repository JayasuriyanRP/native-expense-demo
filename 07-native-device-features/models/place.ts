export interface IPlace {
  title: string;
  imageUri: string;
  // address: string;
  location: ICoordinates;
  id: string;
}

export interface ICoordinates {
  lat: number;
  lng: number;
}

export class Place implements IPlace {
  public id: string;
  constructor(
    public title: string,
    public imageUri: string,
    // public address: string,
    public location: ICoordinates,
    private uniqId?: number
  ) {
    this.id =
      uniqId?.toString() ?? new Date().toString() + Math.random().toString();
  }
}
