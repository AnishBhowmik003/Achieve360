import pandas as pd

data = pd.read_csv('/Users/ishaanpathania/Desktop/Achieve360/datasets/fullNBACombine.csv')

data.fillna(0, inplace=True)

data.to_csv('/Users/ishaanpathania/Desktop/Achieve360/datasets/cleanedNBACombine.csv', index=False)