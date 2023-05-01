const api='sk-dCf4QFg3CA3Stl3BlbkFJdh4mBL9V4g9KZvBrWx1r'

// variables to use 
const search=document.getElementById('go')
const input=document.getElementById('input')
const history=document.getElementById('history')
const query=input.innerText;
console.log(query);
const main=document.getElementById('main')
const clear=document.getElementById('btn')

// for clearing history function
clear.addEventListener('click',()=>{
    const elem=document.querySelectorAll('.historyP')
    elem.forEach(element => {
        element.remove();
    });
    const reset=document.getElementById('output')
    reset.innerText="Hi how may I help you ?"
    input.value=""
})

const setTo=(p)=>{
    const inField=document.getElementById('input')
    inField.value=p.innerText

}
// for shadow animation
const mainbg=()=>{
    main.style.boxShadow='0px 0px 50px 1px #48abe0'
}

//main function with api call
const getRequest=async()=>{
    main.style.boxShadow='none'; 
const input=document.getElementById('input')
const query=input.value;
console.log(query)
//the option object
    const options={
        method:'POST',
        headers:{
            'Authorization':`Bearer ${api}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: query}],
          })
    }


    try{
       await fetch('https://api.openai.com/v1/chat/completions',options).then((value)=>{
        return value.json()
       }).then((value)=>{
        console.log(value)
        const info=document.getElementById('output')
        if(value.choices[0].message.content)
        {
           
            const p=document.createElement('p')
            p.classList.add('historyP')
            p.innerText=query
            p.addEventListener('click',()=>setTo(p))
            history.append(p)
             
           
        }
        info.textContent=value.choices[0].message.content

       })
    }
    catch{
        console.log("error occured")

    }
}
search.addEventListener('click',getRequest)

//for mobile view
const ham=document.getElementById('ham')
ham.addEventListener('click',()=>{
    history.style.display='block'
    main.style.zIndex='-1'
    history.style.zIndex='100'
})
const cross=document.getElementById('cross')
cross.addEventListener('click',()=>{
    main.style.zIndex='100'
    history.style.zIndex='-1'

})
