const { getConnection } = require('./core');

module.exports.getComments = async () => {
  const result = await getConnection().query('select * from comments');
  return result[0];
};

// Takes name and text, adds new comment;
module.exports.addComment = async (...comment) => {
  await getConnection().query(
    'insert into comments(name, text) values (?, ?)',
    comment
  );
};

module.exports.deleteComments = async () => {
  await getConnection().query('delete from comments');
};
