from flask import Flask, render_template, redirect, url_for
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm 
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length 
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = "HELLONEARTH"
app.config['SQLALCHEMY_DATABASE_URI'] = r'sqlite:///C:\Users\RIFAT\Desktop\CSE327_SEC4_WEATHER_WEBAPP\database.db'
Bootstrap(app)
database = SQLAlchemy(app)


class User(database.Model):
    uid = database.Column(database.Integer, primary_key = True)
    username = database.Column(database.String(15), unique = True)
    email = database.Column(database.String(50), unique = True)
    password = database.Column(database.String(80))

    def __repr__(self):
        return f'{self.uid} {self.username}'

class LoginForm(FlaskForm):
    username = StringField('', validators=[InputRequired(), Length(min=4, max=15)])
    password = PasswordField('', validators=[InputRequired(), Length(min=8, max=80)])
    
class RegisterForm(FlaskForm):
    email = StringField('', validators=[InputRequired(), Email(message='Invalid Email'), Length(max=50)])
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
        hashed_pass = generate_password_hash(form.password.data, method = 'sha256')
        new_user = User(username = form.username.data, email = form.email.data, password = hashed_pass)
        database.session.add(new_user)
        database.session.commit()
        return '<h1>New User Has Been Created</h1>'
    return render_template("signup.html", form = form)


@app.route('/login', methods = ['GET', 'POST'])
@app.route('/loginform.html')
def login():
    form = LoginForm()

    if form.validate_on_submit():
        user_to_check = User.query.filter_by(username = form.username.data).first()
        if user_to_check:
            if check_password_hash(user_to_check.password, form.password.data):
                # redirect to dashboard
                return '<h1>You are in, but no dashboard</h1>'
        return '<h1>Iinvalid USer or pass</h1>'

    return render_template('loginform.html', form = form)

@app.route('/citysearch.html')
def search():
    return render_template('citysearch.html')

if __name__ == "__main__":
    app.run(debug=True)