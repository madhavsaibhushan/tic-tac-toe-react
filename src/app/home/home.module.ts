import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MainwrapperComponent } from '../mainwrapper/mainwrapper.component';
import { Admob } from '@ionic-native/admob/ngx';
// import { Admob } from '@ionic-native/admob';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  providers:[Admob],
  declarations: [HomePage,
    MainwrapperComponent
  ]
  
})
export class HomePageModule {}
