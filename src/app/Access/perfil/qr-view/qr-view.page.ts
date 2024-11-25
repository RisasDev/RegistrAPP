import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-qr-view',
  templateUrl: './qr-view.page.html',
  styleUrls: ['./qr-view.page.scss'],
})
export class QrViewPage {

  qrAssist = 'github.com';

  constructor(
    private loadingController: LoadingController,
    private platform: Platform
  ) {
  }

  captureSceern() {

    const element = document.getElementById('qrImage') as HTMLElement;
    html2canvas(element).then((canvas: HTMLCanvasElement) => {

      this.downloadImage(canvas);
      if (this.platform.is('capacitor'))this.shareImage(canvas);
      else this.downloadImage(canvas);

    })
  }

  // Download image
  downloadImage(canvas: HTMLCanvasElement) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'qrAssist.png';
    link.click();
  }

  // Share image
  async shareImage(canvas: HTMLCanvasElement) {

    let base64 = canvas.toDataURL();
    let path = 'qrAssist.png';

    const loading = await this.loadingController.create({spinner: 'crescent'});
    await loading.present();

    await Filesystem.writeFile({
      path: path,
      data: base64,
      directory: Directory.Cache
    }).then(async(res) => {

      let uri = res.uri;
      await Share.share({url: uri});
      await Filesystem.deleteFile({path: path, directory: Directory.Cache});

    }).finally(() => {
      loading.dismiss();
    })
  }
}
