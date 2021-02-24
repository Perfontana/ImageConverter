let connection = null;

module.exports.setConnection = (con) => (connection = con);

module.exports.getConnection = () => connection;
