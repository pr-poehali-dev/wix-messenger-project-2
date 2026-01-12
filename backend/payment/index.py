import json
import os
import psycopg2
from datetime import datetime, timedelta
from hashlib import sha256

def handler(event: dict, context) -> dict:
    '''API для обработки платежей Premium подписки WIX'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_str = event.get('body', '{}')
        if not body_str or body_str == '':
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing user_id or payment_method'}),
                'isBase64Encoded': False
            }
        
        body = json.loads(body_str)
        user_id = body.get('user_id')
        payment_method = body.get('payment_method')
        
        if not user_id or not payment_method:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing user_id or payment_method'}),
                'isBase64Encoded': False
            }
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid JSON'}),
            'isBase64Encoded': False
        }
    
    try:
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        payment_id = sha256(f"{user_id}_{datetime.now().isoformat()}".encode()).hexdigest()[:32]
        amount = 299.00
        started_at = datetime.now()
        expires_at = started_at + timedelta(days=30)
        
        cur.execute(
            "INSERT INTO premium_subscriptions (user_id, payment_method, amount, status, payment_id, started_at, expires_at) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id",
            (user_id, payment_method, amount, 'completed', payment_id, started_at, expires_at)
        )
        subscription_id = cur.fetchone()[0]
        
        cur.execute(
            "UPDATE users SET is_premium = TRUE WHERE id = %s",
            (user_id,)
        )
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'subscription_id': subscription_id,
                'payment_id': payment_id,
                'amount': amount,
                'expires_at': expires_at.isoformat(),
                'message': 'Premium подписка успешно активирована!'
            }),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }