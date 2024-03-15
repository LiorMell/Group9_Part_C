from flask import render_template, blueprints, Blueprint, session
from mongoDB_drafts import workshops_table

# workshops blueprint definition
workshops = Blueprint('workshops',
                  __name__,
                  static_folder='static',
                  static_url_path='/workshops',
                  template_folder='templates')
# routes


@workshops.route('/workshops', methods=['GET', 'POST'])
def index():
    first_name = session.get('first_name')  # Retrieve first_name from session

    sorted_workshops = list(workshops_table.find().sort('date', 1))
    for workshop in sorted_workshops:
        workshop['_id'] = str(workshop['_id'])  # Convert ObjectId to string
    return render_template('workshops.html', current_page='workshops', workshops=sorted_workshops, first_name=first_name)


