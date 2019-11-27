
from flask import Flask, render_template

app = Flask(__name__)

# base / index
@app.route('/')
@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/loginform.html')
def login():
    return render_template('loginform.html')

@app.route('/search.html')
def search():
    return render_template('citysearch.html')

# @app.route('/forecast.html')
# def forecast():
#     return render_template('forecastpage.html')

if __name__ == "__main__":
    app.run(debug=True)