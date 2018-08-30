const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const dbRef = admin.database().ref();

/*exports.deleteOldOffers = functions.database.ref('/transaction/offer/{pushId}').onWrite((change) => {
    const ref = change.after.ref.parent; // reference to the parent
    // convert to locale time
    const cutoff = Date.now() + 2.88*(Math.pow(10, 7));
    const oldItemsQuery = ref.orderByChild('utc').endAt(cutoff);
    return oldItemsQuery.once('value').then((snapshot) => {
        // create a map with all children that need to be removed
        const updates = {};
        snapshot.forEach(child => {
          updates[child.key] = null;
        });
        // execute all updates in one go and return the result to end the function
        return ref.update(updates);
    });
});

exports.deleteOldRequests = functions.database.ref('/transaction/request/{pushId}').onWrite((change) => {
    const ref = change.after.ref.parent; // reference to the parent
    const cutoff = Date.now() + 2.88*(Math.pow(10, 7));
    const oldItemsQuery = ref.orderByChild('utc').endAt(cutoff);
    return oldItemsQuery.once('value').then((snapshot) => {
        // create a map with all children that need to be removed
        const updates = {};
        snapshot.forEach(child => {
          updates[child.key] = null;
        });
        // execute all updates in one go and return the result to end the function
        return ref.update(updates);
    });
});*/

exports.autoCleanOffer = functions.https.onRequest((req, res)=>{
    const offerRef = dbRef.child('transaction').child('offer');
    const cutoff = Date.now() + 2.88*(Math.pow(10, 7));
    const oldItemsQuery = offerRef.orderByChild('utc').endAt(cutoff);
    return oldItemsQuery.once('value').then((snapshot) => {
        // create a map with all children that need to be removed
        const updates = {};
        snapshot.forEach(child => {
          updates[child.key] = null;
        });
        // execute all updates in one go and return the result to end the function
        return offerRef.update(updates);
    }).catch(error => {
        res.send(error)
    });
});

exports.autoCleanRequest = functions.https.onRequest((req, res)=>{
    const requestRef = dbRef.child('transaction').child('request');
    const cutoff = Date.now() + 2.88*(Math.pow(10, 7));
    const oldItemsQuery = requestRef.orderByChild('utc').endAt(cutoff);
    return oldItemsQuery.once('value').then((snapshot) => {
        // create a map with all children that need to be removed
        const updates = {};
        snapshot.forEach(child => {
          updates[child.key] = null;
        });
        // execute all updates in one go and return the result to end the function
        return requestRef.update(updates);
    }).catch(error => {
        res.send(error)
    });
});
