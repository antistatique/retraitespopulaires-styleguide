let authorizedOrigins = ["https://uat.logismata.ch", "https://services.logismata.ch", 'http://rp.test', "http://rp.localhost", "https://www.retraitespopulaires.ch", "https://wwweti.retraitespopulaires.ch"];
let sendOnIFrameScrollMessage = true;

let iFrameMessageProcessor = {
   onInnerFrameChanged: function(parameters) {
      let calculationFrame = document.getElementById('calculationFrame');
      if (calculationFrame) {
         //console.debug("about to set: " + parameters + "px");
         //We give some more space to ensure that the margins fit within the iframe.
         let height = Math.max(parameters + 20, 200);
         calculationFrame.height = height + "px";
      }
   },

   onRouteChanged: function(parameters) {
   },

   onDocumentTitleChanged: function(parameters) {
      //document.title = parameters;
   },

   onViewTitleChanged: function(parameters) {
   },

   onGetDataFromQuickWin: function(parameters) {
      //console.log("received from quickwin %O", parameters);
   },

   openContactUrl: function(parameters) {
      window.location = '/contact/conseil-clients-prives';
   }
};

function processMessage(message, parameters) {
   //console.debug("Processing message in main frame: " + message);
   if (message === "onInnerFrameChanged") {
      iFrameMessageProcessor.onInnerFrameChanged(parameters);
   }

   if (message === "onRouteChanged") {
      iFrameMessageProcessor.onRouteChanged(parameters);
   }

   if (message === "onDocumentTitleChanged") {
      iFrameMessageProcessor.onDocumentTitleChanged(parameters);
   }

   if (message === "onViewTitleChanged") {
      iFrameMessageProcessor.onViewTitleChanged(parameters);
   }

   if (message === "onGetDataFromQuickWin") {
      iFrameMessageProcessor.onGetDataFromQuickWin(parameters);
   }

   if (message === "openContactUrl") {
      iFrameMessageProcessor.openContactUrl(parameters);
   }
}

/* Cross Domain Messages */
window.addEventListener("message", receiveMessage, false);

function isAuthorized(origin) {
   let result = false;

   let authorizedOriginsToRemove = [];

   for (let index = 0; index < authorizedOrigins.length ; index++) {
      if (origin === authorizedOrigins[index] ||
          authorizedOrigins[index] === "*") {
         result = true;
      }
      else {
         authorizedOriginsToRemove.push(authorizedOrigins[index]);
      }
   }

   if (authorizedOrigins.length != authorizedOriginsToRemove.length) {
     for (let index = 0; index < authorizedOriginsToRemove.length; index++) {
       authorizedOrigins.splice(authorizedOrigins.indexOf(authorizedOriginsToRemove[index]), 1);
     }
   }

   return result;
}

function receiveMessage(event) {
   if (!isAuthorized(event.origin)) {
      return;
   }

   processMessage(event.data.message, event.data.parameters);
}

function sendMessageToiFrame(message, parameters) {
   //console.debug(">>> Sending message to main frame: " + message);
   let calculationFrame = document.getElementById('calculationFrame');
   if (calculationFrame) {
      message = {
         message: message,
         parameters: parameters
      };
      for (let i = 0; i < authorizedOrigins.length; i++) {
         calculationFrame.contentWindow.postMessage(message, authorizedOrigins[i]);
      }
   }
}

/* Cross Domain Messages End*/

function findPosY(object) {
   let top = 0;

   if (object.offsetParent) {
      while (object.offsetParent) {
         top += object.offsetTop;
         object = object.offsetParent;
      }
   }
   else if (object.y) {
      top += object.y;
   }
   return top;
}
if (sendOnIFrameScrollMessage) {
   setInterval(
      function() {
         let iframeTop = findPosY(document.getElementById('calculationFrame'));

         sendMessageToiFrame("onIFrameScroll", window.scrollY - iframeTop);
      },
      500);
}
