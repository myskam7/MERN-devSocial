import express from 'express';
import { MongoClient} from 'mongodb';
import assert from 'assert'; //for catching connection errors

import config from '../config';
import { ClientRequest } from 'http';




let mdb; 

MongoClient.connect(config.mongodbUri, (err, client) => {
    assert.equal(null, err);
     const db = client.db('testing');

   mdb = db
}); 

const router = express.Router();
 


router.get('/contests', (req, res) => {
    const collection = mdb.collection('contests');
    let contests = {};
  collection.find({})
    .project({
        id: 1,
        categoryName: 1,
        contestName: 1
    })
    .each((err, contest) => {
        assert.equal(null, err);

        if(!contest){ // no more contests
            res.send(contests);
            return; 
        }

        contests[contest.id] = contest; 
        
    });
});

router.get('/contests/:contestId', (req, res) => {
   
});

export default router; 