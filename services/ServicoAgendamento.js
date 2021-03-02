var visita = require('../services/Visita');
var mongoose = require("mongoose");
var VisitFactory = require("../factories/VisitFactory");
var nodemailer = require("nodemailer");
const { finished } = require('nodemailer/lib/xoauth2');

const Visit = mongoose.model("Visita", visita);

class ServicoAgendamento {

   async Create(
    name, address, description, date, time, age, email) {
        var newVisit = new Visit({                    
        name,
        address,
        description,
        date,
        time,
        age, 
        email,
        finished: false,
        notified: false
        });

        try{
         await newVisit.save();
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

        async GetAll(showFinished){
                if(showFinished){
            return await Visit.find();
        }else{
            var vis = await Visit.find({'finished': false});
            var visits = [];

            vis.forEach(visita => {
                if(visita.date != undefined){
                visits.push( VisitFactory.Build(visita) )
            }
         });

         return visits;
       }
    }

        async GetById(id){
        try{
            var event = await Visit.findOne({'_id': id});
            return event;
        }catch(err){
           console.log(err); 
        }
    }

    async Finish(id){
        try{
            await Visit.findByIdAndUpdate(id,{finished: true})
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async Search(query){
       try{
        var vis = await Visit.find().or([{email: query}])
       return vis;
        }catch(err){
            return [];
       }
       
    }
    
    async SendNotification(){
       var vis = await this.GetAll(false);
       
       var transporter = nodemailer.createTransport({
           
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "jasonsilvestredev@gmail.com",
          pass: "@jasondev#43"
        }
    });    
    
    //
    var transporter2 = nodemailer.createTransport({
           
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "jasonsilvestredev@gmail.com",
          pass: "@jasondev#43"
        }
    });       

    //

       vis.forEach(async app => {

        var date = app.start.getTime();
        var hour = 1000 * 60 *60 * 24;
        var gap = date-Date.now();

        if(gap <= hour) {
            
            if(!app.notified){

          await Visit.findByIdAndUpdate(app.id,{notified: true});

            //nao usar await aqui no transporter pra não misturar com a promisse
            transporter.sendMail({
                from: "Jason Silvestre <jasonsilvestredev@gmail.com>",
                to: app.email,
                subject: "Visita confirmada!",
                text: "Visita confirmada!"
            
            }).then( () => { 

            }).catch(err => {
                
            })
            }else if(app.finished)
            {
                await Visit.findByIdAndUpdate(app.id,{finished: true, notified:true});
                transporter2.sendMail({
                    from: "Jason Silvestre <jasonsilvestredev@gmail.com>",
                    to: app.email,
                    subject: "Horário Indisponível !",
                    text: "Não foi possível agendar sua visita,por favor tente novamente !"
               
                }).then( () => { 

                }).catch(err => {

                })
                
          //
            }else[
                //
            ]
            
        }
    })
  }
}
module.exports = new ServicoAgendamento();

