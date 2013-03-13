define(["jquery", "util"], function ($, util) {
  var eventMaker = util.Module("eventMaker");
  var assert = util.assert;

  eventMaker.performClick = function (target) {
    // FIXME: should accept other parameters, like Ctrl/Alt/etc
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click", // type
      true, // canBubble
      true, // cancelable
      window, // view
      0, // detail
      0, // screenX
      0, // screenY
      0, // clientX
      0, // clientY
      false, // ctrlKey
      false, // altKey
      false, // shiftKey
      false, // metaKey
      0, // button
      null // relatedTarget
    );
    // FIXME: I'm not sure this custom attribute always propagates?
    // seems okay in Firefox/Chrome, but I've had problems with
    // setting attributes on keyboard events in the past.
    event.towtruckInternal = true;
    target = $(target)[0];
    var cancelled = target.dispatchEvent(event);
    if (cancelled) {
      return;
    }
    if (target.tagName == "A") {
      var href = target.href;
      if (href) {
        location.href = href;
        return;
      }
    }
    // FIXME: should do button clicks
  };

  eventMaker.inEvent = false;

  return eventMaker;
});