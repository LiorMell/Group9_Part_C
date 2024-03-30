from flask import render_template, Blueprint, session

# gallery blueprint definition
gallery = Blueprint('gallery',
                  __name__,
                  static_folder='static',
                  static_url_path='/gallery',
                  template_folder='templates')
# routes


@gallery.route('/gallery', methods=['GET'])
def index():
    first_name = session.get('first_name')  # Retrieve first_name from session

    return render_template('gallery.html', current_page='gallery', first_name=first_name)
