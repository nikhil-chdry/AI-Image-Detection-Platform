# ============================================================
# TRAINING PIPELINE V3
# Human Faces - Real vs AI Generated
# Final production model for portfolio demo
# ============================================================

import torch
import torch.nn as nn
import torch.optim as optim
from tqdm import tqdm
import matplotlib.pyplot as plt
import os
import json
from dataset_v3 import get_dataloaders_v3
from model import DeepfakeDetector
from train import train_epoch, validate_epoch, plot_results

CONFIG = {
    'batch_size': 32,
    'learning_rate': 0.0001,  # lower LR for fine-tuning on small dataset
    'epochs': 15,             # more epochs since dataset is smaller
    'data_dir': 'data_v3/Human Faces Dataset',
    'weights_dir': 'weights_v3',
    'dropout': 0.3,           # less dropout for small dataset
}


def train_v3():
    
    print("=" * 50)
    print("STARTING TRAINING V3 (Human Faces Dataset)")
    print("=" * 50)
    
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"🖥️  Device: {device}")
    
    os.makedirs(CONFIG['weights_dir'], exist_ok=True)
    
    print("\n📂 Loading Human Faces Dataset...")
    train_loader, val_loader, _, _ = get_dataloaders_v3(
        data_dir=CONFIG['data_dir'],
        batch_size=CONFIG['batch_size']
    )
    
    print("\n🧠 Creating Model...")
    model = DeepfakeDetector(pretrained=True, dropout=CONFIG['dropout'])
    model = model.to(device)
    
    criterion = nn.CrossEntropyLoss()
    
    # Lower learning rate for fine-tuning
    optimizer = optim.Adam(
        model.parameters(),
        lr=CONFIG['learning_rate'],
        weight_decay=1e-4  # L2 regularization to prevent overfitting
    )
    
    scheduler = optim.lr_scheduler.ReduceLROnPlateau(
        optimizer, mode='min', patience=3, factor=0.5
    )
    
    history = {'train_loss': [], 'train_acc': [], 'val_loss': [], 'val_acc': []}
    best_val_acc = 0
    best_epoch = 0
    
    print("\n🚀 Training Started!")
    print("=" * 50)
    
    for epoch in range(CONFIG['epochs']):
        print(f"\n📍 Epoch {epoch + 1}/{CONFIG['epochs']}")
        print("-" * 40)
        
        train_loss, train_acc = train_epoch(
            model, train_loader, criterion, optimizer, device
        )
        val_loss, val_acc = validate_epoch(
            model, val_loader, criterion, device
        )
        
        scheduler.step(val_loss)
        
        history['train_loss'].append(train_loss)
        history['train_acc'].append(train_acc)
        history['val_loss'].append(val_loss)
        history['val_acc'].append(val_acc)
        
        print(f"\n📊 Epoch {epoch + 1} Results:")
        print(f"   Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.2f}%")
        print(f"   Val Loss:   {val_loss:.4f} | Val Acc:   {val_acc:.2f}%")
        
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            best_epoch = epoch + 1
            torch.save({
                'epoch': epoch + 1,
                'model_state_dict': model.state_dict(),
                'optimizer_state_dict': optimizer.state_dict(),
                'val_acc': val_acc,
                'val_loss': val_loss,
                'config': CONFIG
            }, os.path.join(CONFIG['weights_dir'], 'best_model_v3.pth'))
            print(f"   💾 Best model saved! (Val Acc: {val_acc:.2f}%)")
    
    print("\n" + "=" * 50)
    print("TRAINING V3 COMPLETE!")
    print("=" * 50)
    print(f"✅ Best Validation Accuracy: {best_val_acc:.2f}%")
    print(f"✅ Best Epoch: {best_epoch}")
    
    with open(os.path.join(CONFIG['weights_dir'], 'history_v3.json'), 'w') as f:
        json.dump(history, f)
    
    plot_results(history, CONFIG['weights_dir'])
    
    return model, history


if __name__ == "__main__":
    model, history = train_v3()