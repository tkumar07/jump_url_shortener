const dynamoDB = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  async create(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const params = {
      TableName: 'Users',
      Item: {
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      },
      ConditionExpression: 'attribute_not_exists(email)'
    };
    
    try {
      await dynamoDB.put(params).promise();
      return { email };
    } catch (error) {
      if (error.code === 'ConditionalCheckFailedException') {
        throw new Error('User already exists');
      }
      throw error;
    }
  },
  
  async findByEmail(email) {
    const params = {
      TableName: 'Users',
      Key: { email }
    };
    
    const result = await dynamoDB.get(params).promise();
    return result.Item;
  }
};

module.exports = User;