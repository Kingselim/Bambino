
import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt";
import { ActivatedRoute, Router } from '@angular/router';  // Added Router
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-meeting-urgence',
  templateUrl: './meeting-urgence.component.html',
  styleUrls: ['./meeting-urgence.component.css']
})
export class MeetingUrgenceComponent implements OnInit, AfterViewInit {

  appointmentId!: string | null;

  isRecording = false;
  mediaRecorder!: MediaRecorder;

  audioChunks: Blob[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}


  ngOnInit(): void {
    this.appointmentId = this.route.snapshot.queryParamMap.get('roomID');
  }
  

  ngAfterViewInit(): void {
    this.initZegoKit();
  }

  initZegoKit(): void {
    const getUrlParams = (url: string): { [key: string]: string } => {
      const params: { [key: string]: string } = {};
      const urlStr = url.split('?')[1];
      if (urlStr) {
        const urlSearchParams = new URLSearchParams(urlStr);
        urlSearchParams.forEach((value, key) => {
          params[key] = value;
        });
      }
      return params;
    };

    //const roomID = this.route.snapshot.queryParamMap.get('roomID') || (Math.floor(Math.random() * 10000) + "");
    const roomID = getUrlParams(window.location.href)['roomID'] || (Math.floor(Math.random() * 10000) + "");
    const userID = Math.floor(Math.random() * 10000) + "";
    const userName = "userName" + userID;
    const appID = 1452671263;
    const serverSecret = "48583229452fb527e854f15b8e7998da";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

    const container = document.querySelector("#root") as HTMLElement | null;
    if (!container) {
      console.error("Container #root not found!");
      return;
    }

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: container,
      sharedLinks: [{
        name: 'Personal link',
        url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
      }],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 50,
      layout: "Auto",
      showLayoutButton: true,
    });
  }


  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.audioChunks = [];  // Clear old chunks before starting new recording.
  
        this.mediaRecorder.ondataavailable = event => {
          this.audioChunks.push(event.data);
        };
        
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          const formData = new FormData();
          formData.append('file', audioBlob, 'recording.wav');
          formData.append('appointmentId', this.appointmentId || '');

  
          this.http.post('/api/meetings/process-recording', formData)
            .subscribe({
              next: (response: any) => {
                console.log('Processing complete:', response.pdfUrl);
              },
              error: error => {
                console.error('Error uploading recording:', error);
              }
            });
          
          this.audioChunks = [];  // Clear after sending
        };
        
        this.mediaRecorder.start();
        this.isRecording = true;
      })
      .catch(error => {
        console.error('Microphone access denied or error:', error);
      });
  }
  
  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }
  




}
