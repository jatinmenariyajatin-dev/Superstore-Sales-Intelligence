import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, r2_score

print("Loading data...")
df = pd.read_csv('SampleSuperstore.csv')
print(f"Loaded {len(df)} rows")

# Features & Target
features = ['Ship Mode', 'Segment', 'Region', 'Category', 'Sub-Category', 'Quantity', 'Discount']
X = df[features]
y = df['Sales']

# Preprocessing
categorical_cols = ['Ship Mode', 'Segment', 'Region', 'Category', 'Sub-Category']
numeric_cols = ['Quantity', 'Discount']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', 'passthrough', numeric_cols),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)
    ])

# Pipeline
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
])

# Train/Test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("Training model...")
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f"MAE: ${mae:.2f}")
print(f"R²: {r2:.4f}")

# Save model
joblib.dump(model, 'sales_model.pkl')
print("Model saved as 'sales_model.pkl'")