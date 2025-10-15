function paginate(items, page = 1, limit = 10) {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    page,
    limit,
    total: items.length,
    totalPages: Math.ceil(items.length / limit),
    data: items.slice(start, end)
  };
}
module.exports = paginate;
