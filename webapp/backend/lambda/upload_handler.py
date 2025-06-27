import boto3
import base64
import json
import os

s3 = boto3.client('s3')
translate = boto3.client('translate')

UPLOAD_BUCKET = os.environ.get('UPLOAD_BUCKET', 'your-bucket-name')

def extract_field(sections, name):
    """Helper to extract a field value from multipart/form-data."""
    name_bytes = bytes(f'name="{name}"', "utf-8")
    for section in sections:
        if name_bytes in section:
            start = section.find(b'\r\n\r\n') + 4
            end = section.rfind(b'\r\n')
            return section[start:end].decode("utf-8")
    return None

def lambda_handler(event, context):
    try:
        content_type = event['headers'].get('content-type', '')
        boundary = content_type.split("boundary=")[-1]
        body = base64.b64decode(event['body'])

        # Parse of form-data
        sections = body.split(bytes(f'--{boundary}', "utf-8"))

        file_content = None
        for section in sections:
            if b'filename=' in section:
                file_start = section.find(b'\r\n\r\n') + 4
                file_content = section[file_start:-2]  # Strip trailing CRLF
                break

        if not file_content:
            return {"statusCode": 400, "body": "No file found"}

        # Optional target language
        target_lang = extract_field(sections, "target_lang") or "es"  # Spanish as default

        original_text = file_content.decode("utf-8")

        # Translate
        translation_result = translate.translate_text(
            Text=original_text,
            SourceLanguageCode='auto',
            TargetLanguageCode=target_lang
        )
        translated_text = translation_result['TranslatedText']

        translated_filename = f"translated_{target_lang}.txt"
        s3.put_object(
            Bucket=UPLOAD_BUCKET,
            Key=translated_filename,
            Body=translated_text.encode("utf-8"),
            ContentType="text/plain"
        )

        presigned_url = s3.generate_presigned_url(
            'get_object',
            Params={'Bucket': UPLOAD_BUCKET, 'Key': translated_filename},
            ExpiresIn=3600
        )

        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({
                "translated_url": presigned_url,
                "message": f"File translated to {target_lang}"
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": str(e)})
        }
