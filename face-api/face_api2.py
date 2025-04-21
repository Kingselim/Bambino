import cv2
import dlib
import numpy as np

# Charger les détecteurs
face_detector = dlib.get_frontal_face_detector()

# Charger le modèle de reconnaissance faciale (il te faut ce fichier: dlib_face_recognition_resnet_model_v1.dat)
face_rec_model = dlib.face_recognition_model_v1('dlib_face_recognition_resnet_model_v1.dat')

# Charger le prédicteur de repères faciaux (il te faut ce fichier: shape_predictor_68_face_landmarks.dat)
shape_predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

# Charger les images
img1 = cv2.imread('img1.jpg')
img2 = cv2.imread('img4.jpg')

# Convertir en gris pour la détection
gray1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
gray2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)

# Détecter les visages
faces1 = face_detector(gray1)
faces2 = face_detector(gray2)

if len(faces1) == 0 or len(faces2) == 0:
    print("Aucun visage détecté dans l'une des images.")
else:
    # Extraire les descripteurs des visages
    face1 = faces1[0]
    face2 = faces2[0]
    
    # Extraire les points de repère faciaux
    landmarks1 = shape_predictor(gray1, face1)
    landmarks2 = shape_predictor(gray2, face2)
    
    # Extraire les descripteurs faciaux
    descriptor1 = np.array(face_rec_model.compute_face_descriptor(img1, landmarks1))
    descriptor2 = np.array(face_rec_model.compute_face_descriptor(img2, landmarks2))
    
    # Comparaison des visages
    distance = np.linalg.norm(descriptor1 - descriptor2)
    print(f"Distance entre les visages : {distance}")
    
    # Si la distance est petite, on considère que les visages sont similaires
    if distance < 0.6:  # seuil ajustable selon ton cas d'utilisation
        print("Les visages correspondent !")
    else:
        print("Les visages ne correspondent pas.")
