# ============================================================
# FASTAPI SERVICE
# Serves my trained DeepfakeDetector model via REST API
# ============================================================

import sys
import os

# Add model/src to path so we can import model.py and dataset.py
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'model', 'src'))

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
import io

from model import DeepfakeDetector
from dataset import get_transforms

# ============================================================
# APP SETUP
# ============================================================

app = FastAPI(title="AI Image Detection API")

# Allow frontend to call this API (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# LOAD MODEL ONCE AT STARTUP
# ============================================================

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
WEIGHTS_PATH = os.path.join(os.path.dirname(__file__), '..', 'model', 'weights', 'best_model.pth')

print("🧠 Loading my model...")
model = DeepfakeDetector(pretrained=False)
checkpoint = torch.load(WEIGHTS_PATH, map_location=device)
model.load_state_dict(checkpoint['model_state_dict'])
model = model.to(device)
model.eval()
print(f"✅ Model loaded! (Val Acc: {checkpoint['val_acc']:.2f}%)")

transform = get_transforms('test')


# ============================================================
# PREDICTION LOGIC (same as predict.py)
# ============================================================

def predict_image(image: Image.Image):
    image_tensor = transform(image.convert('RGB')).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(image_tensor)
        probs = torch.softmax(output, dim=1)
        confidence, prediction = torch.max(probs, dim=1)

    label = 'FAKE' if prediction.item() == 1 else 'REAL'

    return {
        'label': label,
        'confidence': round(confidence.item() * 100, 2),
        'real_probability': round(probs[0][0].item() * 100, 2),
        'fake_probability': round(probs[0][1].item() * 100, 2)
    }


# ============================================================
# ROUTES
# ============================================================

@app.get("/")
def root():
    return {"message": "AI Image Detection API is running 🚀"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Read image
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    
    # Predict
    result = predict_image(image)
    
    return result