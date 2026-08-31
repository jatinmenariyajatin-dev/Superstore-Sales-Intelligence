# Superstore Sales Intelligence

> **AI-powered retail analytics and sales prediction system built with Python, Flask, Pandas, and Machine Learning.**

Superstore Sales Intelligence is a Machine Learning-based web application designed to analyze Superstore retail data and predict sales based on shipping, customer segment, region, product category, quantity, and discount.

The application provides a **Flask REST API** that connects the trained Machine Learning model with a web-based frontend.

---

## 🚀 Features

* 📊 Superstore retail data analysis
* 🤖 Machine Learning-based sales prediction
* 🔮 Real-time sales prediction through REST API
* 🌐 Flask-based web application
* 📡 RESTful API endpoints
* 📁 CSV dataset integration
* 🔍 Feature validation
* ⚡ Fast prediction response
* 🌍 CORS support for frontend communication
* 🛡️ Error handling for missing files and invalid requests
* 📈 Ready for interactive analytics dashboard

---

## 🛠️ Tech Stack

| Technology          | Purpose                        |
| ------------------- | ------------------------------ |
| Python              | Core programming language      |
| Flask               | Backend web framework          |
| Flask-CORS          | Cross-Origin Resource Sharing  |
| Pandas              | Data processing                |
| Scikit-learn        | Machine Learning               |
| Joblib              | Model serialization            |
| HTML/CSS/JavaScript | Frontend                       |
| REST API            | Frontend-backend communication |

---

## 📂 Project Structure

```text
Superstore-Sales-Intelligence/
│
├── public/
│   └── index.html
│
├── sales_model.pkl
├── SampleSuperstore.csv
├── train_model.py
├── server.py
├── requirements.txt
└── README.md
```

---

## 📊 Dataset

The project uses the **Sample Superstore dataset**, containing retail information related to customers, products, shipping, discounts, quantity, and sales.

### Important Dataset Features

* Ship Mode
* Segment
* Region
* Category
* Sub-Category
* Quantity
* Discount
* Sales

---

## 🧠 Machine Learning

The application uses a trained Machine Learning model stored as:

```text
sales_model.pkl
```

The model is loaded using Joblib:

```python
model = joblib.load('sales_model.pkl')
```

The model receives the following input features:

```text
Ship Mode
Segment
Region
Category
Sub-Category
Quantity
Discount
```

and returns the predicted sales value.

---

## 🔮 Sales Prediction

### API Endpoint

```http
POST /api/predict
```

### Request Body

```json
{
  "Ship Mode": "Second Class",
  "Segment": "Consumer",
  "Region": "West",
  "Category": "Technology",
  "Sub-Category": "Phones",
  "Quantity": 2,
  "Discount": 0.1
}
```

### Response

```json
{
  "predicted_sales": 245.67
}
```

The predicted sales value is rounded to two decimal places.

---

## 📡 API Endpoints

### 🏠 Home

```http
GET /
```

Serves the frontend `index.html` file from the `public` directory.

---

### 📊 Get Dataset

```http
GET /api/data
```

Returns the complete Superstore dataset in JSON format.

Example:

```json
[
  {
    "Ship Mode": "Second Class",
    "Segment": "Consumer",
    "Region": "West",
    "Category": "Technology"
  }
]
```

---

### 🔮 Predict Sales

```http
POST /api/predict
```

Uses the trained Machine Learning model to predict sales.

#### Required Features

```text
Ship Mode
Segment
Region
Category
Sub-Category
Quantity
Discount
```

If a required feature is missing, the API returns an error.

Example:

```json
{
  "error": "Missing feature: Quantity"
}
```

---

### 🔍 Filters

```http
GET /api/filters
```

The current implementation directs the frontend to use `/api/data` for client-side filtering.

---

## 🔄 System Workflow

```text
              SampleSuperstore.csv
                       │
                       ▼
                Data Processing
                       │
                       ▼
                Model Training
                       │
                       ▼
                sales_model.pkl
                       │
                       ▼
                 Flask Backend
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
      /api/data   /api/predict  /api/filters
          │            │
          ▼            ▼
       Dataset     ML Prediction
          │            │
          └──────┬─────┘
                 ▼
              Frontend
                 │
                 ▼
        Sales Intelligence
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

Navigate to the project:

```bash
cd Superstore-Sales-Intelligence
```

---

### 2. Create Virtual Environment

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

For macOS/Linux:

```bash
source venv/bin/activate
```

---

### 3. Install Dependencies

Using `requirements.txt`:

```bash
pip install -r requirements.txt
```

Or install the required packages manually:

```bash
pip install flask flask-cors pandas joblib scikit-learn
```

---

## 🤖 Train the Model

Make sure `train_model.py` is available.

Run:

```bash
python train_model.py
```

After successful training, the model file should be generated:

```text
sales_model.pkl
```

The Flask application loads this file automatically when the server starts.

---

## ▶️ Run the Application

Start the Flask server:

```bash
python server.py
```

The application will run on:

```text
http://127.0.0.1:5000
```

Open the address in your browser:

```text
http://127.0.0.1:5000
```

---

## 🛡️ Error Handling

The backend handles common errors such as:

### Model Not Found

```text
Model not found. Please run train_model.py first.
```

### CSV Not Found

```text
CSV file not found.
```

### Missing Feature

```json
{
  "error": "Missing feature: Category"
}
```

### Model Not Loaded

```json
{
  "error": "Model not loaded"
}
```

---

## 🌐 CORS Support

The application uses Flask-CORS:

```python
CORS(app)
```

This allows the frontend to communicate with the Flask API during development.

---

## 📈 Key Objectives

The main objectives of **Superstore Sales Intelligence** are:

* Analyze retail sales data
* Understand customer and product patterns
* Use Machine Learning for sales prediction
* Provide a simple REST API
* Connect ML predictions with a web interface
* Create a foundation for a complete retail analytics dashboard

---

## 🔮 Future Enhancements

* 📊 Interactive sales dashboard
* 📈 Sales trend visualization
* 💰 Profit prediction
* 👥 Customer segmentation
* 🏆 Top-selling product analysis
* 🗺️ Regional sales analysis
* 📅 Monthly and yearly sales forecasting
* 🤖 Comparison of multiple ML algorithms
* 📥 Export analytics reports
* 🔐 User authentication
* ☁️ Cloud deployment
* 📱 Responsive UI

---

## 💻 Example Project Flow

```text
User
 │
 ▼
Web Interface
 │
 ▼
Flask REST API
 │
 ├── Dataset API
 │
 └── Prediction API
        │
        ▼
 Machine Learning Model
        │
        ▼
 Predicted Sales
        │
        ▼
 Web Interface
```

---

## ⭐ Why This Project?

**Superstore Sales Intelligence** combines:

* Data Analytics
* Machine Learning
* Backend Development
* REST API Development
* Web Development

into a single end-to-end project.

It demonstrates how a trained Machine Learning model can be integrated into a real web application to provide useful business intelligence.

---

## 👨‍💻 Author

**Jatin Menariya**

### Project

**Superstore Sales Intelligence**

> AI-powered retail analytics and sales prediction system.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
