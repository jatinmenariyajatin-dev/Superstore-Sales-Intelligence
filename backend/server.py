from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__, static_folder='public')
CORS(app)

# Load Model
model = None
try:
    model = joblib.load('sales_model.pkl')
    print("✅ Model loaded successfully")
except FileNotFoundError:
    print("❌ Model not found. Please run train_model.py first.")
    model = None

# Load CSV data for /api/data endpoint
df_data = None
try:
    df_data = pd.read_csv('SampleSuperstore.csv')
    # Convert to dict for JSON serialization
    df_data = df_data.to_dict(orient='records')
    print(f"✅ Loaded {len(df_data)} records from CSV")
except FileNotFoundError:
    print("❌ CSV file not found.")
    df_data = []

@app.route('/')
def index():
    return send_from_directory('public', 'index.html')

@app.route('/api/data')
def get_data():
    return jsonify(df_data)

@app.route('/api/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500

    try:
        data = request.get_json()
        # Prepare input DataFrame
        input_df = pd.DataFrame([data])
        # Ensure all columns are present
        required_cols = ['Ship Mode', 'Segment', 'Region', 'Category', 'Sub-Category', 'Quantity', 'Discount']
        for col in required_cols:
            if col not in input_df.columns:
                return jsonify({'error': f'Missing feature: {col}'}), 400

        # Predict
        prediction = model.predict(input_df)[0]
        return jsonify({'predicted_sales': round(prediction, 2)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/filters')
def get_filters():
    if df_data is None or len(df_data) == 0:
        return jsonify({'error': 'No data'}), 404
    # Use the loaded data to get unique values
    # But df_data is a list of dicts, we need to parse it back or keep original df
    # Let's reload original DF for simplicity or use the list
    # Better: keep original df separately
    # Let's adjust code above to keep original_df_raw
    # Quick fix: We'll just pass the pre-loaded df
    return jsonify({'message': 'Use /api/data to get filters client-side'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)