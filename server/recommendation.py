import sys
import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors
import mysql.connector

username = sys.stdin.read().strip()
df = pd.read_csv(r'C:\Users\NAVUDU NARAYANA RAO\Desktop\newproject\private\server\dataset.csv')

class Recommender:
    def __init__(self):
        self.df = df
            
    def get_features(self):
        nutrient_dummies = self.df['Nutrient'].str.get_dummies()
        disease_dummies = self.df['Disease'].str.get_dummies(sep=' ')
        diet_dummies = self.df['Diet'].str.get_dummies(sep=' ')
        feature_df = pd.concat([nutrient_dummies, disease_dummies, diet_dummies], axis=1)
        return feature_df
    
    def k_neighbor(self, inputs):
        feature_df = self.get_features()
        model = NearestNeighbors(n_neighbors=40, algorithm='ball_tree')
        model.fit(feature_df)
       
        df_results = pd.DataFrame(columns=list(self.df.columns))
                 # getting distance and indices for k nearest neighbor
        distnaces , indices = model.kneighbors(inputs)
                
        for i in list(indices):
            df_results = pd.concat([df_results, self.df.loc[i]], axis=0)

        df_results = self.df.loc[indices.flatten()]
        df_results = df_results.drop_duplicates(subset=['Name'])
        df_results = df_results.reset_index(drop=True)
        return df_results

ob = Recommender()
data = ob.get_features()

total_features = data.columns
d = {feature: 0 for feature in total_features}

# Connect to the MySQL database
cnx = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Nnr15823@ms',
    database='recommendation_system'
)

# Retrieve the necessary values from the database
cursor = cnx.cursor()
query = "SELECT diet, disease, nutrient FROM Profiles WHERE name = %s"
values = (username,)
cursor.execute(query, values)
result = cursor.fetchone()

# Process the fetched values
if result:
    diet, disease, nutrient = result
    diet_list = diet.split('++')
    disease_list = disease.split('++')
    nutrient_list = nutrient.split('++')

    Recommend_input = diet_list + disease_list + nutrient_list

    for i in Recommend_input: 
        d[i] = 1

    final_input = list(d.values())

    results = ob.k_neighbor([final_input])
    output = results.to_string(index=False)
    print("Recommendation Results:")
    print(results)
else:
    print("No profile found for the given user")

# Consume any unread result sets
cursor.fetchall()

cursor.close()
cnx.close()
