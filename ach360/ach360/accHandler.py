import mysql.connector
from mysql.connector import Error
import hashlib

#currently running sql server off of local computer, will eventually move to a dedicated server

#TODO: create more functions


#TODO: figure out how to embed user and password args
#connection = mysql.connector.connect(host='localhost', database='achieve360', user='root', password='Achieve360!')
cursor = connection.cursor()


def create_user(username, password, email, phonenumber):
    try:
        connection = mysql.connector.connect(host='localhost', database='achieve360', user='root', password='Achieve360!')
        if connection.is_connected():
            cursor.execute("SELECT * FROM user WHERE username = '{username}'")
            record = cursor.fetchone()
            if record == None: 
                cap = False
                lower = False
                num = False
                for char in password:
                    if char.isupper():
                        cap = True
                    if char.islower():
                        lower = True
                    if char.isdigit():
                        num = True
                if cap and lower and num:
                    hashed_password = hashlib.sha256(password.encode()).hexdigest()
                    cursor.execute("INSERT INTO user (username, password, email, phonenumber) VALUES ('{username}', '{hashed_password}', '{email}', {phonenumber})")
                    connection.commit()
                    return("User account created successfully!")
                else:
                    return("Password must contain an uppercase letter, a lowercase letter, and a number", cap, lower, num)
            else:
                return("Username already exists")
    except Error as e:
        return("Error while connecting to MySQL or creating user account:", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

def login(username, password): 
    try:
        connection = mysql.connector.connect(host='localhost', database='achieve360', user='root', password='Achieve360!')
        if connection.is_connected():
            hashed_password = hashlib.sha256(password.encode()).hexdigest()
            cursor.execute(f"SELECT password FROM user WHERE username = '{username}'")
            real_hashed_password = cursor.fetchone()
            if real_hashed_password == None or hashed_password != real_hashed_password[0]:
                print("Incorrect username or password")
                return False
            else:
                print("Logging in")
                return True
    except Error as e:
        print("Error while connecting to MySQL or logging in:", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

def delete_user(username):
    try:
        connection = mysql.connector.connect(host='localhost', database='achieve360', user='root', password='Achieve360!')
        if connection.is_connected():
            cursor.execute(f"DELETE FROM user WHERE username = '{username}'")
            connection.commit()
            print("User account deleted successfully!")
    except Error as e:
        print("Error while connecting to MySQL or deleting user account:", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


#example for connecting to mysql server
"""try:
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
        create_user("Test1", "Test1", "test", 1)
except Error as e:
    print("Error while connecting to MySQL", e)
finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")"""