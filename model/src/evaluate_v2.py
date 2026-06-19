# ============================================================
# MODEL EVALUATION V2
# Tests on real-world dataset test set (3,750 images)
# ============================================================

import torch
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

from dataset_v2 import get_dataloaders_v2
from model import DeepfakeDetector


def evaluate_v2():
    
    print("=" * 50)
    print("MODEL V2 EVALUATION ON TEST SET")
    print("=" * 50)
    
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"🖥️  Device: {device}")
    
    # Load test loader only
    print("\n📂 Loading Test Dataset V2...")
    _, _, test_loader = get_dataloaders_v2(
        data_dir='data_v2/content',
        batch_size=64
    )
    
    # Load trained V2 model
    print("\n🧠 Loading My Trained Model V2...")
    model = DeepfakeDetector(pretrained=False)
    checkpoint = torch.load(
        'weights_v2/best_model_v2.pth',
        map_location=device
    )
    model.load_state_dict(checkpoint['model_state_dict'])
    model = model.to(device)
    model.eval()
    
    print(f"✅ Model loaded from epoch {checkpoint['epoch']}")
    print(f"✅ Training Val Acc: {checkpoint['val_acc']:.2f}%")
    
    # Collect predictions
    all_labels = []
    all_preds = []
    all_probs = []
    
    print("\n🔍 Running Inference on Test Set...")
    
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
    
    # Metrics
    accuracy = accuracy_score(all_labels, all_preds) * 100
    f1 = f1_score(all_labels, all_preds) * 100
    precision = precision_score(all_labels, all_preds) * 100
    recall = recall_score(all_labels, all_preds) * 100
    auc = roc_auc_score(all_labels, all_probs) * 100
    
    print("\n" + "=" * 50)
    print("TEST SET RESULTS (Real-World Dataset)")
    print("=" * 50)
    print(f"✅ Accuracy:  {accuracy:.2f}%")
    print(f"✅ F1 Score:  {f1:.2f}%")
    print(f"✅ Precision: {precision:.2f}%")
    print(f"✅ Recall:    {recall:.2f}%")
    print(f"✅ AUC:       {auc:.2f}%")
    
    # Confusion Matrix
    cm = confusion_matrix(all_labels, all_preds)
    plt.figure(figsize=(6, 5))
    sns.heatmap(
        cm, annot=True, fmt='d', cmap='Blues',
        xticklabels=['REAL', 'FAKE'],
        yticklabels=['REAL', 'FAKE']
    )
    plt.title('Confusion Matrix V2 - Real World Test Set')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.tight_layout()
    plt.savefig('weights_v2/confusion_matrix_v2.png')
    print("\n✅ Confusion matrix saved!")
    
    # ROC Curve
    fpr, tpr, _ = roc_curve(all_labels, all_probs)
    plt.figure(figsize=(6, 5))
    plt.plot(fpr, tpr, 'b-', label=f'ROC Curve (AUC = {auc:.2f}%)')
    plt.plot([0, 1], [0, 1], 'r--', label='Random Classifier')
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('ROC Curve V2')
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig('weights_v2/roc_curve_v2.png')
    print("✅ ROC curve saved!")
    
    # Classification Report
    report = classification_report(
        all_labels, all_preds,
        target_names=['REAL', 'FAKE']
    )
    print("\n📋 Classification Report:")
    print(report)
    
    # Save results
    with open('weights_v2/evaluation_results_v2.txt', 'w') as f:
        f.write("MODEL V2 EVALUATION RESULTS\n")
        f.write("Real-World Photos vs AI-Generated Images\n")
        f.write("=" * 50 + "\n\n")
        f.write(f"Accuracy:  {accuracy:.2f}%\n")
        f.write(f"F1 Score:  {f1:.2f}%\n")
        f.write(f"Precision: {precision:.2f}%\n")
        f.write(f"Recall:    {recall:.2f}%\n")
        f.write(f"AUC:       {auc:.2f}%\n\n")
        f.write("Classification Report:\n")
        f.write(report)
    
    print("✅ Full results saved!")
    
    print("\n" + "=" * 50)
    print("EVALUATION V2 COMPLETE! 🎉")
    print("=" * 50)
    
    return {
        'accuracy': accuracy,
        'f1': f1,
        'precision': precision,
        'recall': recall,
        'auc': auc
    }


if __name__ == "__main__":
    results = evaluate_v2()