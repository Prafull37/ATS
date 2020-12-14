function textCosineSimilarity(txtA,txtB){
    const wordCountA = wordCountMap(txtA);
    const wordCountB = wordCountMap(txtB);
    let dict = {};
    addWordsToDictionary(wordCountA,dict);
    addWordsToDictionary(wordCountB,dict);
    const vectorA = wordMapToVector(wordCountA,dict);
    const vectorB = wordMapToVector(wordCountB,dict);
    return calculatePercentage(cosineSimilarity(vectorA, vectorB));
}

/**
 * cosine similiarity
 * cos(a,b) = a . b / ||a|| ||b||
 * count frequency of each words
 * @param {*} str 
 * @returns Object a key value pair where each key is word and value is its count.
 */
function wordCountMap(str){
    str=str.replace(/(?:\r\n|\r|\n)/g, '');
    let words=str.split(" ").filter(word=>word);
    let wordCounter={}
    for(let w of words){
        wordCounter[w]=(wordCounter[w]||0)+1
    }
   return wordCounter;
}


function addWordsToDictionary(wordCountmap, dict){
    for(let key in wordCountmap){
        dict[key] = true;
    }
}


function wordMapToVector(map,dict){
    let wordCountVector = [];
    for (let term in dict){
        wordCountVector.push(map[term] || 0);
    }
    return wordCountVector;
}

function dotProduct(vecA, vecB){
    let product = 0;
    for(let i=0;i<vecA.length;i++){
        product += vecA[i] * vecB[i];
    }
    return product;
}

function magnitude(vec){
    let sum = 0;
    for (let i = 0;i<vec.length;i++){
        sum += vec[i] * vec[i];
    }
    return Math.sqrt(sum);
}

function cosineSimilarity(vecA,vecB){
    return dotProduct(vecA,vecB)/ (magnitude(vecA) * magnitude(vecB));
}


function calculatePercentage(similarity){
    similarity=similarity*100
    return Math.round((similarity + Number.EPSILON) * 100) / 100
}
module.exports={
    similarity:textCosineSimilarity
}