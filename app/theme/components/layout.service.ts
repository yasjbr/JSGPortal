import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { config } from 'src/app/shared/smartadmin.config';
import * as $ from 'jquery';

// declare var $: any; 


const store = {
    smartSkin: config.smartSkin,
    skin: config.skins.find((_skin) => {
        return _skin.name === (localStorage.getItem('hr-skin') || config.smartSkin);
    }),
    skins: config.skins,
    fixedHeader: localStorage.getItem('sm-fixed-header') === 'true',
    fixedNavigation: localStorage.getItem('sm-fixed-navigation') === 'true',
    fixedRibbon: localStorage.getItem('sm-fixed-ribbon') === 'true',
    fixedPageFooter: localStorage.getItem('sm-fixed-page-footer') === 'true',
    insideContainer: localStorage.getItem('sm-inside-container') === 'true',
    rtl: localStorage.getItem('sm-rtl') ? localStorage.getItem('sm-rtl') === 'true' : true, // true,
    menuOnTop: localStorage.getItem('sm-menu-on-top') === 'true',
    colorblindFriendly: localStorage.getItem('sm-colorblind-friendly') === 'true',

    shortcutOpen: false,
    isMobile: (/iphone | ipad | ipod | android | blackberry | mini | windows\sce | palm/i.test(navigator.userAgent.toLowerCase())),
    device: '',

    mobileViewActivated: false,
    menuCollapsed: false,
    menuMinified: false,
};


@Injectable()
export class LayoutService {
    isActivated: boolean;
    smartSkin: string;

    store: any;

    public isRtl: BehaviorSubject<boolean>;

    private subject: Subject<any>;

    constructor() {
        this.subject = new Subject();
        this.store = store;
        this.isRtl = new BehaviorSubject<boolean>(this.store.rtl);
        this.trigger();
        this.onRtl(this.store.rtl);
        // Observable.fromEvent(window, 'resize').debounceTime(100).map(() => {
        //     this.trigger();
        // }).subscribe();
    }

    trigger() {
        this.processBody(this.store);
        this.subject.next(this.store);
    }

    subscribe(next, err?, complete?) {
        return this.subject.subscribe(next, err, complete);
    }

    onRtl(isRtl: boolean) {
        this.store.rtl = isRtl;
        this.isRtl.next(this.store.rtl);
        this.dumpStorage();
        this.trigger();
    }


    onMenuOnTop() {
        this.store.menuOnTop = !this.store.menuOnTop;
        this.dumpStorage();
        this.trigger();
    }

    onCollapseMenu(value?) {
        if (typeof value !== 'undefined') {
            this.store.menuCollapsed = value;
        } else {
            this.store.menuCollapsed = !this.store.menuCollapsed;
        }

        this.trigger();
    }

    onShortcutToggle(condition?: any) {
        if (condition == null) {
            this.store.shortcutOpen = !this.store.shortcutOpen;
        } else {
            this.store.shortcutOpen = ! !condition;
        }

        this.trigger();
    }


    dumpStorage() {
        localStorage.setItem('hr-skin', this.store.smartSkin);
        localStorage.setItem('sm-fixed-header', this.store.fixedHeader);
        localStorage.setItem('sm-fixed-navigation', this.store.fixedNavigation);
        localStorage.setItem('sm-fixed-ribbon', this.store.fixedRibbon);
        localStorage.setItem('sm-fixed-page-footer', this.store.fixedPageFooter);
        localStorage.setItem('sm-inside-container', this.store.insideContainer);
        localStorage.setItem('sm-rtl', this.store.rtl);
        localStorage.setItem('sm-menu-on-top', this.store.menuOnTop);
        localStorage.setItem('sm-colorblind-friendly', this.store.colorblindFriendly);
    }

    factoryReset() {
        // this.notificationService.smartMessageBox({
        //     title: '<i class=\'fa fa-refresh\' style=\'color:green\'></i> Clear Local Storage',
        //     content: 'Would you like to RESET all your saved widgets and clear LocalStorage?',
        //     buttons: '[No][Yes]'
        // }, (ButtonPressed) => {
        //     if (ButtonPressed === 'Yes' && localStorage) {
        //         localStorage.clear();
        //         location.reload();
        //     }
        // });
    }


    processBody(state) {
        const $body = $('body');
        $body.removeClass(state.skins.map((it) => (it.name)).join(' '));
        $body.addClass(state.skin.name);
        $('#logo img').attr('src', state.skin.logo);

        $body.toggleClass('fixed-header', state.fixedHeader);
        $body.toggleClass('fixed-navigation', state.fixedNavigation);
        $body.toggleClass('fixed-ribbon', state.fixedRibbon);
        $body.toggleClass('fixed-page-footer', state.fixedPageFooter);
        $body.toggleClass('container', state.insideContainer);
        $body.toggleClass('smart-rtl', state.rtl);
        $body.toggleClass('menu-on-top', state.menuOnTop);
        $body.toggleClass('colorblind-friendly', state.colorblindFriendly);
        $body.toggleClass('shortcut-on', state.shortcutOpen);


        state.mobileViewActivated = $(window).width() < 979;
        $body.toggleClass('mobile-view-activated', state.mobileViewActivated);
        if (state.mobileViewActivated) {
            $body.removeClass('minified');
        }

        if (state.isMobile) {
            $body.addClass('mobile-detected');
        } else {
            $body.addClass('desktop-detected');
        }

        if (state.menuOnTop) { $body.removeClass('minified'); }


        if (!state.menuOnTop) {
            $body.toggleClass('hidden-menu-mobile-lock', state.menuCollapsed);
            $body.toggleClass('hidden-menu', state.menuCollapsed);
            $body.removeClass('minified');
        } else if (state.menuOnTop && state.mobileViewActivated) {
            $body.toggleClass('hidden-menu-mobile-lock', state.menuCollapsed);
            $body.toggleClass('hidden-menu', state.menuCollapsed);
            $body.removeClass('minified');
        }

        if (state.menuMinified && !state.menuOnTop && !state.mobileViewActivated) {
            $body.addClass('minified');
            $body.removeClass('hidden-menu');
            $body.removeClass('hidden-menu-mobile-lock');
        }
    }
}
