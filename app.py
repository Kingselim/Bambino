from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)
CORS(app)

# 🔐 Clé API OpenRouter
API_KEY = "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"

# ==========================
# 🔵 ROUTE 1 : Chat médical
# ==========================
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    question = data.get("question", "").strip()

    if not question:
        return jsonify({"response": "Please enter a question."}), 400

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are a medical assistant specialized for pregnant women."},
            {"role": "user", "content": question}
        ]
    }

    try:
        res = requests.post("https://openrouter.ai/api/v1/chat/completions", json=payload, headers=headers)
        res.raise_for_status()
        result = res.json()
        reply = result["choices"][0]["message"]["content"]
        return jsonify({"response": reply})
    except Exception as e:
        return jsonify({"response": f"AI error: {str(e)}"}), 500

# ===============================
# 🔴 ROUTE 2 : Prédiction maladie
# ===============================

# Exemple de dataset
examples = [
    ("fatigue paleur vertige", "Anemia"),
    ("nausées vomissements douleurs abdominales", "Gastroenteritis"),
    ("fièvre frissons toux", "Flu"),
    ("douleurs abdominales constipation", "Constipation"),
    ("maux de tête fièvre nausées", "Migraine"),
    ("toux essoufflement douleurs thoraciques", "Asthma"),
]
texts, labels = zip(*examples)

# NLP + modèle ML
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)
model = RandomForestClassifier()
model.fit(X, labels)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    input_text = data.get('text', '')

    if not input_text.strip():
        return jsonify({"error": "Empty input"}), 400

    vect_input = vectorizer.transform([input_text])
    prediction = model.predict(vect_input)[0]
    proba = max(model.predict_proba(vect_input)[0])

    advice = {
        "Anemia": "Please consult a doctor for a blood test.",
        "Gastroenteritis": "Drink plenty of water and avoid raw foods.",
        "Flu": "Get rest and monitor your fever.",
        "Constipation": "Eat more fiber and stay hydrated.",
        "Migraine": "Rest in a dark room. Seek medical advice if it persists.",
        "Asthma": "Use your inhaler and avoid allergens."
    }.get(prediction, "Consult a healthcare professional.")

    return jsonify({
        "disease": prediction,
        "probability": round(proba, 2),
        "advice": advice
    })

# ===============
# 🚀 RUN FLASK APP
# ===============
if __name__ == '__main__':
    app.run(debug=True, port=5000)
