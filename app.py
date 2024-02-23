from flask import Flask, render_template, request, redirect, url_for, session
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')
    
    # Logic once the landing page has been changed to the login
    #if 'user_id' in session:
        #return 'Logged in successfully!'
    #lse:
        #return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Placeholder for the basic authentication logic, this will need to be changed.
        username = request.form['username']
        password = request.form['password']
        
        # This is a placeholder, this will need to check against a databse in the future?
        if username == "admin" and password == "password":
            session['user_id'] = username
            return redirect(url_for('home'))
        else:
            return 'Invalid credentials'
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
