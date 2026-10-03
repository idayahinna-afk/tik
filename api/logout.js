/** api/logout.js — keluar dari sesi. */
const { hapusSesi, kepalaAman } = require('../lib/auth');

module.exports = function (req, res) {
  kepalaAman(res);
  hapusSesi(res);
  res.statusCode = 302;
  res.setHeader('Location', '/');
  res.end();
};
