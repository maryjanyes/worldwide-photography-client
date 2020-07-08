from flask import Flask
from flaskext.mysql import MySQL

from flask import json

app = Flask(__name__)

def config_db():
    sql = MySQL()
    app.config['MYSQL_DATABASE_HOST'] = 'sunweb00.mysql.tools'
    app.config['MYSQL_DATABASE_USER'] = 'sunweb00_photolive'
    app.config['MYSQL_DATABASE_PASSWORD'] = '790^mJtaP~'
    app.config['MYSQL_DATABASE_DB'] = 'sunweb00_photolive'
    sql.init_app(app)
    conn = sql.connect()
    if conn:
        global db_cursor
        db_cursor = conn.cursor()

config_db()

@app.route('/')
def index():
    return 'hello'

@app.route('/users')
def fetch_users():
    db_cursor.execute('SELECT * FROM Users')
    _users = db_cursor.fetchall()
    return app.response_class(
        response=json.dumps(_users),
        mimetype='application/json'
    )

    
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
