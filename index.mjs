'use strict';

import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';



export const handler = async(event) => {
    // console.log('this is our event', event);

    // create a s3Client connection
    const s3Client = new S3Client({region: 'us-east-2'});
    const Bucket = "lab17-images";

    const params = {
        Key: "images.json",
        Bucket: "lab17-images",
    };

    console.log('new event info', params);

    let myJson;
    try {
        myJson = await s3Client.send(new GetObjectCommand(params));
    }catch(err){
        console.log('Handler Event', JSON.stringify(event, undefined, " "));
    }

    console.log('this is my json', myJson.Body);

    // const { name, size, type } = event;
    // const result = name + size + type;
    // console.log('my result', result);
    // TODO implement
    const response = {
        statusCode: 200,
        body: 1004,
    };
    return response;
};
