import boto3

#Create RDS client
rds = boto3.client('rds')

try:
    #Create RDS database instance
    response = rds.create_db_instance(
        DBInstanceIdentifier='database-2.cvmicwscqnza.us-east-2.rds.amazonaws.com',
        AllocatedStorage=20,
        DBInstanceClass='db.t3.micro',
        Engine='mysql',
        MasterUsername='',
        MasterPassword='',
        BackupRetentionPeriod=1,
    )
    print(response)
except Exception as e:
    print(e)
