export type CourseType = 'Starter' | 'Main Course' | 'Dessert';

export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: CourseType;
  price: string;
}

let menuCatalog: MenuItem[] = [];

export function getMenuItems(): MenuItem[] {
  return [...menuCatalog];
}

export function addMenuItem(item: MenuItem): void {
  menuCatalog.unshift(item);
}

export function updateMenuItem(updatedItem: MenuItem): void {
  menuCatalog = menuCatalog.map((item) =>
    item.id === updatedItem.id ? updatedItem : item
  );
}

export function deleteMenuItem(id: string): void {
  menuCatalog = menuCatalog.filter((item) => item.id !== id);
}

export function clearAllMenuItems(): void {
  menuCatalog = [];
}

export function validateDishInput(
  dishName: string,
  description: string,
  price: string
) {
  if (!dishName.trim() || !description.trim() || !price.trim()) {
    return { valid: false, error: 'All fields are required.' };
  }
  const numericPrice = parseFloat(price);
  if (isNaN(numericPrice) || numericPrice <= 0) {
    return { valid: false, error: 'Price must be a valid positive number.' };
  }
  return { valid: true, parsedPrice: numericPrice };
}

export function calculateMenuStatistics(items: MenuItem[]) {
  const totalCount = items.length;
  const calcAvg = (subset: MenuItem[]) => {
    if (subset.length === 0) return '0.00';
    const sum = subset.reduce((acc, item) => acc + parseFloat(item.price || '0'), 0);
    return (sum / subset.length).toFixed(2);
  };

  const starters = items.filter((i) => i.course === 'Starter');
  const mains = items.filter((i) => i.course === 'Main Course');
  const desserts = items.filter((i) => i.course === 'Dessert');

  return {
    totalCount,
    overallAverage: calcAvg(items),
    starterCount: starters.length,
    starterAverage: calcAvg(starters),
    mainCount: mains.length,
    mainAverage: calcAvg(mains),
    dessertCount: desserts.length,
    dessertAverage: calcAvg(desserts),
  };
}
