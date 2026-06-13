# ============================================================
# MODEL ARCHITECTURE
# Inspired by Paper 4 (Singh et al.)
# ResNet50 + XceptionNet Feature Fusion
# ============================================================

import torch
import torch.nn as nn
import timm

# ============================================================
# STEP 1 - RESNET50 FEATURE EXTRACTOR
# Paper 4: ResNet50 for texture patterns (35% contribution)
# ============================================================

class ResNet50Extractor(nn.Module):
    """
    ResNet50 for texture feature extraction
    Paper 4: Detects subtle texture manipulations
    """
    
    def __init__(self, pretrained=True):
        super(ResNet50Extractor, self).__init__()
        
        # Load pretrained ResNet50
        resnet = timm.create_model(
            'resnet50',
            pretrained=pretrained,
            num_classes=0  # Remove classification head
        )
        
        self.features = resnet
        self.output_dim = 2048  # ResNet50 output features
        
        print("✅ ResNet50 Extractor loaded")
    
    def forward(self, x):
        return self.features(x)


# ============================================================
# STEP 2 - XCEPTIONNET FEATURE EXTRACTOR
# Paper 4: XceptionNet for spatial features (40% contribution)
# ============================================================

class XceptionNetExtractor(nn.Module):
    """
    XceptionNet for spatial feature extraction
    Paper 4: Detects spatial inconsistencies in fake images
    """
    
    def __init__(self, pretrained=True):
        super(XceptionNetExtractor, self).__init__()
        
        # Load pretrained XceptionNet
        xception = timm.create_model(
            'xception',
            pretrained=pretrained,
            num_classes=0  # Remove classification head
        )
        
        self.features = xception
        self.output_dim = 2048  # XceptionNet output features
        
        print("✅ XceptionNet Extractor loaded")
    
    def forward(self, x):
        return self.features(x)


# ============================================================
# STEP 3 - FEATURE FUSION + CLASSIFICATION HEAD
# Paper 4: Combine both extractors
# Paper 3: Confidence score output
# ============================================================

class DeepfakeDetector(nn.Module):
    """
    Complete Deepfake Detection Model
    
    Architecture inspired by:
    - Paper 4 (Singh et al.): Feature Fusion approach
    - Paper 2 (Mishra et al.): Ensemble concept
    - Paper 3 (Chu): Confidence score output
    
    Flow:
    Input Image
         ↓
    ResNet50 ──┐
               ├── Concatenate → Fusion Layer → Output
    XceptionNet┘
    """
    
    def __init__(self, pretrained=True, dropout=0.5):
        super(DeepfakeDetector, self).__init__()
        
        print("\n" + "=" * 50)
        print("LOADING MODEL ARCHITECTURE")
        print("=" * 50)
        
        # Feature extractors
        self.resnet = ResNet50Extractor(pretrained)
        self.xception = XceptionNetExtractor(pretrained)
        
        # Combined feature dimension
        # ResNet50 (2048) + XceptionNet (2048) = 4096
        combined_dim = 2048 + 2048
        
        # Feature Fusion Layer (Paper 4)
        self.fusion = nn.Sequential(
            nn.Linear(combined_dim, 1024),
            nn.BatchNorm1d(1024),
            nn.ReLU(),
            nn.Dropout(dropout),
            
            nn.Linear(1024, 512),
            nn.BatchNorm1d(512),
            nn.ReLU(),
            nn.Dropout(dropout),
            
            nn.Linear(512, 256),
            nn.BatchNorm1d(256),
            nn.ReLU(),
            nn.Dropout(dropout / 2),
        )
        
        # Classification Head
        # Output: probability of being FAKE
        self.classifier = nn.Sequential(
            nn.Linear(256, 2),  # 2 classes: REAL, FAKE
        )
        
        print("✅ Feature Fusion Layer created")
        print("✅ Classification Head created")
        print("=" * 50)
    
    def forward(self, x):
        # Extract features from both models
        resnet_features = self.resnet(x)      # [batch, 2048]
        xception_features = self.xception(x)  # [batch, 2048]
        
        # Concatenate features (Paper 4: Feature Fusion)
        combined = torch.cat(
            [resnet_features, xception_features], 
            dim=1
        )  # [batch, 4096]
        
        # Pass through fusion layers
        fused = self.fusion(combined)  # [batch, 256]
        
        # Get predictions
        output = self.classifier(fused)  # [batch, 2]
        
        return output
    
    def predict(self, x):
        """
        Get prediction with confidence score
        Paper 3: Confidence score output
        
        Returns:
            prediction: 0=REAL, 1=FAKE
            confidence: probability score
        """
        self.eval()
        with torch.no_grad():
            output = self.forward(x)
            probabilities = torch.softmax(output, dim=1)
            confidence, prediction = torch.max(probabilities, dim=1)
            
        return prediction, confidence, probabilities


# ============================================================
# STEP 4 - TEST THE MODEL
# ============================================================

if __name__ == "__main__":
    
    print("=" * 50)
    print("TESTING MODEL ARCHITECTURE")
    print("=" * 50)
    
    # Device
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"\n🖥️  Device: {device}")
    
    # Create model
    model = DeepfakeDetector(pretrained=True)
    model = model.to(device)
    
    # Count parameters
    total_params = sum(p.numel() for p in model.parameters())
    trainable_params = sum(
        p.numel() for p in model.parameters() if p.requires_grad
    )
    
    print(f"\n📊 Model Statistics:")
    print(f"   Total Parameters:     {total_params:,}")
    print(f"   Trainable Parameters: {trainable_params:,}")
    
    # Test with dummy input
    print(f"\n🧪 Testing with dummy input...")
    dummy_input = torch.randn(4, 3, 224, 224).to(device)
    
    # Forward pass
    output = model(dummy_input)
    print(f"✅ Output Shape: {output.shape}")
    
    # Test predict function
    pred, conf, probs = model.predict(dummy_input)
    print(f"✅ Predictions: {pred}")
    print(f"✅ Confidence:  {conf}")
    print(f"✅ Probs Shape: {probs.shape}")
    
    print("\n" + "=" * 50)
    print("MODEL READY! 🚀")
    print("=" * 50)