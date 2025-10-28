
from flask import Flask, render_template, request, send_file, url_for, jsonify
import qrcode
import json
from io import BytesIO
import os
import re

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/qrcodes'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

def is_valid_email(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)

@app.route('/generate-qr', methods=['POST'])
def generate_qr_from_node():
    data = request.get_json()

    # Get collageid from JSON payload
    collageID = data.get('collageID', '').strip()

    if not collageID:
        return jsonify({'error': 'collageid is required'}), 400

    # QR content
    qr_data = json.dumps({"collageID" : collageID})
    
    # Generate QR
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(qr_data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")

    filename = f"qr_{collageID}.png"
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    img.save(filepath)

    qr_url = url_for('static', filename=f'qrcodes/{filename}', _external=True)

    return jsonify({'qr_url': qr_url})

# Keep your friend’s existing `index()` route below as it is

if __name__ == '__main__':
    app.run(debug=True)
