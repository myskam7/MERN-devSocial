import express from 'express';
import { MongoClient, ObjectID} from 'mongodb';
import assert from 'assert'; //for catching connection errors

import config from '../config';
import { ClientRequest } from 'http';
import { isNumber } from 'util';


let mdb; 

MongoClient.connect(config.mongodbUri, (err, client) => {
    assert.equal(null, err);
     const db = client.db('test');

   mdb = db
}); 

const router = express.Router();
 


router.get('/contests', (req, res) => {
    const collection = mdb.collection('contests');
    let contests = {};
  collection.find({})
    .project({
        categoryName: 1,
        contestName: 1
    })
    .each((err, contest) => {
        assert.equal(null, err);

        if(!contest){ // no more contests
            res.send({contests});
            return; 
        }

        contests[contest._id] = contest; 
        
    });
});


router.get('/names/:nameIds', (req, res) => {

    
    let names = {};
    
    setTimeout(() => {
        const nameIds = req.params.nameIds.split(',').map(ObjectID);
        const collection = mdb.collection('names');
        collection.find({ _id: { $in: nameIds }})
            .each((err, name) => {
                assert.equal(null, err);

                if(!name){ // no more names
                    res.send({names});
                    
                    return; 
                }

                names[name._id] = name; 
                console.log(name);
            });
    }, 4000)
        
 });

router.get('/contests/:contestId', (req, res) => {
    const collection = mdb.collection('contests');
    collection.findOne({ _id: ObjectID(req.params.contestId) })
    .then(contest => res.send(contest))
    .catch(console.error);
   
});

router.post('/names', (req,res) => {
    //incert name..
    const name = req.body.newName;
    const contestId = ObjectID(req.body.contestId);

    //Validation..

    //update list of names..
    mdb.collection('names').insertOne({ name })
    .then(result => mdb.collection('contests').findAndModify(
        {_id: contestId},
        [],
        { $push: { nameIds: result.insertedId }},
        {new: true}

    ).then(doc => res.send({
        updatedContest: doc.value, 
        newName: { _id: result.insertedId, name}

    })
  )
).catch(error => {
    console.error(error)
    res.status(404).send("Request Not Good");
 }); 

});

export default router; 