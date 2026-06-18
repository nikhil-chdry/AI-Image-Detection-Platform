# ============================================================
# SINGLE IMAGE PREDICTION
# Test my model on any single image
# This logic will later be used in FastAPI
# ============================================================

import torch
from PIL import Image
import sys
import os

from model import DeepfakeDetector
from dataset import get_transforms


def load_model(weights_path='weights/best_model.pth'):
    """Load my trained model"""
    
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    
    model = DeepfakeDetector(pretrained=False)
    checkpoint = torch.load(weights_path, map_location=device)
    model.load_state_dict(checkpoint['model_state_dict'])
    model = model.to(device)
    model.eval()
    
    print(f"✅ Model loaded (trained val acc: {checkpoint['val_acc']:.2f}%)")
    
    return model, device


def predict_image(image_path, model, device):
    """
    Predict if an image is REAL or FAKE
    
    Returns:
        label: 'REAL' or 'FAKE'
        confidence: probability score
        probs: [real_prob, fake_prob]
    """
    
    # Load and preprocess image
    image = Image.open(image_path).convert('RGB')
    transform = get_transforms('test')
    image_tensor = transform(image).unsqueeze(0).to(device)
    
    # Get prediction
    with torch.no_grad():
        output = model(image_tensor)
        probs = torch.softmax(output, dim=1)
        confidence, prediction = torch.max(probs, dim=1)
    
    label = 'FAKE' if prediction.item() == 1 else 'REAL'
    confidence_score = confidence.item() * 100
    
    real_prob = probs[0][0].item() * 100
    fake_prob = probs[0][1].item() * 100
    
    return {
        'label': label,
        'confidence': confidence_score,
        'real_probability': real_prob,
        'fake_probability': fake_prob
    }


def main():
    
    if len(sys.argv) < 2:
        print("Usage: python predict.py <image_path>")
        print("Example: python predict.py data/test/REAL/0001.jpg")
        return
    
    image_path = sys.argv[1]
    
    if not os.path.exists(image_path):
        print(f"❌ Image not found: {image_path}")
        return
    
    print("=" * 50)
    print("DEEPFAKE DETECTION - SINGLE IMAGE")
    print("=" * 50)
    
    print(f"\n📂 Image: {image_path}")
    
    # Load model
    print("\n🧠 Loading my model...")
    model, device = load_model()
    
    # Predict
    print("\n🔍 Analyzing image...")
    result = predict_image(image_path, model, device)
    
    print("\n" + "=" * 50)
    print("PREDICTION RESULT")
    print("=" * 50)
    print(f"🎯 Label: {result['label']}")
    print(f"📊 Confidence: {result['confidence']:.2f}%")
    print(f"\n   REAL Probability: {result['real_probability']:.2f}%")
    print(f"   FAKE Probability: {result['fake_probability']:.2f}%")
    print("=" * 50)


if __name__ == "__main__":
    main()