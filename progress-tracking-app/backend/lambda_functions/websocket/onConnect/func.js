const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const table_name = process.env.TABLE_NAME;

exports.handler = async (event, context) => {
    console.log(event);
    const connection_id = event.requestContext.connectionId;
    const domain_name = event.requestContext.domainName;
    const stage = event.requestContext.stage;
    await add_connection_id(connection_id, domain_name, stage);
    return {
        statusCode: 200
    };
};

async function add_connection_id(connection_id, domain_name, stage) {
    console.log(connection_id);
    await ddb.put({
        TableName: table_name,
        Item: {
            connectionId: connection_id,
            domainName: domain_name,
            stage: stage
        }
    }).promise();
}
