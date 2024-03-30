from flask import render_template, Blueprint, session

# about blueprint definition
about = Blueprint('about',
                  __name__,
                  static_folder='static',
                  static_url_path='/about',
                  template_folder='templates')
# routes


@about.route('/about', methods=['GET'])
def index():
    first_name = session.get('first_name')  # Retrieve first_name from session

    return render_template('about.html', current_page='about', first_name=first_name)
