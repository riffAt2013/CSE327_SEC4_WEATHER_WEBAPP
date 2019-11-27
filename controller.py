from flask import Flask, render_template, redirect, url_for
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm 
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length 

app = Flask(__name__)
app.config['SECRET_KEY'] = "HELLONEARTH"
bootstrap = Bootstrap(app)

class LoginForm(FlaskForm):
    username = StringField('', validators=[InputRequired(), Length(min=4, max=15)])
    password = PasswordField('', validators=[InputRequired(), Length(min=8, max=80)])
    
class RegisterForm(FlaskForm):
    email = StringField('', validators=[InputRequired(), Email(message='Invalid email'), Length(max=50)])
    username = StringField('', validators=[InputRequired(), Length(min=4, max=15)])
    password = PasswordField('', validators=[InputRequired(), Length(min=8, max=80)])


# base / index
@app.route('/')
@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/signup', methods = ['GET', 'POST'])
@app.route('/signup.html')
def signup():
    form = RegisterForm()

    if form.validate_on_submit():
       return '<h1>' + form.username.data + ' ' + form.password.data + ' '+ form.email.data +'</h1>'

    return render_template("signup.html", form = form)

@app.route('/login', methods = ['GET', 'POST'])
@app.route('/loginform.html')
def login():
    form = LoginForm()

    if form.validate_on_submit():
        return '<h1>' + form.username.data + ' ' + form.password.data + '</h1>'

    return render_template('loginform.html', form = form)

@app.route('/citysearch.html')
def search():
    return render_template('citysearch.html')

if __name__ == "__main__":
    app.run(debug=True)