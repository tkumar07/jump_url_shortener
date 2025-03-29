const dynamoDB = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const Url = {
  generateShortId() {
    return uuidv4().substring(0, 8);
  },
  
  async create(originalUrl, userId) {
    const shortId = this.generateShortId();
    
    const params = {
      TableName: 'URLs',
      Item: {
        shortId,
        originalUrl,
        userId,
        createdAt: new Date().toISOString(),
        clicks: 0
      }
    };
    
    await dynamoDB.put(params).promise();
    return { shortId, originalUrl, userId };
  },
  
  async findByShortId(shortId) {
    const params = {
      TableName: 'URLs',
      Key: { shortId }
    };
    
    const result = await dynamoDB.get(params).promise();
    return result.Item;
  },
  
  async incrementClicks(shortId) {
    const params = {
      TableName: 'URLs',
      Key: { shortId },
      UpdateExpression: 'SET clicks = clicks + :inc',
      ExpressionAttributeValues: {
        ':inc': 1
      },
      ReturnValues: 'UPDATED_NEW'
    };
    
    await dynamoDB.update(params).promise();
  },
  
  async findByUserId(userId) {
    const params = {
      TableName: 'URLs',
      IndexName: 'UserIdIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    };
    
    const result = await dynamoDB.query(params).promise();
    return result.Items;
  }
};

module.exports = Url;