import json
import boto3
from botocore.config import Config

s3_client = boto3.client('s3')

def lambda_handler(event, context):

    bucket_name = 'initial-translation-files'
    key_name = 'test.txt'
    upload_details = s3_client.generate_presigned_post(bucket_name, key_name)

    return {
        'statusCode': 200,
        'body': json.dumps(upload_details)
    }