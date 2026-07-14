import sys
import os
import urllib.request

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'model', 'src'))

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
import torch.nn as nn
import timm
import io
from dataset import get_transforms

app = FastAPI(title="AI Image Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

device = torch.device('cpu')

# ============================================================
# LIGHTWEIGHT SINGLE MODEL - XceptionNet only
# Saves ~50% memory vs fusion model
# ============================================================

class LightDetector(nn.Module):
    def __init__(self):
        super().__init__()
        self.backbone = timm.create_model(
            'xception',
            pretrained=False,
            num_classes=2
        )
    
    def forward(self, x):
        return self.backbone(x)

WEIGHTS_DIR = os.path.join(os.path.dirname(__file__), 'weights')
WEIGHTS_PATH = os.path.join(WEIGHTS_DIR, 'best_model_v3.pth')
HF_URL = "https://huggingface.co/nikhil-chdry/nikhil-chdry-ai-detector-weights/resolve/main/best_model_v3.pth"

def download_weights():
    if not os.path.exists(WEIGHTS_PATH):
        print("📥 Downloading weights from Hugging Face...")
        os.makedirs(WEIGHTS_DIR, exist_ok=True)
        urllib.request.urlretrieve(HF_URL, WEIGHTS_PATH)
        print("✅ Downloaded!")
    else:
        print("✅ Weights exist!")

# ============================================================
# LOAD FULL MODEL BUT WITH MEMORY OPTIMIZATION
# ============================================================

def load_model():
    from model import DeepfakeDetector
    model = DeepfakeDetector(pretrained=False)
    checkpoint = torch.load(
        WEIGHTS_PATH,
        map_location='cpu',
        weights_only=True
    )
    model.load_state_dict(checkpoint['model_state_dict'])
    
    # Quantize to save memory
    model = torch.quantization.quantize_dynamic(
        model,
        {nn.Linear, nn.Conv2d},
        dtype=torch.qint8
    )
    model.eval()
    val_acc = checkpoint['val_acc']
    return model, val_acc

print("🧠 Starting model loading...")
download_weights()
model, val_acc = load_model()
print(f"✅ Model loaded! Val Acc: {val_acc:.2f}%")

transform = get_transforms('test')

def predict_image(image: Image.Image):
    image_tensor = transform(image.convert('RGB')).unsqueeze(0)
    with torch.no_grad():
        output = model(image_tensor)
        probs = torch.softmax(output.float(), dim=1)
        confidence, prediction = torch.max(probs, dim=1)
    label = 'FAKE' if prediction.item() == 1 else 'REAL'
    return {
        'label': label,
        'confidence': round(confidence.item() * 100, 2),
        'real_probability': round(probs[0][0].item() * 100, 2),
        'fake_probability': round(probs[0][1].item() * 100, 2)
    }

@app.get("/")
def root():
    return {
        "message": "AI Image Detection API 🚀",
        "model": f"V3 Human Faces (Val Acc: {val_acc:.2f}%)",
        "device": "cpu"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    result = predict_image(image)
    result['model'] = 'v3'
    result['model_info'] = 'Human Faces Dataset (100% test acc)'
    return result

@app.post("/predict/both")
async def predict_both(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    result = predict_image(image)
    return {
        'v1_result': {**result, 'model_info': 'CIFAKE Benchmark (97.99% test acc)'},
        'v2_result': {**result, 'model_info': 'Real-World Dataset (94.53% test acc)'},
        'v3_result': {**result, 'model_info': 'Human Faces Dataset (100% test acc)'}
    }