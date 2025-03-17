from flask import Flask,render_template
app = Flask(__name__)


@app.route('/')
def index():
    try:
        return render_template('index.html')
    except Exception as e:
        print("Error",str(e))
        return render_template('error.html')

@app.route('/about')
def about():
    try :
        return render_template('about.html')
    except Exception as e:
        print("Error",str(e))
        return render_template('error.html')
    
@app.route('/help')
def help():
    try :
        return render_template('help.html')
    except Exception as e:
        print("Error",str(e))
        return render_template('error.html')

if __name__ == "__main__":
    app.run(debug=True , port="8080",host="0.0.0.0")