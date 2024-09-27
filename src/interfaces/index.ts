export interface ICreateLocation {
  name: string;
  coordinate: number[][];
}

export interface ILocation {
  id: number;
  name: string;
  coordinate: number[][];
}

export interface ICreateItem {
  name: string;
  type: string;
  length: number;
  width: number;
  height: number;
}
