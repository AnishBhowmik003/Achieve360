import mysql.connector
from mysql.connector import Error
import hashlib

#currently running sql server off of local computer, will eventually move to a dedicated server

#TODO: create more functions


#TODO: figure out how to embed user and password args
#connection = mysql.connector.connect(host='localhost', database='achieve360', user='root', password='Achieve360!')

def is_password_valid(password):
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
        return True
    else:
        return False

def create_user(username, password, email, phonenumber):
    try:
        connection = mysql.connector.connect(host='localhost', database='achieve360', user='root', password='Achieve360!')
        cursor = connection.cursor(buffered=True)
        if connection.is_connected():
            cursor.execute("SELECT * FROM user WHERE username = '{username}'")
            record = cursor.fetchone()
            if record == None: 
                if is_password_valid(password):
                    hashed_password = hashlib.sha256(password.encode()).hexdigest()
                    stmt = "INSERT INTO user (username, password, email, phonenumber) VALUES (%s, %s, %s, %s)"
                    data = (username, hashed_password, email, phonenumber)
                    cursor.execute(stmt, data)
                    connection.commit()
                    print("User account created successfully!")
                else:
                    print("Password must contain an uppercase letter, a lowercase letter, and a number")
            else:
                print("Username already exists")
    except Error as e:
        print("Error while connecting to MySQL or creating user account:", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

def check_password(username, password): 
    try:
        connection = mysql.connector.connect(host='localhost', database='achieve360', user='root', password='Achieve360!')
        cursor = connection.cursor(buffered=True)
        if connection.is_connected():
            hashed_password = hashlib.sha256(password.encode()).hexdigest()
            cursor.execute(f"SELECT password FROM user WHERE username = '{username}'")
            real_hashed_password = cursor.fetchone()
            if real_hashed_password == None or hashed_password != real_hashed_password[0]:
                return False
            else:
                return True
    except Error as e:
        print("Error while checking password:", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

def login(username, password): 
    try:
        if check_password(username, password):
            print("Logging in")
            return True
        else:
            print("Incorrect username or password")
            return False
    except Error as e:
        print("Error while connecting to MySQL or logging in:", e)

def delete_user(username):
    try:
        connection = mysql.connector.connect(host='localhost', database='achieve360', user='root', password='Achieve360!')
        cursor = connection.cursor(buffered=True)
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

def change_password(username, old_password, new_password):
    try:
        connection = mysql.connector.connect(host='localhost', database='achieve360', user='root', password='Achieve360!')
        cursor = connection.cursor(buffered=True)
        if connection.is_connected():
            if check_password(username, old_password):
                if is_password_valid(new_password):
                    hashed_password = hashlib.sha256(new_password.encode()).hexdigest()
                    cursor.execute(f"UPDATE user SET password = '{hashed_password}' WHERE username = '{username}'")
                    connection.commit()
                    print("Password changed successfully!")
                else:
                    print("Password must contain an uppercase letter, a lowercase letter, and a number")
            else:
                print("Incorrect username or password")
    except Error as e:
        print("Error while connecting to MySQL or changing password:", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")



#example for connecting to mysql server
"""
try:
    connection = mysql.connector.connect(host='localhost', database='achieve360', user='root', password='Achieve360!')
    cursor = connection.cursor(buffered=True)
    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor(buffered=True)
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
"""