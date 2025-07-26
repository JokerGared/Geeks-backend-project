import createHttpError from 'http-errors';

export const calculatePaginationData = (count, page, perPage) => {
  const totalPages = Math.ceil(count / perPage);
  const hasPreviousPage = page !== 1 && page <= totalPages;
  const hasNextPage = totalPages > page;

  if (page > totalPages && page < 1) {
    throw createHttpError(
      400,
      `The queried page ${page} exceeds the total page count: ${totalPages}`,
    );
  }

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};
