const Period = require('../models/Period');

async function updatePeriods(filter, update) {
  try {
    const result = await Period.updateMany(filter, update);
    console.log('Documents updated:', result.nModified);
    return result;
  } catch (error) {
    console.error('Error updating documents:', error);
    throw error; // Propagate the error to handle it elsewhere
  }
}

async function deletePeriod(filter) {
  try {
    const result = await Period.deleteOne(filter);
    console.log('Document deleted:', result.deletedCount);
    return result;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error; // Propagate the error to handle it elsewhere
  }
}

module.exports = {
  updatePeriods,
  deletePeriod,
};
