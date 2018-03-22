import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from './config';
import { CLIENT_RENEG_LIMIT } from 'tls';

MongoClient.connect(config.mongodbUri, (err, client) => {
    assert.equal(null, err); 
    const db = client.db('testing');

    let contestCount = 0; 
    db.collection('contests').find({}).each((err, contest) => {
        assert.equal(null, err); 
        if(!contest) {
            return;
        }

        contestCount++; 
        db.collection('names')
        .find({ id: { $in: contest.nameIds }})
        .project({ _id: 1})
        .toArray()
        .then(_ids => {
            const newIds = _ids.map(o => o._id);
            db.collection('contests').updateOne(
                {id: contest.id}, 
                {$set: {nameIds: newIds}}
            ).then(() => {
                console.log('Updated', contest._id);
                contestCount--; 
                if(contestCount === 0) { client.close(); }
            });
        })
        .catch(console.error);
    });
});