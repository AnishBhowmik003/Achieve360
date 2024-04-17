import pandas as pd

data = pd.read_csv('/Users/ishaanpathania/Desktop/Achieve360/datasets/fullNBACombine.csv')

data.fillna(0, inplace=True)

for i, row in data.iterrows():
    if row['height'] == 0 or row['weight'] == 0:
        data.drop(i, inplace=True)

data.reset_index(drop=True, inplace=True)

data.to_csv('/Users/ishaanpathania/Desktop/Achieve360/datasets/cleanedNBACombine.csv', index=False)