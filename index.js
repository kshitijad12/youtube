//https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY]


// trending page //
const videoCardContainer = document.getElementById("container");

let api_key='AIzaSyBj5dcQ7HzwpLhjDAk-oP2Vk8nLBRhC1j4';
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}


const searchVideos = async () => {
   try{
       
   let API_KEY='AIzaSyBj5dcQ7HzwpLhjDAk-oP2Vk8nLBRhC1j4';
   let search_term=document.getElementById('search_term').value;

   let response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search_term}&key=${API_KEY}`);
   //console.log('response:',response);

   let data = await response.json();
   //console.log('data:',data);
   let actual_data=data.items;
   //console.log(actual_data);
   appendVideos(actual_data);
    }
    catch (err){
        console.log(err)
    }

   
};

const container=document.getElementById("container");

const appendVideos=(data)=>{
    container.innerHTML=null;
    
   data.forEach(({snippet, id:{videoId}}) => {
       let div=document.createElement("div");

       let P_title= document.createElement("p");
       P_title.innerText=snippet.title

       let P_channel=document.createElement("p");
       P_channel.innerText=snippet.channelTitle;

       let thumbnail = document.createElement("img")
       thumbnail.src=snippet.thumbnails.high.url;

       div.append(thumbnail,P_title,P_channel);


       //add event handler to this
       div.onclick = ()=>{
          //console.log(snippet.videoId);
          let data={
            snippet,
            videoId
          };
          data =JSON.stringify(data)
          localStorage.setItem('clicked_video',data);
          window.location.href='./video.html'
       };
       container.append(div);
   });
}

//yt app part 2//
