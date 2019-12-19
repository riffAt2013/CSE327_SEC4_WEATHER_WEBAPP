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
from flask_dance.consumer.storage.sqla import OAuthConsumerMixin, SQLAlchemyStorage
from flask_dance.consumer import oauth_authorized
from sqlalchemy.orm.exc import NoResultFound

app = Flask(__name__)

app.config['SECRET_KEY'] = "HELLONEARTH"
app.config['SQLALCHEMY_DATABASE_URI'] = r'sqlite:///C:\Users\RIFAT\Desktop\CSE327_SEC4_WEATHER_WEBAPP\database.db'
app.config['OAUTHLIB_INSECURE_TRANSPORT'] = 1

# bootstrap initialization for forms __ might delete it later
bootstrap = Bootstrap(app)
# database initialization
database = SQLAlchemy(app)

# for login purpose
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


# oauth purpose, flask-dance abstracts the oauth workflow by creating 
# a blueprint
google_blueprint = make_google_blueprint(client_id='447064919877-0dpjllbe730nl92fq91al64s3sn382v0.apps.googleusercontent.com', client_secret='rsSjE8FBmRSLn1swjggZmVZG')
app.register_blueprint(google_blueprint, url_prefix = '/goo_login', offline=True)

facebook_blueprint = make_facebook_blueprint(client_id='2416104115296423', client_secret='599d3d90bd2a5b9dfa19a219a418dc76')
app.register_blueprint(facebook_blueprint, url_prefix='/face_login')
    

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

# oveerwriting admin index view so that not anyone can log-in
class OverWrittenIndexView(AdminIndexView):
    def is_accessible(self):
        return current_user.is_authenticated

# for the admin panel
admin = Admin(app, name="Hi Admin!", index_view=OverWrittenIndexView())
admin.add_view(ModelView(User, database.session))



# creates flask_dance_oauth table by iteself, we created a relashionship with 
# user class using uid as a foreignkey
class OAuth(OAuthConsumerMixin, database.Model):
    user_id = database.Column(database.Integer, database.ForeignKey(User.uid))
    user = database.relationship(User)

# storage for all the oauth response users
google_blueprint.storage = SQLAlchemyStorage(OAuth, database.session, user=current_user, user_required=False)
facebook_blueprint.storage = SQLAlchemyStorage(OAuth, database.session, user=current_user, user_required=False)


# login manager workflow simplified by flask-login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# webform classes
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

# manual signup
@app.route('/signup', methods = ['GET', 'POST'])
@app.route('/signup.html')
def signup():
    form = RegisterForm()

    if form.validate_on_submit():
        # sha256 encrypted hashed pass using werkzeug security
        hashed_pass = generate_password_hash(form.password.data, method = 'sha256')
        new_user = User(username = form.username.data, email = form.email.data, password = hashed_pass)
        database.session.add(new_user)
        database.session.commit()
        # something else maybe
        return '<h1>New User Has Been Created</h1>'
    return render_template("signup.html", form = form)


# login route for login purpose
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
    if google.authorized == False:
        return redirect(url_for('google.login'))
    else:
        return redirect(url_for('search'))


@oauth_authorized.connect_via(google_blueprint)
def google_logged_in(blueprint, token):
    acc_info = blueprint.session.get("/oauth2/v1/userinfo")
    if acc_info.ok:
        acc_json = acc_info.json()
        username = acc_json['name']
        # somehow json response e email key nai :()
        # email = acc_json['email']
        query = User.query.filter_by(username=username)

        try:
            user = query.one()
        except NoResultFound:
            user = User(username=username, password="blank_not_needed")
            database.session.add(user)
            database.session.commit()
        login_user(user)


@app.route('/facebook')
def face_login():
    if not facebook.authorized:
        return redirect(url_for('facebook.login'))

    return redirect(url_for('search'))

@oauth_authorized.connect_via(facebook_blueprint)
def facebook_logged_in(blueprint, token):
    acc_info = blueprint.session.get("/me")
    if acc_info.ok:
        acc_json = acc_info.json()
        username = acc_json['name']
        query = User.query.filter_by(username=username)

        try:
            user = query.one()
        except NoResultFound:
            user = User(username=username, password="blank_not_needed")
            database.session.add(user)
            database.session.commit()
        login_user(user)


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