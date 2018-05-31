# lean-canvas

Motivation / Purpose
====================
Learn to use git, refresh old knowledge and learn more about offline-first on mobile devices, by making an app that makes it convenient to jot down business related thoughts on the go, queueing or commuting.

Project scope:
==============
* A simple mobile application consisting of four dialogues, for listing/opening, viewing, editing, and deleting [lean canvases](http://ask.leanstack.com/business-model-design-fundamentals/concepts-and-definitions/what-is-a-lean-canvas).
* Works on Chrome for Android [turns out to work perfectly with Edge as well, not tested with Firefox].
* Can be used entirely offline.
* Satisfies all requirements needed to support installing to the home screen of a device (app manifest, icons, service worker, etc.)
* Lets the user export and download a canvas as a JSON file, just in case the future wants it.


Implementation:
===============
PouchDB is used to store the canvases as individual objects indexed by a UUIDv4 generated by PouchDB when doing a db.push().

HTML, CSS and JavaScript is kept in one file with the exception of the service worker that is required to be loaded as a separate file, and the dependencies PouchDB, Roboto and Material-icons.

The key names (object properties) of the documents stored in the database correspond to the IDs of html elements in the "view" and "edit" dialogues of the app. This allows reading from and writing to the database with a loop that traverses the html elements to be read from and written to. To avoid traversing \_id and \_rev keys, the collection of html elements is iterated over instead of the document keys.

The database doc currently worked on is stored in its entirety as a global (named "canvas") giving access to its fields, its \_id and its \_rev throughout the applications dialogues. This global object then contains the complete state of the app.

\<section\> elements define the dialogues, each covering the entire screen when visible.

One rule for valid html5 is broken where multiple elements (exactly two of each) have the same ID. One set of elements in the "view" dialogue has the same IDs as one set of elements in the "edit" dialogue. These elements are never visible or active on the page at the same time and browsers show no problems handling it. The simplicity that this design decision awarded the JavaScript code, made me choose to keep it this way for now.

Demo
====
The app can be accessed at http://kaaare.github.io/lean-canvas. Note that the app is designed primarily for mobile devices.
