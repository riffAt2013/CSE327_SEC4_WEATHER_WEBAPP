# author : RIFAT MASUD

# task: make the pages routable [tick]
# task2: make the page handle input values via request object

from flask import Flask, render_template

app = Flask(__name__)


@app.route('/login')
def view():
    return render_template('loginform.html')


if __name__ == "__main__":
    app.run(debug=True)