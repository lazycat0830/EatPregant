import sys 
import json
import time
import config
import azure.cognitiveservices.speech as speechsdk

sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf-8', buffering=1)
def from_mic():
    speech_config = speechsdk.SpeechConfig(subscription=config.api_key, region="eastasia")
    speech_config.speech_recognition_language="zh-TW"
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config)

    result = speech_recognizer.recognize_once_async().get()
    
    if result.reason == speechsdk.ResultReason.RecognizedSpeech:
        result_json = json.dumps(result.text, ensure_ascii=False)
        print(str(result_json))
        # print("Recognized: {}".format(result.text))
    elif result.reason == speechsdk.ResultReason.NoMatch:
        # print("No speech could be recognized: {}".format(result.no_match_details))
        print("發生錯誤，請再試一次A")
    elif result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = result.cancellation_details
        print("發生錯誤，請再試一次B")
        # print("Speech Recognition canceled: {}".format(cancellation_details.reason))
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            print("發生錯誤，請再試一次C")
            # print("Error details: {}".format(cancellation_details.error_details))
            # print("Did you set the speech resource key and region values?")
    
    
    sys.stdout.flush()

from_mic()
# result = sys.argv[1]


# json = json.dumps(result,ensure_ascii=False)

# print(str(json))
