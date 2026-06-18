# ============================================================
# MODEL EVALUATION
# Tests on unseen test set (20,000 images)
# Generates: Accuracy, F1, AUC, Confusion Matrix
# ============================================================

import torch
import torch.nn as nn
import numpy as np
from sklearn.metrics import (
    accuracy_score, f1_score, precision_score, 
    recall_score, roc_auc_score, confusion_matrix,
    classification_report, roc_curve
)
import matplotlib.pyplot as plt
import seaborn as sns
from tqdm import tqdm
import os

from dataset import get_dataloaders
from model import DeepfakeDetector


def evaluate_model():
    
    print("=" * 50)
    print("MODEL EVALUATION ON TEST SET")
    print("=" * 50)
    
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"🖥️  Device: {device}")
    
    # Load dataloaders (we only need test_loader)
    print("\n📂 Loading Test Dataset...")
    _, _, test_loader = get_dataloaders(
        data_dir='data',
        batch_size=64,
        val_split=0.2
    )
    
    # Load trained model
    print("\n🧠 Loading Trained Model...")
    model = DeepfakeDetector(pretrained=False)  # weights will be loaded
    
    checkpoint = torch.load('weights/best_model.pth', map_location=device)
    model.load_state_dict(checkpoint['model_state_dict'])
    model = model.to(device)
    model.eval()
    
    print(f"✅ Model loaded from epoch {checkpoint['epoch']}")
    print(f"✅ Training Val Acc: {checkpoint['val_acc']:.2f}%")
    
    # Collect all predictions
    all_labels = []
    all_preds = []
    all_probs = []  # probability of being FAKE (class 1)
    
    print("\n🔍 Running Inference on Test Set...")
    
    with torch.no_grad():
        for images, labels in tqdm(test_loader, desc='Evaluating'):
            images = images.to(device)
            
            outputs = model(images)
            probs = torch.softmax(outputs, dim=1)
            _, preds = torch.max(outputs, 1)
            
            all_labels.extend(labels.numpy())
            all_preds.extend(preds.cpu().numpy())
            all_probs.extend(probs[:, 1].cpu().numpy())  # FAKE probability
    
    all_labels = np.array(all_labels)
    all_preds = np.array(all_preds)
    all_probs = np.array(all_probs)
    
    # ============================================================
    # CALCULATE METRICS
    # ============================================================
    
    accuracy = accuracy_score(all_labels, all_preds) * 100
    f1 = f1_score(all_labels, all_preds) * 100
    precision = precision_score(all_labels, all_preds) * 100
    recall = recall_score(all_labels, all_preds) * 100
    auc = roc_auc_score(all_labels, all_probs) * 100
    
    print("\n" + "=" * 50)
    print("TEST SET RESULTS")
    print("=" * 50)
    print(f"✅ Accuracy:  {accuracy:.2f}%")
    print(f"✅ F1 Score:  {f1:.2f}%")
    print(f"✅ Precision: {precision:.2f}%")
    print(f"✅ Recall:    {recall:.2f}%")
    print(f"✅ AUC:       {auc:.2f}%")
    
    # ============================================================
    # CONFUSION MATRIX
    # ============================================================
    
    cm = confusion_matrix(all_labels, all_preds)
    
    plt.figure(figsize=(6, 5))
    sns.heatmap(
        cm, annot=True, fmt='d', cmap='Blues',
        xticklabels=['REAL', 'FAKE'],
        yticklabels=['REAL', 'FAKE']
    )
    plt.title('Confusion Matrix - Test Set')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.tight_layout()
    plt.savefig('weights/confusion_matrix.png')
    print("\n✅ Confusion matrix saved!")
    
    print("\n📊 Confusion Matrix:")
    print(f"   True Negative (REAL→REAL):  {cm[0][0]}")
    print(f"   False Positive (REAL→FAKE): {cm[0][1]}")
    print(f"   False Negative (FAKE→REAL): {cm[1][0]}")
    print(f"   True Positive (FAKE→FAKE):  {cm[1][1]}")
    
    # ============================================================
    # ROC CURVE
    # ============================================================
    
    fpr, tpr, _ = roc_curve(all_labels, all_probs)
    
    plt.figure(figsize=(6, 5))
    plt.plot(fpr, tpr, 'b-', label=f'ROC Curve (AUC = {auc:.2f}%)')
    plt.plot([0, 1], [0, 1], 'r--', label='Random Classifier')
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('ROC Curve')
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig('weights/roc_curve.png')
    print("✅ ROC curve saved!")
    
    # ============================================================
    # CLASSIFICATION REPORT
    # ============================================================
    
    report = classification_report(
        all_labels, all_preds,
        target_names=['REAL', 'FAKE']
    )
    print("\n📋 Classification Report:")
    print(report)
    
    # ============================================================
    # COMPARISON WITH RESEARCH PAPERS
    # ============================================================
    
    print("\n" + "=" * 50)
    print("COMPARISON WITH RESEARCH PAPERS")
    print("=" * 50)
    
    comparison = f"""
    {'Model':<25} {'Accuracy':<12} {'AUC':<10}
    {'-'*47}
    {'Your Model':<25} {accuracy:.2f}%{'':<7} {auc:.2f}%
    {'Paper 4 (Singh et al.)':<25} {'95.80%':<12} {'-':<10}
    {'Paper 1 LSTM (FF++)':<25} {'93.50%':<12} {'96.27%':<10}
    {'Paper 1 LSTM (UADFV)':<25} {'90.45%':<12} {'94.90%':<10}
    {'MesoNet':<25} {'84.92%':<12} {'87.59%':<10}
    {'Capsule Network':<25} {'73.63%':<12} {'80.61%':<10}
    {'LD-CNN':<25} {'76.80%':<12} {'-':<10}
    """
    print(comparison)
    
    # Save results to file
    with open('weights/evaluation_results.txt', 'w') as f:
        f.write("MODEL EVALUATION RESULTS\n")
        f.write("=" * 50 + "\n\n")
        f.write(f"Accuracy:  {accuracy:.2f}%\n")
        f.write(f"F1 Score:  {f1:.2f}%\n")
        f.write(f"Precision: {precision:.2f}%\n")
        f.write(f"Recall:    {recall:.2f}%\n")
        f.write(f"AUC:       {auc:.2f}%\n\n")
        f.write("Classification Report:\n")
        f.write(report)
        f.write("\n\nComparison with Papers:\n")
        f.write(comparison)
    
    print("✅ Full results saved to weights/evaluation_results.txt")
    
    print("\n" + "=" * 50)
    print("EVALUATION COMPLETE! 🎉")
    print("=" * 50)
    
    return {
        'accuracy': accuracy,
        'f1': f1,
        'precision': precision,
        'recall': recall,
        'auc': auc
    }


if __name__ == "__main__":
    results = evaluate_model()