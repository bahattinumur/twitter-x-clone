export const ele = {
    user_name: document.querySelector('#user-name'),
    user_tag: document.querySelector('#user-tag'),
    pics: document.querySelectorAll('#profile-pic'),
    tweetsArea: document.querySelector('.tweets-area'),
    logoutBtn: document.querySelector('#logout-btn'),
    main: document.querySelector('main'),
    searchForm: document.querySelector('aside form'),
  };
  
  // kullanıcın bilgilerini ekrana basar
  export const renderUserInfo = (user) => {
    // kullanıcı resimlerini ekrana bas
    ele.pics.forEach((img) => (img.src = user.avatar));
  
    // kullanıcı isimlerini ekrana bas
    ele.user_name.innerText = user.name;
    ele.user_tag.innerText = '@' + user.profile;
  };
  
  // tweetin medya içeriğini alıcak ve içerğe göre html oluşturucak
  const getMedia = (media) => {
    // media içeriği yoksa
    if (!media) return '';
  
    // fotoğraf varsa
    if (media.photo) {
      return media.photo
        .map((img) => `<img src="${img.media_url_https}" />`)
        .join('');
    }
  
    // video varsa
    if (media.video) {
      const url = media.video[0].variants[0].url;
      return `<video controls src="${url}"/>`;
    }
  };
  
  // tweetleri ekana basar
  // 1) data:tweet'ler
  // 2) outlet: hangi elementin içerisne göndericez
  export const renderTimeline = (data, outlet, user) => {
    console.log(data.timeline[1]);
  
    // her bir tweet için outlet'e bir tweet divi bas
    outlet.innerHTML = data.timeline
      .map(
        (tweet) => `
          <div class="tweet">
            <img id="user-img" src="${
              tweet[user] ? tweet[user].avatar : '/images/defaultt.png'
            }" />
            <div class="body">
              <div class="user">
              ${
                tweet[user]
                  ? `
                 <a href="?page=user&q=${tweet[user].screen_name}">
                  <img id="mobile-img" src="${tweet[user]?.avatar}" />
                  <b>${tweet[user]?.name}</b>
                  <p>@${tweet[user]?.screen_name}</p>
                  <p>${moment(tweet.created_at).fromNow()}</p>
                </a>
                `
                  : `<p>Gönderiyi Yeniden yayınladı</p>`
              }
               
  
                <i class="bi bi-three-dots"></i>
              </div>
  
              <a href="?page=status&q=${
                tweet.tweet_id
              }" class="content">
                <p>${tweet.text}</p>
                ${getMedia(tweet.media)}
              </a>
  
              <div class="buttons">
                <button>
                  <i class="bi bi-chat"></i>
                  <span>${tweet.replies}</span>
                </button>
                <button>
                  <i class="bi bi-recycle"></i>
                  <span>${tweet.retweets}</span>
                </button>
                <button>
                  <i class="bi bi-heart"></i>
                  <span>${tweet.favorites}</span>
                </button>
                <button>
                  <i class="bi bi-bookmark"></i>
                  <span>${tweet.bookmarks}</span>
                </button>
              </div>
            </div>
          </div> 
           `
      )
      .join('');
  };
  
  // parametre olarak aldığı alana yükleniyor basar
  export const renderLoader = (outlet) => {
    outlet.innerHTML =
      '<div id="loader-wrapper"> <div aria-live="assertive" role="alert" class="loader"></div> </div>';
  };
  
  // detay sayfasının yükleniyorunu ekrana basar
  export const renderDetailLoader = (text) => {
    ele.main.innerHTML = `
    <div class="nav">
      <i id="back-btn" class="bi bi-arrow-left"></i>
      <h4>${text}</h4>
    </div>
  
  
    <div id="loader-wrapper"> <div aria-live="assertive" role="alert" class="loader"></div> </div>
    `;
  };
  
  // ekrana tweet detay sayfasını basar
  export const renderDetail = (tweet, user) => {
    ele.main.innerHTML = `
        <div class="nav">
          <i id="back-btn" class="bi bi-arrow-left"></i>
          <h4>Gönderi</h4>
        </div>
  
        <div class="tweet detail-tweet">
          <img
            id="user-img"
            src="${tweet.author.image}"
          />
  
          <div class="body">
            <div  class="user">
              <a href="?page=user&q=${tweet.author.screen_name}">
                <img
                  id="mobile-img"
                  src="${tweet.author.image}"
                />
                <b>${tweet.author.name}</b>
                <p>@${tweet.author.screen_name}</p>
              </a>
              <button>Takip Et</button>
            </div>
  
            <div class="content">
              <p>${tweet.text}</p>
              ${getMedia(tweet.media)}
            </div>
  
            <div class="info">
              <p>${tweet.created_at}</p>
              <p><span>${
                tweet.views
              }</span><span>Görüntülenme</span></p>
            </div>
  
            <div class="buttons">
              <button>
                <i class="bi bi-chat"></i>
                <span>${tweet.replies}</span>
              </button>
              <button>
                <i class="bi bi-recycle"></i>
                <span>${tweet.retweets}</span>
              </button>
              <button>
                <i class="bi bi-heart"></i>
                <span>${tweet.likes}</span>
              </button>
              <button>
                <i class="bi bi-bookmark"></i>
                <span>${tweet.bookmarks}</span>
              </button>
            </div>
          </div>
        </div>
  
        <form id="comment-form">
          <img
            src="${user.avatar}"
          />
          <input placeholder="Yanıtını Gönder" type="text" />
          <button>Yanıtla</button>
        </form>
    `;
  };
  
  // kullanıcı syafaını ekrana basar
  export const renderUser = (user) => {
    console.log(user);
    ele.main.innerHTML = `
        <div class="user-page">
          <!-- üst kısım -->
          <div class="page-top">
            <!-- nav -->
            <div id="nav">
              <i id="back-btn" class="bi bi-arrow-left"></i>
              <div>
                <h3>${user.name}</h3>
                <p>
                  <span>${Math.round(Math.random() * 3000)}</span>
                  <span>Gönderi</span>
                </p>
              </div>
            </div>
  
            <!-- banner -->
            <div class="banner">
              <img src="${user.header_image}" />
              <img
                id="user-pp"
                src="${user.avatar}"
              />
            </div>
  
            <!-- butonlar -->
            <div class="buttons">
              <div class="icon">
                <i class="bi bi-three-dots"></i>
              </div>
              <div class="icon">
                <i class="bi bi-envelope"></i>
              </div>
              <button>Takip Et</button>
            </div>
  
            <!-- kullanıcı bilgileri -->
            <div class="info">
              <h4>
                <span>${user.name}</span>
  
                ${
                  user.blue_verified &&
                  '<i class="bi bi-patch-check-fill"></i>'
                }
                
              </h4>
  
              <p class="profile">@${user.profile}</p>
  
              <p class="description">
                ${user.desc}
              </p>
  
              <div>
                <a href="#">
                  <span>${user.friends}</span>
                  <span>Takip Edilen</span>
                </a>
                <a href="#">
                  <span>${user.sub_count}</span>
                  <span>Takipçi</span>
                </a>
              </div>
            </div>
  
            <!-- butonlar -->
            <div class="radio-input">
              <label>
                <input
                  value="value-1"
                  name="value-radio"
                  id="value-1"
                  type="radio"
                  checked=""
                />
                <span>Gönderiler</span>
              </label>
              <label>
                <input
                  value="value-2"
                  name="value-radio"
                  id="value-2"
                  type="radio"
                />
                <span>Yanıtlar</span>
              </label>
              <label>
                <input
                  value="value-3"
                  name="value-radio"
                  id="value-3"
                  type="radio"
                />
                <span>Medya</span>
              </label>
              <label>
                <input
                  value="value-3"
                  name="value-radio"
                  id="value-3"
                  type="radio"
                />
                <span>Beğeni</span>
              </label>
              <span class="selection"></span>
            </div>
          </div>
  
          <!-- alt kısım -->
          <div class="page-bottom">
            <div id="loader-wrapper">
              <div
                aria-live="assertive"
                role="alert"
                class="loader"
              ></div>
            </div>
          </div>
        </div>  
    `;
  };