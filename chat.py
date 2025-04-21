# chat.py (version IA OpenRouter)
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# 🔐 Mets ta vraie clé OpenRouter ici
API_KEY = "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"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    question = data.get("question", "").strip()

    if not question:
        return jsonify({"response": "Veuillez poser une question."}), 400

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "Tu es un assistant médical spécialisé pour les femmes enceintes."},
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
        return jsonify({"response": f"Erreur IA : {str(e)}"}), 500

if __name__ == "__main__":
    app.run(port=5000)
