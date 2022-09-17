export interface IProductDataModel {
  id: string;
  name: string;
  netCost?: number;
  netWeightInGram?: number;
  imageUrl: string[];
  ingredients: IIngredientsModel[];
  labourCost: number;
}

export interface IIngredientsModel {
  name: string;
  weightInGram: number;
  cost: number;
  imageUrl: string[];
}

export class ProductDataModel implements IProductDataModel {
  netCost?: number;
  netWeightInGram?: number;

  constructor(
    public id: string,
    public name: string,
    public imageUrl: string[],
    public ingredients: IIngredientsModel[],
    public labourCost: number = 0
  ) {
    this.name = name;
    this.ingredients = ingredients;
    this.id = id;
  }
}
