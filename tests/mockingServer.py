"""

  ManageWine mocking server

"""

from flask import Flask
app = Flask(__name__)

# TODO: Migrate big JSON strings to an object at the bottom of the script

@app.route("/",methods=["GET"])
def hello():
  return "Hello World!"

"""
   Wine detail
"""
@app.route("/wine/<wine_id>",methods=["GET"])
def wineDetails(wine_id):
  return ("""
      // TODO: EXAMPLE JSON HERE
      """,200,{
        "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE",
        "Access-Control-Allow-Origin":"*",
        "Connection":"Keep-Alive",
        "Content-Length":"915",
        "Content-Type":"application/json",
        "Date":"Mon, 06 May 2013 17:46:39 GMT",
        "Keep-Alive":"timeout=5, max=100",
        "Server":"Apache/2.2.22 (Ubuntu)",
        "X-Powered-By":"PHP/5.3.10-1ubuntu3.6"
        })

  if __name__ == "__main__":
    app.run()
