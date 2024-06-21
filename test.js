// import dotenv from 'dotenv'

// dotenv.config();

const  convertTime = (timeInSeconds) => {
  let hours = Math.floor(timeInSeconds / 3600);
  let minutes = Math.floor((timeInSeconds % 3600) / 60);
  let seconds = timeInSeconds % 60;

  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;

}

function useRegex(input) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    const match = input.match(regex);
    return match ? match[1] : false;
}

 
let id = ''
let url = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=`;
const options = {
	method: 'GET',
	headers: {
		// 'X-RapidAPI-Key': process.env.X_RAPID_API_KEY,
    // 'X-RapidAPI-Host':process.env.X_RAPID_API_HOST
    'X-RapidAPI-Key': '939820b21emshfc743deb7077005p1458c8jsn5912c3aa0b6b',
    'X-RapidAPI-Host':'ytstream-download-youtube-videos.p.rapidapi.com'
	}
};

  
// Basically this converts the link and returns the response data (setails)
const convert = async (link) => {
  try {
    let new_id = useRegex(link);
    // console.log(new_id)
    url += new_id;
    // console.log(url)
    const response = await fetch(url, options);
    let result = await response.text();
    result = JSON.parse(result)
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// convert('https://www.youtube.com/watch?v=qkgkUCqEum4')
// Get the response data
// let result = await convert('https://www.youtube.com/watch?v=dcsojmN5_jw&t=84s');


// console.log(result.status);
// get required parameters
const getRequiredParams = (result) => {
  //get thumbnail
  let thumbnail = [];
  result.thumbnail.forEach(element => {
    thumbnail.push(element);
  });
  // console.log(thumbnail)

  //get quality and quality label
  let quality = [];
  result.formats.forEach(element => {
    quality.push(element.quality);
  });
  // console.log(quality)
  //get title
  let title = result.title;
  // console.log(title)
  //get length in seconds
  let lis = result.lengthSeconds;
  lis = convertTime(lis);
  // console.log(lis)
  //get urls    according to the quality in the quality array
  let urls = [];
  result.formats.forEach(element => {
    urls.push(element.url);
  });
  // console.log(urls)
  return { thumbnail, quality, title, lis, urls };
};


// let result = await convert('https://www.youtube.com/watch?v=qkgkUCqEum4')
// // console.log(result)
// let stuff = getRequiredParams(result)
// console.log(stuff)

// console.log(result.formats[0].url)
export { convertTime, useRegex, convert, getRequiredParams };