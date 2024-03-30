from bson import ObjectId
from flask import render_template, Blueprint, session, jsonify, redirect, url_for
from mongoDB_drafts import workshops_subscriptions_table, workshops_table, customers_table

# private blueprint definition
private = Blueprint('private',
                    __name__,
                    static_folder='static',
                    static_url_path='/private',
                    template_folder='templates')
# routes


@private.route('/private', methods=['GET', 'POST'])
def index():
    first_name = session.get('first_name')  # Retrieve first_name from session
    my_subs = list(workshops_subscriptions_table.find({"email": session.get('userId')}))

    my_workshops = []
    for workshop_subscription in my_subs:
        current_workshop = workshops_table.find_one({"name": workshop_subscription['workshop_name']})

        current_workshop_dict = {}
        for key, value in current_workshop.items():
            if isinstance(value, ObjectId):  # Exclude ObjectId fields
                continue
            current_workshop_dict[key] = value
        my_workshops.append(current_workshop_dict)

    return render_template('private.html', current_page='private', workshops=my_workshops, first_name=first_name)


@private.route('/getWorkshopQuantity/<workshop_name>', methods=['GET'])
def get_workshop_quantity(workshop_name):
    user_id = session.get('userId')
    workshop_subscription = workshops_subscriptions_table.find_one({"email": user_id, "workshop_name": workshop_name})
    if workshop_subscription:
        data = jsonify({"quantity": workshop_subscription.get("quantity", 0),
                        "name": workshop_subscription.get("name"),
                        "date": workshop_subscription.get("date"),
                        "email": workshop_subscription.get("email")})
        return data
    else:
        return jsonify({"quantity": 0})


@private.route('/deleteWorkshop/<workshop_name>/<workshop_date>', methods=['GET'])
def delete_workshop(workshop_name, workshop_date):
    user_id = session.get('userId')
    ans = workshops_subscriptions_table.delete_one({"email": user_id, "workshop_name": workshop_name, "workshop_date": workshop_date})
    if ans:
        return redirect(url_for('private.index'))
    else:
        return jsonify({'success': False})


@private.route('/minus/<workshop_name>/<workshop_date>', methods=['GET'])
def minus(workshop_name, workshop_date):
    user_id = session.get('userId')
    workshop = workshops_subscriptions_table.find_one({"email": user_id, "workshop_name": workshop_name, "workshop_date": workshop_date})
    if workshop:
        current_quantity = workshop.get('quantity', 0)
        if current_quantity == 1:
            return jsonify({'success': False, 'message': 'כמות מינימום היא משתתף אחד. אם לא תוכל להגיע ניתן לבטל סדנא :('}), 400

        new_quantity = current_quantity - 1
        workshops_subscriptions_table.update_one({"workshop_name": workshop_name, "workshop_date": workshop_date},
                                                    {"$set": {"quantity": new_quantity}})
        return jsonify({'success': True})
    return jsonify({'success': False, 'message': 'ארעה שגיאה. אנא נסה שנית.'}), 400


@private.route('/plus/<workshop_name>/<workshop_date>', methods=['GET'])
def plus(workshop_name, workshop_date):
    user_id = session.get('userId')
    workshop = workshops_subscriptions_table.find_one({"email": user_id, "workshop_name": workshop_name, "workshop_date": workshop_date})
    if workshop:
        current_quantity = workshop.get('quantity', 0)
        if current_quantity == 5:
            return jsonify({'success': False, 'message': 'כמות מקסימום להרשמה אחת היא 5 משתתפים. ניתן להירשם תחת משתמש אחר :)'}), 400

        new_quantity = current_quantity + 1
        workshops_subscriptions_table.update_one({"workshop_name": workshop_name, "workshop_date": workshop_date},
                                                    {"$set": {"quantity": new_quantity}})
        return jsonify({'success': True})
    return jsonify({'success': False, 'message': 'ארעה שגיאה. אנא נסה שנית.'}), 400




