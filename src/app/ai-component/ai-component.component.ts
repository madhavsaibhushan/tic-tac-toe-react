import { Component, OnInit } from '@angular/core';
import { AdmobBaseOptions, Admob, AdmobOptions } from '@ionic-native/admob/ngx';
@Component({
  selector: 'app-ai-component',
  templateUrl: './ai-component.component.html',
  styleUrls: ['./ai-component.component.scss'],
})
export class AiComponentComponent implements OnInit {
  arrayofCards = Array.apply(null, Array(9))
  cardValue = 'X';
  storage = Array.apply(0, Array(9))
    ;
  play = 1;
  winPlay = null;
  X_WINS = 0
  Computer_Wins = 0
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
  pattern;
  whoWins: any = false
  constructor(private admob: Admob) {
    const admobOptions: AdmobOptions = {
      // bannerAdId: 'ca-app-pub-4672363477819133/7440821805',
      // interstitialAdId: 'ca-app-pub-4672363477819133/9240988634',
      bannerAdId: 'ca-app-pub-3940256099942544~3347511713',
      interstitialAdId: 'ca-app-pub-3940256099942544~3347511713',
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
    this.pattern = this.possibilitiesOfBingo
  }

  ngOnInit() {
    this.addsLoading()
  }

  onCardClick(index) {
    if (!this.arrayofCards[index]) {
      this.arrayofCards[index] = this.cardValue
      this.cardValue = this.cardValue === 'X' ? 'O' : 'X'
      this.setComputerClick()
      this.CheckIfitsABingo()
    }

  }
  buildStorage() {
    this.storage = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
  getRandomComputerMove() {

    return Math.floor(Math.random() * 9)
  }
  setComputerClick() {
    const computerMove = this.getRandomComputerMove()
    console.log(computerMove)
    console.log(this.arrayofCards[computerMove])
    if (this.arrayofCards[computerMove] === undefined) {
      this.arrayofCards[computerMove] = this.cardValue
      this.cardValue = this.cardValue === 'X' ? 'O' : 'X'
    }
    else {
      this.setComputerClick()
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
        this.X_WINS = this.X_WINS++

        return;
      } else if (
        currentArrayofCards[each[0]] === "O" &&
        currentArrayofCards[each[1]] === "O" &&
        currentArrayofCards[each[2]] === "O"
      ) {

        // whoWins: "O WINS",
        this.whoWins = "O WINS";
        this.Computer_Wins = this.Computer_Wins++

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
    this.admob.showBannerAd(true).then((re) => {
      console.log(re)
    }, (err) => {
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

  getWin(getPlay, getPattern) {
    var count = 0;

    for (var i in getPattern) {
      if (this.storage[getPattern[i]] === getPlay) {
        count++;
      }
    }

    if (count === 3) {
      this.winPlay = getPlay;
    }
  }
  confirmPattern(getPlay, aiValidate) {
    var returnValue = false;

    for (var i in this.pattern) {
      var matchCount = 0;

      for (var j in this.pattern[i]) {
        var matchIndex = this.pattern[i][j];

        if (this.storage[matchIndex] === getPlay) {
          matchCount++;
        }
        else if (this.storage[matchIndex] > 0) {
          matchCount--;
        }
      }

      if (matchCount > 1 && aiValidate) {
        returnValue = this.pattern[i];

        break;
      }
      else if (matchCount > 2 && !aiValidate) {
        returnValue = this.pattern[i];

        break;
      }
    }

    return returnValue;
  }
}

