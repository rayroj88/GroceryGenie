import sqlite3

# Connect to the database
conn = sqlite3.connect('shopping_list.db')

# Create a cursor object
cursor = conn.cursor()

# Create the items table if it doesn't exist
cursor.execute('''CREATE TABLE IF NOT EXISTS items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    item_text TEXT
                )''')

# Commit the transaction
conn.commit()

# Execute a query to fetch items from the table
cursor.execute("SELECT * FROM items")

# Fetch the results
rows = cursor.fetchall()

if len(rows) == 0:
    print("The items table is empty.")
else:
    # Print the contents of the items table
    for row in rows:
        print(row)

# Close the connection
conn.close()