export const Categories = {
  performance: 'Performance',
  sport: 'Sport',
  food: 'Food',
  generic: 'Other',
  event: 'Event',
  'point of interest': 'Event'
};

export type Category = keyof typeof Categories;
