const connectElastic = require("../config/elasticConnection");
const { BOOKS_MODEL } = require("../contants");

const createIndex = async ({
  index = BOOKS_MODEL,
  id,
  title,
  author,
  publicationYear,
  isbn,
  description,
}) => {
  const client = connectElastic();
  await client.index({
    index,
    id,
    body: {
      title: title,
      author: author,
      publicationYear: publicationYear,
      isbn: isbn,
      description: description,
    },
  });
};

const updateIndex = async ({ index = BOOKS_MODEL, id, contents }) => {
  const client = connectElastic();
  await client.update({
    index,
    id,
    body: { doc: contents },
  });
};

const deleteIndex = async ({ index = BOOKS_MODEL, id }) => {
    const client = connectElastic();
    await client.delete({
      index,
      id,
    });
  };
  

module.exports = { createIndex, updateIndex,deleteIndex };
