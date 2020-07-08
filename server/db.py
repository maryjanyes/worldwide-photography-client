from flaskext.mysql import mySQL

class Database:

    def init(self, data):
        mysql = mySQL(data)
        mysql.init_app()

    def get_cursor():
        return self.mysql.get_db().cursor()


database = Database()
