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
from flask_admin import Admin, AdminIndexView
from flask_admin.contrib.sqla import ModelView
# for the login and log-out
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from flask_dance.contrib.facebook import make_facebook_blueprint, facebook
from flask_dance.contrib.google import make_google_blueprint, google
from flask_dance.contrib.github import make_github_blueprint, github
from config import Config

app = Flask(__name__)
# separate config init
app.config.from_object(Config)

# bootstrap initialization for forms __ might delete it later
bootstrap = Bootstrap(app)
# database initialization
database = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

google_blueprint = make_google_blueprint(client_id='447064919877-uedetdphik6lpi7the2q9a2giusnql8b.apps.googleusercontent.com', client_secret='4ZOonc_edC3DORUtusDA8OZH')
app.register_blueprint(google_blueprint, url_prefix = '/goo_login')

github_blueprint = make_github_blueprint(client_id='81ced90e1bde7caca0fd', client_secret='94d3f2f46fe3e37a80f3a22add93f39974ef236c')
app.register_blueprint(github_blueprint, url_prefix = '/git_login')


facebook_blueprint = make_facebook_blueprint(client_id='2416104115296423', client_secret='599d3d90bd2a5b9dfa19a219a418dc76')
app.register_blueprint(facebook_blueprint, url_prefix='/face_login')


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

class OverWrittenIndexView(AdminIndexView):
    def is_accessible(self):
        return current_user.is_authenticated

admin = Admin(app, name="Hi Admin!", index_view=OverWrittenIndexView())
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
        return '<h1>Invalid User or pass</h1>'

    return render_template('loginform.html', form = form)
    

@app.route('/google')
def google_login():
    if not google.authorized:
        return redirect(url_for('google.login'))
    acc_info = google.get("/oauth2/v1/userinfo")
    if acc_info.ok:
        acc_json = acc_info.json()

        return '<h1>Your google is {}</h1>'.format(acc_json['name'])
    return "<h1> SHIIT !</h1>"



@app.route('/facebook')
def face_login():
    if not facebook.authorized:
        return redirect(url_for('facebook.login'))
    acc_info = facebook.get("/me")
    if acc_info.ok:
        acc_json = acc_info.json()
        return '<h1>Your facebook id is {}</h1>'.format(acc_json['name'])

    return "<h1> SHIIT !</h1>"


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