# import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template, url_for


#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:{password}@127.0.0.1:5432/PS4_GamesSales_db")
db_columns = ["Game", "Year", "Genre", "Publisher", "NorthAmercia", "Europe", "Japan", "RestofWorld", "Global"]

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    return render_template("index.html")



@app.route("/api/v1.0/all")
def all_data():
    # Create our session (link) from Python to the DB
    df = pd.read_sql("Select * from ps4_gamessales", columns = db_columns, con = engine)
    res = []
    for i, row in df.iterrows():
        res.append({k:v for k,v in row.items()})

    return jsonify(data = res)
    # return df.to_json()

@app.route("/api/v1.0/names")
def names():
    df = pd.read_sql("ps4_gamessales", con = engine, columns= ["Game"])

    return jsonify(data = list(df["Game"].values))

if __name__ == '__main__':
    app.run(debug=True)
