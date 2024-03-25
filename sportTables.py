import pandas as pd
import numpy as np
import csv

def filter_data(sport, position):
    nfl_data = []
    nba_data = []
    
    with open('NFL.csv', 'r') as nfl_file, open('NBA.csv', 'r') as nba_file:
        nfl_reader = csv.DictReader(nfl_file)
        nba_reader = csv.DictReader(nba_file)
        
        if sport == 'football':
            for row in nfl_reader:
                if row['POS'] == position:
                    nfl_data.append(row)
            return nfl_data
        if sport == 'basketball':
            for row in nba_reader:
                if row['POS'] == position:
                    nba_data.append(row)
            return nba_data