================================================================================

                    📊 SUPERSTORE SALES DASHBOARD

================================================================================



A full-stack data analytics dashboard for the Superstore Sales dataset with 

exploratory analysis, interactive filters, and machine learning-powered 

sales prediction.



================================================================================

                            🚀 FEATURES

================================================================================



- Interactive Dashboard – KPIs, bar charts, scatter plots, and filters 

  (Region, Category, Segment).



- Dark/Light Theme – Toggle between themes with a single click.



- CSV Upload Fallback – If the CSV cannot be fetched from the server, 

  you can upload it manually.



- Machine Learning Integration – Predict sales using a trained 

  Random Forest model.



- REST API – Backend endpoints to serve data and make predictions.



- Responsive Design – Works on desktop, tablet, and mobile.



================================================================================

                          🛠️ TECHNOLOGIES

================================================================================



Frontend  : HTML5, CSS3, JavaScript, Chart.js, Papa Parse

Backend   : Python, Flask, Flask-CORS

ML        : scikit-learn (Random Forest), pandas, numpy, joblib

Data      : SampleSuperstore.csv (9,994 rows)



================================================================================

                          📁 PROJECT STRUCTURE

================================================================================



superstore-dashboard/

├── public/

│   ├── index.html          # Main dashboard page

│   └── script.js           # All JavaScript logic (separate file)

├── SampleSuperstore.csv    # Dataset

├── train_model.py          # Train ML model and save pipeline

├── server.py               # Flask backend with API endpoints

├── requirements.txt        # Python dependencies

└── README.txt              # This file



================================================================================

                        📦 SETUP & INSTALLATION

================================================================================



OPTION 1 – FRONTEND ONLY (Quick Start)



You can run the dashboard without a backend – just open the HTML file.



1. Clone/download the project files.

2. Place SampleSuperstore.csv in the same folder as index.html.

3. Open index.html using one of these methods:

   - VS Code Live Server – Right-click → Open with Live Server.

   - Python HTTP Server – Run: python -m http.server 8000

     then visit http://localhost:8000

   - Double-click – If you open directly via file:// protocol,

     the automatic fetch will fail, but you can use the "Load CSV"

     button to upload the file manually.



OPTION 2 – FULL-STACK WITH ML BACKEND



For advanced features like sales prediction, run the Python backend.



1. Install Python 3.8+ and the required packages:

   pip install -r requirements.txt



2. Train the ML model:

   python train_model.py

   This generates sales_model.pkl and feature_columns.pkl



3. Start the Flask server:

   python server.py



4. Visit http://localhost:5000 in your browser.



NOTE: The frontend will automatically fetch data from the backend APIs.

      If the backend is not running, the file upload fallback will still work.



================================================================================

                        🔌 BACKEND API ENDPOINTS

================================================================================



Endpoint       | Method | Description

---------------|--------|-----------------------------------------------

/api/data      | GET    | Returns the entire dataset as JSON.

/api/filters   | GET    | Returns unique values for Region, Category, Segment.

/api/predict   | POST   | Accepts input features and returns predicted sales.

/api/health    | GET    | Health check – returns status of data and model.



EXAMPLE PREDICTION REQUEST:



POST /api/predict

Content-Type: application/json



{

  "Ship Mode": "Standard Class",

  "Segment": "Consumer",

  "Region": "West",

  "Category": "Technology",

  "Sub-Category": "Phones",

  "Quantity": 3,

  "Discount": 0.1

}



RESPONSE:



{

  "predicted_sales": 452.87,

  "input": { ... }

}



================================================================================

                          📊 DASHBOARD INSIGHTS

================================================================================



The dashboard automatically displays:



- Total Sales, Total Profit, Profit Margin, and Order Count.

- Sales by Category – Which product categories drive revenue.

- Profit by Category – Which categories are most profitable.

- Profit by Region – Geographic performance.

- Top 10 Cities by Profit – Best-performing cities.

- Profit by Sub-Category – Green bars for profit, red for losses.

- Discount vs Profit – Scatter plot showing how discounts affect profitability.



All charts update instantly when you apply filters from the sidebar.



================================================================================

                        🤖 MACHINE LEARNING MODEL

================================================================================



The train_model.py script:



- Uses Random Forest Regressor (150 trees, max_depth=15).

- Trains on features: Ship Mode, Segment, Region, Category, Sub-Category,

  Quantity, Discount.

- Target: Sales.

- Achieves an R² score of approximately 0.75 and MAE of ~$30–$50

  (varies with data split).

- The trained model is saved as sales_model.pkl and can be reused by

  the Flask server.



================================================================================

                            📄 LICENSE

================================================================================



This project is open-source and available under the MIT License.



================================================================================

                            🙌 CREDITS

================================================================================



- Dataset: Sample Superstore (public domain)

  https://www.kaggle.com/datasets/bravehart101/sample-superstore



- Built with ❤️ using Chart.js, Papa Parse, Flask, and scikit-learn.



================================================================================

                          🤝 CONTRIBUTING

================================================================================



Feel free to fork this repository, raise issues, or submit pull requests.

Contributions are welcome!



================================================================================

                      📈 ENJOY EXPLORING YOUR SALES DATA!

================================================================================