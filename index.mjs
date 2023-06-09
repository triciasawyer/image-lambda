import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Response } from 'node-fetch';

export const handler = async(event) => {
    // creating our s3 connection
    let s3Client = new S3Client({region: 'us-east-2'});

    let name = event.Records[0].s3.object.key;
    let size = event.Records[0].s3.object.size;
    let type = '.jpg';
    let newImageDetails = { name, size, type };
    console.log('new image details', newImageDetails);

    let input = {
        Bucket: 'triciasawyer-images',
        Key: 'images.json',
    }

    let imageDetails;
    try {
        let results = await s3Client.send(new GetObjectCommand(input));
        let response = new Response(results.Body);
        let retrievedImageDetails = await response.json();
        imageDetails = retrievedImageDetails;
    }catch(err){
        console.log('get object error', err);
        imageDetails = [];
    }

    imageDetails.push(newImageDetails)
    console.log('our image details array', imageDetails);

    let stringifiedDetails = JSON.stringify(imageDetails, undefined, '  ');
    console.log('here');
    let putInput = {
        ...input,
        Body: stringifiedDetails,
        ContentType: 'application/json'
    }
    console.log('put input object', putInput);

    try {
        await s3Client.send(new PutObjectCommand(putInput));
    }catch(err){
        console.warn('failed to put', err)
    }

    // TODO implement
    const response = {
        statusCode: 200,
        body: stringifiedDetails,
    };
    return response;
};
