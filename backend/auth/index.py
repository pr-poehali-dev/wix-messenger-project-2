import json
import os
import psycopg2
from hashlib import sha256

def handler(event: dict, context) -> dict:
    '''API для регистрации и авторизации пользователей WIX'''
    
    method = event.get('httpMethod', 'GET')
    path = event.get('queryStringParameters', {}).get('action', '')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
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
        body = json.loads(event.get('body', '{}'))
        
        if path == 'register':
            phone = body.get('phone')
            password = body.get('password')
            nickname = body.get('nickname')
            username = body.get('username')
            avatar = body.get('avatar', '😊')
            
            if not all([phone, password, nickname, username]):
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing required fields'}),
                    'isBase64Encoded': False
                }
            
            password_hash = sha256(password.encode()).hexdigest()
            
            conn = psycopg2.connect(os.environ['DATABASE_URL'])
            cur = conn.cursor()
            
            cur.execute(
                "INSERT INTO users (phone, password_hash, nickname, username, avatar) VALUES (%s, %s, %s, %s, %s) RETURNING id, nickname, username, avatar, is_premium",
                (phone, password_hash, nickname, username, avatar)
            )
            user_data = cur.fetchone()
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'user': {
                        'id': user_data[0],
                        'nickname': user_data[1],
                        'username': user_data[2],
                        'avatar': user_data[3],
                        'is_premium': user_data[4]
                    }
                }),
                'isBase64Encoded': False
            }
        
        elif path == 'login':
            phone = body.get('phone')
            password = body.get('password')
            
            if not all([phone, password]):
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing phone or password'}),
                    'isBase64Encoded': False
                }
            
            password_hash = sha256(password.encode()).hexdigest()
            
            conn = psycopg2.connect(os.environ['DATABASE_URL'])
            cur = conn.cursor()
            
            cur.execute(
                "SELECT id, nickname, username, avatar, is_premium FROM users WHERE phone = %s AND password_hash = %s",
                (phone, password_hash)
            )
            user_data = cur.fetchone()
            
            cur.close()
            conn.close()
            
            if not user_data:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Invalid credentials'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'user': {
                        'id': user_data[0],
                        'nickname': user_data[1],
                        'username': user_data[2],
                        'avatar': user_data[3],
                        'is_premium': user_data[4]
                    }
                }),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invalid action'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
