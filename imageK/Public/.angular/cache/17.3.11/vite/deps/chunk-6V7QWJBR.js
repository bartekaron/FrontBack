import {
  DomHandler
} from "./chunk-YHTDT4CO.js";
import {
  CommonModule
} from "./chunk-XLSINCXO.js";
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  NgModule,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵlistener
} from "./chunk-YFXVGDDX.js";

// node_modules/primeng/fesm2022/primeng-focustrap.mjs
var FocusTrap = class _FocusTrap {
  el;
  /**
   * When set as true, focus wouldn't be managed.
   * @group Props
   */
  pFocusTrapDisabled = false;
  constructor(el) {
    this.el = el;
  }
  onkeydown(e) {
    if (this.pFocusTrapDisabled !== true) {
      e.preventDefault();
      const focusableElement = DomHandler.getNextFocusableElement(this.el.nativeElement, e.shiftKey);
      if (focusableElement) {
        focusableElement.focus();
        focusableElement.select?.();
      }
    }
  }
  static ɵfac = function FocusTrap_Factory(t) {
    return new (t || _FocusTrap)(ɵɵdirectiveInject(ElementRef));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _FocusTrap,
    selectors: [["", "pFocusTrap", ""]],
    hostAttrs: [1, "p-element"],
    hostBindings: function FocusTrap_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("keydown.tab", function FocusTrap_keydown_tab_HostBindingHandler($event) {
          return ctx.onkeydown($event);
        })("keydown.shift.tab", function FocusTrap_keydown_shift_tab_HostBindingHandler($event) {
          return ctx.onkeydown($event);
        });
      }
    },
    inputs: {
      pFocusTrapDisabled: "pFocusTrapDisabled"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusTrap, [{
    type: Directive,
    args: [{
      selector: "[pFocusTrap]",
      host: {
        class: "p-element"
      }
    }]
  }], () => [{
    type: ElementRef
  }], {
    pFocusTrapDisabled: [{
      type: Input
    }],
    onkeydown: [{
      type: HostListener,
      args: ["keydown.tab", ["$event"]]
    }, {
      type: HostListener,
      args: ["keydown.shift.tab", ["$event"]]
    }]
  });
})();
var FocusTrapModule = class _FocusTrapModule {
  static ɵfac = function FocusTrapModule_Factory(t) {
    return new (t || _FocusTrapModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _FocusTrapModule,
    declarations: [FocusTrap],
    imports: [CommonModule],
    exports: [FocusTrap]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusTrapModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      exports: [FocusTrap],
      declarations: [FocusTrap]
    }]
  }], null, null);
})();

export {
  FocusTrap,
  FocusTrapModule
};
//# sourceMappingURL=chunk-6V7QWJBR.js.map
