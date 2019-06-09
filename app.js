const express = require('express');
const records = require('./records')
const app = express();
app.use(express.json());

// /quotes
app.get('/quotes', async (req,res) =>{

  try{
    const quotes = await records.getQuotes();
    if(quotes){
      res.json(quotes)
    }
    else{
      res.status(400).json({message:"No quotes found"})
    }
  }
  catch(err){
    res.json({message:err.message})
  }});
//send a get request  /quotes:id
app.get('/quotes/:id',async (req,res) =>{
  try{
    const quote = await  records.getQuote(req.params.id);
    if(quote){
    res.json(quote);}
    else {
      res.status(400).json({message:"Question not found"})
    }

  }
catch(err){
  res.json({message:err.message})
}});

//send a post request
app.post('/quotes', async (req,res) =>{

  try{
    const quote = await records.createQuote({
        quote:req.body.quote,
        author:req.body.author
      });
      if (req.body.author && req.body.quote){
        res.status(201).json(quote)
      }
      else{
        res.status(400).json({message:"Quote and body is required"})
      }

  }catch(err){

    res.status(500).json({message:err.message});
  }
    });

//send a put request
app.put('/quotes/:id', async (req,res) =>{

  try{
    const quote = await records.getQuote(req.params.id);
      if (quote){
        quote.quote = req.body.quote;
        quote.author = req.body.author
        await records.updateQuote(quote);
        res.status(204).end();
      }
      else{
        res.status(404).json({message:"Quote wasn't found"});
      }

  }catch(err){

    res.status(500).json({message:err.message});
  }
    });

//send a delete request
app.listen(3000, () => console.log('Quote API listening on port 3000!'));
