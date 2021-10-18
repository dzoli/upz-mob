import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-camera-preview',
    templateUrl: './camera-preview.page.html',
    styleUrls: ['./camera-preview.page.scss'],
})
export class CameraPreviewPage implements OnInit {
    private trigger: Subject<void> = new Subject<void>();
    private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
    public webcamImage: WebcamImage = null;
    width: number;
    height: number;
    cameraOpened: boolean;
    public img = null;
    public imagesTaken: WebcamImage[] = [];
    public thumbnails = [];

    constructor() {}

    ngOnInit() {}

    changeWebCame(directionOrDeviceId: boolean | string) {
        this.nextWebcam.next(directionOrDeviceId);
    }

    handleImage(webcamImage: WebcamImage) {
        this.webcamImage = webcamImage;
        this.imagesTaken.push(webcamImage);
        this.img = new Image();
        this.compressImage(webcamImage.imageAsDataUrl, 500, 180).then((compressed) => {
            this.img.src = compressed;
        });
        this.thumbnails.push(this.img);
    }

    openCamera() {
        console.log('alum- camera clicked');
        Camera.getPhoto({
            quality: 90,
            source: CameraSource.Prompt,
            correctOrientation: true,
            height: 720,
            width: 600,
            resultType: CameraResultType.Base64,
        })
            .then((img) => {
                console.log('alum- img - ', img.base64String.substring(0, 100));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    closeCamera() {
        this.cameraOpened = false;
    }

    compressImage = function (src, newX, newY) {
        return new Promise((res, rej) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                const elem = document.createElement('canvas');

                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > newX) {
                        height *= newX / width;
                        width = newX;
                    }
                } else {
                    if (height > newY) {
                        width *= newY / height;
                        height = newY;
                    }
                }

                elem.width = width;
                elem.height = height;
                const ctx = elem.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                const data = ctx.canvas.toDataURL('image/jpeg');
                res(data);
            };
            img.onerror = (error) => rej(error);
        });
    };

    onCloseClicked() {
        this.closeCamera();
    }

    get triggerObservable(): Observable<void> {
        return this.trigger.asObservable();
    }

    get nextWebcamObservable(): Observable<boolean | string> {
        return this.nextWebcam.asObservable();
    }
}
