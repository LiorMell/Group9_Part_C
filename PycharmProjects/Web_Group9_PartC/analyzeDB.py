from mongoDB_drafts import customers_table, workshops_table, workshops_subscriptions_table


# ----------- workshops --------------
customers = customers_table.find()
for customer in customers:
    print(customer)

workshops = workshops_table.find().sort('date', 1)
for workshop in workshops:
    print(workshop)

workshops_subscriptions = workshops_subscriptions_table.find()
for workshop in workshops_subscriptions:
    print(workshop)

# --------------------------------- INSERT DATA --------------------------
# workshops_list = [
#     {
#         'name': 'סדנת סושי',
#         'date': "2024-04-29",
#         'time': "19:00",
#         'chef': 'אבי ברק',
#         'price': 350,
#         'city': "נתניה",
#         'photo': "static/img/Sushi.png",
#         'background_color': "lightpink"
#     },
#     {
#         'name': 'סדנת בשרים',
#         'date': "2024-03-05",
#         'time': "19:00",
#         'chef': 'יהודה לביא',
#         'price': 350,
#         'city': "תל אביב",
#         'photo': "static/img/Meat.png",
#         'background_color': "lavender"
#     },
#     {
#         'name': 'סדנה איטלקית',
#         'date': "2024-03-19",
#         'time': "20:00",
#         'chef': 'חיים כהן',
#         'price': 300,
#         'city': "ירושלים",
#         'photo': "static/img/Italian.jpg",
#         'background_color': "lightgoldenrodyellow"
#     },
#     {
#         'name': 'סדנת קינוחים צרפתיים',
#         'date': "2024-04-10",
#         'time': "19:00",
#         'chef': 'מיכל כהן',
#         'price': 300,
#         'city': "חיפה",
#         'photo': "static/img/FrenchDesserts.jpeg",
#         'background_color': "lightcyan"
#     },
#     {
#         'name': 'סדנת בישול יפני',
#         'date': "2024-04-20",
#         'time': "18:30",
#         'chef': 'יוסי ימין',
#         'price': 350,
#         'city': "תל אביב",
#         'photo': "static/img/JapaneseCooking.jpeg",
#         'background_color': "bisque"
#     },
#     {
#         'name': 'סדנת עוגות ללא גלוטן',
#         'date': "2024-05-02",
#         'time': "17:00",
#         'chef': 'נעמה כהן',
#         'price': 200,
#         'city': "ירושלים",
#         'photo': "static/img/GlutenFreeCakes.jpg",
#         'background_color': "lemonchiffon"
#     }
# ]
# workshops.insert_many(workshops_list)



# customers_list = [
#     {
#         'email': 'emily.jackson@example.com',
#         'password': 'Pass9876',
#         'first_name': 'אמילי',
#         'last_name': 'יעקב',
#         'phone': '0526789012',
#         'birthdate': '1988-08-15',
#         'card_number': '5412765432198765',
#         'card_valid_until': '12/24',
#         'CCV': '789'
#     },
#     {
#         'email': 'michael.johnson@example.com',
#         'password': '1234Bcd',
#         'first_name': 'מיכאל',
#         'last_name': 'דוד',
#         'phone': '0507890123',
#         'birthdate': '1985-11-30',
#         'card_number': '6011543208765432',
#         'card_valid_until': '03/26',
#         'CCV': '321'
#     },
#     {
#         'email': 'sarah.wilson@example.com',
#         'password': 'AbCd1234',
#         'first_name': 'שרה',
#         'last_name': 'וילסון',
#         'phone': '0548901234',
#         'birthdate': '1992-04-12',
#         'card_number': '4916543209870123',
#         'card_valid_until': '06/27',
#         'CCV': '987'
#     },
#     {
#         'email': 'david.thompson@example.com',
#         'password': 'Pass4567',
#         'first_name': 'דודו',
#         'last_name': 'לוי',
#         'phone': '0549012345',
#         'birthdate': '1983-09-28',
#         'card_number': '3412765432198076',
#         'card_valid_until': '11/28',
#         'CCV': '654'
#     },
#     {
#         'email': 'shelly.roberts@example.com',
#         'password': 'Password1',
#         'first_name': 'שלי',
#         'last_name': 'רוברטס',
#         'phone': '0520123456',
#         'birthdate': '1995-12-03',
#         'card_number': '3716543209870987',
#         'card_valid_until': '07/23',
#         'CCV': '789'
#     }
# ]
# customers.insert_many(customers_list)
#

# workshops_subscriptions_list = [
#     {
#         'first_name': 'אמילי',
#         'last_name': 'יעקב',
#         'phone': '0526789012',
#         "email": 'emily.jackson@example.com',
#         'workshop_name': 'סדנת סושי',
#         'workshop_date': '2024-04-29',
#         'quantity': '2',
#         'allergies': ''
#     },
#     {
#         'first_name': 'אמילי',
#         'last_name': 'יעקב',
#         'phone': '0526789012',
#         'email': 'emily.jackson@example.com',
#         'workshop_name': 'סדנת בישול יפני',
#         'workshop_date': '2024-04-20',
#         'quantity': '4',
#         'allergies': ''
#     },
#     {
#         'first_name': 'מיכאל',
#         'last_name': 'דוד',
#         'phone': '0507890123',
#         'email': 'michael.johnson@example.com',
#         'workshop_name': 'סדנת בישול יפני',
#         'workshop_date': '2024-04-20',
#         'quantity': '2',
#         'allergies': ''
#     }
# ]
# workshops_subscriptions.insert_many(workshops_subscriptions_list)