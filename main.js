import API from './scripts/api.js';
import { getLocal } from './scripts/helpers.js';
import {
  ele,
  renderUserInfo,
  renderTimeline,
  renderLoader,
  renderDetailLoader,
  renderDetail,
  renderUser,
} from './scripts/ui.js';

// Local'den kullanıcı bilgilerini al.
const user = getLocal('user');

// Kullanıcı hangi sayfayı göreceğine karar veren fonksiyon
// Ekranın orta kısmına yer alıcak HTML kodunu belirler.
const router = () => {
  // URL'deki arama paramtrelerine erişme
  const params = new URLSearchParams(location.search);
  const page = params.get('page');
  const query = params.get('q');

  //  Page'ın değerine göre arayüze karar ver.
  switch (page) {
    // Tweet details
    case 'status':
      // Lodaing'i ekrana bas.
      renderDetailLoader('Gönderi');
      // Tweet detaylarını api'dan
      API.getData(`/tweet.php?id=${query}`)
        // Ekrana detay sayfasını bas.
        .then((data) => renderDetail(data, user));

      break;

    // Arama sayfası
    case 'search':
      renderDetailLoader(`${query} için sonuçlar`);

      API.getData(`/search.php?query=${query}&search_type=top`)
        //
        .then((data) => renderTimeline(data, ele.main, 'user_info'));

      break;

    // kullanacı detay sayfası
    case 'user':
      // sayfanın yüklendiğini belirtt
      renderDetailLoader(query);

      // Kullanıcının bilgilerini api'dan al.
      API.getUser(query).then((user) => {
        // Kullanıcının hesap bilgilerini ekrana bas.
        renderUser(user);
        // Tweet'lerin geliceği yeri seçme
        const outlet = document.querySelector('.page-bottom');
        // Kullanıcn attığı tweetleri al.
        API.getData(`/timeline.php?screenname=${query}`).then(
          (data) => renderTimeline(data, outlet, 'author')
        );
      });

      break;

    // Varasayılan olarak anasayfayı ekrana bas.
    default:
      //1) Ekrana yükleniyoru bas.
      renderLoader(ele.tweetsArea);

      // 2) Kullanıcın tweet'lerini al.
      API.getData(`/timeline.php?screenname=${user.profile}`)
        // 3) Tweet'leri ekrana bas.
        .then((data) =>
          renderTimeline(data, ele.tweetsArea, 'author')
        );
  }
};

// Sayfa yüklenince kullanicinin bilgilerini ekrana bas.
document.addEventListener('DOMContentLoaded', () => {
  if (user) {
    // Kullanıcı oturum açtı ise bilgilerini ekrana bas.
    renderUserInfo(user);
  } else {
    // Eğer oturum açmadıysa Login'e yönlendir (Authorization)
    location = '/auth.html';
  }

  // ekrana basılacak sayfayı belirle
  router();
});

// Çıkış butonuna tıklanınca oturumu kapat.
ele.logoutBtn.addEventListener('click', () => {
  console.log('tıklandır');

  // Kullanıcı bilgilerini Local'den kaldır.
  localStorage.removeItem('user');

  // Logine yönlendir.
  location = '/auth.html';
});

// Geri butonuna tıklanma olayın izle.
ele.main.addEventListener('click', (e) => {
  if (e.target.id === 'back-btn') {
    // bir adım geriye git
    history.back();
  }
});

// Arama formunun gönderilmesini izle.
ele.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Formdaki veriye eris.
  const query = e.target[0].value;

  // Sayfayı değiştir.
  location = `?page=search&q=${query}`;
});