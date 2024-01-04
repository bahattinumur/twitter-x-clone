// API'a zorunlu olarak göndermemiz gerken,
// ve api-key'ini içeren obje
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key':
      '',
    'X-RapidAPI-Host': '',
  },
};

export default class API {
  // Kullancı isminden hesap bilgilerine erişir.
  static async getUser(username) {
    // 1) Verileri al
    const res = await fetch(
      `https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${username}`,
      options
    );

    // 2) Json verisini javascript verisine çevir
    const data = await res.json();

    // 3) Veriyi fonksiyonun çağrıldığı yere gönder
    return data;
  }

  // parametre olarak gönderdiğimiz endpoint'deki verileri alır
  static async getData(endpoint) {
    try {
      // parametre olarak gelen uc-noktaya istek at
      const res = await fetch(
        `https://twitter-api45.p.rapidapi.com${endpoint}`,
        options
      );

      // Gelen veriyi işle ve döndür.
      return await res.json();
    } catch (err) {
      console.log('veirleri alırken hata', err);
    }
  }
}