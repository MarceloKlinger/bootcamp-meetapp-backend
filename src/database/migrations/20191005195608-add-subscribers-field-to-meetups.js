module.exports = {
  up: queryInterface => {
    return queryInterface.renameColumn('meetups', 'banner_id', 'file_id');
  },

  down: queryInterface => {
    return queryInterface.renameColumn('meetups', 'file_id', 'banner_id');
  },
};
