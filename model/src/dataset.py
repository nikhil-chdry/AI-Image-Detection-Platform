# ============================================================
# DATASET PIPELINE
# Inspired by Paper 2 (Mishra et al.) preprocessing approach
# ============================================================

import os
from PIL import Image
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms

# ============================================================
# STEP 1 - TRANSFORMS
# Paper 2: Augmentation + Normalization
# ============================================================

def get_transforms(mode='train'):
    """
    Preprocessing pipeline inspired by Paper 2 (Mishra et al.)
    - Augmentation for training
    - Normalization for all
    """
    
    if mode == 'train':
        return transforms.Compose([
            # Resize to 224x224 (standard for ResNet + XceptionNet)
            transforms.Resize((224, 224)),
            
            # Paper 2: Augmentation techniques
            transforms.RandomHorizontalFlip(p=0.5),
            transforms.RandomRotation(degrees=10),
            transforms.ColorJitter(
                brightness=0.2,
                contrast=0.2,
                saturation=0.2
            ),
            transforms.RandomCrop(224, padding=8),
            
            # Convert to tensor
            transforms.ToTensor(),
            
            # Paper 2: Normalization
            # Using ImageNet mean and std (standard for transfer learning)
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])
    
    else:  # val or test
        return transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])


# ============================================================
# STEP 2 - CUSTOM DATASET CLASS
# ============================================================

class DeepfakeDataset(Dataset):
    """
    Custom Dataset for AI Image Detection
    Loads images from REAL/ and FAKE/ folders
    
    Labels:
        0 = REAL (Human Generated)
        1 = FAKE (AI Generated)
    """
    
    def __init__(self, data_dir, transform=None):
        """
        Args:
            data_dir: path to train/ or test/ folder
            transform: preprocessing transforms
        """
        self.data_dir = data_dir
        self.transform = transform
        self.images = []
        self.labels = []
        
        # Load REAL images → label 0
        real_dir = os.path.join(data_dir, 'REAL')
        for img_name in os.listdir(real_dir):
            if img_name.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                self.images.append(os.path.join(real_dir, img_name))
                self.labels.append(0)  # 0 = REAL
        
        # Load FAKE images → label 1
        fake_dir = os.path.join(data_dir, 'FAKE')
        for img_name in os.listdir(fake_dir):
            if img_name.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                self.images.append(os.path.join(fake_dir, img_name))
                self.labels.append(1)  # 1 = FAKE
        
        print(f"✅ Loaded {len(self.images)} images from {data_dir}")
        print(f"   REAL: {self.labels.count(0)}")
        print(f"   FAKE: {self.labels.count(1)}")
    
    def __len__(self):
        return len(self.images)
    
    def __getitem__(self, idx):
        # Load image
        img_path = self.images[idx]
        image = Image.open(img_path).convert('RGB')
        label = self.labels[idx]
        
        # Apply transforms
        if self.transform:
            image = self.transform(image)
        
        return image, label


# ============================================================
# STEP 3 - DATALOADER FUNCTION
# Paper 4: batch size 32, 80/20 split
# ============================================================

def get_dataloaders(data_dir, batch_size=32, val_split=0.2):
    """
    Creates train, validation and test dataloaders
    
    Paper 1 + Paper 4: 80/20 train/val split
    Paper 4: batch size 32
    """
    
    # Full training dataset
    train_dataset = DeepfakeDataset(
        data_dir=os.path.join(data_dir, 'train'),
        transform=get_transforms('train')
    )
    
    # Split into train and validation
    # Paper 1 + 4: 80/20 split
    total = len(train_dataset)
    val_size = int(total * val_split)
    train_size = total - val_size
    
    from torch.utils.data import random_split
    train_data, val_data = random_split(
        train_dataset, 
        [train_size, val_size]
    )
    
    # Test dataset
    test_dataset = DeepfakeDataset(
        data_dir=os.path.join(data_dir, 'test'),
        transform=get_transforms('test')
    )
    
    # Create dataloaders
    train_loader = DataLoader(
        train_data,
        batch_size=batch_size,
        shuffle=True,
        num_workers=0,
        pin_memory=True  # Faster GPU transfer
    )
    
    val_loader = DataLoader(
        val_data,
        batch_size=batch_size,
        shuffle=False,
        num_workers=0,
        pin_memory=True
    )
    
    test_loader = DataLoader(
        test_dataset,
        batch_size=batch_size,
        shuffle=False,
        num_workers=0,
        pin_memory=True
    )
    
    print(f"\n📊 Dataset Split:")
    print(f"   Train:      {len(train_data)} images")
    print(f"   Validation: {len(val_data)} images")
    print(f"   Test:       {len(test_dataset)} images")
    
    return train_loader, val_loader, test_loader


# ============================================================
# STEP 4 - TEST THE PIPELINE
# ============================================================

if __name__ == "__main__":
    
    # Path to data folder
    DATA_DIR = "data"
    
    print("=" * 50)
    print("TESTING DATA PIPELINE")
    print("=" * 50)
    
    # Get dataloaders
    train_loader, val_loader, test_loader = get_dataloaders(
        data_dir=DATA_DIR,
        batch_size=64
    )
    
    # Test one batch
    images, labels = next(iter(train_loader))
    
    print(f"\n✅ Batch Shape: {images.shape}")
    print(f"✅ Labels Shape: {labels.shape}")
    print(f"✅ Image Min: {images.min():.3f}")
    print(f"✅ Image Max: {images.max():.3f}")
    print(f"✅ Unique Labels: {labels.unique()}")
    
    print("\n" + "=" * 50)
    print("DATA PIPELINE READY! 🚀")
    print("=" * 50)