
const showClickedVideo =()=>{
    let data =localStorage.getItem("clicked_video");

   let  {videoId}= JSON.parse(data)

    //embeding a video using i frame html element

    let iframe = document.createElement('iframe');
    iframe.src=`https://www.youtube.com/embed/${videoId}`;

    iframe.width="100%";
    iframe.height="100%";
    let video_div =document.getElementById("video_details");
    video_div.append(iframe)
    console.log('data:',data);
}