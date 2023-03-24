const AWS = require("aws-sdk");
const ddb_client = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});
const apigw_management_api_client = new AWS.ApiGatewayManagementApi({
  endpoint: process.env.API_URL,
});

const table_name = process.env.TABLE_NAME;

exports.handler = async (event, context) => {
  console.log(event);
  console.log(`Endpoint URL: ${process.env.API_URL}`);

  const connection_id = event.requestContext.connectionId;

  try {
    console.log(`posting to connection ${connection_id}`);
    await apigw_management_api_client
      .postToConnection({
        ConnectionId: connection_id,
        Data: "Hi from Lambda!",
        //  Data: JSON.stringify(event),
      })
      .promise();
  } catch (e) {
    console.log(`excetion caught: ${e}`);
    if (e.statusCode === 410) {
      console.log(`Found stale connection, deleting ${connection_id}`);
      await ddb_client
        .delete({
          TableName: table_name,
          Key: {
            connectionId: connection_id,
          },
        })
        .promise();
    } else {
      throw e;
    }
  }

  console.log("Exiting the function");
  return {
    body: JSON.stringify({ connectionId: connection_id }),
    statusCode: 200,
  };
};
