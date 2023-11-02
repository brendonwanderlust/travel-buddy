import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.setTitle(this.router.routerState.snapshot.url);
    this.navSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setTitle(event.url);
      }
    });
  }

  title!: string;
  navSubscription: Subscription | undefined;

  setTitle(tab: string) {
    switch (tab) {
      case '/tabs/currency-convert':
        this.title = 'Currency';
        break;
      default:
        this.title = '';
    }
  }

  ngOnDestroy() {
    this.navSubscription!.unsubscribe();
  }
}
