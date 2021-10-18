import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';
import { WebcamImage, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Album } from './album.model';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-photo-album',
    templateUrl: './photo-album.page.html',
    styleUrls: ['./photo-album.page.scss'],
})
export class PhotoAlbumPage implements OnInit {
    album: Album;
    private trigger: Subject<void> = new Subject<void>();
    private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
    public webcamImage: WebcamImage = null;
    width: number = window.innerWidth;
    height: number = window.innerHeight;
    cameraOpened: boolean;
    public img = null;
    public imagesTaken: WebcamImage[] = [];
    public thumbnails = [];
    isCameraExist: boolean = true;

    changeWebCame(directionOrDeviceId: boolean | string) {
        this.nextWebcam.next(directionOrDeviceId);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?: Event) {
        const win = !!event ? (event.target as Window) : window;
        this.width = win.innerWidth;
        this.height = win.innerHeight;
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
        this.cameraOpened = true;
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

    get triggerObservable(): Observable<void> {
        return this.trigger.asObservable();
    }

    get nextWebcamObservable(): Observable<boolean | string> {
        return this.nextWebcam.asObservable();
    }

    constructor(private router: Router) {
        this.onResize();
    }

    async ngOnInit() {
        this.album = new Album('');
        WebcamUtil.getAvailableVideoInputs().then((mediaDevices: MediaDeviceInfo[]) => {
            this.isCameraExist = mediaDevices && mediaDevices.length > 0;
        });
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.cameraOpened = false;
    }

    onCloseClicked() {
        this.album.comment = '';
    }

    onPhotoClicked() {
        console.log('photo clicked');
        this.router.navigate(['photo-album/camera-preview']);
    }
}
