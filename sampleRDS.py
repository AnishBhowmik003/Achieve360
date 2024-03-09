import boto3

rds = boto3.client('rds')

try:
    response = rds.create_db_instance(
        DBInstanceIdentifier='mydb',
        AllocatedStorage=10,
        DBInstanceClass='db.t3.micro',
        Engine='mysql',
        MasterUsername='admin',
        MasterUserPassword='admin123',
        BackupRetentionPeriod=1
        Tags=[
            {
                'Key': 'Name',
                'Value': 'mydb'
            },
        ]
    )
    print(response)
except Exception as e:
    print(e)