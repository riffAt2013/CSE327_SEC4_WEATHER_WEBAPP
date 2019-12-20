
# PROJECT PROPOSAL

*ONLINE SERVICE FOR FASHION BASED ON CURRENT LOCATION WEATHER*
 
**Course Name : CSE 327 
Section : 4
Faculty : ABH3**
 

## Name : "WeatherCloset"

 WeatherCloset is a webapp built with python flask and basic web functionality for getting weather based clothing recommendation. Saves time!

## Team Information

  
|Name|ID  |
|--|--|
| Sium Ahmed| 1610861042 |
| Atkeya Amena | 1620141042 |
| Asaduzzaman | 1620401042 |
| Rifat Masud | 1721866642 |


## INTRODUCTION

 Accurate weather predictions are important for planning our day to day activities. We face a lot of problems in our daily life because of a bad or unexpected weather conditions. One of such is what to wear for a certain day. This can be a lot of struggle for even a good weather condition as our busy minds always like to keep messing up choices. What if there is a system which will not only inform you about current weather with simple visualization but also gives you suggestions/recommendations of clothing based on it and it lets you to buy various kinds of clothing according to your need. Our software/web-app helps you to make more informed daily decisions based on the weather information of your current location. You can also buy clothes suggested by the system in an e-commerce based solution

## OBJECTIVES

 

 - Dressing what-to for the busy people according to the weather
 - Alternative dresses for any weather
 -  Dress buying from various shops
 -  Can be used as Weather web-app
 - Recommendation of dresses for future dates and their weather
   condition

## APPLICATION FEATURES

 - Beautiful UI and visualizations 
 - Recommendation of dresses for any kind of weather based on location
 - Map visualization of location via API 
 - Alternate dresses for specific weather 
 - User profile creation and personalization 
 - Database support 
 - Sample dresses can be bought through the site
 - Specific date based recommendation of dresses (up to 7 days from current) 
 - Feedback System 
 - Responsive web pages 
    

## TOOLS AND DEPENDENCIES 
**FOR BACKEND :**

 - Python Programming Language 
 - Flask Microframework 
	- Werkzeug for WSGI (interface for application and servers)
	- Jinja2 for templating language 
	- Markupsafe for Jinja2 encryption 
	- ItsDangerous 
	- Click 
	- blinker 
	- certifi 
	- chardet 
	- dominate 
	- Flask-Admin 
	- Flask-Bootstrap 
	- Flask-Dance 
	- Flask-Login 
	- Flask-SQLAlchemy 
	- Flask-WTF 
	- idna 
	- itsdangerous 
	- Jinja2 
	- MarkupSafe 
	- oauthlib
	- passlib 
	- pycparser 
	- requests 
	- requests-oauthlib 
	- six 
	- SQLAlchemy 
	- SQLAlchemy-Utils 
	- urllib3 
	- URLObject 
	- visitor 
	- Werkzeug 
	- WTForms 
	
- SQLite3/MySQL for database 3 

**FOR FRONTEND :** 
 - HTML/CSS for skeleton and styling the UI 
 - Bootstrap front-end framework 
 - JQuery 
 - JavaScript
  
 **OAuth PROVIDERS :** 
 
 - Google 
 - Facebook


## STAKEHOLDERS

 General Public 
- Fashion Enthusiast
- Web Developers
- IT staff
- Retailers
- Delivery Staffs

## QUESTIONAIRES

-	How often do you search online for weather updates?
	-	20% : Not at all
	-	30% : Sometimes
	-	60% : Would do it more often if there was a good option available

-	Would you like the idea of dressing suggestions for any kind of weather?
	-	95% : Absouletly
	-	5% : I like to go manual-ish

-	If there is a website that will help you to get weather updates and other amenities. How do you want to get access to your profile on that site, by Facebook account/Google account?
	-	60% : Facebook
	-	20% : Google
	-	20% : Something Else

-	How important is privacy for you with your data being stored for re-login (i.e: Logged in once, after log-out asking prompt for re-use of some of the feature)? 
	-	100% : Very important

- Would you like the idea of buying clothes that is suggested by the system?
	-	70 %: Yes
	-	30 %: Maybe

