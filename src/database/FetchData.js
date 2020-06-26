import axios from 'axios';

const URI = 'http://192.168.43.52:19000';

/* export default {
   async fetchData(){
        try {
            let res = await fetch(URI + '/api/user_record_fetch');
            // let res = await axios.get(URI + '/api/user_record_fetch');
            let resJsonData = await res.json();
            return resJsonData;
        } catch (e) {
            console.log(e);
        }
    }
} */

export const fetchMeetups = () => 
fetch('http://192.168.43.52:3000/api/meetups')
        .then(res => res.json()).catch((e) =>e);