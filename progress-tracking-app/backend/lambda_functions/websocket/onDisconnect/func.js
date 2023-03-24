const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const table_name = process.env.TABLE_NAME;

exports.handler = async (event, context) => {
    const connection_id = event.requestContext.connectionId;
    await delete_connection_id(connection_id);
    return {
        statusCode: 200
    };
};

async function delete_connection_id(connection_id) {
    await ddb.delete({
        TableName: table_name,
        Key: {
            connectionId: connection_id
        }
    }).promise();
}
