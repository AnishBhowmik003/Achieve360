import csv
import mysql.connector

def filter_data(sport, position):
    if sport.lower() == 'football':
        data_file = 'NFL.csv'
    elif sport.lower() == 'basketball':
        data_file = 'NBA.csv'
    
    filtered_data = []
    metrics = []
    
    with open(data_file, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row['POS'] == position:
                filtered_data.append(row)
                #metrics.append()
    
    connection = mysql.connector.connect(
        host='database-2.cvmicwscqnza.us-east-2.rds.amazonaws.com',
        user='achieve360',
        password='ProjectDB123!',
        database='database-2'
    )
    cursor = connection.cursor()
    
    insert_query = "INSERT INTO goals ()"
    for metric in metrics:
        cursor.execute(insert_query, (metrics))
    
    connection.commit()
    connection.close()
    
    return filtered_data