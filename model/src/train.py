# ============================================================
# TRAINING PIPELINE
# Paper 1 + Paper 4: Adam lr=0.001, Binary Cross Entropy
# Paper 4: Batch size 32, 80/20 split
# ============================================================

import torch
import torch.nn as nn
import torch.optim as optim
from tqdm import tqdm
import matplotlib.pyplot as plt
import os
import json
from dataset import get_dataloaders
from model import DeepfakeDetector

# ============================================================
# STEP 1 - TRAINING CONFIG
# Settings taken directly from papers
# ============================================================

CONFIG = {
    # Paper 4: batch size 32
    'batch_size': 32,
    
    # Paper 1 + 4: Adam lr=0.001
    'learning_rate': 0.001,
    
    # Training epochs
    'epochs': 10,
    
    # Paper 1 + 4: 80/20 split
    'val_split': 0.2,
    
    # Data path
    'data_dir': 'data',
    
    # Save path
    'weights_dir': 'weights',
    
    # Dropout
    'dropout': 0.5,
}


# ============================================================
# STEP 2 - TRAIN ONE EPOCH
# ============================================================

def train_epoch(model, loader, criterion, optimizer, device):
    """Train for one epoch"""
    
    model.train()
    
    total_loss = 0
    correct = 0
    total = 0
    
    # Progress bar
    pbar = tqdm(loader, desc='Training')
    
    for images, labels in pbar:
        # Move to GPU
        images = images.to(device)
        labels = labels.to(device)
        
        # Zero gradients
        optimizer.zero_grad()
        
        # Forward pass
        outputs = model(images)
        
        # Calculate loss
        # Paper 1 + 4: Binary Cross Entropy
        loss = criterion(outputs, labels)
        
        # Backward pass
        loss.backward()
        
        # Update weights
        optimizer.step()
        
        # Track metrics
        total_loss += loss.item()
        _, predicted = torch.max(outputs, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()
        
        # Update progress bar
        pbar.set_postfix({
            'loss': f'{loss.item():.4f}',
            'acc': f'{100 * correct / total:.2f}%'
        })
    
    epoch_loss = total_loss / len(loader)
    epoch_acc = 100 * correct / total
    
    return epoch_loss, epoch_acc


# ============================================================
# STEP 3 - VALIDATE ONE EPOCH
# ============================================================

def validate_epoch(model, loader, criterion, device):
    """Validate for one epoch"""
    
    model.eval()
    
    total_loss = 0
    correct = 0
    total = 0
    
    with torch.no_grad():
        pbar = tqdm(loader, desc='Validating')
        
        for images, labels in pbar:
            images = images.to(device)
            labels = labels.to(device)
            
            outputs = model(images)
            loss = criterion(outputs, labels)
            
            total_loss += loss.item()
            _, predicted = torch.max(outputs, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
            
            pbar.set_postfix({
                'loss': f'{loss.item():.4f}',
                'acc': f'{100 * correct / total:.2f}%'
            })
    
    epoch_loss = total_loss / len(loader)
    epoch_acc = 100 * correct / total
    
    return epoch_loss, epoch_acc


# ============================================================
# STEP 4 - PLOT RESULTS
# ============================================================

def plot_results(history, save_dir):
    """Plot training curves"""
    
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
    
    epochs = range(1, len(history['train_loss']) + 1)
    
    # Loss plot
    ax1.plot(epochs, history['train_loss'], 'b-', label='Train Loss')
    ax1.plot(epochs, history['val_loss'], 'r-', label='Val Loss')
    ax1.set_title('Training vs Validation Loss')
    ax1.set_xlabel('Epoch')
    ax1.set_ylabel('Loss')
    ax1.legend()
    ax1.grid(True)
    
    # Accuracy plot
    ax2.plot(epochs, history['train_acc'], 'b-', label='Train Acc')
    ax2.plot(epochs, history['val_acc'], 'r-', label='Val Acc')
    ax2.set_title('Training vs Validation Accuracy')
    ax2.set_xlabel('Epoch')
    ax2.set_ylabel('Accuracy %')
    ax2.legend()
    ax2.grid(True)
    
    plt.tight_layout()
    plt.savefig(os.path.join(save_dir, 'training_curves.png'))
    print(f"✅ Training curves saved!")


# ============================================================
# STEP 5 - MAIN TRAINING LOOP
# ============================================================

def train():
    
    print("=" * 50)
    print("STARTING TRAINING")
    print("=" * 50)
    
    # Device
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"🖥️  Device: {device}")
    
    # Create weights directory
    os.makedirs(CONFIG['weights_dir'], exist_ok=True)
    
    # Get dataloaders
    print("\n📂 Loading Dataset...")
    train_loader, val_loader, _ = get_dataloaders(
        data_dir=CONFIG['data_dir'],
        batch_size=CONFIG['batch_size'],
        val_split=CONFIG['val_split']
    )
    
    # Create model
    print("\n🧠 Creating Model...")
    model = DeepfakeDetector(
        pretrained=True,
        dropout=CONFIG['dropout']
    )
    model = model.to(device)
    
    # Paper 1 + 4: Binary Cross Entropy Loss
    criterion = nn.CrossEntropyLoss()
    
    # Paper 1 + 4: Adam optimizer lr=0.001
    optimizer = optim.Adam(
        model.parameters(),
        lr=CONFIG['learning_rate']
    )
    
    # Learning rate scheduler
    scheduler = optim.lr_scheduler.ReduceLROnPlateau(
        optimizer,
        mode='min',
        patience=2,
        factor=0.5,
    )
    
    # Training history
    history = {
        'train_loss': [],
        'train_acc': [],
        'val_loss': [],
        'val_acc': []
    }
    
    # Best model tracking
    best_val_acc = 0
    best_epoch = 0
    
    print("\n🚀 Training Started!")
    print("=" * 50)
    
    for epoch in range(CONFIG['epochs']):
        print(f"\n📍 Epoch {epoch + 1}/{CONFIG['epochs']}")
        print("-" * 40)
        
        # Train
        train_loss, train_acc = train_epoch(
            model, train_loader, criterion, optimizer, device
        )
        
        # Validate
        val_loss, val_acc = validate_epoch(
            model, val_loader, criterion, device
        )
        
        # Update scheduler
        scheduler.step(val_loss)
        
        # Save history
        history['train_loss'].append(train_loss)
        history['train_acc'].append(train_acc)
        history['val_loss'].append(val_loss)
        history['val_acc'].append(val_acc)
        
        # Print epoch results
        print(f"\n📊 Epoch {epoch + 1} Results:")
        print(f"   Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.2f}%")
        print(f"   Val Loss:   {val_loss:.4f} | Val Acc:   {val_acc:.2f}%")
        
        # Save best model
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
            }, os.path.join(CONFIG['weights_dir'], 'best_model.pth'))
            
            print(f"   💾 Best model saved! (Val Acc: {val_acc:.2f}%)")
    
    # Save final results
    print("\n" + "=" * 50)
    print("TRAINING COMPLETE!")
    print("=" * 50)
    print(f"✅ Best Validation Accuracy: {best_val_acc:.2f}%")
    print(f"✅ Best Epoch: {best_epoch}")
    
    # Save history
    with open(os.path.join(CONFIG['weights_dir'], 'history.json'), 'w') as f:
        json.dump(history, f)
    print("✅ Training history saved!")
    
    # Plot results
    plot_results(history, CONFIG['weights_dir'])
    
    return model, history


# ============================================================
# RUN TRAINING
# ============================================================

if __name__ == "__main__":
    model, history = train()