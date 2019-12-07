from flask import Flask, render_template, redirect, url_for
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm 
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length
# for database connection over SQLite3
from flask_sqlalchemy import SQLAlchemy
# for encryption features
from werkzeug.security import generate_password_hash, check_password_hash
# for the admin panel
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
# for the login and log-out
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from config import Config

app = Flask(__name__)
# separate config init
app.config.from_object(Config)

# bootstrap initialization for forms __ might delete it later
bootstrap = Bootstrap(app)
# database initialization
database = SQLAlchemy(app)
admin = Admin(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'




# more columns needed
class User(UserMixin, database.Model):
    uid = database.Column(database.Integer, primary_key = True)
    username = database.Column(database.String(15), unique = True)
    email = database.Column(database.String(50), unique = True)
    password = database.Column(database.String(80))

    def get_id(self):
        return self.uid
    # representaion method for debugging querys
    def __repr__(self):
        return f'{self.uid} {self.username}'

admin.add_view(ModelView(User, database.session))

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

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
        # something else maybe
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
                login_user(user_to_check)
                # redirect to dashboard
                return redirect(url_for('search'))
        return '<h1>Iinvalid USer or pass</h1>'

    return render_template('loginform.html', form = form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))


# @app.route('/citysearch')
@app.route('/citysearch.html')
@login_required
def search():
    return render_template('citysearch.html')

if __name__ == "__main__":
    app.run(debug=True)


# for testing purpose I blocked citysearch.html so that it is only
# viewable when logged in. will change that to blocking marketplace/dashboard

# to do: block admin acssess