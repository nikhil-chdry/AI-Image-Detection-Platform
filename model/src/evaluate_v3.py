import torch
import numpy as np
from sklearn.metrics import accuracy_score, f1_score, confusion_matrix, roc_auc_score, roc_curve
import matplotlib.pyplot as plt
import seaborn as sns
from tqdm import tqdm
import os

from dataset_v3 import get_dataloaders_v3
from model import DeepfakeDetector


def evaluate_v3():
    
    print("=" * 50)
    print("MODEL V3 EVALUATION ON TEST SET")
    print("=" * 50)
    
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    
    _, _, _, test_loader = get_dataloaders_v3(
        data_dir='data_v3/Human Faces Dataset',
        batch_size=32
    )
    
    model = DeepfakeDetector(pretrained=False)
    checkpoint = torch.load('weights_v3/best_model_v3.pth', map_location=device)
    model.load_state_dict(checkpoint['model_state_dict'])
    model = model.to(device)
    model.eval()
    
    print(f"✅ Model loaded from epoch {checkpoint['epoch']}")
    
    all_labels = []
    all_preds = []
    all_probs = []
    
    with torch.no_grad():
        for images, labels in tqdm(test_loader, desc='Evaluating'):
            images = images.to(device)
            outputs = model(images)
            probs = torch.softmax(outputs, dim=1)
            _, preds = torch.max(outputs, 1)
            all_labels.extend(labels.numpy())
            all_preds.extend(preds.cpu().numpy())
            all_probs.extend(probs[:, 1].cpu().numpy())
    
    all_labels = np.array(all_labels)
    all_preds = np.array(all_preds)
    all_probs = np.array(all_probs)
    
    accuracy = accuracy_score(all_labels, all_preds) * 100
    f1 = f1_score(all_labels, all_preds) * 100
    auc = roc_auc_score(all_labels, all_probs) * 100
    
    print(f"\n✅ Test Accuracy: {accuracy:.2f}%")
    print(f"✅ F1 Score:      {f1:.2f}%")
    print(f"✅ AUC:           {auc:.2f}%")
    
    cm = confusion_matrix(all_labels, all_preds)
    print(f"\n📊 Confusion Matrix:")
    print(f"   True REAL  predicted REAL: {cm[0][0]}")
    print(f"   True REAL  predicted FAKE: {cm[0][1]}")
    print(f"   True FAKE  predicted REAL: {cm[1][0]}")
    print(f"   True FAKE  predicted FAKE: {cm[1][1]}")


if __name__ == "__main__":
    evaluate_v3()