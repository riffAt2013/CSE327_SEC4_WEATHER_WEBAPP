# author : RIFAT MASUD

# task: make the pages routable [tick]
# task2: make the page handle input values via request object

from flask import Flask, render_template

app = Flask(__name__)

# base / index
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('loginform.html')

@app.route('/search')
def search():
    return render_template('citysearch.html')

@app.route('/forecast')
def forecast():
    return render_template('forecastpage.html')

if __name__ == "__main__":
    app.run(debug=True)