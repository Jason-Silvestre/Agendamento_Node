class VisitFactory{

    Build(visitaComum){

        var day = visitaComum.date.getDate()+1;
        var month = visitaComum.date.getMonth();
        var year = visitaComum.date.getFullYear();
        var hour = Number.parseInt(visitaComum.time);
        //var hour = Number.parseInt(visitaComum.time.split(":")[0]);
        var minutes = Number.parseInt(visitaComum.time);
        //var minutes = Number.parseInt(visitaComum.time.split(":")[1]);

        //var startDate = new Date(year,month,day,hour,minutes,0,0);
        var startDate = new Date(year,month,day,hour,minutes)

        
        var visit = {
            id: visitaComum._id,
            title: visitaComum.name + " - " + visitaComum.description,
            start: startDate,
            end: startDate,
            notified: visitaComum.notified,
            email: visitaComum.email
        }

        return visit;
    }

}
module.exports = new VisitFactory();