- An AI will suggest you clothes. Are you OK with that?
	-	50 %: Yes
	-	50 %: Maybe
	-	20 %: Depends on the suggestion

- How important for you is User Interface aka are you OK with an app that just works?
	-	90 %: UI is important since it ensures ease-of-use
	-	10 %: I'm a pro at computer systems, IDC about UI

- The system might check your location if you dont manually provide one. Are you ok with that?
	-	70 %: Yes
	-	30 %: Maybe


- Would you use our system?
	-	70 %: Yes
	-	30 %: Maybe


## Requirement Specifications

**Functional Requirement:**
-	Accurate weather updates
-	Admin Controlling of Users
-	Automatic location identifying 
-	Manual location identifying
-	Dressing Suggestions for both male and female
-	Outlets for buying suggested clothing
-	Login and Logout system
-	User registration system
-	Dashboard for users
-	Ease of Use UI


**Non-Functional Requirement**:
-	Privacy
-	Authentication system
-	Ease of use (Simple and initiative UI design and well documented FAQ)
-	Backup storage in case of system failures
-	Light-weight front-end to ensure faster load time
-	Reliabilty via UnitTesting
-	Mobile Sites available
-	Sha256 based password encryption

**Requirement Prioritization**

We prioritized the requirements based on user interviews as well as our core objectives 

-	Accurate weather updates
-	location identifying
-	Dressing Suggestions for both male and female
-	User authentication system
-	Persistent Database
-	Ease of use (Simple UI)
-	Federated Identity Authorization
-	Admin based user handling
-	Responsiveness (Faster load time)
-	User profile Dashboard 

## Product Backlog (TO DOs)
![enter image description here](https://lh3.googleusercontent.com/1rN3eAJowGLnjnSFVcyRFRHjK_ZUy5S34j1hiX7f2zy5cv96hx_x4EsH2DeuW0wqeP9zJAiw_ABYfCWIAC1JMAV4Z7uGDWl-Sy1tjh3R3HuQmkkyXJE1epELuYN8FG8lFWx9YvrAJ3pkGzfJAW_vJmrGaE9WyQ6zx6bzUYz4bGtZArhp755gl45ZbMFBRCTgmvX9rq_9bGcVyWmqshWmEl39Bf70bsasWxr0k1eAH0tsTSfS7ubV_IzF2VFrUCEQfotPzC3pDiVocxHCLXbChOR2dwFqFc0BkbPg2UMtvsKDE6sf2uS2l3pxpo2zEFpdcWSOGl3BZCR77OBDJXC9pg_zdKwr2JDRYjvuL-JF55uiwXuxZWcDBIJdElu7uHWuhdp4Sg-ucbRnxZgNMsN3y7-tP85lfPTCeDggoaSlYiFzVEIA_ItNCw3ON2EywHxeck874860CbGj1LsZjyfP9zwuUGNVPWL8NHop8TcYe_2jeU-Ighe8XCpA-GxRvmNLd4vWkgvyyxpunwsQ-LJxnaH1FI_ii5_n88b_yb25CleLCrY8R31InZwXKW80kpzSAnfrrhGlX_wo_OTRNB3b4TJiLBh4eeawCL2RocKE9ZPsHPM2GG-Wo_ptmmw5kCuL0_hLfX0l84uBIg_dp9VPZfdSCtIU_NNGNWUNOJ1BFsFa6yf7YAskIHw=w660-h662-no)

## Installation for Development


Install the dependencies

```

pip install -r requirements.txt

```

Clone the repo or `git __repo_name__` it then `cd` if necessary

```

python start.py

```

  

then navigate to `https://localhost:5000` to check the website

  
  

## Checklist

  

- [x] SRS

- [x] SDS?

- [x] Project Proposal Upload

- [x] Use of GIT

- [x] Utilization of Popular framework (done by flask)

- [ ] Use of Artificial Intelligence

- [x] Use of Federated Identity provider

- [x] Source Code Comments

- [x] Unit Testing

- [x] UI Design

- [x] Cross Platform Implementation (UI Done)

- [ ] Internal Updates