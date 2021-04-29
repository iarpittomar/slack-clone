interface ShoppingCart<Item, ItemId> {
  items: Array<Item>;
  addItem(this: ShoppingCart<Item, ItemId>, item: Item): void;
  getItemByID(this: ShoppingCart<Item, ItemId>, id: ItemId): Item;
}

interface IItem {
  id: number;
  price: number;
}

const cart: ShoppingCart<IItem, number> = {
  items: [],
  addItem(item) {
    this.items.push(item);
  },
  getItemByID(id) {
    return this.items.find((item) => item.id === id);
  },
};
