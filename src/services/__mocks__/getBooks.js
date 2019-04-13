import mockBooks from '../../__mocks__/books.json';

export default async (searchParams) => {
  const response = await new Promise((resolve) => {
    resolve({
      status: 200,
      data: { items: mockBooks }
    });
  });

  return response;
};
