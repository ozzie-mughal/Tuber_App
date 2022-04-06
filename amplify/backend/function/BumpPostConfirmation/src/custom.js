/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const aws = require('aws-sdk');
const ddb = new aws.DynamoDB();
const tableName = process.env.USERTABLE;

exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger

  if (!event?.request?.userAttributes?.sub){
    console.log("no sub provided");
    return;
  }
  
  const now = new Date();
  const timestamp = now.getTime();
  const ISOtimestamp = now.toISOString()
  const given_name = event.request.userAttributes.given_name;
  const family_name = event.request.userAttributes.family_name;
  const picture = event.request.userAttributes.picture;
  const id = event?.request?.userAttributes?.sub;

  const userItem = {
    __typename:{ S: 'User' },
    _lastChangedAt: { N: timestamp.toString()},
    _version: {N: "1" },
    createdAt: { S: ISOtimestamp },
    updatedAt: { S: ISOtimestamp },
    id: { S: id },
    givenName: { S: given_name },
    familyName: { S: family_name },
    avatarImage: { S: picture },
  }

  const params = {
    Item: userItem,
    TableName: tableName
  };

  // save a new user to dynamoDB
  try {
    await ddb.putItem(params).promise();
    console.log("putItem success");
  } catch (e) {
    console.log(e)
  }

  return event
};
