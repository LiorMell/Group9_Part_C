import pymongo
from flask import render_template, Blueprint, session, request, jsonify, redirect
from mongoDB_drafts import workshops_table, customers_table

# home blueprint definition
home = Blueprint('home',
                  __name__,
                  static_folder='static',
                  static_url_path='/home',
                  template_folder='templates')


def login_func(login_email, login_password):
    user = customers_table.find_one({"email": login_email})
    if user:
        if user["password"] == login_password:
            return True, None  # Login successful
        else:
            return False, "התקבלה סיסמא שגויה. אנא נסה שנית"  # Incorrect password
    else:
        return False, "המשתמש לא קיים. אנא להירשם לאתר!"  # User does not exist


# routes


@home.route('/home', methods=['GET', 'POST'])
@home.route('/')
def index():
    first_name = session.get('first_name')  # Retrieve first_name from session

    next_workshop_cursor = workshops_table.find().sort('date', 1).limit(1)
    num_workshops = len(list(next_workshop_cursor))
    next_workshop_cursor.rewind()  # Rewind cursor to the beginning
    next_workshop = next_workshop_cursor[0] if num_workshops > 0 else None
    return render_template('home.html', current_page='home', workshop=next_workshop, first_name=first_name)


@home.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.json
        login_email = data.get('login_email')
        login_password = data.get('login_password')

        login_success, message = login_func(login_email, login_password)

        if login_success:
            first_name = customers_table.find_one({"email": login_email})["first_name"]
            session['userId'] = login_email
            session['first_name'] = first_name
            return jsonify({'success': True, 'redirect': '/private', 'first_name': first_name}), 200
            # return render_template('private.html', current_page='private')
        else:
            # return "Login failed"
            return jsonify({'success': False, 'message': message, 'redirect': '/home'}), 200




@home.route('/logout')
def logout():
    session['userId'] = ''
    session['first_name'] = ''
    return redirect('/home')
