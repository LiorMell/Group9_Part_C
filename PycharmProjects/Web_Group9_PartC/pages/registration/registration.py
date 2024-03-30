from flask import render_template, Blueprint, request, session, jsonify, url_for
from mongoDB_drafts import customers_table

# registration blueprint definition
registration = Blueprint('registration',
                         __name__,
                         static_folder='static',
                         static_url_path='/registration',
                         template_folder='templates')


# functions
def new_customer_func(customer_email, data):
    user = customers_table.find_one({"email": customer_email})
    if not user:
        create_customer(data)
        return True
    return False


def create_customer(data):
    new_customer = {
        "email": data['customer_email'],
        "password": data['customer_password'],
        "first_name": data['customer_first_name'],
        "last_name": data['customer_last_name'],
        "phone": data['customer_phone'],
        "birthdate": data['customer_birthdate'],
        "card_number": data['card_number'],
        "card_valid_until": data['card_valid_until'],
        "CCV": data['CCV']
    }
    customers_table.insert_one(new_customer)


# routes
@registration.route('/registration', methods=['GET', 'POST'])
def index():
    first_name = session.get('first_name')  # Retrieve first_name from session

    return render_template('registration.html', current_page='home', first_name=first_name)


@registration.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.json
        customer_email = data.get('customer_email')
        if new_customer_func(customer_email, data):
            first_name = customers_table.find_one({"email": customer_email})["first_name"]
            session['userId'] = customer_email
            session['first_name'] = first_name
            return jsonify({'success': True, 'redirect': '/workshops', 'first_name': first_name}), 200
        return jsonify({'success': False, 'message': 'Email already exists'}), 200
