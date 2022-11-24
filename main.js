 
let parent = document.querySelector("#items");
let child = document.createElement("li");
let commentButton = document.createElement("button");

let storyRequest = async() =>
{
    let response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
    let data = await response.json();

    for (let i = 0; i < 100; i++)
    {
        let story = data[i];
    
        let response2 = await fetch(`https://hacker-news.firebaseio.com/v0/item/${story}.json`);
        let data2 = await response2.json();

        child = document.createElement("li");
        let li = parent.appendChild(child);
        
        //link to individual story:
        let url = document.createElement("a");
        let urlText = document.createTextNode(data2.title);

        url.appendChild(urlText);
        url.title = data2.title;
        url.href = data2.url; 

        //create comment button
        commentButton = document.createElement("button");
        commentButton.classList.add("btn", "btn-outline-primary");
        commentButton.innerText = "Click for Comment Preview"

        //add click function to show comments
        commentButton.addEventListener("click", function()
        {
            let para = document.createElement("p");
            para.classList.add("truncate-line-clamp")
            li.appendChild(para);
            para.innerHTML = `${commentData.text}`;

            commentButton.addEventListener("click", function()
            {
                li.removeChild(para);
            })
        })
       
        //comments
        //get comment urls
        for (let n = 0; n < 3; n++)
        {
            let comment = data2.kids[n]
            let commentResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${comment}.json`)
            let commentData = await commentResponse.json();

            console.log(commentData);

            // let urlComments = document.createElement("a");
            // let urlTextComments = document.createTextNode(data2.kids);

            // urlComments.appendChild(urlText);
            // urlComments.kids = data2.kids;
            // urlComments.href = data2.urlComments;       
            // console.log(urlTextComments);
        }
        //gets first comment
        let comment = data2.kids[0]
        let commentResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${comment}.json`)
        let commentData = await commentResponse.json();

        //link to comments:
        // let urlComments = document.createElement("a");
        // let urlTextComments = document.createTextNode(data2.kids);

        // urlComments.appendChild(urlText);
        // urlComments.kids = data2.kids;
        // urlComments.href = data2.urlComments;     
        // console.log(urlTextComments);
    
    
        //add text to list
        li.innerHTML = `<li class="list-group-item"> <a href="${url}" target = "_blank">${data2.title}</a> <br> Post Score: ${data2.score}, Comments: ${data2.descendants}, Author: ${data2.by}</li>`;
        li.appendChild(commentButton);
        
    }
}
storyRequest();


