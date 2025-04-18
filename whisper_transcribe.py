import sys
import whisper  # or `import whisper_cpp as whisper` for Option A

def transcribe(audio_path):
    model = whisper.load_model("tiny.en")  # Use "ggml-tiny.en.bin" for Option A
    result = model.transcribe(audio_path)
    return result["text"]

if __name__ == "__main__":
    print("Received audio file:", sys.argv[1])  # Log received path
    print(transcribe(sys.argv[1]))