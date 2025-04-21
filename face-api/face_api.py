import os
# Assure-toi que le chemin vers les modèles est correctement défini
import face_recognition
from fastapi import FastAPI, UploadFile, File
import uvicorn
#face_recognition.api.model_location = './face_recognition_models'
#face_recognition.api.model_location = os.path.join(os.getcwd(), 'face_recognition_models')
face_recognition.api.model_location = os.path.join(os.getcwd(), 'face_recognition_models')

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "API is working!"}


@app.post("/compare-faces/")
async def compare_faces(file1: UploadFile = File(...), file2: UploadFile = File(...)):
    # Affiche le chemin des modèles
    print(f"Modèle chargé depuis : {face_recognition.api.model_location}")
    
    img1 = face_recognition.load_image_file(await file1.read())
    img2 = face_recognition.load_image_file(await file2.read())

    try:
        encoding1 = face_recognition.face_encodings(img1)[0]
        encoding2 = face_recognition.face_encodings(img2)[0]
    except IndexError:
        return {"match": False, "error": "Face not found in one of the images."}

    result = face_recognition.compare_faces([encoding1], encoding2)[0]
    return {"match": result}
