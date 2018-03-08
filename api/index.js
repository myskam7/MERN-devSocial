import express from 'express';
import { MongoClient} from 'mongodb';
import assert from 'assert'; //for catching connection errors

import config from '../config';
import { ClientRequest } from 'http';
import { isNumber } from 'util';


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
            res.send({contests});
            return; 
        }

        contests[contest.id] = contest; 
        
    });
});


router.get('/names/:nameIds', (req, res) => {

    const nameIds = req.params.nameIds.split(',').map(Number);
    const collection = mdb.collection('names');
    let names = {};

  collection.find({id: { $in: nameIds }})
    .each((err, name) => {
        assert.equal(null, err);

        if(!name){ // no more names
            res.send({names});
            return; 
        }

        names[name.id] = name; 
        
    });
});

router.get('/contests/:contestId', (req, res) => {
    const collection = mdb.collection('contests');
    collection.findOne({ id: Number(req.params.contestId) })
    .then(contest => res.send(contest))
    .catch(console.error);
   
});

export default router; 