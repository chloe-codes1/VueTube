<template>
  <div class="container my-3">
    <!-- Emit 2. 듣고, -->
    <SearchBar @input-change="onInputChange" class="mb-3"/>
    <div class="row">
      <VideoDetail :video="selectedVideo" :videos="videos" />
      <VideoList @video-select="onVideoSelect" :videos="videos" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SearchBar from '@/components/SearchBar'
import VideoList from '@/components/VideoList'
import VideoDetail from '@/components/VideoDetail'

// 절대로 바뀌면 안되는 상수는 all capitalize
const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY // .env.local 에 있는 "YOUTUBE_API_KEY" 불러오기
const API_URL = 'https://www.googleapis.com/youtube/v3/search'

export default {
  name: 'App',
  components: {
    SearchBar,
    VideoList,
    VideoDetail,

  },
  data(){
    return{
      inputValue: '',
      videos: [],
      selectedVideo: null, //선택되지 않았다는 것을 명시하기
    }
  },
  methods: {
    onInputChange(inputText) {
      this.inputValue = inputText
      // emit => data를 수정
      axios.get(API_URL, {
        params: {
          key: API_KEY,
          part: 'snippet',
          type: 'video',
          q: this.inputValue,
          maxResults: 10,
        }
      })
        .then(res => {
            res.data.items.forEach(item => {
              const parser = new DOMParser()
              const doc = parser.parseFromString(item.snippet.title, 'text/html')
              
              item.snippet.title = doc.body.innerText

            })
            this.videos = res.data.items
            this.selectedVideo = this.videos[0]
        })
        .catch(err => console.error(err))
    },
    onVideoSelect(video){
      this.selectedVideo = video
    }
  }
}
</script>

<style scoped>
/* vue에서만 적용되는 scoped 속성 */

</style>
