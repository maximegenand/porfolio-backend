const express = require("express");
const router = express.Router();
fs = require('fs')
const Wordle = require("../models/wordles");

const offset = 10;
const limit = 10000;


// const file = './files/mots-jouables.txt';
// const find = true;
// const splitString = '\r\n'
const file = './files/tous-mots.txt';
const find = false;
const splitString = '\n'


fs.readFile(file, 'utf8', function (err,data) {
    if (err) console.log(err)
    else {
        // On éclate la liste en tableau
        console.log('file string :',data.length)
        const dataArr = data.toLowerCase().split(splitString);
        console.log('file array :',dataArr.length)

        const pattern = /\W/i
        const dataFiltred = dataArr.filter(el => 
            !pattern.test(el)
            && el.length > 4
            && el.length < 9
        )
        const dataResult = [...new Set(dataFiltred)];
        console.log('brut :', dataArr.length, 'fitred :', dataFiltred.length, 'result :', dataResult.length);

        // On gère le offset
        const indexStart = offset * limit;
        const indexEnd = limit * (offset + 1);
        console.log('indexStart :', indexStart, 'indexEnd :', indexEnd);

        // Sauvegarde dans la bdd
        dataResult.length = 0;
        dataAdd = dataResult.slice(indexStart, indexEnd);
        dataAdd.forEach( word => {
            Wordle.findOne({ word })
            .then(data => {
                if (!data) {
                    const length =  word.length;               
                    const newWord = new Wordle({
                        word,
                        length,
                        find,
                        date: new Date(),
                        views: 0,
                    });
                    newWord.save()
                    .then(() => {
                        //console.log(word, 'saved in db');
                    })
                    .catch( error => {
                        console.error(error);
                    });
                }
                else console.log(word, 'already exists')
            })
        })
        console.log('Done')
    }
})
