from flask import render_template, Blueprint, redirect, request, session, jsonify
from mongoDB_drafts import workshops_subscriptions_table, customers_table

# workshopSubscription blueprint definition
workshopSubscription = Blueprint('workshopSubscription',
                  __name__,
                  static_folder='static',
                  static_url_path='/workshopSubscription',
                  template_folder='templates')
# routes


def create_sub(data):
    new_subscription = {
        "first_name": data['customer_first_name'],
        "last_name": data['customer_last_name'],
        "email": data['customer_email'],
        "phone": data['customer_phone'],
        "allergy": data['customer_allergy'],
        "workshop_name": data['workshop_name'],
        "workshop_date": data['workshop_date'],
        "quantity": data['quantity']
    }
    workshops_subscriptions_table.insert_one(new_subscription)


@workshopSubscription.route('/workshopSubscription', methods=['GET', 'POST'])
def index():
    first_name = session.get('first_name')  # Retrieve first_name from session

    return render_template('workshopSubscription.html', first_name=first_name)


@workshopSubscription.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        data = request.json
        customer_email = data.get('customer_email')
        print(session['userId'])

        if session['userId']:
            if customer_email == session['userId']:
                # User is logged in and the submitted email matches the logged-in user's email
                first_name = customers_table.find_one({"email": customer_email})["first_name"]
                create_sub(data)
                return jsonify({'success': True, 'redirect': '/workshops', 'first_name': first_name}), 200
            else:
                return jsonify({'success': False, 'message': 'Must use customer email for subscription'}), 200
        else:
            return jsonify({'success': False,  'message': 'Please connect first'}), 200