# ai-service/app.py
from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)

@app.route('/analyze-eeg', methods=['POST'])
def analyze_eeg():
    data = request.get_json()
    eeg_data = data.get('eegData')
    if eeg_data:
        # Dummy analysis: compute mean as "cognitive load"
        cognitive_load = float(np.mean(eeg_data))
    else:
        cognitive_load = 0.0

    analysis = {
        'cognitiveLoad': cognitive_load,
        'stressLevel': float(np.std(eeg_data)) if eeg_data else 0.0
    }
    return jsonify(analysis)

if __name__ == '__main__':
    app.run(port=5001, debug=True)
