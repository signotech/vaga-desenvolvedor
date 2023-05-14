// packages/focus/src/index.js
import { createFocusTrap } from "focus-trap";
import { focusable, isFocusable } from "tabbable";
function src_default(Alpine) {
  let lastFocused;
  let currentFocused;
  window.addEventListener("focusin", () => {
    lastFocused = currentFocused;
    currentFocused = document.activeElement;
  });
  Alpine.magic("focus", (el) => {
    let within = el;
    return {
      __noscroll: false,
      __wrapAround: false,
      within(el2) {
        within = el2;
        return this;
      },
      withoutScrolling() {
        this.__noscroll = true;
        return this;
      },
      noscroll() {
        this.__noscroll = true;
        return this;
      },
      withWrapAround() {
        this.__wrapAround = true;
        return this;
      },
      wrap() {
        return this.withWrapAround();
      },
      focusable(el2) {
        return isFocusable(el2);
      },
      previouslyFocused() {
        return lastFocused;
      },
      lastFocused() {
        return lastFocused;
      },
      focused() {
        return currentFocused;
      },
      focusables() {
        if (Array.isArray(within))
          return within;
        return focusable(within, { displayCheck: "none" });
      },
      all() {
        return this.focusables();
      },
      isFirst(el2) {
        let els = this.all();
        return els[0] && els[0].isSameNode(el2);
      },
      isLast(el2) {
        let els = this.all();
        return els.length && els.slice(-1)[0].isSameNode(el2);
      },
      getFirst() {
        return this.all()[0];
      },
      getLast() {
        return this.all().slice(-1)[0];
      },
      getNext() {
        let list = this.all();
        let current = document.activeElement;
        if (list.indexOf(current) === -1)
          return;
        if (this.__wrapAround && list.indexOf(current) === list.length - 1) {
          return list[0];
        }
        return list[list.indexOf(current) + 1];
      },
      getPrevious() {
        let list = this.all();
        let current = document.activeElement;
        if (list.indexOf(current) === -1)
          return;
        if (this.__wrapAround && list.indexOf(current) === 0) {
          return list.slice(-1)[0];
        }
        return list[list.indexOf(current) - 1];
      },
      first() {
        this.focus(this.getFirst());
      },
      last() {
        this.focus(this.getLast());
      },
      next() {
        this.focus(this.getNext());
      },
      previous() {
        this.focus(this.getPrevious());
      },
      prev() {
        return this.previous();
      },
      focus(el2) {
        if (!el2)
          return;
        setTimeout(() => {
          if (!el2.hasAttribute("tabindex"))
            el2.setAttribute("tabindex", "0");
          el2.focus({ preventScroll: this._noscroll });
        });
      }
    };
  });
  Alpine.directive("trap", Alpine.skipDuringClone(
    (el, { expression, modifiers }, { effect, evaluateLater, cleanup }) => {
      let evaluator = evaluateLater(expression);
      let oldValue = false;
      let options = {
        escapeDeactivates: false,
        allowOutsideClick: true,
        fallbackFocus: () => el
      };
      let autofocusEl = el.querySelector("[autofocus]");
      if (autofocusEl)
        options.initialFocus = autofocusEl;
      let trap = createFocusTrap(el, options);
      let undoInert = () => {
      };
      let undoDisableScrolling = () => {
      };
      const releaseFocus = () => {
        undoInert();
        undoInert = () => {
        };
        undoDisableScrolling();
        undoDisableScrolling = () => {
        };
        trap.deactivate({
          returnFocus: !modifiers.includes("noreturn")
        });
      };
      effect(() => evaluator((value) => {
        if (oldValue === value)
          return;
        if (value && !oldValue) {
          setTimeout(() => {
            if (modifiers.includes("inert"))
              undoInert = setInert(el);
            if (modifiers.includes("noscroll"))
              undoDisableScrolling = disableScrolling();
            trap.activate();
          });
        }
        if (!value && oldValue) {
          releaseFocus();
        }
        oldValue = !!value;
      }));
      cleanup(releaseFocus);
    },
    // When cloning, we only want to add aria-hidden attributes to the
    // DOM and not try to actually trap, as trapping can mess with the
    // live DOM and isn't just isolated to the cloned DOM.
    (el, { expression, modifiers }, { evaluate }) => {
      if (modifiers.includes("inert") && evaluate(expression))
        setInert(el);
    }
  ));
}
function setInert(el) {
  let undos = [];
  crawlSiblingsUp(el, (sibling) => {
    let cache = sibling.hasAttribute("aria-hidden");
    sibling.setAttribute("aria-hidden", "true");
    undos.push(() => cache || sibling.removeAttribute("aria-hidden"));
  });
  return () => {
    while (undos.length)
      undos.pop()();
  };
}
function crawlSiblingsUp(el, callback) {
  if (el.isSameNode(document.body) || !el.parentNode)
    return;
  Array.from(el.parentNode.children).forEach((sibling) => {
    if (sibling.isSameNode(el)) {
      crawlSiblingsUp(el.parentNode, callback);
    } else {
      callback(sibling);
    }
  });
}
function disableScrolling() {
  let overflow = document.documentElement.style.overflow;
  let paddingRight = document.documentElement.style.paddingRight;
  let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
  return () => {
    document.documentElement.style.overflow = overflow;
    document.documentElement.style.paddingRight = paddingRight;
  };
}

// packages/focus/builds/module.js
var module_default = src_default;
export {
  module_default as default
};
