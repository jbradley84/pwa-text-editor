import { openDB } from 'idb';

// initiate database named 'jate', version 1
const initdb = async () =>
   openDB('jate', 1, {
      // add database schema if it has not already been initialized
      upgrade(db) {
         if (db.objectStoreNames.contains('jate')) {
            console.log('jate database already exists');
            return;
         }
         // create a new object store for data and give it key name of 'id', set to auto-increment
         db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
         console.log('jate database created');
      },
   });


// method that accepts content and adds it to the database
export const putDb = async (content) => {
   // create connection to the IndexedDB database and the version we want to use
   const jateDb = await openDB('jate', 1);

   // create a new transaction and specify the store/data priveleges
   const tx = jateDb.transaction('jate', 'readwrite');

   // open the 'jate' object store
   const store = tx.objectStore('jate');

   // use the .put() method to add new data to the database
   const request = store.put({ id: 1, value: content });

   // get confirmation of the request
   const result = await request;
   console.log('Text saved to database!', result.value);
};


// method that gets all content from the database
export const getDb = async () => {
   // create connection to the IndexedDB database and the version we want to use
   const jateDb = await openDB('jate', 1);

   // create a new transaction and specify the store/data priveleges
   const tx = jateDb.transaction('jate', 'readonly');

   // open the 'jate' object store
   const store = tx.objectStore('jate');

   // use the .get() method to retreive all data from the database
   const request = store.get(1);

   // get confirmation of the request
   const result = await request;
   console.log('result.value', result.value);
   return result.value;
};

initdb();
