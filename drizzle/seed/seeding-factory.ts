export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomPrice = () =>
  parseFloat((Math.random() * 200 + 1).toFixed(2));

export const randomBarcode = () =>
  "628" + Math.floor(100000000 + Math.random() * 900000000);

export const supplierFactory = (index: number) => ({
  supplierCode: `SUP-${String(index).padStart(3, "0")}`,
  supplierName: `Supplier ${index}`,
});

export const itemFactory = (supplierId: string, index: number) => ({
  supplierId,
  item_code: `ITEM-${String(index).padStart(4, "0")}`,
  item_description: `Product ${index}`,
});

export const barcodeFactory = (
  itemId: string,
  unitId: string,
  label: string
) => ({
  barcode: randomBarcode(),
  price: randomPrice(),
  description: label,
  itemId,
  unitId,
});
