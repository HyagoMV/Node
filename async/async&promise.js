 async function bar0() {
   try {
     //throw '!!'
    } catch (e) {
      return e;
   }
   return '??'
}

function bar1() {
  return new Promise((res, rej)=>{
    //rej('!')
    res('?')
  })
}


setTimeout(() => {



  bar0()
    .then(r=>console.log(r))
 

    bar1()
    .then(r=>console.log(r))
    .catch(r=>console.log(r)) 
 



}, 2000);
