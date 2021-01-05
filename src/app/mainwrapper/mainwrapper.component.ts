import { Component, OnInit } from '@angular/core';
import { AdmobBaseOptions, Admob, AdmobOptions } from '@ionic-native/admob/ngx';
@Component({
  selector: 'app-mainwrapper',
  templateUrl: './mainwrapper.component.html',
  styleUrls: ['./mainwrapper.component.scss'],
})
export class MainwrapperComponent implements OnInit {
  arrayofCards = Array.apply(null, Array(9))
  cardValue = 'X';
  possibilitiesOfBingo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  whoWins: any = false
  constructor(private admob: Admob) {
    const admobOptions: AdmobOptions = {
      // bannerAdId: 'ca-app-pub-4672363477819133/7440821805',
      // interstitialAdId: 'ca-app-pub-4672363477819133/9240988634',
      bannerAdId:'ca-app-pub-3940256099942544~3347511713',
      interstitialAdId:'ca-app-pub-3940256099942544~3347511713',
      // rewardedAdId: 'XXX-XXXX-XXXX',
      isTesting: true,
      autoShowBanner: true,
      autoShowInterstitial: true,
      autoShowRewarded: false,
      adSize: this.admob.AD_SIZE.BANNER,
      publisherId: 'pub-4672363477819133'
    };
    this.admob.setOptions(admobOptions)
      .then(() => console.log('Admob options have been successfully set'))
      .catch(err => console.error('Error setting admob options:', err));
  }

  ngOnInit() { 
    this.addsLoading()
  }

  onCardClick(index) {
    if (!this.arrayofCards[index]) {
      this.arrayofCards[index] = this.cardValue
      this.cardValue = this.cardValue === 'X' ? 'O' : 'X'
      this.CheckIfitsABingo()
    }
  }
  CheckIfitsABingo = () => {
    const currentArrayofCards = this.arrayofCards;
    this.possibilitiesOfBingo.forEach((each) => {
      if (
        currentArrayofCards[each[0]] === "X" &&
        currentArrayofCards[each[1]] === "X" &&
        currentArrayofCards[each[2]] === "X"
      ) {

        this.whoWins = "X WINS"

        return;
      } else if (
        currentArrayofCards[each[0]] === "O" &&
        currentArrayofCards[each[1]] === "O" &&
        currentArrayofCards[each[2]] === "O"
      ) {

        // whoWins: "O WINS",
        this.whoWins = "O WINS"

        return;
      } else if (
        !currentArrayofCards.includes(undefined)
      ) {
        this.whoWins = "IT IS A DRAW"
      }

      //   else if(this.currentArrayofCards.l)
    });
    console.log(this.whoWins);
  };
  restart() {
    this.arrayofCards = Array.apply(null, Array(9))
    this.whoWins = false
    // this.admob.onAdLoaded().subscribe((ad) => {
    //   console.log(ad)
    //   if (ad.adType === this.admob.AD_TYPE.INTERSTITIAL) {
    //     this.admob.showInterstitialAd()
    //       .then(() => console.log('Interstitial ad shown'))
    //       .catch(err => console.error('Error showing interstitial ad:', err));
    //   }
    // });
    this.admob.showBannerAd(true).then((re)=>{
      console.log(re)
    },(err)=>{
      console.log(err)
    })
  }
  addsLoading() {
    this.admob.createBannerView()
      .then(() => console.log('Banner ad loaded'))
      .catch(err => console.error('Error loading banner ad:', err));


    this.admob.onAdLoaded().subscribe((ad) => {
      if (ad.adType === this.admob.AD_TYPE.BANNER) {
        this.admob.showBannerAd()
          .then(() => console.log('Banner ad shown'))
          .catch(err => console.error('Error showing banner ad:', err));
      }
    });

    this.admob.requestInterstitialAd()
  .then(() => console.log('Interstitial ad loaded'))
  .catch(err => console.error('Error loading interstitial ad:', err));


// Show an interstitial ad (requestInterstitialAd must be called before)

  }


}

