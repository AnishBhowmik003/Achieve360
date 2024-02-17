import mysql.connector
from mysql.connector import Error
import hashlib

#currently running sql server off of local computer, will eventually move to a dedicated server

#TODO: create more functions


def create_user(username, password, email, phonenumber):
    try:
        if connection.is_connected():
            hashed_password = hashlib.sha256(password.encode()).hexdigest()
            cursor.execute(f"INSERT INTO user (username, password, email, phonenumber) VALUES ('{username}', '{hashed_password}', '{email}', {phonenumber})")
            connection.commit()
            print("User account created successfully!")
    except Error as e:
        print("Error while connecting to MySQL or creating user account:", e)

def login(username, password): 
    try:
        if connection.is_connected():
            hashed_password = hashlib.sha256(password.encode()).hexdigest()
            cursor.execute(f"SELECT password FROM user WHERE username = '{username}'")
            real_hashed_password = cursor.fetchone()[0]
            if hashed_password == real_hashed_password:
                print("Logging in")
                return True
            else:
                print("Incorrect password")
                return False
    except Error as e:
        print("Error while connecting to MySQL or logging in:", e)

def delete_user(username):
    try:
        if connection.is_connected():
            cursor.execute(f"DELETE FROM user WHERE username = '{username}'")
            connection.commit()
            print("User account deleted successfully!")
    except Error as e:
        print("Error while connecting to MySQL or deleting user account:", e)


try:
    connection = mysql.connector.connect(host='localhost', database='achieve360', user='root', password='Achieve360!')
    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        cursor.execute("select * from user")
        record = cursor.fetchone()
        print("You're connected to database: ", record)
        #integrate with ui to call funtions here

except Error as e:
    print("Error while connecting to MySQL", e)
finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")