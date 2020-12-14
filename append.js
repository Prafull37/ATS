

module.exports.appendHTML=function(mainHTML,subHTML,finder){
    const indexOfFinder=mainHTML.indexOf(finder)
    const sub=mainHTML.substring(0,indexOfFinder)+"<br>\n"+subHTML+mainHTML.substring(indexOfFinder)+"\n";
    return sub;
}

