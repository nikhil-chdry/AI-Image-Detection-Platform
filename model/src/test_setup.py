import torch
import torchvision
import timm
import cv2
import numpy as np
import sklearn

print("=" * 50)
print("SETUP VERIFICATION")
print("=" * 50)

# PyTorch
print(f"✅ PyTorch Version: {torch.__version__}")

# CUDA
print(f"✅ CUDA Available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"✅ GPU: {torch.cuda.get_device_name(0)}")
    print(f"✅ VRAM: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.1f} GB")

# Libraries
print(f"✅ Torchvision: {torchvision.__version__}")
print(f"✅ OpenCV: {cv2.__version__}")
print(f"✅ Numpy: {np.__version__}")
print(f"✅ Timm: {timm.__version__}")

print("=" * 50)
print("ALL GOOD! READY TO BUILD! 🚀")
print("=" * 50)