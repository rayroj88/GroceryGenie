import sqlite3

def query_lists():
    # Connect to the SQLite database
    conn = sqlite3.connect('shopping_list.db')
    c = conn.cursor()

    # Query the lists table to retrieve the saved lists
    c.execute("SELECT * FROM lists")
    lists = c.fetchall()

    # Print out the contents of each list
    for list_data in lists:
        list_id, list_data_json, created_at = list_data
        print(f"List ID: {list_id}")
        print(f"Created At: {created_at}")
        
        # Convert the JSON string back to a Python list
        list_items = eval(list_data_json)
        print("List Items:")
        for item in list_items:
            print(item)
        
        print()  # Print an empty line for better readability

    # Close the database connection
    conn.close()

# Call the function to query and print the lists
query_lists()