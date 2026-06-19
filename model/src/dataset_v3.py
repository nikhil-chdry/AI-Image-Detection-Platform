# ============================================================
# DATASET PIPELINE V3
# Human Faces Dataset
# Real human faces vs AI Generated faces
# ============================================================

import os
from PIL import Image
from torch.utils.data import Dataset, DataLoader, random_split
from dataset import get_transforms


class HumanFacesDataset(Dataset):
    """
    Dataset for Human Faces
    Real Images/ and AI-Generated Images/ folders
    
    Labels:
        0 = REAL
        1 = FAKE (AI Generated)
    """
    
    def __init__(self, data_dir, transform=None):
        self.transform = transform
        self.images = []
        self.labels = []
        
        real_dir = os.path.join(data_dir, 'Real Images')
        fake_dir = os.path.join(data_dir, 'AI-Generated Images')
        
        # Load REAL faces
        for img_name in os.listdir(real_dir):
            if img_name.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                self.images.append(os.path.join(real_dir, img_name))
                self.labels.append(0)
        
        # Load FAKE faces
        for img_name in os.listdir(fake_dir):
            if img_name.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                self.images.append(os.path.join(fake_dir, img_name))
                self.labels.append(1)
        
        print(f"✅ Loaded {len(self.images)} face images")
        print(f"   REAL: {self.labels.count(0)}")
        print(f"   FAKE: {self.labels.count(1)}")
    
    def __len__(self):
        return len(self.images)
    
    def __getitem__(self, idx):
        img_path = self.images[idx]
        image = Image.open(img_path).convert('RGB')
        label = self.labels[idx]
        if self.transform:
            image = self.transform(image)
        return image, label


def get_dataloaders_v3(data_dir, batch_size=32):
    """70/15/15 split"""
    
    full_dataset = HumanFacesDataset(data_dir=data_dir, transform=None)
    
    total = len(full_dataset)
    train_size = int(total * 0.70)
    val_size = int(total * 0.15)
    test_size = total - train_size - val_size
    
    train_subset, val_subset, test_subset = random_split(
        full_dataset, [train_size, val_size, test_size]
    )
    
    class TransformWrapper(Dataset):
        def __init__(self, subset, base_dataset, transform):
            self.subset = subset
            self.base_dataset = base_dataset
            self.transform = transform
        
        def __len__(self):
            return len(self.subset)
        
        def __getitem__(self, idx):
            real_idx = self.subset.indices[idx]
            img_path = self.base_dataset.images[real_idx]
            label = self.base_dataset.labels[real_idx]
            image = Image.open(img_path).convert('RGB')
            image = self.transform(image)
            return image, label
    
    train_dataset = TransformWrapper(train_subset, full_dataset, get_transforms('train'))
    val_dataset = TransformWrapper(val_subset, full_dataset, get_transforms('test'))
    test_dataset = TransformWrapper(test_subset, full_dataset, get_transforms('test'))
    
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=0, pin_memory=True)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False, num_workers=0, pin_memory=True)
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False, num_workers=0, pin_memory=True)
    
    print(f"\n📊 Dataset Split (70/15/15):")
    print(f"   Train: {len(train_dataset)} images")
    print(f"   Val:   {len(val_dataset)} images")
    print(f"   Test:  {len(test_dataset)} images")
    
    return train_loader, val_loader, test_dataset, test_loader


if __name__ == "__main__":
    print("=" * 50)
    print("TESTING DATASET V3 - HUMAN FACES")
    print("=" * 50)
    
    train_loader, val_loader, _, test_loader = get_dataloaders_v3(
        data_dir="data_v3/Human Faces Dataset",
        batch_size=32
    )
    
    images, labels = next(iter(train_loader))
    print(f"\n✅ Batch Shape: {images.shape}")
    print(f"✅ Labels: {labels.unique()}")
    print("\n" + "=" * 50)
    print("DATASET V3 READY! 🚀")
    print("=" * 50)