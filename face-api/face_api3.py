import cv2
import dlib
import numpy as np
from fastapi import FastAPI, UploadFile, File
from io import BytesIO
import uvicorn
from PIL import Image

# Charger les détecteurs
face_detector = dlib.get_frontal_face_detector()

# Charger le modèle de reconnaissance faciale (il te faut ce fichier: dlib_face_recognition_resnet_model_v1.dat)
face_rec_model = dlib.face_recognition_model_v1('dlib_face_recognition_resnet_model_v1.dat')

# Charger le prédicteur de repères faciaux (il te faut ce fichier: shape_predictor_68_face_landmarks.dat)
shape_predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

# Créer l'application FastAPI
app = FastAPI()

# Fonction pour convertir une image en format utilisable par dlib
def read_image(image_data: bytes):
    image = Image.open(BytesIO(image_data))
    return np.array(image)

@app.post("/compare-faces/")
async def compare_faces(file1: UploadFile = File(...), file2: UploadFile = File(...)):
    # Lire les images envoyées
    img1 = read_image(await file1.read())
    img2 = read_image(await file2.read())

    # Convertir en gris pour la détection
    gray1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    gray2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)

    # Détecter les visages
    faces1 = face_detector(gray1)
    faces2 = face_detector(gray2)

    if len(faces1) == 0 or len(faces2) == 0:
        return {"match": False, "error": "Aucun visage détecté dans l'une des images."}

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

    # Si la distance est petite, on considère que les visages sont similaires
    if distance < 0.5:  # seuil ajustable selon ton cas d'utilisation
        print("Les visages correspondent avec un tau de :", distance, "!")
        
        return {"match": True, "distance": distance}
    else:
        print("Les visages ne correspondent pas.")
        return {"match": False, "distance": distance}

# Lancer le serveur
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
