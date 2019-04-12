import mockBooks from './books.json';

export default async (searchParams) => {
  const response = await new Promise((resolve) => {
    resolve(mockBooks);
  });

  return response;
};
