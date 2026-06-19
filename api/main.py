# ============================================================
# FASTAPI SERVICE
# Serves both trained models:
# V1 - CIFAKE (benchmark comparison with papers)
# V2 - Real-World (production use, portfolio demo)
#V3 - Human Faces (final production model for portfolio demo)
# ============================================================

import sys
import os

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# LOAD BOTH MODELS AT STARTUP
# ============================================================

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Paths
V1_WEIGHTS = os.path.join(os.path.dirname(__file__), '..', 'model', 'weights', 'best_model.pth')
V2_WEIGHTS = os.path.join(os.path.dirname(__file__), '..', 'model', 'weights_v2', 'best_model_v2.pth')
V3_WEIGHTS = os.path.join(os.path.dirname(__file__), '..', 'model', 'weights_v3', 'best_model_v3.pth')
transform = get_transforms('test')


def load_model(weights_path):
    """Load a trained model from weights path"""
    model = DeepfakeDetector(pretrained=False)
    checkpoint = torch.load(weights_path, map_location=device)
    model.load_state_dict(checkpoint['model_state_dict'])
    model = model.to(device)
    model.eval()
    return model, checkpoint['val_acc']


print("🧠 Loading my models...")

# Load V1 (CIFAKE - benchmark)
model_v1, v1_acc = load_model(V1_WEIGHTS)
print(f"✅ Model V1 loaded! (Val Acc: {v1_acc:.2f}%) - CIFAKE Benchmark")

# Load V2 (Real-World - production)
model_v2, v2_acc = load_model(V2_WEIGHTS)
print(f"✅ Model V2 loaded! (Val Acc: {v2_acc:.2f}%) - Real-World Dataset")

# Load V3 (Human Faces - final production model)
model_v3, v3_acc = load_model(V3_WEIGHTS)
print(f"✅ Model V3 loaded! (Val Acc: {v3_acc:.2f}%) - Human Faces Dataset")

# ============================================================
# PREDICTION LOGIC
# ============================================================

def predict_image(image: Image.Image, model):
    """Run prediction on a single image using given model"""
    
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
    return {
        "message": "AI Image Detection API is running 🚀",
        "models": {
            "v1": f"CIFAKE Benchmark Model (Val Acc: {v1_acc:.2f}%)",
            "v2": f"Real-World Model (Val Acc: {v2_acc:.2f}%)",
            "v3": f"Human Faces Model (Val Acc: {v3_acc:.2f}%)"
        }
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """Default - uses V3 model (best for human faces!)"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    result = predict_image(image, model_v3)
    result['model'] = 'v3'
    result['model_info'] = 'Human Faces Dataset (100% test acc)'
    return result


@app.post("/predict/v1")
async def predict_v1(file: UploadFile = File(...)):
    """
    V1 endpoint - uses CIFAKE model
    Best for academic benchmark comparison
    """
    
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    result = predict_image(image, model_v1)
    result['model'] = 'v1'
    result['model_info'] = 'CIFAKE Benchmark Dataset'
    
    return result


@app.post("/predict/v2")
async def predict_v2(file: UploadFile = File(...)):
    """
    V2 endpoint - uses Real-World model
    Best for production use and portfolio demo
    """
    
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    result = predict_image(image, model_v2)
    result['model'] = 'v2'
    result['model_info'] = 'Real-World Dataset (SD/MidJourney/DALL-E/BigGAN)'
    
    return result
  
@app.post("/predict/v3")
async def predict_v3(file: UploadFile = File(...)):
    """V3 - Human Faces Model (Best for real photos!)"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    result = predict_image(image, model_v3)
    result['model'] = 'v3'
    result['model_info'] = 'Human Faces Dataset (100% test acc)'
    return result


@app.post("/predict/both")
async def predict_both(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    
    result_v1 = predict_image(image, model_v1)
    result_v2 = predict_image(image, model_v2)
    result_v3 = predict_image(image, model_v3)
    
    return {
        'v1_result': {**result_v1, 'model_info': 'CIFAKE Benchmark (97.99% test acc)'},
        'v2_result': {**result_v2, 'model_info': 'Real-World Dataset (94.53% test acc)'},
        'v3_result': {**result_v3, 'model_info': 'Human Faces Dataset (100% test acc)'}
    }